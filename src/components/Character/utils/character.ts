import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const COLORS = {
  SKIN: new THREE.Color("#A56858"),
  HAIR: new THREE.Color("#201719"),
  EYEBROW: new THREE.Color("#080808"),
  SHIRT: new THREE.Color("#30201F"),
  PANTS: new THREE.Color("#111114"),
  CAP: new THREE.Color("#B0ADB4"),
  SHOES: new THREE.Color("#E6E6E6"),
  SOLES: new THREE.Color("#BFC0C6"),
} as const;

function cloneAndTint(originalMat: THREE.Material | THREE.Material[], color: THREE.Color): THREE.Material {
  const src = Array.isArray(originalMat) ? originalMat[0] : originalMat;
  const m = (src as any).clone();
  if (m.color) m.color.copy(color);
  return m;
}

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);

            const byName: Record<string, THREE.Mesh> = {};
            character.traverse((child: any) => {
              if (child.isMesh) byName[child.name] = child;
            });

            function findMesh(names: string[]): THREE.Mesh | undefined {
              for (const n of names) {
                if (byName[n]) return byName[n];
              }
              return undefined;
            }

            console.log("Meshes:", Object.keys(byName));

            // HAIR — Material[1] "Material.030" (baseColor [0.003, 0.003, 0.003])
            const hair = findMesh(["hair"]);
            if (hair) {
              hair.material = cloneAndTint(hair.material, COLORS.HAIR);
            }

            // EYEBROW — Material[2] "Material.014" (baseColor [0,0,0])
            const brow = findMesh(["Eyebrow"]);
            if (brow) {
              brow.material = cloneAndTint(brow.material, COLORS.EYEBROW);
            }

            // EYES — Material[3] "EyesMaterial.001" (textured) — keep as-is

            // FACE — Plane.007 is the face mesh (2047 verts, Material[0])
            const face = findMesh(["Plane.007", "Plane007"]);
            if (face) {
              console.log("FACE groups:", face.geometry.groups);
              console.log("FACE material:", (face.material as any)?.name);
              face.material = cloneAndTint(face.material, COLORS.SKIN);
            }

            // SKIN PARTS — clone original Material[0] "default" (roughness 0.3425)
            const skinParts = [
              findMesh(["Ear.001", "Ear001"]),
              findMesh(["Hand"]),
              findMesh(["Neck"]),
            ];
            skinParts.forEach((mesh) => {
              if (mesh) {
                mesh.material = cloneAndTint(mesh.material, COLORS.SKIN);
              }
            });

            // SHIRT — BODY.SHIRT is the body/shirt mesh (4514 verts, Material[0])
            const body = findMesh(["BODY.SHIRT", "BODYSHIRT"]);
            if (body) {
              console.log("BODY.SHIRT groups:", body.geometry.groups);
              console.log("BODY.SHIRT material:", (body.material as any)?.name);
              body.material = cloneAndTint(body.material, COLORS.SHIRT);
            }

            // PANTS
            const pant = findMesh(["Pant"]);
            if (pant) {
              pant.material = cloneAndTint(pant.material, COLORS.PANTS);
            }

            // SHOES
            const shoe = findMesh(["Shoe"]);
            if (shoe) {
              shoe.material = cloneAndTint(shoe.material, COLORS.SHOES);
            }

            // SOLES
            const sole = findMesh(["Sole"]);
            if (sole) {
              sole.material = cloneAndTint(sole.material, COLORS.SOLES);
            }

            // CAP — Node "Cube.002" → mesh[11] "Cube.007" (136 verts)
            const cap = findMesh(["Cube.002", "Cube002"]);
            if (cap) {
              cap.material = cloneAndTint(cap.material, COLORS.CAP);
            }

            // Shadows
            character.traverse((child: any) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.frustumCulled = true;
              }
            });

            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
