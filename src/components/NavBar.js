// src/components/NavBar.js
import "../index.css";
import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div>
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
