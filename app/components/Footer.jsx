import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">Websites By Ben</div>
      <div className="footer-copy">
        &copy; {new Date().getFullYear()} Websites By Ben. All rights reserved.
      </div>
      <div className="footer-social">
        <Link href="/">Home</Link>
        <Link href="/works">My Works</Link>
        <Link href="/contact">My Works</Link>
        <Link href="/about">About</Link>
        <a
          href="https://linkedin.com/in/ben-abrey-39bb7025a/"
          target="_blank"
          rel="noopener noreferrer"
          className="fa fa-linkedin"
        >
          Connect With Me
        </a>
      </div>
    </footer>
  );
}
