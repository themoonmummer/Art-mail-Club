import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import ThirdRoom from "../components/Gallery/ThirdRoom";
import EntranceRoom from "../components/Gallery/EntranceRoom";
import LettersRoom from "../components/Gallery/LettersRoom";
import FourthRoom from "../components/Gallery/FourthRoom";

import "../components/Gallery/Gallery.css";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Gallery() {
  const pinRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const pin = pinRef.current;

    if (!track || !pin) return;

    const ctx = gsap.context(() => {
      const setupGallery = () => {
        /*
         * Every room is exactly one viewport wide.
         * This is important for tablet/mobile.
         */

        const roomWidth = window.innerWidth;

        const totalWidth = roomWidth * 4;

        /*
         * Force the track to have the correct width.
         * This prevents flex items from shrinking/gathering.
         */

        gsap.set(track, {
          width: totalWidth,
          x: 0,
        });

        /*
         * Every room occupies exactly one viewport.
         */

        gsap.set(track.children, {
          width: roomWidth,
          minWidth: roomWidth,
          flexShrink: 0,
        });

        /*
         * Kill old ScrollTriggers before rebuilding.
         */

        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === pin) {
            trigger.kill();
          }
        });

        /*
         * Horizontal gallery.
         */

        gsap.to(track, {
          x: () => -(roomWidth * 3),

          ease: "none",

          scrollTrigger: {
            trigger: pin,

            start: "top top",

            end: () => `+=${roomWidth * 3}`,

            pin: true,

            scrub: 1,

            invalidateOnRefresh: true,
          },
        });

        ScrollTrigger.refresh();
      };

      setupGallery();

      /*
       * Recalculate when tablet/phone changes size.
       */

      let resizeTimer;

      const handleResize = () => {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
          setupGallery();
        }, 150);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", handleResize);
      };
    }, pinRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <Navbar variant="gallery" />

      <main className="gallery-page">
        <div
          ref={pinRef}
          className="gallery-pin"
        >
          <section
            ref={trackRef}
            className="gallery-track"
          >
            <section className="gallery-section entrance">
              <EntranceRoom />
            </section>

            <section className="gallery-section letters">
              <LettersRoom />
            </section>

            <section className="gallery-section third-room">
              <ThirdRoom />
            </section>

            <section className="gallery-section fourth-room-section">
              <FourthRoom />
            </section>
          </section>
        </div>
      </main>

      <Footer variant="gallery" />
    </>
  );
}

export default Gallery;
