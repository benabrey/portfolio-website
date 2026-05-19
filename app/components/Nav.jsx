"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav className={scrolled ? "scrolled" : ""}>
        <Link href="/" className="nav-logo">
          wURLd web design
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/" onClick={close}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/works" onClick={close}>
              Portfolio
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={close}>
              Contact
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={close}>
              About
            </Link>
          </li>
        </ul>
      </nav>

      <button
        className={`nav-toggle ${open ? "open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span />
        <span />
        <span />
      </button>
      <div className={`nav-overlay ${open ? "open" : ""}`} onClick={close} />
      <ul className={`nav-mobile ${open ? "open" : ""}`}>
        <li>
          <Link href="/" onClick={close}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/works" onClick={close}>
            Portfolio
          </Link>
        </li>
        <li>
          <Link href="/contact" onClick={close}>
            Contact
          </Link>
        </li>
        <li>
          <Link href="/about" onClick={close}>
            About
          </Link>
        </li>
      </ul>
    </>
  );
}
