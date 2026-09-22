import { useEffect, useState } from "react";
import bg2Image from "../../src/assets/images/other/bg2.jpeg";
import "../components/About/About.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

function About() {
  const [hasScrolled, setHasScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setHasScrolled(window.scrollY > 10);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  return (
    <>
     <Navbar variant="about" />

      <main className="about">
       
       
       <img
  className="about-background"
  src={bg2Image.src || bg2Image}
  alt="About section background"
/>
        <div className="about-overlay" />

        <div className="about-content">
          <p className="about-tag">About Art Mail Club</p>

          <h1>Slowing Down Through Handmade Creativity</h1>

          <p>
           Art Mail Club is a place to slow down, create something personal, and send a little piece of yourself into the world.

In a world of instant messages and endless scrolling, 
we believe there is something special about taking your time to create a letter by hand.
 With Art Mail Club, you can write a letter online, choose your paper and handwriting style, add artwork, 
 stickers, doodles, and other details, then send it to someone you care about — or even someone you've never met.
          </p>

          <p>
           Once you're happy with your creation, we turn your digital design into real mail and send it into the physical world.

But Art Mail Club is more than just sending letters. It is a creative community built around meaningful connections.
 Members can join the Mail Club and receive something special each month, from handmade postcards and art prints to mini zines,
  sticker packs, poems, and themed surprises.
 You can also discover artists, take part in monthly creative challenges, exchange mail through pen-pal experiences,
 and share beautiful letters with the community when you choose.
          </p>

          <p>
            And then there are the experiences that make every piece of mail feel like a little adventure — Secret Mail, where members are randomly paired; Surprise Artist, 
            featuring limited artwork from independent artists; Time Capsule Letters, delivered months or even years into the future; and Mystery Mail, 
            where you choose a theme without knowing exactly what will arrive.
At its heart, Art Mail Club isn't about followers, likes, or algorithms.
It's about making something with your hands, sending it somewhere meaningful, and giving someone a reason to slow down.
          </p>
        </div>
       <button
  className={`scroll-indicator ${hasScrolled ? "hidden" : ""}`}

  onClick={() => {
    document
      .getElementById("about-story")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
  aria-label="Scroll down"
>
  <span>↓</span>
</button>

      </main>
<Footer variant="about" />
    </>
  );
}

export default About;
