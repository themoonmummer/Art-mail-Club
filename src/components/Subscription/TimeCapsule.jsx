import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./TimeCapsule.css";

const TIME_CAPSULE_TIMELINES = [
  {
    id: "6-months",
    title: "6 Months",
  },
  {
    id: "1-year",
    title: "1 Year",
  },
  {
    id: "2-years",
    title: "2 Years",
  },
  {
    id: "5-years",
    title: "5 Years",
  },
  {
    id: "custom",
    title: "Choose a Date",
  },
];

export default function TimeCapsulePage() {
  /* =========================================================
     JOIN MODAL
  ========================================================= */

  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [joinSubmitted, setJoinSubmitted] = useState(false);

  /* =========================================================
     FORM
  ========================================================= */

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [selectedTimeline, setSelectedTimeline] =
    useState("1-year");
  const [customDate, setCustomDate] = useState("");
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
     TIMELINE CHANGE
  ========================================================= */

  const handleTimelineChange = (event) => {
    const timeline = event.target.value;

    setSelectedTimeline(timeline);

    // Don't keep an old custom date if the user
    // switches back to a preset timeline.
    if (timeline !== "custom") {
      setCustomDate("");
    }
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) return;
    if (!username.trim()) return;
    if (!email.trim()) return;
    if (!isReady) return;

    if (selectedTimeline === "custom" && !customDate) {
      return;
    }

    const selectedTimelineData =
      TIME_CAPSULE_TIMELINES.find(
        (timeline) => timeline.id === selectedTimeline
      );

    const capsuleData = {
      name: name.trim(),
      username: username.trim(),
      email: email.trim(),
      timeline: selectedTimeline,
      timelineTitle: selectedTimelineData?.title || "",
      deliveryDate:
        selectedTimeline === "custom"
          ? customDate
          : selectedTimeline,
      isReady,
      message: message.trim(),
    };

    console.log("Time Capsule submitted:", capsuleData);

    /*
      Add your backend/API submission here.

      The success state is intentionally shown only after
      the local submission validation passes.
    */

    setJoinSubmitted(true);
  };

  const selectedTimelineTitle =
    TIME_CAPSULE_TIMELINES.find(
      (timeline) => timeline.id === selectedTimeline
    )?.title || "";

  const isSubmitDisabled =
    !name.trim() ||
    !username.trim() ||
    !email.trim() ||
    !isReady ||
    (selectedTimeline === "custom" && !customDate);

  return (
    <main className="time-capsule-page">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="time-capsule-background"
        aria-hidden="true"
      >
        <span className="time-capsule-leaf leaf-one" />
        <span className="time-capsule-leaf leaf-two" />
        <span className="time-capsule-leaf leaf-three" />
        <span className="time-capsule-glow" />
        <span className="time-capsule-grain" />
      </div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="time-capsule-hero">
        <div className="time-capsule-hero-content">
          <p className="time-capsule-eyebrow">
            Delayed correspondence
          </p>

          <h1 className="time-capsule-heading">
            Time Capsule
            <span>Letters</span>
          </h1>

          <p className="time-capsule-intro">
            Write something today and choose the moment
            when it should find you again.
          </p>

          <p className="time-capsule-intro secondary">
            We keep your letter safe while time passes.
            When your chosen moment arrives, your words
            make their way back to you.
          </p>

          <div className="time-capsule-hero-mark">
            <span>01</span>
            <i />
            <span>∞</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="time-capsule-introduction">
        <div className="time-capsule-introduction-card">
          <div className="time-capsule-card-stamp">
            SAVED
          </div>

          <div className="time-capsule-paper-icon">
            <span />
            <span />
            <span />
          </div>

          <span className="time-capsule-card-date">
            FOR ANOTHER DAY
          </span>
        </div>

        <div className="time-capsule-introduction-content">
          <p className="time-capsule-eyebrow">
            How it works
          </p>

          <h2>
            Write it now.
            <br />
            Open it later.
          </h2>

          <p>
            Some things are easier to write when you
            aren't thinking about who you will be when
            you read them.
          </p>

          <p>
            Time Capsule Letters gives you a place to
            write those thoughts down and send them
            forward in time.
          </p>

          <p>
            Choose your delivery timeline, write your
            letter, and send it to us. We'll keep it
            until the moment you've chosen.
          </p>
        </div>
      </section>

      {/* =====================================================
          TIMELINE
      ===================================================== */}

      <section className="time-capsule-timeline">
        <div className="time-capsule-section-heading">
          <p className="time-capsule-eyebrow">
            Choose your distance
          </p>

          <h2>
            How far into the
            <br />
            future do you want to go?
          </h2>

          <p>
            There is no right amount of time. Choose the
            moment that feels meaningful to you.
          </p>
        </div>

        <div className="time-capsule-timeline-grid">
          {TIME_CAPSULE_TIMELINES.map(
            (timeline, index) => (
              <article
                key={timeline.id}
                className={`time-capsule-timeline-card ${
                  selectedTimeline === timeline.id
                    ? "is-selected"
                    : ""
                }`}
              >
                <div className="time-capsule-card-top">
                  <span className="time-capsule-timeline-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {selectedTimeline === timeline.id && (
                    <span className="time-capsule-selected-mark">
                      Selected
                    </span>
                  )}
                </div>

                <div className="time-capsule-timeline-icon">
                  <span />
                </div>

                <h3>{timeline.title}</h3>

                <p>
                  {timeline.id === "6-months" &&
                    "A little distance from today. Enough time for things to change, but not enough to forget."}

                  {timeline.id === "1-year" &&
                    "Write something today and meet it again one year from now."}

                  {timeline.id === "2-years" &&
                    "Give yourself two years of space before these words find their way back."}

                  {timeline.id === "5-years" &&
                    "A longer journey. Write to the person you'll become five years from now."}

                  {timeline.id === "custom" &&
                    "Have a particular moment in mind? Choose the date when your capsule should arrive."}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedTimeline(timeline.id)
                  }
                  aria-pressed={
                    selectedTimeline === timeline.id
                  }
                >
                  {selectedTimeline === timeline.id
                    ? "Selected"
                    : "Choose this"}
                </button>
              </article>
            )
          )}
        </div>
      </section>

      {/* =====================================================
          JOIN / CTA
      ===================================================== */}

      <section className="time-capsule-join">
        <div className="time-capsule-join-letter">
          <span className="time-capsule-letter-corner" />

          <p className="time-capsule-letter-small">
            FOR YOUR FUTURE SELF
          </p>

          <div className="time-capsule-letter-divider">
            <span />
            <span />
            <span />
          </div>

          <h2>
            Ready to send
            <br />
            something forward?
          </h2>

          <p>
            Choose your timeline, write your words,
            and let us take care of the waiting.
          </p>

          <button
            type="button"
            className="time-capsule-join-cta"
            onClick={handleOpenJoin}
          >
            Start a Time Capsule
          </button>
        </div>
      </section>

      {/* =====================================================
          TIME CAPSULE MODAL
          Rendered through a portal just like Secret Mail.
      ===================================================== */}

      {isJoinOpen &&
        createPortal(
          <div
            className="time-capsule-modal-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                handleCloseJoin();
              }
            }}
          >
            <div
              className="time-capsule-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="time-capsule-modal-title"
              onMouseDown={(event) => {
                event.stopPropagation();
              }}
            >
              {/* CLOSE */}

              <button
                type="button"
                className="time-capsule-modal-close"
                onClick={handleCloseJoin}
                aria-label="Close Time Capsule form"
              >
                ×
              </button>

              {/* MARK */}

              <div className="time-capsule-modal-mark">
                ∞
              </div>

              {!joinSubmitted ? (
                <>
                  {/* =================================================
                      FORM HEADING
                  ================================================= */}

                  <div className="time-capsule-modal-heading">
                    <p className="time-capsule-eyebrow">
                      A letter for another day
                    </p>

                    <h2 id="time-capsule-modal-title">
                      Start Your Time Capsule
                    </h2>

                    <p>
                      Tell us a little about yourself,
                      where your letter should go, and
                      when you would like to receive it.
                    </p>
                  </div>

                  {/* =================================================
                      FORM
                  ================================================= */}

                  <form
                    className="time-capsule-form"
                    onSubmit={handleSubmit}
                  >
                    {/* NAME */}

                    <div className="time-capsule-form-field">
                      <label htmlFor="time-capsule-name">
                        Your name
                      </label>

                      <input
                        id="time-capsule-name"
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

                    <div className="time-capsule-form-field">
                      <label htmlFor="time-capsule-username">
                        Your username
                      </label>

                      <input
                        id="time-capsule-username"
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

                    {/* EMAIL */}

                    <div className="time-capsule-form-field">
                      <label htmlFor="time-capsule-email">
                        Your email
                      </label>

                      <input
                        id="time-capsule-email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                          setEmail(event.target.value)
                        }
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                      />
                    </div>

                    {/* TIMELINE DROPDOWN */}

                    <div className="time-capsule-form-field">
                      <label htmlFor="time-capsule-timeline">
                        When would you like to receive
                        your letter?
                      </label>

                      <select
                        id="time-capsule-timeline"
                        value={selectedTimeline}
                        onChange={handleTimelineChange}
                        required
                      >
                        {TIME_CAPSULE_TIMELINES.map(
                          (timeline) => (
                            <option
                              key={timeline.id}
                              value={timeline.id}
                            >
                              {timeline.title}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    {/* CUSTOM DATE */}

                    {selectedTimeline === "custom" && (
                      <div className="time-capsule-form-field">
                        <label htmlFor="time-capsule-custom-date">
                          What date should we send it?
                        </label>

                        <input
                          id="time-capsule-custom-date"
                          type="date"
                          value={customDate}
                          onChange={(event) =>
                            setCustomDate(
                              event.target.value
                            )
                          }
                          min={
                            new Date()
                              .toISOString()
                              .split("T")[0]
                          }
                          required
                        />
                      </div>
                    )}

                    {/* SELECTED TIMELINE */}

                    <div className="time-capsule-selected-timeline">
                      <span>
                        Your chosen delivery time
                      </span>

                      <strong>
                        {selectedTimelineTitle}
                      </strong>

                      {selectedTimeline === "custom" &&
                        customDate && (
                          <small>
                            Delivery date: {customDate}
                          </small>
                        )}
                    </div>

                    {/* READY TO JOIN */}

                    <label className="time-capsule-rules-check">
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
                        Yes, I&apos;m ready to start a
                        Time Capsule and receive my
                        letter at the chosen time.
                      </span>
                    </label>

                    {/* MESSAGE */}

                    <div className="time-capsule-form-field">
                      <label htmlFor="time-capsule-message">
                        One thing you wanna say
                      </label>

                      <textarea
                        id="time-capsule-message"
                        value={message}
                        onChange={(event) =>
                          setMessage(event.target.value)
                        }
                        placeholder="Tell us anything you'd like us to know..."
                        rows="4"
                      />
                    </div>

                    {/* SUBMIT */}

                    <button
                      type="submit"
                      className="time-capsule-form-submit"
                      disabled={isSubmitDisabled}
                    >
                      Seal My Time Capsule
                      <span>→</span>
                    </button>
                  </form>
                </>
              ) : (
                /* =================================================
                   SUCCESS MESSAGE
                ================================================= */

                <div className="time-capsule-success">
                  <p className="time-capsule-eyebrow">
                    Request received
                  </p>

                  <h2 id="time-capsule-modal-title">
                    We&apos;ve got your request.
                  </h2>

                  <p>
                    We have received your request and
                    would contact you soon at your email
                    address regarding your Time Capsule.
                  </p>

                  <div className="time-capsule-success-note">
                    <span>∞</span>

                    <p>
                      Your words are ready for their
                      journey.
                      <br />
                      We&apos;ll be in touch soon.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="time-capsule-form-submit"
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
