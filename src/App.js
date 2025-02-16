import "./App.css";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import NavBar from "./components/NavBar";
import BottomSectionBar from "./components/BottomSectionBar";
import { Element } from "react-scroll";
import GlobeViewer from "./components/GlobeViewer";
import Skills from "./components/SkillsComp";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import ComboScene from "./components/ComboScene";

const App = () => {
  const [activeSection, setActiveSection] = useState("Home");
  const [hoveredSection, setHoveredSection] = useState(null);
  const projectsRef = useRef(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

  const minSwipeDistance = 50;

  const sections = useMemo(
    () => ["Home", "About", "Skills", "Portfolio", "Contact"],
    []
  );
  const projects = useMemo(
    () => ["Portfolio", "Emulator", "EaglesBrew", "TwitterClone"],
    []
  );

  const scrollToSection = useCallback(
    (direction) => {
      const currentIndex = sections.findIndex(
        (section) => section === activeSection
      );
      let nextIndex = currentIndex + direction;

      if (nextIndex < 0) nextIndex = 0;
      if (nextIndex >= sections.length) nextIndex = sections.length - 1;

      setCurrentProjectIndex(0);
      document
        .getElementById(sections[nextIndex])
        .scrollIntoView({ behavior: "smooth" });
    },
    [activeSection, sections]
  );

  const scrollToProject = useCallback(
    (direction) => {
      const container = document.getElementById("Projects");
      if (container) {
        const containerWidth = container.offsetWidth;
        const scrollPosition = container.scrollLeft;
        const newIndex = currentProjectIndex + direction;

        if (newIndex >= 0 && newIndex < projects.length) {
          setCurrentProjectIndex(newIndex);

          const scrollAmount = direction * containerWidth;
          container.scrollTo({
            left: scrollPosition + scrollAmount,
            behavior: "smooth",
          });
        }
      }
    },
    [currentProjectIndex, projects.length]
  );

  useEffect(() => {
    const onWheel = (event) => {
      event.preventDefault();

      if (activeSection === "Portfolio") {
        if (currentProjectIndex === 0 && event.deltaY < 0) {
          scrollToSection(-1);
        } else if (
          currentProjectIndex === projects.length - 1 &&
          event.deltaY > 0
        ) {
          scrollToSection(1);
        } else {
          if (event.deltaY < 0) {
            scrollToProject(-1);
          } else if (event.deltaY > 0) {
            scrollToProject(1);
          }
        }
      } else {
        if (event.deltaY > 0) {
          scrollToSection(1);
        } else {
          scrollToSection(-1);
        }
      }
    };

    const onTouchStart = (e) => {
      setTouchEnd({ x: 0, y: 0 });
      setTouchStart({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      });
    };

    const onTouchMove = (e) => {
      setTouchEnd({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      });
    };

    const onTouchEnd = () => {
      if (!touchStart.x || !touchStart.y || !touchEnd.x || !touchEnd.y) return;

      const distanceX = touchStart.x - touchEnd.x;
      const distanceY = touchStart.y - touchEnd.y;

      const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);
      const isVerticalSwipe = !isHorizontalSwipe;

      if (isHorizontalSwipe && activeSection === "Portfolio") {
        if (distanceX > minSwipeDistance) {
          console.log("Swipe Left");
          if (currentProjectIndex === projects.length - 1) {
            scrollToSection(1);
          } else {
            scrollToProject(1);
          }
        } else if (distanceX < -minSwipeDistance) {
          console.log("Swipe Right");
          if (currentProjectIndex === 0) {
            scrollToSection(-1);
          } else {
            scrollToProject(-1);
          }
        }
      } else if (isVerticalSwipe) {
        if (distanceY > minSwipeDistance) {
          console.log("Swipe Up");
          scrollToSection(1);
        } else if (distanceY < -minSwipeDistance) {
          console.log("Swipe Down");
          scrollToSection(-1);
        }
      }
    };

    window.addEventListener("wheel", onWheel);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [
    activeSection,
    scrollToSection,
    scrollToProject,
    currentProjectIndex,
    projects.length,
    touchStart.x,
    touchStart.y,
    touchEnd.x,
    touchEnd.y,
  ]);

  const handleSidebarClick = (section) => {
    document.getElementById(section).scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sectionsToObserve = [
      "Home",
      "About",
      "Skills",
      "Portfolio",
      "Contact",
    ];

    sectionsToObserve.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

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
                    ? "#E5E5EA"
                    : "transparent",
                color:
                  activeSection === section || hoveredSection === section
                    ? "#141416"
                    : "#E5E5EA",
              }}
            >
              {`0${index}`}
            </div>
          ))}
        </div>
      </div>
      <Element name="Home" className="section Home" id="Home">
        <div className="text">
          <h1>
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
        <div className="model">
          <DotLottieReact
            src="https://lottie.host/029513f5-2f14-4324-9af0-7ad23e840554/wnYpsQVtYR.lottie"
            loop
            autoplay
          />
        </div>
      </Element>
      <Element name="About" className="section About" id="About">
        <div className="text">
          <h1>👋 Hi, I'm Nolan!</h1>
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
        <div className="model">
          <div className="image-container">
            <img
              className="circle-bg"
              src="blackBack.png"
              alt="Background circle"
            />
            <img className="headshot" src="headshot.png" alt="Nolan" />
          </div>
        </div>
      </Element>
      <Element name="Skills" className="section Skills" id="Skills">
        <div className="text">
          <h1>Skills & Experience</h1>
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
              style={{ color: "#FF9907", textDecoration: "none" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              resume
            </a>{" "}
            for more details!
          </p>
        </div>
        <div className="model">
          <Skills />
        </div>
      </Element>
      <Element
        name="Projects"
        className="section Projects"
        id="Projects"
        ref={projectsRef}
      >
        <Element
          name="TwitterClone"
          className="section Inner TwitterClone"
          id="TwitterClone"
        >
          <div className="text">
            <h1>Twitter Clone</h1>
            <p>
              This project is a full-featured Twitter clone built using HTML,
              CSS, PHP, and JavaScript. It implements the core functionality of
              a social media platform, providing a user-friendly environment for
              interaction, sharing, and communication. The application allows
              users to create accounts, log in, and engage with content in a
              variety of ways. <br />
              <a
                href="https://github.com/Nolan-Olhausen/Twitter-Clone"
                style={{ color: "#FF9907", textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repo
              </a>
            </p>
          </div>
          <div className="model">
            <img
              className="responsive-image"
              src="images/websitePics.png"
              alt="Twitter Clone"
            />
          </div>
        </Element>
        <Element
          name="EaglesBrew"
          className="section Inner EaglesBrew"
          id="EaglesBrew"
        >
          <div className="text">
            <h1>Eagles Brew</h1>
            <p>
              A WIP mobile ordering app for a coffee shop, built with Flutter
              and integrated with the Square API for secure and seamless payment
              processing. This app allows customers to continue as a guest or
              create/login to an account, explore the menu, customize their
              order, and place orders. Products, rewards, and other info
              dynamically loaded from API. <br />
              <a
                href="https://github.com/Nolan-Olhausen/Mobile-Ordering-App"
                style={{ color: "#FF9907", textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repo
              </a>
            </p>
          </div>
          <div className="model">
            <img
              className="responsive-image"
              src="images/appMockups.png"
              alt="Eagles Brew"
            />
          </div>
        </Element>
        <Element
          name="Emulator"
          className="section Inner Emulator"
          id="Emulator"
        >
          <div className="text">
            <h1>Gameboy Advance Emulator</h1>
            <p>
              Game Boy Advance emulator written in C. Currently a WIP with CPU
              {"("}ARM and THUMB{")"}, Memory, and some Video modes passing all
              tests. Audio and remaining video modes in advanced debugging.{" "}
              <br />
              <a
                href="https://github.com/Nolan-Olhausen/GBA-Emulator"
                style={{ color: "#FF9907", textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repo
              </a>
            </p>
          </div>
          <div className="model">
            <img
              className="responsive-image"
              src="images/armwrestlerPass.gif"
              alt="Gameboy Advance Emulator"
            />
          </div>
        </Element>
        <Element
          name="Portfolio"
          className="section Inner Portfolio"
          id="Portfolio"
        >
          <div className="text">
            <h1>Portfolio & Projects</h1>
            <p>
              Here are some of the projects I've worked on, showcasing my skills
              in web, mobile, and game development. From building dynamic web
              apps to crafting engaging mobile experiences and immersive games,
              I love bringing ideas to life through code. If you want to see
              more, check out my{" "}
              <a
                href="https://github.com/Nolan-Olhausen"
                style={{ color: "#FF9907", textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              !
            </p>
          </div>
          <div className="model">
            <ComboScene />
          </div>
        </Element>
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
              style={{ color: "#FF9907", textDecoration: "none" }}
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
              style={{ color: "#FF9907", textDecoration: "none" }}
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
              style={{ color: "#FF9907", textDecoration: "none" }}
              target="_blank"
              rel="noopener noreferrer"
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
