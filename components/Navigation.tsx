"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "HOME" },
    { href: "/about", label: "ABOUT" },
    { href: "/projects", label: "PROJECTS" },
  ];

  return (
    <nav className="border-b-2 border-terminal-green bg-terminal-dark/50 backdrop-blur-sm" role="navigation">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-2xl md:text-3xl text-glow">
            <span className="text-terminal-green">&gt;</span> TERMINAL.EXE
          </div>
          
          <ul className="flex gap-6 text-xl md:text-2xl">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    hover:text-glow transition-all duration-300
                    ${pathname === item.href ? "text-glow font-bold" : ""}
                  `}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  [{item.label}]
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
