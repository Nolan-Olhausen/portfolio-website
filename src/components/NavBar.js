// src/components/NavBar.js
import "../index.css";
import React from "react";
import { useTheme } from "../context/ThemeContext";

const NavBar = () => {
  const { theme, toggleTheme } = useTheme(); // Using the context to get and set the theme

  return (
    <nav className="navbar">
      <div>
        <h1>My Portfolio</h1>
      </div>
      <div className="navbar-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "🌙" : "🌞"}
        </button>
        <button className="contact-button">Contact</button>
      </div>
    </nav>
  );
};

export default NavBar;
