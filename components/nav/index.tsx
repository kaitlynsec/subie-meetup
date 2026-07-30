"use client";

import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-xl font-bold tracking-widest text-blue-200">
          subie club
        </div>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-wider">
          <a href="#about" className="hover:text-blue-400 transition">
            about
          </a>
          <a href="#events" className="hover:text-blue-400 transition">
            events
          </a>
          <a href="#gallery" className="hover:text-blue-400 transition">
            gallery
          </a>
          <a href="#contact" className="hover:text-blue-400 transition">
            contact us
          </a>
        </div>
        <button
          className="md:hidden text-blue-200 text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>
      {open && (
        <div className="md:hidden flex flex-col items-center gap-6 py-6 bg-black/40 backdrop-blur-md text-sm uppercase tracking-wider">
          <a href="#home" onClick={() => setOpen(false)}>
            home
          </a>
          <a href="#about" onClick={() => setOpen(false)}>
            about
          </a>
          <a href="#events" onClick={() => setOpen(false)}>
            events
          </a>
          <a href="#gallery" onClick={() => setOpen(false)}>
            gallery
          </a>
          <a href="#contact" onClick={() => setOpen(false)}>
            contact us
          </a>
        </div>
      )}
    </nav>
  );
}
