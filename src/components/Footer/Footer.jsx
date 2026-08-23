import "./Footer.css";
import { Link } from "react-router-dom";

function Footer({ variant = "default" }) {
  return (
    <footer className={`footer footer-${variant}`}>

      <div className="footer-content">

        <div className="footer-brand">
          <h2>Art Mail Club</h2>

          <p>
            Bringing people together through handwritten letters,
            creativity, and meaningful connections.
          </p>
        </div>


        <nav className="footer-links" aria-label="Footer navigation">

          <Link to="/">Home</Link>

          <Link to="/gallery">Gallery</Link>

          <Link to="/community">Community</Link>

          <Link to="/about">About</Link>

          <Link to="/contact">Contact</Link>

          <Link to="/subscription">Mail Club</Link>

          <Link to="/profile">Mail Club</Link>

        </nav>


        <div className="footer-divider" />


        <p className="footer-copy">
          © 2026 Art Mail Club. Made with ☀️ and handwritten stories.
        </p>

      </div>

    </footer>
  );
}

export default Footer;
