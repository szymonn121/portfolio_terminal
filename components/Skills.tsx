"use client";

import React from "react";

// TODO: Replace with your own skills and proficiency levels
const skillsData = [
  { name: "JavaScript/TypeScript", level: 95 },
  { name: "React/Next.js", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "Python", level: 80 },
  { name: "Docker/Kubernetes", level: 75 },
  { name: "SQL/NoSQL", level: 85 },
  { name: "Git/GitHub", level: 90 },
  { name: "AWS/Cloud", level: 70 },
];

const Skills: React.FC = () => {
  return (
    <section className="space-y-6" aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="text-3xl md:text-4xl text-glow mb-6">
        [SYSTEM DIAGNOSTICS]
      </h2>
      
      <div className="dos-box p-4 sm:p-6 space-y-4 max-w-4xl mx-auto">
        <div className="flex justify-center mb-4">
          <span className="inline-block border-2 border-terminal-green bg-terminal-dark/50 px-4 sm:px-6 py-2 text-xl md:text-2xl text-terminal-dim tracking-wide">
            SKILL ANALYSIS REPORT
          </span>
        </div>

        {skillsData.map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-lg md:text-xl">
              <span>{skill.name}</span>
              <span className="text-terminal-dim">[{skill.level}%]</span>
            </div>
            
            <div className="progress-bar h-6 md:h-8">
              <div
                className="progress-bar-fill h-full flex items-center px-2 text-terminal-dark font-bold"
                style={{
                  width: `${skill.level}%`,
                  animation: `progressFill 1.5s ease-out ${index * 0.1}s both`
                }}
              >
                {skill.level > 20 && "█".repeat(Math.floor(skill.level / 10))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes progressFill {
          from {
            width: 0%;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
