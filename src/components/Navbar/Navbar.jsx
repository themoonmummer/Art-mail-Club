import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar({ variant = "default" }) {
  return (
    <nav className={`navbar navbar-${variant}`}>

      <div className="navbar-logo">
        <Link to="/">
          <h2>Art Mail Club</h2>
        </Link>
      </div>

      <ul className="navbar-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/gallery">Gallery</Link>
        </li>

        <li>
          <Link to="/community">Community</Link>
        </li>

        <li>
          <Link to="/subscription">Subscription</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>

        <li>
          <Link to="/profile">Profile</Link>
        </li>

      </ul>

    </nav>
  );
}

export default Navbar;
