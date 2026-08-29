"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f7f7f5]/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between py-5">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight"
          >
            Patrick Romero
          </Link>

          <nav className="hidden gap-8 text-sm text-black/60 md:flex">
            <Link href="/#about" className="transition hover:text-black">
              About
            </Link>

            <Link href="/#projects" className="transition hover:text-black">
              Projects
            </Link>

            <Link
              href="/ai-development"
              className="transition hover:text-black"
            >
              AI Workflow
            </Link>

            <Link
              href="/beyond-the-build"
              className="transition hover:text-black"
            >
              Beyond the Build
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="rounded-lg border border-black/10 px-3 py-2 text-sm md:hidden"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            Menu
          </button>
        </div>

        {isOpen && (
          <nav className="border-t border-black/5 pb-5 pt-4 md:hidden">
            <div className="flex flex-col gap-4 text-sm text-black/60">
              <Link
                href="/#about"
                onClick={() => setIsOpen(false)}
                className="transition hover:text-black"
              >
                About
              </Link>

              <Link
                href="/#projects"
                onClick={() => setIsOpen(false)}
                className="transition hover:text-black"
              >
                Projects
              </Link>

              <Link
                href="/ai-development"
                onClick={() => setIsOpen(false)}
                className="transition hover:text-black"
              >
                AI Workflow
              </Link>

              <Link
                href="/beyond-the-build"
                onClick={() => setIsOpen(false)}
                className="transition hover:text-black"
              >
                Beyond the Build
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}