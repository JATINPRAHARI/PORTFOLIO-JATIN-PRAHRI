import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              JATIN
              <br />
              <span>PRAHRI</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Full-Stack</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Developer</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Developer</div>
            </h2>
          </div>
          <a
            href="mailto:jatink9792@gmail.com"
            className="landing-email"
            data-cursor="disable"
          >
            jatink9792@gmail.com
          </a>
          <div className="landing-cta">
            <a href="#work" className="cta-btn cta-primary" data-cursor="disable">
              View Projects
            </a>
            <a href="#contact" className="cta-btn cta-secondary" data-cursor="disable">
              Contact Me
            </a>
            <a
              href="https://github.com/JATINPRAHARI"
              target="_blank"
              className="cta-btn cta-tertiary"
              data-cursor="disable"
            >
              GitHub
            </a>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
