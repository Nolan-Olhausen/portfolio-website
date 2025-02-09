// src/components/NavBar.js
import "../index.css";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const NavBar = () => {
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
      <div className="navbar-right">
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
