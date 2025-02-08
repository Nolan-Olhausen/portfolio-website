import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import { FaLinkedin, FaEnvelope, FaPhone, FaGithub } from "react-icons/fa";
import { ThemeContext } from "./context/ThemeContext";
import NavBar from "./components/NavBar";
import BottomSectionBar from "./components/BottomSectionBar";
import { Element } from "react-scroll";
import GlobeViewer from "./components/GlobeViewer";
import Skills from "./components/SkillsComp";

const App = () => {
  const { theme } = useContext(ThemeContext);
  const [activeSection, setActiveSection] = useState("home"); // Track active section
  const [hoveredSection, setHoveredSection] = useState(null);

  // Set the theme in the HTML document's data-theme attribute
  document.body.setAttribute("data-theme", theme);

  const sections = ["Home", "About", "Skills", "Portfolio", "Contact"];

  // Scroll to next section smoothly
  const scrollToSection = (direction) => {
    const currentIndex = sections.findIndex(
      (section) => section === activeSection
    );
    let nextIndex = currentIndex + direction;

    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex >= sections.length) nextIndex = sections.length - 1;

    // Scroll without updating activeSection
    document
      .getElementById(sections[nextIndex])
      .scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onWheel = (event) => {
      if (event.deltaY > 0) {
        scrollToSection(1); // Scroll down
      } else {
        scrollToSection(-1); // Scroll up
      }
    };

    window.addEventListener("wheel", onWheel);

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [activeSection]);

  const handleSidebarClick = (section) => {
    document.getElementById(section).scrollIntoView({ behavior: "smooth" });
  };

  // Set up IntersectionObserver to detect the section in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is in view
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect(); // Clean up the observer on component unmount
    };
  }, []);

  // Styles for scrollbar highlighting
  const getOppositeBackColor = (theme) =>
    theme === "dark" ? "#E5E5EA" : "#141416";
  const getOppositeColor = (theme) =>
    theme === "dark" ? "#141416" : "#E5E5EA";

  return (
    <div className="App">
      <NavBar />
      
      <div className="sidebar">
        <div className="scrollbar">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`scrollbar-section ${
                activeSection === section ? "active" : ""
              }`}
              onClick={() => handleSidebarClick(section)}
              onMouseEnter={() => setHoveredSection(section)}
              onMouseLeave={() => setHoveredSection(null)}
              style={{
                backgroundColor:
                  activeSection === section || hoveredSection === section
                    ? getOppositeBackColor(theme)
                    : getOppositeColor(theme),
                color:
                  activeSection === section || hoveredSection === section
                    ? getOppositeColor(theme)
                    : getOppositeBackColor(theme),
              }}
            >
              {`0${index}`}
            </div>
          ))}
        </div>
      </div>
      <Element name="Home" className="section Home" id="Home">
        <div className="text">
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "bold",
              marginBottom: "20px",
              lineHeight: 0.9,
            }}
          >
            Full-Stack Software{" "}
            <span style={{ display: "block" }}>Developer</span>
          </h1>
          <p>
            Building seamless digital experiences from front to back. I
            specialize in crafting intuitive user interfaces, scalable backend
            systems, and high-performance applications. Whether it's web,
            mobile, or game development, I turn ideas into reality.
          </p>
        </div>
        <div className="model"></div>
      </Element>
      <Element name="About" className="section About" id="About">
        <div className="text">
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "bold",
              marginBottom: "20px",
              lineHeight: 0.9,
            }}
          >
            👋 Hi, I'm Nolan!
          </h1>
          <p>
            Passionate about <strong>web, mobile, and game development</strong>,
            I thrive on crafting innovative and user-friendly digital
            experiences. As an <strong>organized problem solver</strong> and a{" "}
            <strong>loyal employee</strong>, I bring <strong>dedication</strong>{" "}
            and <strong>hard work </strong>
            to every project I take on.
            <br />
            <br />
            When I'm not coding, you can find me{" "}
            <strong>
              playing video games, watching baseball, hitting the gym, or
              working on side projects
            </strong>
            .{" "}
          </p>
        </div>
        <div className="image-container">
          <img
            className="circle-bg"
            src="blackBack.png"
            alt="Background circle"
          />
          <img
            className="headshot"
            src="headshot.png"
            alt="Nolan"
            style={{
              width: "400px",
              height: "400px",
              objectFit: "cover",
            }}
          />
        </div>
      </Element>
      <Element name="Skills" className="section Skills" id="Skills">
        <div className="text">
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "bold",
              marginBottom: "20px",
              lineHeight: 0.9,
            }}
          >
            Skills & Experience
          </h1>
          <p>
            As a full-stack developer, I specialize in{" "}
            <strong>mobile development</strong> with <strong>Flutter</strong>,
            creating beautiful and efficient apps for both iOS and Android. For{" "}
            <strong>web development</strong>, I leverage technologies like{" "}
            <strong>PHP</strong>, <strong>JavaScript</strong>,{" "}
            <strong>React</strong>, <strong>HTML</strong>, and{" "}
            <strong>CSS</strong> to build dynamic, scalable websites.
            Additionally, I have hands-on experience in{" "}
            <strong>game development</strong> with <strong>Unity</strong> and{" "}
            <strong>Unreal Engine</strong>, bringing interactive and engaging
            experiences to life across platforms. Whether it's creating seamless
            mobile apps, high-performance websites, or immersive games, I'm
            passionate about delivering innovative solutions.
            <br />
            <br />
            Check out my{" "}
            <a
              href="/path/to/resume.pdf"
              style={{ color: "#EC7601", textDecoration: "none" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              resume
            </a>{" "}
            for more details!
          </p>
        </div>
        <Skills />
      </Element>
      <Element name="Portfolio" className="section Portfolio" id="Portfolio">
        <div className="text">
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "bold",
              marginBottom: "20px",
              lineHeight: 0.9,
            }}
          >
            Portfolio & Projects
          </h1>
          <p>
            Here are some of the projects I've worked on, showcasing my skills
            in web, mobile, and game development. From building dynamic web apps
            to crafting engaging mobile experiences and immersive games, I love
            bringing ideas to life through code. If you want to see more, check
            out my{" "}
            <a
              href="https://github.com/Nolan-Olhausen"
              style={{ color: "#EC7601", textDecoration: "none" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            !
          </p>
        </div>
        <div className="model"></div>
      </Element>
      <Element name="Contact" className="section Contact" id="Contact">
        <div className="text">
          <h2>Let’s Connect!</h2>
          <p>
            Have an idea, project, or opportunity you'd like to discuss? Feel
            free to reach out! I'm always open to collaborating, building
            innovative solutions, and exploring new challenges in tech.
          </p>

          <p>
            <FaEnvelope
              style={{
                marginRight: "5px",
                position: "relative",
                top: "2px",
              }}
            />{" "}
            Email:{" "}
            <a
              href="mailto:olhausennolan@gmail.com"
              style={{ color: "#EC7601", textDecoration: "none" }}
            >
              olhausennolan@gmail.com
            </a>{" "}
            <br />
            <FaPhone
              style={{
                marginRight: "5px",
                position: "relative",
                top: "2px",
              }}
            />{" "}
            Phone:{" "}
            <a
              href="tel:+19517468058"
              style={{ color: "#EC7601", textDecoration: "none" }}
            >
              +1 951 746-8058
            </a>{" "}
            <br />
            <FaLinkedin
              style={{
                marginRight: "5px",
                position: "relative",
                top: "2px",
              }}
            />{" "}
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/nolan-olhausen-8a0ab3280"
              style={{ color: "#EC7601", textDecoration: "none" }}
              target="_blank"
            >
              Nolan Olhausen
            </a>{" "}
            <br />
          </p>

          <p>Looking forward to connecting!</p>
        </div>
        <div className="model">
          <GlobeViewer modelPath="/models/globe.glb" />
        </div>
      </Element>
      <BottomSectionBar sections={sections} currentSection={activeSection} />
    </div>
  );
};

export default App;
