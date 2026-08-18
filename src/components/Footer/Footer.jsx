import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <h2>Art Mail Club</h2>

        <p>
          Bringing people together through handwritten letters,
          creativity, and meaningful connections.
        </p>

        <ul className="footer-links">

          <li><a href="#">Home</a></li>
          <li><a href="#">Gallery</a></li>
          <li><a href="#">Community</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>

        </ul>

        <p className="footer-copy">
          © 2025 Art Mail Club. Made with ☀️ and handwritten stories.
        </p>

      </div>

    </footer>
  );
}

export default Footer;