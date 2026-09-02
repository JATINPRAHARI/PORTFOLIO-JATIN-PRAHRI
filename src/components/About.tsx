import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I am a Computer Science & Engineering (Data Science) student and
          aspiring Full-Stack Developer based in Meerut, India. I enjoy building
          modern web and mobile applications that solve real-world problems. My
          experience spans frontend development, backend APIs, databases,
          authentication, AI/LLM integrations and responsive UI development.
        </p>
        <p className="para" style={{ marginTop: "20px" }}>
          I work primarily with JavaScript, TypeScript, React, React Native and
          Node.js, while continuously expanding my knowledge of full-stack
          engineering and AI-powered applications.
        </p>
      </div>
    </div>
  );
};

export default About;
