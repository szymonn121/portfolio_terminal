"use client";

import React, { useEffect, useRef, useState } from "react";

interface CommandPromptProps {
  prefix?: string;
}

type HistoryEntry = { type: "input" | "output"; text: string };

const commandList = [
  "help",
  "about",
  "projects",
  "skills",
  "social",
  "email",
  "github",
  "instagram",
  "spotify",
  "clear",
];

const CommandPrompt: React.FC<CommandPromptProps> = ({ prefix = "C:\\PORTFOLIO>" }) => {
  const [history, setHistory] = useState<HistoryEntry[]>([{
    type: "output",
    text: "Type 'help' to see available commands.",
  }]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    historyRef.current?.scrollTo({ top: historyRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  const runCommand = (cmd: string): HistoryEntry[] => {
    const lower = cmd.trim().toLowerCase();
    if (!lower) return [];

    if (lower === "clear" || lower === "cls") {
      setHistory([]);
      return [];
    }

    switch (lower) {
      case "help":
        return [{
          type: "output",
          text: `Commands:\n${commandList.join(" | ")}`,
        }];
      case "about":
        return [{
          type: "output",
          text: "Szymon Kubiak - Full Stack Developer focused on web, terminal aesthetics, and retro vibes.",
        }];
      case "projects":
        return [{
          type: "output",
          text: "Open /projects to browse the slider, or use the gallery entries for photos.",
        }];
      case "skills":
        return [{
          type: "output",
          text: "Core: TypeScript, React/Next.js, Node.js, Docker, SQL/NoSQL, Git, AWS.",
        }];
      case "social":
        return [{
          type: "output",
          text: "GitHub: github.com/szymonn121\nInstagram: instagram.com/szymonito_121\nSpotify: open.spotify.com/user/31cxpjaxjwegeqnyfb5dylp6xh7u?si=e21090a1c677482b",
        }];
      case "email":
        return [{ type: "output", text: "kubiakszymon2008@gmail.com" }];
      case "github":
        return [{ type: "output", text: "https://github.com/szymonn121" }];
      case "instagram":
        return [{ type: "output", text: "https://www.instagram.com/szymonito_121/" }];
      case "spotify":
        return [{ type: "output", text: "https://open.spotify.com/user/31cxpjaxjwegeqnyfb5dylp6xh7u?si=e21090a1c677482b" }];
      default:
        return [{ type: "output", text: `Unknown command: ${cmd}. Type 'help'.` }];
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userEntry: HistoryEntry = { type: "input", text: `${prefix} ${input}` };
    const outputs = runCommand(input);
    setHistory((prev) => [...prev, userEntry, ...outputs]);
    setInput("");
  };

  return (
    <div className="dos-box p-4 font-mono text-sm md:text-base" role="region" aria-label="Command prompt">
      <div
        ref={historyRef}
        className="max-h-64 overflow-y-auto space-y-2 pr-1"
      >
        {history.map((entry, idx) => (
          <div key={idx} className={entry.type === "input" ? "text-terminal-green" : "text-terminal-dim"}>
            {entry.text.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-3 flex items-center gap-2">
        <label className="text-terminal-dim" htmlFor="cmd-input">
          {prefix}
        </label>
        <input
          id="cmd-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-b border-terminal-green focus:outline-none text-terminal-green"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
};

export default CommandPrompt;
