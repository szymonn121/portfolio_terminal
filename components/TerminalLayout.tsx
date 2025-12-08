"use client";

import React, { useState, useEffect } from "react";
import CRTOverlay from "./CRTOverlay";
import Navigation from "./Navigation";

interface TerminalLayoutProps {
  children: React.ReactNode;
}

const TerminalLayout: React.FC<TerminalLayoutProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="crt-screen min-h-screen relative">
      {/* CRT Effects Overlay */}
      <CRTOverlay />
      
      {/* Terminal Chrome */}
      <div className="relative z-20">
        {/* Top Bar */}
        <div className="bg-terminal-dim border-b-2 border-terminal-green px-4 py-2 text-sm md:text-base">
          <div className="flex items-center justify-between">
            <span>MS-DOS Prompt - PORTFOLIO.EXE</span>
            <div className="flex gap-2">
              <button
                className="w-6 h-6 border border-terminal-green hover:bg-terminal-green hover:text-terminal-dark"
                aria-label="Minimize"
              >
                _
              </button>
              <button
                className="w-6 h-6 border border-terminal-green hover:bg-terminal-green hover:text-terminal-dark"
                aria-label="Maximize"
              >
                □
              </button>
              <button
                className="w-6 h-6 border border-terminal-green hover:bg-terminal-green hover:text-terminal-dark"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t-2 border-terminal-green bg-terminal-dark/50 backdrop-blur-sm py-4">
          <div className="container mx-auto px-4 text-center text-sm md:text-base text-terminal-dim">
            <p>© 2025 SZYMON KUBIAK | ALL RIGHTS RESERVED</p>
            {mounted && (
              <p className="mt-2">SYSTEM UPTIME: {new Date().toLocaleString()}</p>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TerminalLayout;
