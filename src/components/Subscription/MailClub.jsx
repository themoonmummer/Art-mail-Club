import { useEffect, useState } from "react";

import "./Mailclub.css";

const MAIL_CLUB_MAILERS = [
  {
    id: 1,
    theme: "Rain",
    mark: "02 / 26",
    accent: "blue",
    description:
      "Quiet afternoons, window glass, and things worth keeping.",
    price: "$12",
  },

  {
    id: 2,
    theme: "Nostalgia",
    mark: "05 / 26",
    accent: "rose",
    description:
      "Little reminders of places, objects, and softer days.",
    price: "$12",
  },

  {
    id: 3,
    theme: "Dreams",
    mark: "08 / 26",
    accent: "lavender",
    description:
      "A collection for wandering thoughts and impossible ideas.",
    price: "$12",
  },

  {
    id: 4,
    theme: "Tea",
    mark: "11 / 26",
    accent: "tea",
    description:
      "Slow mornings, warm cups, and notes worth passing on.",
    price: "$12",
  },

  {
    id: 5,
    theme: "Forest",
    mark: "14 / 26",
    accent: "green",
    description:
      "A tiny walk through moss, leaves, paths, and quiet.",
    price: "$12",
  },

  {
    id: 6,
    theme: "Childhood",
    mark: "17 / 26",
    accent: "yellow",
    description:
      "Playful scraps inspired by the things we never quite forget.",
    price: "$12",
  },
];

const MAIL_CLUB_FAQ = [
  {
    question: "What is Mail Club?",
    answer:
      "Mail Club is a monthly correspondence experience built around a new theme. Each mailer is a small collection of handmade and curated paper things made to feel like a letter from another little world.",
  },

  {
    question: "What comes in a mailer?",
    answer:
      "Every month is a little different, but you can expect a mixture of paper goods such as postcards, mini zines, art prints, stickers, prompts, tiny notes, and other collectible pieces.",
  },

  {
    question: "Do I need a subscription?",
    answer:
      "No. You can join the monthly club or choose an individual mailer when a particular theme catches your eye.",
  },

  {
    question: "When will my mailer arrive?",
    answer:
      "Monthly mailers are prepared and sent during the first part of each month. Delivery time can vary depending on where you live.",
  },

  {
    question: "Can I buy an older theme?",
    answer:
      "When supplies remain, previous themes may be available as individual mailers. Availability changes as each little edition sells through.",
  },

  {
    question: "Is every mailer exactly the same?",
    answer:
      "The main pieces are part of the same monthly theme, but small handmade details may vary. That is part of what makes each envelope feel personal.",
  },
];

