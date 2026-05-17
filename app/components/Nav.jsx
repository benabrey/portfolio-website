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
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <Link href="/" className="nav-logo">Websites By Ben</Link>

      <button
        className={`nav-toggle ${open ? "open" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`nav-overlay ${open ? "open" : ""}`} onClick={close} />

      <ul className={`nav-links ${open ? "open" : ""}`}>
        <li><Link href="/" onClick={close}><span className="nav-num">01</span>Home</Link></li>
        <li><Link href="/works" onClick={close}><span className="nav-num">02</span>Portfolio</Link></li>
        <li><Link href="/contact" onClick={close}><span className="nav-num">03</span>Contact</Link></li>
        <li><Link href="/about" onClick={close}><span className="nav-num">04</span>About</Link></li>
      </ul>
    </nav>
  );
}
