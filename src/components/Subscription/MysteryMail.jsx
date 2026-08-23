import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./MysteryMail.css";

const MYSTERY_MAIL_RULES = [
  "Each Mystery Mail comes from a different theme or creative prompt.",
  "The author of your letter may be different each time.",
  "You won't choose exactly what arrives — the surprise is part of the experience.",
  "Every letter should be kind, respectful, and made with genuine effort.",
  "Please do not include private or sensitive information in your correspondence.",
  "Mystery Mail is about discovering something unexpected, so keep an open mind.",
];

const MYSTERY_MAIL_THEMES = [
  {
    id: "cottagecore",
    title: "Cottagecore",
    description:
      "Warm kitchens, wildflowers, old books, gardens, handmade things, and the feeling of a slower life.",
    accent: "sage",
  },
  {
    id: "vintage",
    title: "Vintage",
    description:
      "Old photographs, forgotten stories, handwritten notes, retro treasures, and little pieces of another time.",
    accent: "sepia",
  },
  {
    id: "dark-academia",
    title: "Dark Academia",
    description:
      "Libraries, rainy afternoons, philosophy, poetry, mysterious stories, and quiet intellectual adventures.",
    accent: "ink",
  },
  {
    id: "nature",
    title: "Nature",
    description:
      "Forests, oceans, mountains, flowers, animals, walks, and all the small wonders hiding outdoors.",
    accent: "forest",
  },
  {
    id: "fantasy",
    title: "Fantasy",
    description:
      "Magical places, strange creatures, imaginary worlds, adventures, and stories that don't need to be real.",
    accent: "violet",
  },
  {
    id: "surprise",
    title: "Completely Unexpected",
    description:
      "No hints. No predictions. Just open the envelope and discover what someone decided to send you.",
    accent: "gold",
  },
];

const MYSTERY_MAIL_EXAMPLES = [
  {
    id: "mail-1",
    theme: "Cottagecore",
    title: "A letter from a quiet garden",
    description:
      "A soft little piece of correspondence inspired by gardens, handmade things, and slow mornings.",
    accent: "sage",
  },
  {
    id: "mail-2",
    theme: "Vintage",
    title: "Something from another time",
    description:
      "A nostalgic letter filled with old memories, stories, and the feeling of discovering something forgotten.",
    accent: "sepia",
  },
  {
    id: "mail-3",
    theme: "Nature",
    title: "Postmarked from somewhere green",
    description:
      "A little escape into forests, flowers, walks, weather, and the world outside your window.",
    accent: "forest",
  },
  {
    id: "mail-4",
    theme: "Fantasy",
    title: "A story that may not be real",
    description:
      "A strange little adventure from an author who decided to let their imagination take over.",
    accent: "violet",
  },
  {
    id: "mail-5",
    theme: "Dark Academia",
    title: "Found between the pages",
    description:
      "A thoughtful piece of correspondence inspired by books, ideas, poetry, and rainy afternoons.",
    accent: "ink",
  },
  {
    id: "mail-6",
    theme: "Surprise",
    title: "You weren't supposed to know",
    description:
      "No clues, no expectations, no spoilers. Just an envelope waiting to be opened.",
    accent: "gold",
  },
];

