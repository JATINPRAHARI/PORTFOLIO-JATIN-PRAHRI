import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  // Soft warm key light from front-right
  const keyLight = new THREE.DirectionalLight(0xfff5ee, 0);
  keyLight.intensity = 0;
  keyLight.position.set(2, 3, 5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 50;
  scene.add(keyLight);

  // Subtle fill from left
  const fillLight = new THREE.DirectionalLight(0xf0eef5, 0);
  fillLight.intensity = 0;
  fillLight.position.set(-3, 1, 3);
  scene.add(fillLight);

  // Subtle pink/rose rim from behind-right
  const rimLight = new THREE.DirectionalLight(0xffb4c8, 0);
  rimLight.intensity = 0;
  rimLight.position.set(3, 2, -4);
  scene.add(rimLight);

  // Subtle purple ambient from behind-left
  const purpleLight = new THREE.DirectionalLight(0xc4a0ff, 0);
  purpleLight.intensity = 0;
  purpleLight.position.set(-2, 3, -3);
  scene.add(purpleLight);

  // Point light for screen glow
  const pointLight = new THREE.PointLight(0xc2a4ff, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: any) {
    if (screenLight.material.opacity > 0.9) {
      pointLight.intensity = screenLight.material.emissiveIntensity * 20;
    } else {
      pointLight.intensity = 0;
    }
  }

  const duration = 2;
  const ease = "power2.inOut";

  function turnOnLights() {
    gsap.to(scene, {
      environmentIntensity: 0.6,
      duration,
      ease,
    });
    gsap.to(keyLight, {
      intensity: 1.0,
      duration,
      ease,
    });
    gsap.to(fillLight, {
      intensity: 0.35,
      duration,
      ease,
    });
    gsap.to(rimLight, {
      intensity: 0.5,
      duration,
      ease,
    });
    gsap.to(purpleLight, {
      intensity: 0.3,
      duration,
      ease,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
