"use client";

import React, { useState } from "react";
import TypingText from "@/components/TypingText";

export default function AboutPage() {
  const [showContent, setShowContent] = useState(false);

  const aboutLines = [
    "C:\\PORTFOLIO> ABOUT.EXE",
    "Loading biography...",
    "",
    "=== SZYMON KUBIAK ===",
    "",
    "Full Stack Developer | Web Enthusiast | Terminal Aesthetic Lover",
    "",
    "BACKGROUND:",
    "Based in Poland, I'm a passionate developer focused on building",
    "modern, performant web applications with a retro touch.",
    "",
    "EXPERTISE:",
    "- Frontend: React, Next.js, TypeScript, Tailwind CSS",
    "- Backend: Node.js, Express, MongoDB, PostgreSQL",
    "- DevOps: Docker, AWS, GitHub Actions",
    "- Tools: Git, VS Code, Linux/Bash",
    "",
    "PHILOSOPHY:",
    "Clean code, terminal aesthetics, and user-centric design.",
    "I believe technology should be both functional and beautiful.",
    "",
    "CONTACT:",
    "Email: kubiakszymon2008@gmail.com",
    "GitHub: github.com/szymonn121",
    "Instagram: instagram.com/szymonito_121",
  ];

  return (
    <div className="space-y-8 fade-in">
      <section className="dos-box p-6 space-y-2" aria-labelledby="about-heading">
        <div className="text-lg md:text-xl space-y-2">
          {aboutLines.map((line, index) => (
            <div
              key={index}
              className={index < 2 ? "text-terminal-dim" : ""}
            >
              {index === 3 ? (
                <span className="text-glow font-bold">{line}</span>
              ) : (
                <TypingText
                  text={line}
                  speed={20}
                  onComplete={() => {
                    if (index === aboutLines.length - 1) {
                      setTimeout(() => setShowContent(true), 300);
                    }
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {showContent && (
        <section className="dos-box p-6 fade-in" aria-labelledby="cta-heading">
          <h2 id="cta-heading" className="text-2xl md:text-3xl text-glow mb-4">
            [EXPLORE]
          </h2>
          <div className="space-y-3 text-lg md:text-xl">
            <p>
              <a href="/projects" className="hover:text-glow underline">
                → View My Projects
              </a>
            </p>
            <p>
              <a href="/" className="hover:text-glow underline">
                → Back to Home
              </a>
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
