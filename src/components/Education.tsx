import "./styles/Education.css";

const educationData = [
  {
    institution: "Meerut Institute of Engineering and Technology (MIET)",
    location: "Meerut, Uttar Pradesh",
    degree: "B.Tech — Computer Science & Engineering (Data Science)",
    detail: "CGPA: 6.0",
    year: "Expected Graduation: 2028",
  },
  {
    institution: "Avenue Public School, CBSE",
    location: "",
    degree: "Class 12 — 2024",
    detail: "78%",
    year: "2024",
  },
  {
    institution: "Avenue Public School, CBSE",
    location: "",
    degree: "Class 10 — 2022",
    detail: "68%",
    year: "2022",
  },
];

const certifications = [
  {
    name: "MongoDB Basics for Students",
    issuer: "MongoDB",
    date: "August 2026",
  },
];

const softSkills = [
  "Problem Solving",
  "Team Collaboration",
  "Communication",
  "Leadership",
  "Adaptability",
  "Time Management",
];

const languages = [
  { name: "Hindi", level: "Native" },
  { name: "English", level: "Professional Working Proficiency" },
];

const interests = [
  "Full-Stack Development",
  "Artificial Intelligence",
  "Open Source",
  "Mobile App Development",
  "Cricket",
  "Anime",
];

const Education = () => {
  return (
    <div className="education-section section-container" id="education">
      <div className="education-container">
        <h2>
          Education <span>&</span>
          <br /> Certifications
        </h2>

        <div className="education-grid">
          <div className="education-column">
            <h3 className="section-subtitle">Education</h3>
            {educationData.map((edu, index) => (
              <div className="education-card" key={index}>
                <div className="education-card-header">
                  <h4>{edu.institution}</h4>
                  {edu.location && <h5>{edu.location}</h5>}
                </div>
                <p className="education-degree">{edu.degree}</p>
                <div className="education-meta">
                  <span className="education-detail">{edu.detail}</span>
                  <span className="education-year">{edu.year}</span>
                </div>
              </div>
            ))}

            <h3 className="section-subtitle" style={{ marginTop: "40px" }}>
              Certifications
            </h3>
            {certifications.map((cert, index) => (
              <div className="education-card cert-card" key={index}>
                <div className="education-card-header">
                  <h4>{cert.name}</h4>
                </div>
                <div className="education-meta">
                  <span className="education-detail">{cert.issuer}</span>
                  <span className="education-year">{cert.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="education-column">
            <h3 className="section-subtitle">Soft Skills</h3>
            <div className="skills-tags-container">
              {softSkills.map((skill) => (
                <span className="skill-tag" key={skill}>
                  {skill}
                </span>
              ))}
            </div>

            <h3 className="section-subtitle" style={{ marginTop: "40px" }}>
              Languages
            </h3>
            <div className="languages-container">
              {languages.map((lang) => (
                <div className="language-item" key={lang.name}>
                  <span className="language-name">{lang.name}</span>
                  <span className="language-level">{lang.level}</span>
                </div>
              ))}
            </div>

            <h3 className="section-subtitle" style={{ marginTop: "40px" }}>
              Interests
            </h3>
            <div className="skills-tags-container">
              {interests.map((interest) => (
                <span className="skill-tag interest-tag" key={interest}>
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
