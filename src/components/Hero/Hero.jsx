import "./Hero.css";
import WindowScene from "../WindowScene/WindowScene";

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-scene">

        <div className="hero-content">

          <p className="hero-tagline">
            A Cozy Place for Handmade Connections
          </p>

          <h1>Art Mail Club</h1>

          <p className="hero-description">
            Every handwritten letter carries warmth, stories,
            and a little piece of someone's heart.
            Slow down, create, and exchange something meaningful.
          </p>

          <button className="hero-button">
            Join the Club
          </button>

        </div>

        <div className="hero-room">
          <WindowScene />
        </div>

      </div>
    </section>
  );
}

export default Hero;