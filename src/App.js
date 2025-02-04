import './App.css';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from './context/ThemeContext';
import NavBar from "./components/NavBar";
import { Element } from 'react-scroll';
import GlobeViewer from './components/GlobeViewer';

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

  const handleSidebarClick = (section) => {
    setActiveSection(section);
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
  };

  const getOppositeBackColor = (theme) => {
    return theme === 'dark' ? '#E5E5EA' : '#141416'; // Dark theme gives white color and vice versa
  };

  const getOppositeColor = (theme) => {
    return theme === 'dark' ? '#141416' : '#E5E5EA'; // Dark theme gives white color and vice versa
  };

  return (
    <div className="App">
      <NavBar />
      <div className="sidebar">
        <div className="scrollbar">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`scrollbar-section ${activeSection === section ? 'active' : ''}`}
              onClick={() => handleSidebarClick(section)}
              style={{
                backgroundColor: activeSection === section ? getOppositeBackColor(theme) : getOppositeColor(theme),
                color: activeSection === section ? getOppositeColor(theme) : getOppositeBackColor(theme),
              }}
            >
              {`0${index}`}
            </div>
          ))}
        </div>
      </div>
      <Element name="home" className="section home" id="home">
        <div className="text">
          <h2>Home Section</h2>
          <p>Welcome to the home section of the page.</p>
        </div>
        <div className="model">

        </div>
      </Element>
      <Element name="about" className="section about" id="about">
        <div className="text">
          <h2>About Section</h2>
          <p>Here is some information about me.</p>
        </div>
        <div className="model">

        </div>
      </Element>
      <Element name="skills" className="section skills" id="skills">
        <div className="text">
          <h2>Skills Section</h2>
          <p>These are some of my skills.</p>
        </div>
        <div className="model">

        </div>
      </Element>
      <Element name="portfolio" className="section portfolio" id="portfolio">
        <div className="text">
          <h2>Portfolio Section</h2>
          <p>Check out my work!</p>
        </div>
        <div className="model">

        </div>
      </Element>
      <Element name="contact" className="section contact" id="contact">
        <div className="text">
          <h2>Contact Section</h2>
          <p>Get in touch with me.</p>
        </div>
        <div className="model">
          <GlobeViewer modelPath="/models/globe.glb" />
        </div>
      </Element>
    </div>
  );
};

export default App;

