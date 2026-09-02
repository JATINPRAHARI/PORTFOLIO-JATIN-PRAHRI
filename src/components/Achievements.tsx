import "./styles/Achievements.css";

const achievements = [
  {
    title: "India Innovates 2026",
    subtitle: "Certificate of Participation",
    venue: "Bharat Mandapam, New Delhi",
    date: "March 2026",
  },
  {
    title: "SnowStorm Hackathon",
    subtitle: "Certificate of Participation",
    venue: "Tech4Hack",
    date: "",
  },
  {
    title: "Byteverse 1.0 Hackathon",
    subtitle: "Certificate of Participation",
    venue: "Team Cryptic Coders — Healthcare Theme",
    date: "",
  },
];

const Achievements = () => {
  return (
    <div className="achievements-section section-container" id="achievements">
      <div className="achievements-container">
        <h2>
          Achievements <span>&</span>
          <br /> Hackathons
        </h2>
        <div className="achievements-grid">
          {achievements.map((item, index) => (
            <div className="achievement-card" key={index}>
              <div className="achievement-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </div>
              <div className="achievement-content">
                <h4>{item.title}</h4>
                <p className="achievement-subtitle">{item.subtitle}</p>
                <div className="achievement-meta">
                  <span>{item.venue}</span>
                  {item.date && <span>{item.date}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="achievements-note">
          Participated in multiple hackathons and technical events. Built
          multiple software projects using modern web technologies.
        </p>
      </div>
    </div>
  );
};

export default Achievements;
