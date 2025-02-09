// src/components/NavBar.js
import "../index.css";
import React from "react";
import { useTheme } from "../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const NavBar = () => {
  const { theme, toggleTheme } = useTheme(); // Using the context to get and set the theme

  return (
    <nav className="navbar">
      <div>
        <h1>My Portfolio</h1>
      </div>
      <div className="navbar-right">
        <label className="switch">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <span className="slider">
            <span className="emoji">
              {theme === "dark" ? (
                <FaMoon style={{ color: "black" }} />
              ) : (
                <FaSun style={{ color: "white" }} />
              )}
            </span>
          </span>
        </label>
        <button
          className="contact-button"
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
