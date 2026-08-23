import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./SecretMail.css";

const SECRET_MAIL_CONDITIONS = [
  "You must be comfortable exchanging letters with another member.",
  "Keep your correspondence kind, respectful, and appropriate.",
  "Your letter should be written specifically for the person receiving it.",
  "You do not need to reveal your real identity to your pen pal.",
  "Please do not share private information such as your address, phone number, or other sensitive details.",
  "Once you join an exchange, please make an effort to send your letter.",
];

const SECRET_MAIL_THEMES = [
  {
    id: "anything",
    title: "Anything Goes",
    description:
      "Write about whatever is on your mind. Stories, thoughts, questions, little moments — anything goes.",
  },
  {
    id: "nostalgia",
    title: "Nostalgia",
    description:
      "Memories, childhood stories, old songs, forgotten places, and things you still remember.",
  },
  {
    id: "dreams",
    title: "Dreams",
    description:
      "The things you dream about, hope for, imagine, or wish could exist.",
  },
  {
    id: "creative",
    title: "Creative",
    description:
      "Poems, drawings, tiny stories, prompts, strange ideas, or anything made from imagination.",
  },
  {
    id: "slow-life",
    title: "Slow Life",
    description:
      "Tea, books, rainy afternoons, walks, quiet hobbies, and the little things that make life softer.",
  },
  {
    id: "surprise",
    title: "Surprise Me",
    description:
      "Leave the theme open and let your pen pal decide where the conversation goes.",
  },
];

const SECRET_MAIL_FAQ = [
  {
    question: "How does Secret Mail work?",
    answer:
      "Secret Mail pairs you with another member for an anonymous letter exchange. You choose a preferred theme, write your letter, and another member sends one back to you.",
  },
  {
    question: "Will I know who my pen pal is?",
    answer:
      "Not necessarily. The mystery is part of the experience. You can choose how much personal information you are comfortable sharing, and you never need to reveal your real identity.",
  },
  {
    question: "Do I have to share my address?",
    answer:
      "You should never share private information directly with another member. Any future mailing or matching system should handle delivery details separately and securely.",
  },
  {
    question: "Can I choose what my letter is about?",
    answer:
      "Yes. You can select from several themes such as Nostalgia, Dreams, Creative, Slow Life, or Surprise Me. The theme simply gives the correspondence a little direction.",
  },
  {
    question: "What if I don't know what to write?",
    answer:
      "You don't need to write something perfect. A small story, a question, a recommendation, a memory, a drawing, or an observation from your day can be enough to start a lovely exchange.",
  },
  {
    question: "What should I avoid putting in my letter?",
    answer:
      "Avoid private or sensitive information, including addresses, phone numbers, passwords, financial details, or anything you would not want another person to know.",
  },
];

