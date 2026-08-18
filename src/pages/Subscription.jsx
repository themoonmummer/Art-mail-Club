import { useState } from "react";

import "../components/Subscription/Subscription.css";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";


/* ==================================================
   CONTENT
   ==================================================
   CHANGE CARD CONTENT HERE
================================================== */

const experiences = [

  /* ==================================================
     CARD 01 — MAIL CLUB
  ================================================== */

  {
    id: "club",

    icon: "✉",

    title: "Mail Club",

    shortTitle: "Mail Club",

    eyebrow: "THE MONTHLY CLUB",

    heading:
      "Something special arrives every month.",

    description:
      "Become part of a slow, thoughtful exchange where every month brings a new little collection of creativity, stories, and surprises to your mailbox.",

    items: [
      "Letter from another member",
      "Handmade postcard",
      "Mini zine",
      "Art print",
      "Sticker pack",
      "Prompt cards",
      "Tiny poem",
      "Collectible stamp",
    ],

    themeTitle:
      "Each month has a theme.",

    themes: [
      "Rain",
      "Nostalgia",
      "Space",
      "Dreams",
      "Tea",
      "Forest",
      "Childhood",
    ],

    note:
      "Collect them, keep them, trade them, or let them become part of your own creative archive.",
  },


  /* ==================================================
     CARD 02 — SECRET MAIL
  ================================================== */

  {
    id: "secret",

    icon: "✉",

    title: "Secret Mail",

    shortTitle: "Secret Mail",

    eyebrow: "A LITTLE MYSTERY",

    heading:
      "Someone out there is waiting to write to you.",

    description:
      "A random member is paired with another random member for a secret exchange. You won't know who your letter is coming from until it arrives.",

    items: [
      "Random member matching",
      "Anonymous exchange",
      "Handwritten letters",
      "A little mystery",
      "New creative connections",
    ],

    themeTitle:
      "You never know who you'll get.",

    themes: [
      "A stranger",
      "A dreamer",
      "An artist",
      "A writer",
      "A fellow collector",
    ],

    note:
      "Sometimes the most meaningful connections begin with a name you've never heard before.",
  },


  /* ==================================================
     CARD 03 — TIME CAPSULE
  ================================================== */

  {
    id: "capsule",

    icon: "💌",

    title: "Time Capsule Letters",

    shortTitle: "Time Capsule",

    eyebrow: "WRITE TO THE FUTURE",

    heading:
      "Write something today. Let your future self find it later.",

    description:
      "Some letters aren't meant to be opened immediately. Write a message to your future self, someone you love, or a moment that hasn't happened yet.",

    items: [
      "Write your letter today",
      "Choose when it arrives",
      "6 months later",
      "1 year later",
      "5 years later",
    ],

    themeTitle:
      "Choose your moment.",

    themes: [
      "6 Months",
      "1 Year",
      "5 Years",
    ],

    note:
      "Because sometimes the person who needs your words most is the person you haven't become yet.",
  },


  /* ==================================================
     CARD 04 — MYSTERY MAIL
  ================================================== */

  {
    id: "mystery",

    icon: "🎁",

    title: "Mystery Mail",

    shortTitle: "Mystery Mail",

    eyebrow: "A SURPRISE IN THE MAIL",

    heading:
      "Choose a world. Leave the surprise to us.",

    description:
      "Pick a theme and let the mystery unfold. You know the feeling you'll receive, but never exactly what will be inside your envelope.",

    items: [
      "Choose a theme",
      "Cottagecore",
      "Vintage",
      "Dark Academia",
      "Anime",
      "Nature",
      "Fantasy",
    ],

    themeTitle:
      "Pick your world.",

    themes: [
      "Cottagecore",
      "Vintage",
      "Dark Academia",
      "Anime",
      "Nature",
      "Fantasy",
    ],

    note:
      "The sender doesn't know exactly what they'll receive. That's what makes opening it part of the experience.",
  },

];


/* ==================================================
   COMPONENT
================================================== */

