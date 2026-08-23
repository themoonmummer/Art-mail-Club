import { useEffect, useState } from "react";

import "../components/Subscription/subscription.css";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import MailClub from "../components/Subscription/MailClub";
import SecretMail from "../components/Subscription/SecretMail";
import TimeCapsule from "../components/Subscription/TimeCapsule";
import MysteryMail from "../components/Subscription/MysteryMail";

const THEMES = [
  {
    id: "autumn",
    title: "Mail Club",
    eyebrow: "Monthly correspondence",
    lede:
      "A small handmade parcel arrives every month, filled with paper things built around a new theme.",
  },

  {
    id: "rain",
    title: "Secret Mail",
    eyebrow: "Write anonymously",
    lede:
      "A random member writes to another random member, with names kept secret until you choose otherwise.",
  },

  {
    id: "greenery",
    title: "Time Capsule Letters",
    eyebrow: "Letters to the future",
    lede:
      "Write something today and choose the moment in the future when your words should find you again.",
  },

  {
    id: "sunny",
    title: "Mystery Mail",
    eyebrow: "Leave it to chance",
    lede:
      "Choose a theme and let the rest remain unknown. Your next piece of mail is left to chance.",
  },
];

function getSavedSubscription() {
  try {
    const saved = localStorage.getItem(
      "art-mail-subscription"
    );

    if (!saved) {
      return null;
    }

    const parsed = JSON.parse(saved);

    if (!parsed || parsed.active !== true) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function ActiveExperience({
  activeId,
  isSubscribed,
  onSubscribe,
}) {
  switch (activeId) {
    case "autumn":
      return (
        <MailClub
          themeId={activeId}
          isSubscribed={isSubscribed}
          onSubscribe={onSubscribe}
        />
      );

    case "rain":
      return (
        <SecretMail
          themeId={activeId}
          isSubscribed={isSubscribed}
          onSubscribe={onSubscribe}
        />
      );

    case "greenery":
      return (
        <TimeCapsule
          themeId={activeId}
          isSubscribed={isSubscribed}
          onSubscribe={onSubscribe}
        />
      );

    case "sunny":
      return (
        <MysteryMail
          themeId={activeId}
          isSubscribed={isSubscribed}
          onSubscribe={onSubscribe}
        />
      );

    default:
      return (
        <MailClub
          themeId="autumn"
          isSubscribed={isSubscribed}
          onSubscribe={onSubscribe}
        />
      );
  }
}

export default function SubscriptionPage() {
  const [activeId, setActiveId] = useState("autumn");

  const [subscription, setSubscription] = useState(
    getSavedSubscription
  );

  const isSubscribed =
    subscription?.active === true;

  /*
   * Keep subscription state synchronized if another
   * component updates localStorage.
   */
  useEffect(() => {
    const handleProfileUpdate = () => {
      setSubscription(getSavedSubscription());
    };

    window.addEventListener(
      "art-mail-profile-update",
      handleProfileUpdate
    );

    return () => {
      window.removeEventListener(
        "art-mail-profile-update",
        handleProfileUpdate
      );
    };
  }, []);

  /*
   * Join the currently selected correspondence.
   */
  const handleSubscribe = () => {
    const selectedTheme =
      THEMES.find(
        (theme) => theme.id === activeId
      ) || THEMES[0];

    const newSubscription = {
      active: true,
      name: selectedTheme.title,
      status: "Active subscription",
      themeId: selectedTheme.id,
      themeTitle: selectedTheme.title,
      joinedAt:
        new Date().toLocaleDateString(),
    };

    try {
      localStorage.setItem(
        "art-mail-subscription",
        JSON.stringify(newSubscription)
      );

      /*
       * Also update the profile if one exists.
       */
      const savedProfile =
        localStorage.getItem(
          "artMailProfile"
        );

      if (savedProfile) {
        const profile =
          JSON.parse(savedProfile);

        const currentThemes =
          Array.isArray(profile.joinedThemes)
            ? profile.joinedThemes
            : [];

        const updatedProfile = {
          ...profile,

          joinedThemes:
            currentThemes.includes(
              selectedTheme.title
            )
              ? currentThemes
              : [
                  ...currentThemes,
                  selectedTheme.title,
                ],

          subscription:
            newSubscription,
        };

        localStorage.setItem(
          "artMailProfile",
          JSON.stringify(updatedProfile)
        );
      }

      setSubscription(newSubscription);

      window.dispatchEvent(
        new Event("art-mail-profile-update")
      );
    } catch {
      console.error(
        "Could not save subscription."
      );
    }
  };

  /*
   * Useful while developing/testing.
   *
   * This is intentionally available from the browser
   * console:
   *
   * localStorage.removeItem("art-mail-subscription")
   * window.dispatchEvent(new Event("art-mail-profile-update"))
   */
  useEffect(() => {
    const handleStorage = () => {
      setSubscription(getSavedSubscription());
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  const activeTheme =
    THEMES.find(
      (theme) => theme.id === activeId
    ) || THEMES[0];

  return (
    <>
      <Navbar variant="subscription" />

      <main
        className="subscription-page"
        data-theme={activeId}
      >
        {/* =================================================
            PAGE BACKGROUND
        ================================================= */}

        <div
          className="subscription-background"
          aria-hidden="true"
        >
          <div className="subscription-background-glow" />

          <div className="subscription-background-grain" />

          <div className="subscription-background-orb orb-one" />

          <div className="subscription-background-orb orb-two" />

          <div className="subscription-background-orb orb-three" />
        </div>

        {/* =================================================
            HERO
        ================================================= */}

        <section className="subscription-hero">
          <div className="subscription-hero-content">

            <p className="subscription-eyebrow">
              Four ways to send &amp; receive
            </p>

            <h1 className="subscription-heading">
              Choose your correspondence
            </h1>

            <p className="subscription-intro">
              Each membership is its own small world.
              Choose the kind of correspondence you
              want to make space for.
            </p>

          </div>
        </section>

        {/* =================================================
            EXPERIENCE SELECTOR
        ================================================= */}

        <section
          className="subscription-selector"
          aria-label="Subscription experiences"
        >
          <div
            className="subscription-card-grid"
            role="tablist"
            aria-label="Choose a correspondence experience"
          >

            {THEMES.map((theme, index) => {
              const isActive =
                theme.id === activeId;

              return (
                <button
                  key={theme.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`subscription-panel-${theme.id}`}
                  className={`subscription-card ${
                    isActive
                      ? "is-active"
                      : "is-inactive"
                  }`}
                  data-card-theme={theme.id}
                  onClick={() =>
                    setActiveId(theme.id)
                  }
                >

                  <span className="subscription-card-number">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <span className="subscription-card-content">

                    <span className="subscription-card-eyebrow">
                      {theme.eyebrow}
                    </span>

                    <span className="subscription-card-title">
                      {theme.title}
                    </span>

                    <span className="subscription-card-lede">
                      {theme.lede}
                    </span>

                  </span>

                  <span
                    className="subscription-card-arrow"
                    aria-hidden="true"
                  >
                    →
                  </span>

                </button>
              );
            })}

          </div>
        </section>

        {/* =================================================
            ACTIVE EXPERIENCE
        ================================================= */}

        <section
          id={`subscription-panel-${activeId}`}
          className="subscription-experience"
          data-active-theme={activeId}
          role="tabpanel"
          aria-label={`${activeTheme.title} experience`}
        >
          <ActiveExperience
            activeId={activeId}
            isSubscribed={isSubscribed}
            onSubscribe={handleSubscribe}
          />
        </section>

      </main>

      <Footer variant="subscription" />
    </>
  );
}
