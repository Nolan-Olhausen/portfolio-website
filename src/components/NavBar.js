import "../index.css";
import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const NavBar = () => {
  // State to toggle the mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="nav-icon">
          <DotLottieReact
            src="https://lottie.host/28ba67e4-afee-432d-8f26-ec9ffbced6c6/jGjMEPASkr.lottie"
            loop
            autoplay
          />
        </div>
        <h1>HAWKE . dev</h1>
      </div>
      {/* Hamburger icon */}
      <div className="navbar-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
      </div>
      {/* Menu items */}
      <div className={`navbar-right ${menuOpen ? "show" : ""}`}>
        <button
          className="nav-button"
          onClick={() =>
            document
              .getElementById("About")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          About
        </button>
        <button
          className="nav-button"
          onClick={() =>
            document
              .getElementById("Skills")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          Skills
        </button>
        <button
          className="nav-button"
          onClick={() =>
            document
              .getElementById("Projects")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          Projects
        </button>
        <button
          className="nav-button"
          onClick={() =>
            document
              .getElementById("Contact")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          Contact
        </button>
      </div>
    </nav>
  );
};

export default NavBar;

