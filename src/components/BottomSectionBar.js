// OverlayComponent.js
import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { FaGithub, FaFileAlt } from "react-icons/fa";

const BottomSectionBar = ({ sections, currentSection }) => {
  // Find the next section based on the current section
  const nextSection =
    sections[sections.findIndex((section) => section === currentSection) + 1];

  // Scroll to the next section or the home section if we're at "Contact"
  const scrollToNext = () => {
    if (currentSection === "Contact") {
      // Scroll to "Home" if current section is "Contact"
      document.getElementById("Home").scrollIntoView({ behavior: "smooth" });
    } else if (nextSection) {
      // Otherwise scroll to the next section
      document
        .getElementById(nextSection)
        .scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bottom-bar">
      <a
        href="https://github.com/Nolan-Olhausen"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#FE9900", textDecoration: "none", fontSize: "2.5rem" }}
      >
        <FaGithub />
      </a>
      <div className="scroll-to-next">
        <p>
          {currentSection === "Contact"
            ? "Back to Top"
            : `Scroll to ${nextSection || "next section"}`}
        </p>
        <div className="arrow" onClick={scrollToNext}>
          {currentSection === "Contact" ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>
      <div className="bottom-navbar-right">
        <a
          href="https://github.com/Nolan-Olhausen"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#FE9900",
            textDecoration: "none",
            fontSize: "2.5rem",
          }}
        >
          <FaFileAlt />
        </a>
      </div>
    </div>
  );
};

export default BottomSectionBar;