function Subscription() {

  const [activeIndex, setActiveIndex] = useState(0);


  /* ==================================================
     CARD MOVEMENT
     ==================================================
     USER CONTROLS THE CAROUSEL.
     THERE IS NO AUTO-SLIDE.
  ================================================== */

  const moveNext = () => {

    setActiveIndex(
      (current) =>
        (current + 1) % experiences.length
    );

  };


  const movePrevious = () => {

    setActiveIndex(
      (current) =>
        (current - 1 + experiences.length) %
        experiences.length
    );

  };


  /* ==================================================
     CARD SELECTION
  ================================================== */

  const selectCard = (index) => {

    setActiveIndex(index);

  };


  /* ==================================================
     GET CARD POSITION
     ==================================================
     This keeps the four cards in an infinite loop.

     Example:

     [4] [1] [2] [3] [4] [1]

     When 4 becomes active, 1 can still appear
     naturally beside it.
  ================================================== */

  const getCardPosition = (index) => {

    const total = experiences.length;

    let difference =
      index - activeIndex;


    /*
     * Wrap around the shortest direction.
     */

    if (difference > total / 2) {

      difference -= total;

    }


    if (difference < -total / 2) {

      difference += total;

    }


    return difference;

  };


  /* ==================================================
     ACTIVE CONTENT
  ================================================== */

  const activeExperience =
    experiences[activeIndex];


  return (
    <>

      {/* ==================================================
          NAVBAR
      ================================================== */}

      <Navbar variant="subscription" />


      <main className="subscription">


        {/* ==================================================
            INTRO CONTENT
        ================================================== */}

        <section className="subscription-intro">

          <p className="subscription-eyebrow">
            ART MAIL CLUB
          </p>

          <h1>
            Choose your kind
            <br />
            of mail.
          </h1>

          <p className="subscription-intro-text">
            Not everything has to arrive instantly.
            Sometimes the best things are the ones
            you wait for.
          </p>

        </section>


        {/* ==================================================
            CARD CAROUSEL
        ================================================== */}

        <section className="mail-carousel">


          {/* ==================================================
              LEFT ARROW
          ================================================== */}

          <button
            type="button"
            className="carousel-arrow carousel-arrow-left"
            onClick={movePrevious}
            aria-label="Previous mail experience"
          >
            ←
          </button>


          {/* ==================================================
              CARDS
          ================================================== */}

          <div className="mail-cards">

            {experiences.map(
              (experience, index) => {

                const position =
                  getCardPosition(index);

                const isActive =
                  position === 0;


                /*
                 * Determine visual position.
                 */

                let positionClass =
                  "far";


                if (position === 0) {

                  positionClass = "active";

                } else if (position === -1) {

                  positionClass = "previous";

                } else if (position === 1) {

                  positionClass = "next";

                }


                return (

                  <button
                    type="button"
                    key={experience.id}
                    className={`mail-card ${positionClass}`}
                    onClick={() =>
                      selectCard(index)
                    }
                    aria-label={`Choose ${experience.title}`}
                  >


                    {/* ==================================================
                        CARD ICON
                    ================================================== */}

                    <span className="mail-card-icon">
                      {experience.icon}
                    </span>


                    {/* ==================================================
                        CARD NUMBER
                    ================================================== */}

                    <span className="mail-card-number">
                      0{index + 1}
                    </span>


                    {/* ==================================================
                        CARD TITLE
                    ================================================== */}

                    <span className="mail-card-title">
                      {experience.title}
                    </span>


                    {/* ==================================================
                        SELECTED LABEL
                    ================================================== */}

                    {isActive && (

                      <span className="mail-card-selected">
                        Selected
                      </span>

                    )}

                  </button>

                );

              }
            )}

          </div>


          {/* ==================================================
              RIGHT ARROW
          ================================================== */}

          <button
            type="button"
            className="carousel-arrow carousel-arrow-right"
            onClick={moveNext}
            aria-label="Next mail experience"
          >
            →
          </button>

        </section>


        {/* ==================================================
            CAROUSEL DOTS
        ================================================== */}

        <div className="carousel-dots">

          {experiences.map(
            (experience, index) => (

              <button
                type="button"
                key={experience.id}
                className={
                  index === activeIndex
                    ? "carousel-dot active"
                    : "carousel-dot"
                }
                onClick={() =>
                  selectCard(index)
                }
                aria-label={`Show ${experience.title}`}
              />

            )
          )}

        </div>


        {/* ==================================================
            SELECTED CARD CONTENT
            ================================================== */}

        <section
          className="subscription-detail"
          key={activeExperience.id}
        >

          <div className="subscription-detail-inner">


            {/* ==================================================
                CONTENT — EYEBROW
            ================================================== */}

            <p className="detail-eyebrow">
              {activeExperience.eyebrow}
            </p>


            {/* ==================================================
                CONTENT — HEADING
            ================================================== */}

            <h2>
              {activeExperience.heading}
            </h2>


            {/* ==================================================
                CONTENT — DESCRIPTION
            ================================================== */}

            <p className="detail-description">
              {activeExperience.description}
            </p>


            {/* ==================================================
                CONTENT — ITEMS
            ================================================== */}

            <div className="detail-items">

              {activeExperience.items.map(
                (item, index) => (

                  <div
                    className="detail-item"
                    key={item}
                  >

                    <span className="detail-item-number">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <span>
                      {item}
                    </span>

                  </div>

                )
              )}

            </div>


            {/* ==================================================
                CONTENT — THEMES
            ================================================== */}

            <div className="detail-themes">

              <h3>
                {activeExperience.themeTitle}
              </h3>

              <div className="theme-list">

                {activeExperience.themes.map(
                  (theme) => (

                    <span
                      className="theme-pill"
                      key={theme}
                    >
                      {theme}
                    </span>

                  )
                )}

              </div>

            </div>


            {/* ==================================================
                CONTENT — NOTE
            ================================================== */}

            <p className="detail-note">
              {activeExperience.note}
            </p>


            {/* ==================================================
                CONTENT — BUTTON
            ================================================== */}

            <button
              type="button"
              className="join-button"
            >
              Explore{" "}
              {activeExperience.shortTitle}

              <span>
                →
              </span>

            </button>

          </div>

        </section>


        {/* ==================================================
            ENDING
        ================================================== */}

        <section className="subscription-ending">

          <p>
            Slow mail.
            <span>
              {" "}Meaningful moments.
            </span>
          </p>

        </section>


      </main>


      {/* ==================================================
          FOOTER
      ================================================== */}

      <Footer variant="subscription" />

    </>
  );

}


export default Subscription;
