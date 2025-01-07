import './App.css';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from './context/ThemeContext';
import NavBar from "./components/NavBar";
import { Element } from 'react-scroll';

const App = () => {
  const { theme } = useContext(ThemeContext);
  const [activeSection, setActiveSection] = useState('home'); // Track active section

  // Set the theme in the HTML document's data-theme attribute
  document.body.setAttribute('data-theme', theme);

  const sections = ['home', 'about', 'skills', 'portfolio', 'contact'];

  // Scroll to next section
  const scrollToSection = (direction) => {
    const currentIndex = sections.findIndex((section) => section === activeSection);
    let nextIndex = currentIndex + direction;

    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex >= sections.length) nextIndex = sections.length - 1;

    // Update active section
    setActiveSection(sections[nextIndex]);

    // Scroll to the section
    document.getElementById(sections[nextIndex]).scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const onWheel = (event) => {
      if (event.deltaY > 0) {
        scrollToSection(1); // Scroll down
      } else {
        scrollToSection(-1); // Scroll up
      }
    };

    window.addEventListener('wheel', onWheel);

    return () => {
      window.removeEventListener('wheel', onWheel);
    };
  }, [activeSection]); // Run effect when activeSection changes

  return (
    <div className="App">
      <NavBar />
      <Element name="home" className="section home" id="home">
        <h2>Home Section</h2>
      </Element>
      <Element name="about" className="section about" id="about">
        <h2>About Section</h2>
      </Element>
      <Element name="skills" className="section skills" id="skills">
        <h2>Skills Section</h2>
      </Element>
      <Element name="portfolio" className="section portfolio" id="portfolio">
        <h2>Portfolio Section</h2>
      </Element>
      <Element name="contact" className="section contact" id="contact">
        <h2>Contact Section</h2>
      </Element>
    </div>
  );
};

export default App;

