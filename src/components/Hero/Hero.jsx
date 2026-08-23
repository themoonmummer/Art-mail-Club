import { useEffect, useRef } from "react";
import gsap from "gsap";

import "./Hero.css";
import WindowScene from "../WindowScene/WindowScene";
import Letter from "../WindowScene/Letter/Letter";

function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const homePage = hero.closest(".home-page");

    /*
    ==========================================
    ELEMENTS
    ==========================================
    */

    const letter = hero.querySelector(".hero-letter");
    const windowScene = hero.querySelector(".cinematic-window");
    const sceneArt = hero.querySelector(".scene-art");

    const heroBackground =
      hero.querySelector(".hero-background");

    const nightOverlay =
      hero.querySelector(".hero-night");

    const sunlight =
      hero.querySelector(".hero-sunlight");

    const sunRays =
      hero.querySelector(".hero-sun-rays");

    const sunWash =
      hero.querySelector(".hero-sun-wash");

    const glassDaylight =
      hero.querySelector(".glass-daylight");

    const glassSunGlow =
      hero.querySelector(".glass-sun-glow");

    const heroCopy =
      hero.querySelector(".hero-copy");

    const navbar =
      document.querySelector(".home-page .navbar") ||
      document.querySelector(".home-page .home-navbar") ||
      document.querySelector(".navbar");

    if (!letter || !windowScene) {
      return;
    }

    /*
    ==========================================
    SESSION STORAGE
    ==========================================
    */

    const INTRO_KEY =
      "art-mail-club-hero-intro";

    const introAlreadyPlayed =
      sessionStorage.getItem(INTRO_KEY) === "true";

    /*
    ==========================================
    GET LETTER POSITION
    ==========================================
    */

    const getLetterTarget = () => {
      const scene =
        hero.querySelector(".hero-scene");

      const glass =
        hero.querySelector(".window-glass");

      if (!scene || !glass) {
        return {
          x: 0,
          y: 0,
        };
      }

      const sceneRect =
        scene.getBoundingClientRect();

      const glassRect =
        glass.getBoundingClientRect();

      return {
        x:
          glassRect.left -
          sceneRect.left +
          glassRect.width * 0.62,

        y:
          glassRect.top -
          sceneRect.top +
          glassRect.height * 0.30,
      };
    };

    /*
    ==========================================
    SET LETTER FINAL POSITION
    ==========================================
    */

    const setLetterFinalPosition = () => {
      const target =
        getLetterTarget();

      gsap.set(letter, {
        opacity: 1,

        x: target.x,
        y: target.y,

        rotation: -1,

        rotationX: 0,
        rotationY: 0,

        scale: 0.81,

        transformOrigin:
          "50% 50%",
      });
    };

    /*
    ==========================================
    SET COMPLETE HERO STATE
    ==========================================
    */

    const setFinalState = () => {
      /*
      Background
      */

      gsap.set(heroBackground, {
        opacity: 1,
        scale: 1,
      });

      /*
      Night overlay
      */

      gsap.set(nightOverlay, {
        opacity: 0,
      });

      /*
      Global sunlight is finished.
      */

      gsap.set(
        [
          sunlight,
          sunRays,
          sunWash,
        ],
        {
          opacity: 0,
        }
      );

      /*
      Window
      */

      gsap.set(windowScene, {
        opacity: 1,
        y: 0,
        scale: 1,
      });

      /*
      Scene daylight
      */

      gsap.set(sceneArt, {
        filter:
          "brightness(1.08) saturate(1.04) sepia(.025)",
      });

      /*
      Glass
      */

      gsap.set(glassDaylight, {
        opacity: 1,
      });

      gsap.set(glassSunGlow, {
        opacity: 1,
      });

      /*
      Hero text
      */

      gsap.set(heroCopy, {
        opacity: 1,
        y: 0,
      });

      /*
      Navbar
      */

      if (navbar) {
        gsap.set(navbar, {
          opacity: 1,
          y: 0,
        });
      }

      /*
      IMPORTANT:
      Put the letter on the glass.
      */

      setLetterFinalPosition();

      /*
      Page state
      */

      if (homePage) {
        homePage.classList.remove(
          "intro-running"
        );

        homePage.classList.add(
          "intro-complete"
        );
      }
    };

    /*
    ==========================================
    ALREADY PLAYED
    ==========================================
    */

    if (introAlreadyPlayed) {
      /*
      Give React/browser one frame to finish
      laying out the window before measuring it.
      */

      requestAnimationFrame(() => {
        setFinalState();
      });

      /*
      Keep letter attached to glass when the
      window changes size.
      */

      const handleResize = () => {
        setLetterFinalPosition();
      };

      window.addEventListener(
        "resize",
        handleResize
      );

      return () => {
        window.removeEventListener(
          "resize",
          handleResize
        );
      };
    }

    /*
    ==========================================
    INITIAL STATE
    ==========================================
    */

    gsap.set(heroBackground, {
      opacity: 0,
      scale: 1.045,
    });

    gsap.set(nightOverlay, {
      opacity: 1,
    });

    gsap.set(
      [
        sunlight,
        sunRays,
        sunWash,
      ],
      {
        opacity: 0,
      }
    );

    gsap.set(windowScene, {
      opacity: 0,
      y: 45,
      scale: 0.96,
    });

    gsap.set(sceneArt, {
      filter:
        "brightness(.22) saturate(.56) hue-rotate(2deg)",
    });

    gsap.set(glassDaylight, {
      opacity: 0,
    });

    gsap.set(glassSunGlow, {
      opacity: 0,
    });

    gsap.set(heroCopy, {
      opacity: 0,
      y: 22,
    });

    if (navbar) {
      gsap.set(navbar, {
        opacity: 0,
        y: -20,
      });
    }

    /*
    ==========================================
    LETTER START
    ==========================================
    */

    gsap.set(letter, {
      opacity: 0,

      x: -250,
      y: -125,

      rotation: -20,

      rotationX: -4,
      rotationY: 8,

      scale: 0.86,

      transformOrigin:
        "50% 50%",
    });

    /*
    ==========================================
    MASTER TIMELINE
    ==========================================
    */

    const tl = gsap.timeline({
      defaults: {
        overwrite: "auto",
      },

      onComplete: () => {
        /*
        Save ONLY when the entire intro
        has completed.
        */

        sessionStorage.setItem(
          INTRO_KEY,
          "true"
        );

        if (homePage) {
          homePage.classList.remove(
            "intro-running"
          );

          homePage.classList.add(
            "intro-complete"
          );
        }
      },
    });

    /*
    ==========================================
    01 — BLUE STILLNESS
    ==========================================
    */

    tl.to({}, {
      duration: 0.35,
    });

    /*
    ==========================================
    02 — LETTER ENTERS
    ==========================================
    */

    tl.to(letter, {
      opacity: 1,

      duration: 0.7,

      ease:
        "power2.out",
    });

    /*
    ==========================================
    03 — LETTER FLIES LIKE A LEAF
    ==========================================
    */

    tl.to(letter, {
      x: -185,
      y: -82,

      rotation: -4,

      rotationX: 4,
      rotationY: -5,

      duration: 0.72,

      ease:
        "sine.inOut",
    });

    tl.to(letter, {
      x: -95,
      y: -118,

      rotation: 14,

      rotationX: -5,
      rotationY: 6,

      duration: 0.78,

      ease:
        "sine.inOut",
    });

    tl.to(letter, {
      x: 5,
      y: -78,

      rotation: -10,

      rotationX: 5,
      rotationY: -7,

      duration: 0.82,

      ease:
        "sine.inOut",
    });

    tl.to(letter, {
      x: 118,
      y: -35,

      rotation: 9,

      rotationX: -4,
      rotationY: 5,

      duration: 0.88,

      ease:
        "sine.inOut",
    });

    /*
    ==========================================
    04 — WINDOW EMERGES
    ==========================================
    */

    tl.to(
      windowScene,
      {
        opacity: 1,

        y: 0,
        scale: 1,

        duration: 1.15,

        ease:
          "power3.out",
      },
      "-=.5"
    );

    /*
    ==========================================
    05 — LETTER APPROACHES WINDOW
    ==========================================
    */

    const target =
      getLetterTarget();

    tl.to(letter, {
      x:
        target.x - 105,

      y:
        target.y - 88,

      rotation: -8,

      rotationX: 3,
      rotationY: -4,

      scale: 0.84,

      duration: 0.9,

      ease:
        "power2.inOut",
    });

    /*
    ==========================================
    06 — FINAL FLOAT
    ==========================================
    */

    tl.to(letter, {
      x:
        target.x - 38,

      y:
        target.y - 28,

      rotation: 5,

      rotationX: -3,
      rotationY: 3,

      scale: 0.82,

      duration: 0.62,

      ease:
        "sine.inOut",
    });

    /*
    ==========================================
    07 — TOUCH GLASS
    ==========================================
    */

    tl.to(letter, {
      x: target.x,
      y: target.y,

      rotation: -1.5,

      rotationX: 0,
      rotationY: 0,

      scale: 0.81,

      duration: 0.4,

      ease:
        "power3.out",
    });

    /*
    ==========================================
    08 — PAPER SETTLE
    ==========================================
    */

    tl.to(letter, {
      x:
        target.x - 3,

      y:
        target.y + 4,

      rotation: -2.4,

      duration: 0.14,

      ease:
        "power1.out",
    });

    tl.to(letter, {
      x: target.x,
      y: target.y,

      rotation: -1,

      duration: 0.17,

      ease:
        "power1.inOut",
    });

    /*
    ==========================================
    09 — PAUSE
    ==========================================
    */

    tl.to({}, {
      duration: 0.3,
    });

    /*
    ==========================================
    10 — SUNLIGHT
    ==========================================
    */

    tl.to(
      sunlight,
      {
        opacity: 1,

        duration: 1.8,

        ease:
          "power2.out",
      },
      "+=.15"
    );

    tl.to(
      sunRays,
      {
        opacity: 1,

        duration: 2.1,

        ease:
          "power2.out",
      },
      "<"
    );

    tl.to(
      sunWash,
      {
        opacity: 1,

        duration: 2.4,

        ease:
          "power2.inOut",
      },
      "<"
    );

    /*
    ==========================================
    11 — BACKGROUND REVEAL
    ==========================================
    */

    tl.to(
      heroBackground,
      {
        opacity: 1,

        scale: 1,

        duration: 2.7,

        ease:
          "power2.inOut",
      },
      "<"
    );

    /*
    ==========================================
    12 — NIGHT FADES
    ==========================================
    */

    tl.to(
      nightOverlay,
      {
        opacity: 0,

        duration: 2.7,

        ease:
          "power2.inOut",
      },
      "<"
    );

    /*
    ==========================================
    13 — WINDOW SCENE LIGHTS UP
    ==========================================
    */

    tl.to(
      sceneArt,
      {
        filter:
          "brightness(1.08) saturate(1.04) sepia(.025)",

        duration: 2.7,

        ease:
          "power2.inOut",
      },
      "<"
    );

    /*
    ==========================================
    14 — GLASS LIGHT
    ==========================================
    */

    tl.to(
      glassDaylight,
      {
        opacity: 1,

        duration: 2.4,

        ease:
          "power2.inOut",
      },
      "<"
    );

    tl.to(
      glassSunGlow,
      {
        opacity: 1,

        duration: 2.4,

        ease:
          "power2.out",
      },
      "<"
    );

    /*
    ==========================================
    15 — SUN RAYS SETTLE
    ==========================================
    */

    tl.to(
      sunRays,
      {
        opacity: 0.62,

        duration: 1.2,

        ease:
          "sine.inOut",
      }
    );

    tl.to(
      sunRays,
      {
        opacity: 0.38,

        duration: 1.5,

        ease:
          "sine.inOut",
      }
    );

    /*
    ==========================================
    16 — HERO COPY
    ==========================================
    */

    tl.to(
      heroCopy,
      {
        opacity: 1,

        y: 0,

        duration: 0.9,

        ease:
          "power3.out",
      },
      "-=.8"
    );

    /*
    ==========================================
    17 — NAVBAR
    ==========================================
    */

    if (navbar) {
      tl.to(
        navbar,
        {
          opacity: 1,

          y: 0,

          duration: 0.9,

          ease:
            "power3.out",
        },
        "-=.7"
      );
    }

    /*
    ==========================================
    CLEANUP
    ==========================================
    */

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="hero"
    >
      {/* DAY BACKGROUND */}

      <div className="hero-background" />

      {/* NIGHT BLUE */}

      <div className="hero-night" />

      {/* UPPER-RIGHT SUNLIGHT */}

      <div className="hero-sunlight" />

      <div className="hero-sun-rays" />

      <div className="hero-sun-wash" />

      {/* MAIN SCENE */}

      <div className="hero-scene">

        {/* HERO CONTENT */}

        <div className="hero-content">

          <div className="hero-copy">

            <p className="hero-tagline">
              A Cozy Place for Handmade Connections
            </p>

            <h1>
              Art Mail Club
            </h1>

            <p className="hero-description">
              Every handwritten letter carries warmth,
              stories, and a little piece of someone's heart.
              Slow down, create, and exchange something meaningful.
            </p>

            {/* ==========================================
                JOIN THE CLUB → SUBSCRIPTION PAGE
            ========================================== */}

            <button
              type="button"
              className="hero-button"
              onClick={() => {
                window.location.href = "/subscription";
              }}
            >
              Join the Club
            </button>

          </div>

        </div>

        {/* WINDOW */}

        <div className="hero-room">
          <WindowScene />
        </div>

        {/* FLYING LETTER */}

        <Letter />

      </div>
    </section>
  );
}

export default Hero;