export default function MysteryMail() {
  /* =========================================================
     JOIN MODAL
  ========================================================= */

  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [joinSubmitted, setJoinSubmitted] = useState(false);

  /* =========================================================
     JOIN FORM
  ========================================================= */

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [hasReadRules, setHasReadRules] = useState(false);
  const [message, setMessage] = useState("");

  /* =========================================================
     PAGE SCROLL LOCK
  ========================================================= */

  useEffect(() => {
    if (isJoinOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isJoinOpen]);

  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== "Escape") return;

      setIsJoinOpen(false);
      setJoinSubmitted(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* =========================================================
     OPEN JOIN
  ========================================================= */

  const handleOpenJoin = () => {
    setJoinSubmitted(false);
    setIsJoinOpen(true);
  };

  /* =========================================================
     CLOSE JOIN
  ========================================================= */

  const handleCloseJoin = () => {
    setIsJoinOpen(false);
    setJoinSubmitted(false);
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) return;
    if (!username.trim()) return;
    if (!hasReadRules) return;

    console.log({
      name,
      username,
      hasReadRules,
      message,
    });

    setJoinSubmitted(true);
  };

  return (
    <main className="mystery-mail-page mystery-mail-yellow-palette">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="mystery-mail-hero">
        
        <div className="mystery-mail-hero-inner">

          <p className="mystery-mail-eyebrow">
            Themed surprise correspondence
          </p>

          <h1 className="mystery-mail-heading">
            Mystery Mail
          </h1>

          <p className="mystery-mail-hero-description">
            You choose how much mystery you can handle.
            We take care of the rest.
          </p>

          <div className="mystery-mail-hero-line" />

          <p className="mystery-mail-hero-note">
            Every piece of mail comes from a different theme
            and a different author, so you never quite know
            what will be waiting inside your next envelope.
          </p>

        </div>
      </section>


      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="mystery-mail-introduction">

        <div className="mystery-mail-envelope-stage">

          <div className="mystery-mail-envelope">

            <span className="mystery-mail-envelope-flap" />

            <span className="mystery-mail-envelope-paper">
              ???
            </span>

            <span className="mystery-mail-envelope-stamp">
              MYSTERY
            </span>

          </div>

          <span className="mystery-mail-floating-note">
            OPEN ME
          </span>

        </div>

        <div className="mystery-mail-introduction-content">

          <p className="mystery-mail-eyebrow">
            How Mystery Mail works
          </p>

          <h2>
            One envelope.
            <br />
            A different world
            <br />
            every time.
          </h2>

          <p>
            Mystery Mail is a themed correspondence experience
            where every envelope brings something different.
          </p>

          <p>
            One month you might receive a letter inspired by
            nature. The next could take you into a vintage
            world, a fantasy story, a cozy cottage, or somewhere
            completely unexpected.
          </p>

          <p>
            And the author changes too. Every letter is another
            person's interpretation of the theme, which means
            no two pieces of Mystery Mail should feel exactly alike.
          </p>

        </div>
      </section>


      {/* =====================================================
          RULES
      ===================================================== */}

      <section className="mystery-mail-rules">

        <div className="mystery-mail-section-heading">

          <p className="mystery-mail-eyebrow">
            Before you join
          </p>

          <h2>
            A few things
            <br />
            to know.
          </h2>

          <p>
            Mystery Mail works because everyone agrees to embrace
            the unexpected and put a little care into what they send.
          </p>

        </div>

        <div className="mystery-mail-rule-list">

          {MYSTERY_MAIL_RULES.map((rule, index) => (
            <article
              key={rule}
              className="mystery-mail-rule"
            >
              <span className="mystery-mail-rule-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p>{rule}</p>
            </article>
          ))}

        </div>

      </section>


      {/* =====================================================
          THEMES
      ===================================================== */}

      <section className="mystery-mail-themes">

        <div className="mystery-mail-section-heading">

          <p className="mystery-mail-eyebrow">
            A few worlds you might discover
          </p>

          <h2>
            Every theme brings
            <br />
            a different kind of mail.
          </h2>

          <p>
            These are examples of themes that can inspire
            Mystery Mail. The exact mix can change, so there
            is always room for something new.
          </p>

        </div>

        <div className="mystery-mail-theme-grid">

          {MYSTERY_MAIL_THEMES.map((theme) => (
            <article
              key={theme.id}
              className={`mystery-mail-theme-card mystery-mail-theme-${theme.accent}`}
            >

              <div className="mystery-mail-theme-visual">

                <span className="mystery-mail-theme-symbol">
                  {theme.id === "cottagecore" && "✿"}
                  {theme.id === "vintage" && "✉"}
                  {theme.id === "dark-academia" && "⌁"}
                  {theme.id === "nature" && "❧"}
                  {theme.id === "fantasy" && "✦"}
                  {theme.id === "surprise" && "?"}
                </span>

              </div>

              <div className="mystery-mail-theme-content">

                <span className="mystery-mail-theme-number">
                  THEME
                </span>

                <h3>{theme.title}</h3>

                <p>{theme.description}</p>

              </div>

            </article>
          ))}

        </div>

      </section>


      {/* =====================================================
          MAIL EXAMPLES
      ===================================================== */}

      <section className="mystery-mail-examples">

        <div className="mystery-mail-section-heading">

          <p className="mystery-mail-eyebrow">
            A peek inside
          </p>

          <h2>
            What might arrive
            <br />
            in your mailbox?
          </h2>

          <p>
            Just little glimpses of the kinds of letters
            that could become part of your Mystery Mail experience.
          </p>

        </div>

        <div className="mystery-mail-example-grid">

          {MYSTERY_MAIL_EXAMPLES.map((mail, index) => (
            <article
              key={mail.id}
              className={`mystery-mail-example-card mystery-mail-example-${mail.accent}`}
            >

              <div className="mystery-mail-example-paper">

                <span className="mystery-mail-example-stamp">
                  MAIL
                </span>

                <span className="mystery-mail-example-mark">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="mystery-mail-example-lines">
                  <span />
                  <span />
                  <span />
                </div>

              </div>

              <div className="mystery-mail-example-content">

                <span className="mystery-mail-example-theme">
                  {mail.theme}
                </span>

                <h3>{mail.title}</h3>

                <p>{mail.description}</p>

              </div>

            </article>
          ))}

        </div>

      </section>


      {/* =====================================================
          AUTHORS
      ===================================================== */}

      <section className="mystery-mail-authors">

        <div className="mystery-mail-authors-content">

          <p className="mystery-mail-eyebrow">
            Never the same voice twice
          </p>

          <h2>
            Different themes.
            <br />
            Different authors.
            <br />
            Different stories.
          </h2>

          <p>
            The person writing your letter changes too.
            Someone might send a carefully written story,
            while someone else might fill a page with thoughts,
            drawings, recommendations, or something wonderfully strange.
          </p>

          <p>
            You don't know who the author will be until
            the envelope arrives.
          </p>

        </div>

        <div className="mystery-mail-author-stack">

          <div className="mystery-mail-author-letter mystery-mail-author-letter-back">
            <span>HELLO</span>
          </div>

          <div className="mystery-mail-author-letter mystery-mail-author-letter-middle">
            <span>FOR YOU</span>
          </div>

          <div className="mystery-mail-author-letter mystery-mail-author-letter-front">
            <span>UNKNOWN</span>
          </div>

        </div>

      </section>


      {/* =====================================================
          JOIN
      ===================================================== */}

      <section className="mystery-mail-join">

        <div className="mystery-mail-join-letter">

          <span className="mystery-mail-letter-small">
            OPEN ONLY WHEN READY
          </span>

          <h2>
            Ready to see
            <br />
            what's inside?
          </h2>

          <p>
            Choose your preferred kind of mystery,
            agree to the rules, and we'll take it from there.
          </p>

          <button
            type="button"
            className="mystery-mail-join-cta"
            onClick={handleOpenJoin}
          >
            Join Mystery Mail
          </button>

        </div>

      </section>


      {/* =====================================================
          JOIN MODAL
          Rendered through a portal like Secret Mail.
      ===================================================== */}

      {isJoinOpen &&
        createPortal(
          <div
            className="mystery-mail-modal-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                handleCloseJoin();
              }
            }}
          >

            <div
              className="mystery-mail-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mystery-mail-modal-title"
              onMouseDown={(event) => {
                event.stopPropagation();
              }}
            >

              {/* CLOSE */}

              <button
                type="button"
                className="mystery-mail-modal-close"
                onClick={handleCloseJoin}
                aria-label="Close Mystery Mail form"
              >
                ×
              </button>


              {/* MARK */}

              <div className="mystery-mail-modal-mark">
                ✦
              </div>


              {/* =================================================
                  FORM
              ================================================= */}

              {!joinSubmitted ? (
                <>

                  <div className="mystery-mail-modal-heading">

                    <p className="mystery-mail-eyebrow">
                      A surprise is waiting
                    </p>

                    <h2 id="mystery-mail-modal-title">
                      Join Mystery Mail
                    </h2>

                    <p>
                      Tell us a little about yourself and
                      leave a note before sending your request.
                    </p>

                  </div>

                  <form
                    className="mystery-mail-form"
                    onSubmit={handleSubmit}
                  >

                    {/* NAME */}

                    <div className="mystery-mail-form-field">

                      <label htmlFor="mystery-mail-name">
                        Your name
                      </label>

                      <input
                        id="mystery-mail-name"
                        type="text"
                        value={name}
                        onChange={(event) =>
                          setName(event.target.value)
                        }
                        placeholder="What should we call you?"
                        autoComplete="name"
                        required
                      />

                    </div>


                    {/* USERNAME */}

                    <div className="mystery-mail-form-field">

                      <label htmlFor="mystery-mail-username">
                        Your username
                      </label>

                      <input
                        id="mystery-mail-username"
                        type="text"
                        value={username}
                        onChange={(event) =>
                          setUsername(event.target.value)
                        }
                        placeholder="@yourusername"
                        autoComplete="username"
                        required
                      />

                    </div>


                    {/* ARE YOU SURE */}

                    <label className="mystery-mail-rules-check">

                      <input
                        type="checkbox"
                        checked={hasReadRules}
                        onChange={(event) =>
                          setHasReadRules(
                            event.target.checked
                          )
                        }
                        required
                      />

                      <span>
                        Yes, I&apos;m sure I want to join
                        Mystery Mail and take part in the
                        experience.
                      </span>

                    </label>


                    {/* MESSAGE */}

                    <div className="mystery-mail-form-field">

                      <label htmlFor="mystery-mail-message">
                        One thing you wanna say
                      </label>

                      <textarea
                        id="mystery-mail-message"
                        value={message}
                        onChange={(event) =>
                          setMessage(event.target.value)
                        }
                        placeholder="Tell us anything you'd like us to know..."
                        rows="4"
                      />

                    </div>


                    {/* SEND */}

                    <button
                      type="submit"
                      className="mystery-mail-form-submit"
                      disabled={
                        !name.trim() ||
                        !username.trim() ||
                        !hasReadRules
                      }
                    >
                      Send My Request
                      <span>→</span>
                    </button>

                  </form>

                </>
              ) : (

                /* =================================================
                   SUCCESS MESSAGE — SAME AS SECRET MAIL
                ================================================= */

                <div className="mystery-mail-success">

                  <p className="mystery-mail-eyebrow">
                    Request received
                  </p>

                  <h2 id="mystery-mail-modal-title">
                    We&apos;ve got your request.
                  </h2>

                  <p>
                    We have got your request and would
                    contact you as soon as possible for
                    your mail!
                  </p>

                  <div className="mystery-mail-success-note">

                    <span>✦</span>

                    <p>
                      Keep an eye out.
                      <br />
                      Something mysterious may be
                      heading your way.
                    </p>

                  </div>

                  <button
                    type="button"
                    className="mystery-mail-form-submit"
                    onClick={handleCloseJoin}
                  >
                    Done
                    <span>✓</span>
                  </button>

                </div>
              )}

            </div>

          </div>,
          document.body
        )}

    </main>
  );
}
