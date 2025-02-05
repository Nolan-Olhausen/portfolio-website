import React from "react";
import { FaJs, FaHtml5, FaJava, FaPython, FaPhp, FaReact, FaGitAlt } from "react-icons/fa";
import { FaUnity, FaFlutter, FaC } from "react-icons/fa6";
import { SiMysql } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

const Skills = () => {
    const skills = [
      { icon: <FaFlutter />, name: "Flutter" },
      { icon: <FaC />, name: "C" },
      { icon: <FaJs />, name: "JavaScript" },
      { icon: <FaHtml5 />, name: "HTML5" },
      { icon: <FaJava />, name: "Java" },
      { icon: <FaPython />, name: "Python" },
      { icon: <FaPhp />, name: "PHP" },
      { icon: <FaReact />, name: "React" },
      { icon: <FaUnity />, name: "Unity" },
      { icon: <SiMysql />, name: "MySQL" },
      { icon: <FaGitAlt />, name: "Git" },
      { icon: <TbBrandCSharp />, name: "CSharp" },
    ];
  
    return (
      <div className="skills-container">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <span className="skill-icon">{skill.icon}</span>
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default Skills;