export default function SecretMail() {
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
  const [selectedTheme, setSelectedTheme] = useState("anything");
  const [isReady, setIsReady] = useState(false);
  const [message, setMessage] = useState("");

  /* =========================================================
     LOCK PAGE SCROLL WHEN MODAL IS OPEN
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
     OPEN JOIN FORM
  ========================================================= */

  const handleOpenJoin = () => {
    setJoinSubmitted(false);
    setIsJoinOpen(true);
  };

  /* =========================================================
     CLOSE JOIN FORM
  ========================================================= */

  const handleCloseJoin = () => {
    setIsJoinOpen(false);
    setJoinSubmitted(false);
  };

  /* =========================================================
     SUBMIT JOIN REQUEST
  ========================================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) return;
    if (!username.trim()) return;
    if (!isReady) return;

    console.log({
      name,
      username,
      theme: selectedTheme,
      isReady,
      message,
    });

    setJoinSubmitted(true);
  };

  return (
    <main className="secret-mail-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="secret-mail-hero">
        <div className="secret-mail-hero-orbit" />

        <div className="secret-mail-hero-content">
          <span className="secret-mail-hero-mark">✦</span>

          <p className="secret-mail-eyebrow">
            Anonymous correspondence
          </p>

          <h1 className="secret-mail-heading">
            Secret Mail
          </h1>

          <p className="secret-mail-intro">
            Send a letter to someone you don't know.
            Receive one from someone you haven't met.
            No names, no expectations — just a little
            mystery waiting in the mailbox.
          </p>

          <div className="secret-mail-hero-line">
            <span />
            <small>KEEP THE SENDER A SECRET</small>
            <span />
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="secret-mail-introduction">
        <div className="secret-mail-introduction-card">
          <span className="secret-mail-card-stamp">
            CONFIDENTIAL
          </span>

          <div className="secret-mail-envelope-icon">
            <span />
          </div>

          <p className="secret-mail-card-caption">
            one envelope
          </p>
        </div>

        <div className="secret-mail-introduction-content">
          <p className="secret-mail-eyebrow">
            How Secret Mail works
          </p>

          <h2>
            A letter from
            <br />
            someone unknown.
          </h2>

          <p>
            Secret Mail connects you with another member
            of the club for a simple anonymous letter
            exchange.
          </p>

          <p>
            You choose a theme, write your letter, and send
            it through the club. Another member receives
            your words, while a letter from someone else
            eventually finds its way to you.
          </p>

          <p>
            You don't need to know who they are.
            That's part of the fun.
          </p>
        </div>
      </section>

      {/* =====================================================
          CONDITIONS
      ===================================================== */}

      <section className="secret-mail-conditions">
        <div className="secret-mail-section-heading">
          <p className="secret-mail-eyebrow">
            Before you join
          </p>

          <h2>
            A few little rules
            <br />
            for a good exchange.
          </h2>

          <p>
            Secret Mail works best when everyone treats
            the person on the other side of the envelope
            with the same care they'd like to receive.
          </p>
        </div>

        <div className="secret-mail-condition-list">
          {SECRET_MAIL_CONDITIONS.map(
            (condition, index) => (
              <article
                key={condition}
                className="secret-mail-condition"
              >
                <span className="secret-mail-condition-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p>{condition}</p>
              </article>
            )
          )}
        </div>
      </section>

      {/* =====================================================
          THEMES
      ===================================================== */}

      <section className="secret-mail-themes">
        <div className="secret-mail-section-heading">
          <p className="secret-mail-eyebrow">
            Choose your kind of correspondence
          </p>

          <h2>
            What would you like
            <br />
            to write about?
          </h2>

          <p>
            When you join, choose a theme you'd enjoy
            receiving and writing about. Your theme helps
            give the exchange a little direction.
          </p>
        </div>

        <div className="secret-mail-theme-grid">
          {SECRET_MAIL_THEMES.map((theme, index) => (
            <article
              key={theme.id}
              className="secret-mail-theme-card"
            >
              <div className="secret-mail-theme-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="secret-mail-theme-symbol">
                ✦
              </div>

              <div className="secret-mail-theme-content">
                <h3>{theme.title}</h3>

                <p>{theme.description}</p>
              </div>

              <span className="secret-mail-theme-arrow">
                ↗
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* =====================================================
          WHAT TO EXPECT
      ===================================================== */}

      <section className="secret-mail-expect">
        <div className="secret-mail-expect-paper">
          <span className="secret-mail-expect-label">
            PRIVATE NOTE
          </span>

          <p>
            "You never really know what kind of person
            is waiting on the other side of a letter."
          </p>

          <span className="secret-mail-expect-dash">
            — Secret Mail
          </span>
        </div>

        <div className="secret-mail-expect-content">
          <p className="secret-mail-eyebrow">
            What to expect
          </p>

          <h2>
            It's the mystery
            <br />
            that makes it special.
          </h2>

          <p>
            Your letter might be thoughtful, funny,
            nostalgic, creative, completely ordinary,
            or something you never expected.
          </p>

          <p>
            You won't know who wrote your letter until
            they decide to tell you — and you don't have
            to reveal anything about yourself either.
          </p>

          <p>
            It's simply two people putting a little piece
            of their world onto paper.
          </p>
        </div>
      </section>

      {/* =====================================================
          JOIN
      ===================================================== */}

      <section className="secret-mail-join">
        <div className="secret-mail-join-decoration">
          <span>✦</span>
          <span>✧</span>
          <span>✦</span>
        </div>

        <div className="secret-mail-join-letter">
          <p className="secret-mail-letter-small">
            CONFIDENTIAL CORRESPONDENCE
          </p>

          <h2>
            Ready to send
            <br />
            a little mystery?
          </h2>

          <p>
            If you've read the conditions and would like
            to take part, leave your name at the door.
          </p>

          <button
            type="button"
            className="secret-mail-join-cta"
            onClick={handleOpenJoin}
          >
            Join Secret Mail
            <span>→</span>
          </button>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}

      <section className="secret-mail-faq">
        <div className="secret-mail-section-heading">
          <p className="secret-mail-eyebrow">
            Questions
          </p>

          <h2>
            Before you send
            <br />
            your first letter.
          </h2>
        </div>

        <div className="secret-mail-faq-list">
          {SECRET_MAIL_FAQ.map((item, index) => (
            <details
              key={item.question}
              className="secret-mail-faq-item"
            >
              <summary>
                <span className="secret-mail-faq-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="secret-mail-faq-question">
                  {item.question}
                </span>

                <span
                  className="secret-mail-faq-icon"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>

              <div className="secret-mail-faq-answer">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* =====================================================
          JOIN MODAL
          IMPORTANT:
          Rendered through a React Portal directly into body.
      ===================================================== */}

      {isJoinOpen &&
        createPortal(
          <div
            className="secret-mail-modal-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                handleCloseJoin();
              }
            }}
          >
            <div
              className="secret-mail-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="secret-mail-modal-title"
              onMouseDown={(event) => {
                event.stopPropagation();
              }}
            >
              {/* CLOSE */}

              <button
                type="button"
                className="secret-mail-modal-close"
                onClick={handleCloseJoin}
                aria-label="Close Secret Mail form"
              >
                ×
              </button>

              {/* MARK */}

              <div className="secret-mail-modal-mark">
                ✦
              </div>

              {/* =================================================
                  FORM
              ================================================= */}

              {!joinSubmitted ? (
                <>
                  <div className="secret-mail-modal-heading">
                    <p className="secret-mail-eyebrow">
                      Secret correspondence
                    </p>

                    <h2 id="secret-mail-modal-title">
                      Join Secret Mail
                    </h2>

                    <p>
                      Tell us a little about yourself and
                      choose the kind of letter you'd like
                      to exchange.
                    </p>
                  </div>

                  <form
                    className="secret-mail-form"
                    onSubmit={handleSubmit}
                  >
                    {/* NAME */}

                    <div className="secret-mail-form-field">
                      <label htmlFor="secret-mail-name">
                        Your name
                      </label>

                      <input
                        id="secret-mail-name"
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

                    <div className="secret-mail-form-field">
                      <label htmlFor="secret-mail-username">
                        Your username
                      </label>

                      <input
                        id="secret-mail-username"
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

                    {/* THEME */}

                    <div className="secret-mail-form-field">
                      <label htmlFor="secret-mail-theme">
                        Your preferred theme
                      </label>

                      <select
                        id="secret-mail-theme"
                        value={selectedTheme}
                        onChange={(event) =>
                          setSelectedTheme(event.target.value)
                        }
                      >
                        {SECRET_MAIL_THEMES.map(
                          (theme) => (
                            <option
                              key={theme.id}
                              value={theme.id}
                            >
                              {theme.title}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    {/* READY TO JOIN */}

                    <label className="secret-mail-conditions-check">
                      <input
                        type="checkbox"
                        checked={isReady}
                        onChange={(event) =>
                          setIsReady(
                            event.target.checked
                          )
                        }
                        required
                      />

                      <span>
                        Yes, I&apos;m ready to join Secret Mail
                        and take part in a letter exchange.
                      </span>
                    </label>

                    {/* MESSAGE */}

                    <div className="secret-mail-form-field">
                      <label htmlFor="secret-mail-message">
                        One thing you wanna say
                      </label>

                      <textarea
                        id="secret-mail-message"
                        value={message}
                        onChange={(event) =>
                          setMessage(event.target.value)
                        }
                        placeholder="Tell us anything you'd like us to know..."
                        rows="4"
                      />
                    </div>

                    {/* JOIN BUTTON */}

                    <button
                      type="submit"
                      className="secret-mail-form-submit"
                      disabled={
                        !name.trim() ||
                        !username.trim() ||
                        !isReady
                      }
                    >
                      Join Secret Mail
                      <span>→</span>
                    </button>
                  </form>
                </>
              ) : (
                /* =================================================
                   SUCCESS MESSAGE
                ================================================= */

                <div className="secret-mail-success">
                  <p className="secret-mail-eyebrow">
                    Request received
                  </p>

                  <h2 id="secret-mail-modal-title">
                    We&apos;ve got your request.
                  </h2>

                  <p>
                    We have got your request and would
                    contact you as soon as possible for
                    your mail!
                  </p>

                  <div className="secret-mail-success-note">
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
                    className="secret-mail-form-submit"
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