export default function MailClub({
  themeId = "autumn",
  isSubscribed = false,
  onSubscribe,
}) {
  const [cartItem, setCartItem] =
    useState(null);

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const [isDetailsOpen, setIsDetailsOpen] =
    useState(false);

  const [isPaymentOpen, setIsPaymentOpen] =
    useState(false);

  const [paymentComplete, setPaymentComplete] =
    useState(false);

  /*
   * Mail Club is the autumn experience.
   *
   * We keep themeId here because SubscriptionPage
   * controls the active experience.
   */
  const isMailClub =
    themeId === "autumn";

  /*
   * Lock page scrolling while a modal is open.
   */
  useEffect(() => {
    const modalIsOpen =
      isCartOpen ||
      isDetailsOpen ||
      isPaymentOpen;

    document.body.style.overflow =
      modalIsOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [
    isCartOpen,
    isDetailsOpen,
    isPaymentOpen,
  ]);

  /*
   * Escape closes any open modal.
   */
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== "Escape") {
        return;
      }

      setIsCartOpen(false);
      setIsDetailsOpen(false);
      setIsPaymentOpen(false);
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  /*
   * JOIN MAIL CLUB
   *
   * SubscriptionPage owns the actual subscription
   * state and localStorage.
   */
  const handleJoinMailClub = () => {
    if (isSubscribed) {
      return;
    }

    if (onSubscribe) {
      onSubscribe();
    }
  };

  /*
   * ADD MAILER TO BAG
   */
  const handleAddToBag = (mailer) => {
    setCartItem(mailer);

    setIsDetailsOpen(false);
    setIsPaymentOpen(false);
    setPaymentComplete(false);

    setIsCartOpen(true);
  };

  /*
   * CART → DETAILS
   */
  const handleContinueToDetails = () => {
    setIsCartOpen(false);
    setIsDetailsOpen(true);
  };

  /*
   * DETAILS → PAYMENT
   */
  const handleContinueToPayment = (
    event
  ) => {
    event.preventDefault();

    setIsDetailsOpen(false);
    setIsPaymentOpen(true);
  };

  /*
   * SAVE SINGLE MAILER PURCHASE
   */
  const savePurchaseToProfile = () => {
    if (!cartItem) {
      return;
    }

    try {
      const savedProfile =
        localStorage.getItem(
          "artMailProfile"
        );

      if (!savedProfile) {
        return;
      }

      const profile =
        JSON.parse(savedProfile);

      const currentPurchases =
        Array.isArray(profile.purchases)
          ? profile.purchases
          : [];

      const purchase = {
        id: Date.now(),
        name: `${cartItem.theme} Mailer`,
        theme: cartItem.theme,
        price: cartItem.price,
        date:
          new Date().toLocaleDateString(),
        type: "Single Mailer",
      };

      const updatedProfile = {
        ...profile,

        purchases: [
          ...currentPurchases,
          purchase,
        ],
      };

      localStorage.setItem(
        "artMailProfile",
        JSON.stringify(updatedProfile)
      );

      window.dispatchEvent(
        new Event("art-mail-profile-update")
      );
    } catch {
      // Ignore profile storage errors.
    }
  };

  /*
   * DEMO PAYMENT
   */
  const handleFakePayment = (
    event
  ) => {
    event.preventDefault();

    savePurchaseToProfile();

    setPaymentComplete(true);
  };

  /*
   * CLOSE ALL MODALS
   */
  const closeAllModals = () => {
    setIsCartOpen(false);
    setIsDetailsOpen(false);
    setIsPaymentOpen(false);
  };

  /*
   * If this component somehow gets rendered for
   * another theme, don't show Mail Club content.
   */
  if (!isMailClub) {
    return null;
  }

  return (
    <>
      <section
        className="mailclub-page"
        data-theme={themeId}
      >
        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="mailclub-hero">
          <div className="mailclub-hero-inner">

            <div className="mailclub-hero-copy">

              <p className="mailclub-eyebrow">
                Monthly correspondence
              </p>

              <h1 className="mailclub-title">
                Mail Club
              </h1>

              <p className="mailclub-description">
                A little piece of the internet,
                sent through the mailbox. Every
                month, Mail Club brings you a new
                themed collection of paper things
                made to be opened, kept, shared,
                and enjoyed.
              </p>

            </div>

          </div>
        </section>

        {/* =====================================================
            FEATURE / SIGNUP
        ===================================================== */}

        <section className="mailclub-feature">

          <div
            className="mailclub-feature-art"
            aria-hidden="true"
          >
            <div className="mailclub-envelope">

              <div className="mailclub-envelope-back" />

              <div
                className="mailclub-envelope-paper mailclub-paper-one"
                style={{ zIndex: 5 }}
              >
                <span>hello</span>
              </div>

              <div
                className="mailclub-envelope-paper mailclub-paper-two"
                style={{ zIndex: 5 }}
              >
                <span>for you</span>
              </div>

              <div
                className="mailclub-envelope-flap"
                style={{ zIndex: 2 }}
              />

              <div
                className="mailclub-envelope-stamp"
                style={{ zIndex: 6 }}
              >
                MC
              </div>

              <div
                className="mailclub-envelope-address"
                style={{ zIndex: 6 }}
              >
                <span />
                <span />
                <span />
              </div>

            </div>

            <p className="mailclub-art-caption">
              something small
              <br />
              through the post
            </p>
          </div>

          <div className="mailclub-feature-copy">

            <p className="mailclub-section-label">
              The monthly letter
            </p>

            <h2>
              A little parcel of correspondence,
              <em> every month.</em>
            </h2>

            <p className="mailclub-feature-text">
              Mail Club is a recurring collection
              built around a different theme each
              month. Think handmade postcards,
              tiny zines, art prints, stickers,
              prompts, notes, and other paper
              surprises tucked into one very happy
              envelope.
            </p>

            <div className="mailclub-signup-note">

              <span className="mailclub-note-dot" />

              <p>
                <strong>
                  {isSubscribed
                    ? "You are a Mail Club member."
                    : "Now accepting new members."}
                </strong>

                <br />

                {isSubscribed
                  ? "Your Mail Club membership is active."
                  : "Join during the current signup window to receive the upcoming month&apos;s collection."}
              </p>

            </div>

            <div className="mailclub-actions">

              <button
                type="button"
                className="mailclub-primary-button"
                onClick={handleJoinMailClub}
                disabled={isSubscribed}
              >
                {isSubscribed
                  ? "You're already a member"
                  : "Join the Mail Club"}

                <span aria-hidden="true">
                  {isSubscribed
                    ? "✓"
                    : "→"}
                </span>
              </button>

              <button
                type="button"
                className="mailclub-secondary-button"
                onClick={() => {
                  document
                    .querySelector(
                      ".mailclub-mailers"
                    )
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                }}
              >
                Browse single mailers

                <span aria-hidden="true">
                  ↗
                </span>
              </button>

            </div>

          </div>
        </section>

        {/* =====================================================
            ARCHIVE / PRODUCTS
        ===================================================== */}

        <section className="mailclub-mailers">

          <div className="mailclub-section-heading">

            <div>
              <p className="mailclub-section-label">
                From the archive
              </p>

              <h2>
                Little worlds we&apos;ve mailed.
              </h2>
            </div>

            <p>
              A few past themes from the club.
              Each one is a tiny edition of its own.
            </p>

          </div>

          <div className="mailclub-mailer-grid">

            {MAIL_CLUB_MAILERS.map(
              (mailer) => (
                <article
                  key={mailer.id}
                  className={`mailclub-mailer-card mailclub-mailer-${mailer.accent}`}
                >

                  <div className="mailclub-mailer-art">

                    <span className="mailclub-mailer-number">
                      {mailer.mark}
                    </span>

                    <div className="mailclub-postcard">

                      <span className="mailclub-postcard-word">
                        {mailer.theme}
                      </span>

                      <span className="mailclub-postcard-line line-one" />

                      <span className="mailclub-postcard-line line-two" />

                      <span className="mailclub-postcard-line line-three" />

                      <span className="mailclub-postcard-stamp">
                        MC
                      </span>

                    </div>

                    <span className="mailclub-mailer-scribble">
                      mail club
                    </span>

                  </div>

                  <div className="mailclub-mailer-info">

                    <div>
                      <h3>
                        {mailer.theme}
                      </h3>

                      <p>
                        {mailer.description}
                      </p>
                    </div>

                    <div className="mailclub-mailer-bottom">

                      <span className="mailclub-mailer-price">
                        {mailer.price}
                      </span>

                      <button
                        type="button"
                        className="mailclub-add-button"
                        onClick={() =>
                          handleAddToBag(
                            mailer
                          )
                        }
                      >
                        Add to bag

                        <span aria-hidden="true">
                          +
                        </span>
                      </button>

                    </div>

                  </div>

                </article>
              )
            )}

          </div>
        </section>

        {/* =====================================================
            HOW IT WORKS
        ===================================================== */}

        <section className="mailclub-how">

          <div className="mailclub-section-heading mailclub-centered-heading">

            <p className="mailclub-section-label">
              How Mail Club works
            </p>

            <h2>
              Something nice to look forward to.
            </h2>

            <p>
              Nothing complicated. Just good
              things, made slowly and sent
              through the post.
            </p>

          </div>

          <div className="mailclub-steps">

            <article className="mailclub-step">

              <span className="mailclub-step-number">
                01
              </span>

              <div>
                <h3>
                  Pick your way in
                </h3>

                <p>
                  Join the monthly club or choose
                  a single mailer from the available
                  collection.
                </p>
              </div>

            </article>

            <article className="mailclub-step">

              <span className="mailclub-step-number">
                02
              </span>

              <div>
                <h3>
                  We make your mail
                </h3>

                <p>
                  Each month&apos;s theme becomes a
                  little collection of paper pieces,
                  assembled with care.
                </p>
              </div>

            </article>

            <article className="mailclub-step">

              <span className="mailclub-step-number">
                03
              </span>

              <div>
                <h3>
                  Check the mailbox
                </h3>

                <p>
                  Your envelope makes its way to
                  you, ready to be opened slowly
                  and kept for later.
                </p>
              </div>

            </article>

          </div>
        </section>

        {/* =====================================================
            FAQ
        ===================================================== */}

        <section className="mailclub-faq">

          <div className="mailclub-faq-heading">

            <p className="mailclub-section-label">
              Questions
            </p>

            <h2>
              Before you join.
            </h2>

            <p>
              A few things people usually want
              to know before sending their address
              our way.
            </p>

          </div>

          <div className="mailclub-faq-list">

            {MAIL_CLUB_FAQ.map(
              (item, index) => (
                <details
                  key={item.question}
                  className="mailclub-faq-item"
                >

                  <summary>

                    <span className="mailclub-faq-index">
                      0{index + 1}
                    </span>

                    <span className="mailclub-faq-question">
                      {item.question}
                    </span>

                    <span
                      className="mailclub-faq-icon"
                      aria-hidden="true"
                    >
                      +
                    </span>

                  </summary>

                  <div className="mailclub-faq-answer">
                    <p>
                      {item.answer}
                    </p>
                  </div>

                </details>
              )
            )}

          </div>

          <div className="mailclub-faq-cta">

            <p>
              Ready to receive something nice?
            </p>

            <button
              type="button"
              onClick={handleJoinMailClub}
              disabled={isSubscribed}
            >
              {isSubscribed
                ? "You're already a member"
                : "Join the Mail Club"}

              <span aria-hidden="true">
                {isSubscribed
                  ? "✓"
                  : "→"}
              </span>
            </button>

          </div>

        </section>
      </section>

      {/* =========================================================
          CART
      ========================================================= */}

      {isCartOpen && cartItem && (
        <div
          className="mailclub-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setIsCartOpen(false);
            }
          }}
        >
          <div
            className="mailclub-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mailclub-cart-title"
          >

            <button
              type="button"
              className="mailclub-modal-close"
              aria-label="Close cart"
              onClick={() =>
                setIsCartOpen(false)
              }
            >
              ×
            </button>

            <p className="mailclub-modal-kicker">
              Your little bag
            </p>

            <h2 id="mailclub-cart-title">
              {cartItem.theme}
            </h2>

            <p className="mailclub-modal-intro">
              You&apos;ve selected this little
              piece from the Mail Club archive.
            </p>

            <div
              style={{
                padding: "22px",
                marginBottom: "22px",
                border:
                  "1px solid rgba(74, 47, 28, 0.16)",
                borderRadius: "8px",
                background: "#f0e3cd",
              }}
            >
              <p
                style={{
                  margin: "0 0 10px",
                  fontFamily:
                    "var(--font-display)",
                  fontSize: "1.5rem",
                }}
              >
                {cartItem.theme}
              </p>

              <p
                style={{
                  margin: "0 0 14px",
                  color:
                    "var(--mail-brown-soft)",
                  fontSize: "0.82rem",
                  lineHeight: 1.7,
                }}
              >
                {cartItem.description}
              </p>

              <strong
                style={{
                  fontFamily:
                    "var(--font-display)",
                  fontSize: "1.2rem",
                }}
              >
                {cartItem.price}
              </strong>
            </div>

            <button
              type="button"
              className="mailclub-form-submit"
              onClick={
                handleContinueToDetails
              }
            >
              Continue to details

              <span aria-hidden="true">
                →
              </span>
            </button>

          </div>
        </div>
      )}

      {/* =========================================================
          SHIPPING DETAILS
      ========================================================= */}

      {isDetailsOpen && cartItem && (
        <div
          className="mailclub-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setIsDetailsOpen(false);
            }
          }}
        >
          <div
            className="mailclub-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mailclub-details-title"
          >

            <button
              type="button"
              className="mailclub-modal-close"
              aria-label="Close details form"
              onClick={() =>
                setIsDetailsOpen(false)
              }
            >
              ×
            </button>

            <p className="mailclub-modal-kicker">
              Send the letter
            </p>

            <h2 id="mailclub-details-title">
              A few final details.
            </h2>

            <p className="mailclub-modal-intro">
              Tell us where the{" "}
              {cartItem.theme} mailer should
              go and anything you&apos;d like us
              to know.
            </p>

            <form
              className="mailclub-form"
              onSubmit={
                handleContinueToPayment
              }
            >

              <label>
                <span>Full name</span>

                <input
                  type="text"
                  name="recipientName"
                  placeholder="Your name"
                  required
                />
              </label>

              <label>
                <span>
                  Email address
                </span>

                <input
                  type="email"
                  name="recipientEmail"
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label>
                <span>Address</span>

                <input
                  type="text"
                  name="address"
                  placeholder="Street and house number"
                  required
                />
              </label>

              <label>
                <span>City</span>

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                />
              </label>

              <label>
                <span>Postcode</span>

                <input
                  type="text"
                  name="postcode"
                  placeholder="Postcode"
                  required
                />
              </label>

              <label>
                <span>
                  Anything you&apos;d like us
                  to know?
                </span>

                <textarea
                  name="description"
                  placeholder="A note, preference, or anything else..."
                  rows="4"
                  style={{
                    width: "100%",
                    padding: "13px",
                    border:
                      "1px solid var(--mail-line)",
                    borderRadius: "4px",
                    outline: "none",
                    resize: "vertical",
                    background:
                      "rgba(244, 234, 217, 0.35)",
                    color:
                      "var(--mail-brown)",
                    fontSize: "0.79rem",
                    fontFamily: "inherit",
                  }}
                />
              </label>

              <button
                type="submit"
                className="mailclub-form-submit"
              >
                Continue to payment

                <span aria-hidden="true">
                  →
                </span>
              </button>

            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          DEMO PAYMENT
      ========================================================= */}

      {isPaymentOpen && cartItem && (
        <div
          className="mailclub-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setIsPaymentOpen(false);
            }
          }}
        >
          <div
            className="mailclub-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mailclub-payment-title"
          >

            <button
              type="button"
              className="mailclub-modal-close"
              aria-label="Close payment"
              onClick={() =>
                setIsPaymentOpen(false)
              }
            >
              ×
            </button>

            {!paymentComplete ? (
              <>
                <p className="mailclub-modal-kicker">
                  Almost there
                </p>

                <h2 id="mailclub-payment-title">
                  Pay for your letter.
                </h2>

                <p className="mailclub-modal-intro">
                  This is a demo checkout.
                  No real payment will be taken.
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "space-between",
                    gap: "20px",
                    marginBottom: "25px",
                    padding: "16px 18px",
                    border:
                      "1px dashed rgba(181, 84, 30, 0.35)",
                    borderRadius: "7px",
                    background:
                      "rgba(244, 234, 217, 0.35)",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "var(--font-display)",
                      fontSize: "1.05rem",
                    }}
                  >
                    {cartItem.theme}
                  </span>

                  <strong
                    style={{
                      fontFamily:
                        "var(--font-display)",
                      fontSize: "1.1rem",
                    }}
                  >
                    {cartItem.price}
                  </strong>
                </div>

                <form
                  className="mailclub-form"
                  onSubmit={
                    handleFakePayment
                  }
                >

                  <label>
                    <span>
                      Cardholder name
                    </span>

                    <input
                      type="text"
                      name="cardName"
                      placeholder="Your name"
                      required
                    />
                  </label>

                  <label>
                    <span>
                      Card number
                    </span>

                    <input
                      type="text"
                      name="cardNumber"
                      inputMode="numeric"
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                      required
                    />
                  </label>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "1fr 1fr",
                      gap: "12px",
                    }}
                  >
                    <label>
                      <span>
                        Expiry
                      </span>

                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM / YY"
                        maxLength={7}
                        required
                      />
                    </label>

                    <label>
                      <span>CVV</span>

                      <input
                        type="text"
                        name="cvv"
                        inputMode="numeric"
                        placeholder="123"
                        maxLength={4}
                        required
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="mailclub-form-submit"
                  >
                    Complete demo payment

                    <span aria-hidden="true">
                      →
                    </span>
                  </button>

                </form>

                <p className="mailclub-modal-footnote">
                  Demo checkout only — no
                  payment is actually processed.
                </p>
              </>
            ) : (
              <>
                <p className="mailclub-modal-kicker">
                  Payment complete
                </p>

                <h2 id="mailclub-payment-title">
                  Your letter is on its way.
                </h2>

                <p className="mailclub-modal-intro">
                  Your demo order for the{" "}
                  {cartItem.theme} mailer has
                  been completed successfully.
                </p>

                <div
                  style={{
                    padding: "22px",
                    marginTop: "5px",
                    border:
                      "1px dashed rgba(181, 84, 30, 0.35)",
                    borderRadius: "8px",
                    background:
                      "rgba(244, 234, 217, 0.35)",
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 8px",
                      fontFamily:
                        "var(--font-display)",
                      fontSize: "1.2rem",
                    }}
                  >
                    {cartItem.theme}
                  </p>

                  <p
                    style={{
                      margin: 0,
                      color:
                        "var(--mail-brown-soft)",
                      fontSize: "0.8rem",
                      lineHeight: 1.7,
                    }}
                  >
                    Order confirmed ·{" "}
                    {cartItem.price}
                  </p>
                </div>

                <button
                  type="button"
                  className="mailclub-form-submit"
                  style={{
                    marginTop: "22px",
                  }}
                  onClick={() => {
                    setPaymentComplete(
                      false
                    );

                    setCartItem(null);

                    closeAllModals();
                  }}
                >
                  Back to Mail Club

                  <span aria-hidden="true">
                    ✓
                  </span>
                </button>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
}
