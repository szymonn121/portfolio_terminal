"use client";

import React, { useState } from "react";
import TypingText from "@/components/TypingText";
import Skills from "@/components/Skills";
import CommandPrompt from "@/components/CommandPrompt";

export default function HomePage() {
  const [showSkills, setShowSkills] = useState(false);

  // TODO: Replace with your own introduction text
  const introLines = [
    "C:\\PORTFOLIO> SYSTEM.EXE /BOOT",
    "Initializing system...",
    "Loading profile data...",
    "",
    "WELCOME TO MY DIGITAL DOMAIN",
    "",
    "Hello, I'm Szymon Kubiak - A Full Stack Developer",
    "Specializing in modern web technologies and terminal aesthetics.",
    "",
    "Type 'help' for available commands...",
  ];

  return (
    <div className="space-y-8 fade-in">
      {/* Boot Sequence */}
      <section className="dos-box p-6 space-y-2" aria-labelledby="intro-heading">
        <div className="text-xl md:text-2xl space-y-2">
          {introLines.map((line, index) => (
            <div key={index} className={index < 2 ? "text-terminal-dim" : ""}>
              {index === 4 || index === 6 ? (
                <span className="text-glow font-bold">{line}</span>
              ) : (
                <TypingText
                  text={line}
                  speed={30}
                  onComplete={() => {
                    if (index === introLines.length - 1) {
                      setTimeout(() => setShowSkills(true), 500);
                    }
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      {showSkills && (
        <div className="fade-in">
          <Skills />
        </div>
      )}

      {/* Quick Info */}
      {showSkills && (
        <section className="dos-box p-6 fade-in" aria-labelledby="info-heading">
          <h2 id="info-heading" className="text-3xl md:text-4xl text-glow mb-4">
            [QUICK ACCESS]
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-lg md:text-xl">
            <div>
              <span className="text-terminal-dim">Location:</span> Poland
            </div>
            <div>
              <span className="text-terminal-dim">Email:</span>{" "}
              <a href="mailto:kubiakszymon2008@gmail.com" className="hover:text-glow">
                kubiakszymon2008@gmail.com
              </a>
            </div>
            <div>
              <span className="text-terminal-dim">GitHub:</span>{" "}
              <a
                href="https://github.com/szymonn121"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-glow"
              >
                github.com/szymonn121
              </a>
            </div>
            <div>
              <span className="text-terminal-dim">Instagram:</span>{" "}
              <a
                href="https://www.instagram.com/szymonito_121/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-glow"
              >
                instagram.com/szymonito_121
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Command Prompt */}
      {showSkills && (
        <div className="fade-in">
          <CommandPrompt />
        </div>
      )}
    </div>
  );
}
