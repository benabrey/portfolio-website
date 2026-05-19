import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <Link href="/" className="footer-logo">
          wURLd <span>web design</span>
        </Link>

        <div className="footer-nav">
          {links.map(({ href, label }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </div>

        <div className="footer-end">
          <span className="footer-copy">
            © {new Date().getFullYear()} wURLd
          </span>
          <Link href="/contact" className="footer-cta-btn">
            Let's work together →
          </Link>
        </div>
      </div>
    </footer>
  );
}
