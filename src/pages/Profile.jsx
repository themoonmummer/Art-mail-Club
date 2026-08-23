import { useEffect, useState } from "react";

import "../components/Profile/Profile.css";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import { clubs } from "../data/communityData";

const PROFILE_NAV_ITEMS = [
  {
    id: "profile",
    label: "Profile",
    icon: "○",
  },
  {
    id: "posts",
    label: "My Posts",
    icon: "▧",
  },
  {
    id: "themes",
    label: "My Themes",
    icon: "✦",
  },
  {
    id: "subscription",
    label: "Subscription",
    icon: "✉",
  },
  {
    id: "history",
    label: "History",
    icon: "↺",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "⚙",
  },
];

const DEFAULT_ACCOUNT = {
  username: "",
  email: "",
  password: "",
  joinedThemes: [],
  purchases: [],
  posts: [],
  subscription: {
    active: false,
    name: "No active subscription",
    status: "Not subscribed",
  },
};

/* =========================================================
   ACCOUNT
========================================================= */

function getSavedAccount() {
  try {
    const savedAccount = localStorage.getItem("artMailProfile");

    if (!savedAccount) {
      return null;
    }

    return {
      ...DEFAULT_ACCOUNT,
      ...JSON.parse(savedAccount),
    };
  } catch {
    return null;
  }
}

/* =========================================================
   COMMUNITY DATA
========================================================= */

function getJoinedClubIds() {
  try {
    const saved = localStorage.getItem("art-mail-joined-clubs");

    if (!saved) {
      return [];
    }

    return JSON.parse(saved);
  } catch {
    return [];
  }
}

function getJoinedThemes() {
  const joinedClubIds = getJoinedClubIds();

  return clubs
    .filter((club) => joinedClubIds.includes(club.id))
    .map((club) => ({
      id: club.id,
      name: club.name || club.title || "Art Mail Club",
      description:
        club.description ||
        "A little world inside Art Mail Club.",
    }));
}

/* =========================================================
   PURCHASE DATA
========================================================= */

function getSavedPurchases() {
  try {
    const saved = localStorage.getItem("art-mail-purchases");

    if (!saved) {
      return [];
    }

    return JSON.parse(saved);
  } catch {
    return [];
  }
}

/* =========================================================
   POST DATA
========================================================= */

function getSavedPosts() {
  try {
    const saved = localStorage.getItem("art-mail-posts");

    if (!saved) {
      return [];
    }

    return JSON.parse(saved);
  } catch {
    return [];
  }
}

function savePosts(posts) {
  localStorage.setItem(
    "art-mail-posts",
    JSON.stringify(posts)
  );

  window.dispatchEvent(
    new Event("art-mail-posts-update")
  );
}

/* =========================================================
   SUBSCRIPTION DATA
========================================================= */

function getSavedSubscription() {
  try {
    const saved = localStorage.getItem(
      "art-mail-subscription"
    );

    if (!saved) {
      return DEFAULT_ACCOUNT.subscription;
    }

    return {
      ...DEFAULT_ACCOUNT.subscription,
      ...JSON.parse(saved),
    };
  } catch {
    return DEFAULT_ACCOUNT.subscription;
  }
}

/* =========================================================
   GET EVERYTHING
========================================================= */

function getFreshAccount(account) {
  if (!account) {
    return null;
  }

  return {
    ...account,
    joinedThemes: getJoinedThemes(),
    purchases: getSavedPurchases(),
    posts: getSavedPosts(),
    subscription: getSavedSubscription(),
  };
}

/* =========================================================
   PROFILE
========================================================= */

function Profile() {
  const [account, setAccount] = useState(() => {
    const saved = getSavedAccount();

    return saved ? getFreshAccount(saved) : null;
  });

  const [activeSection, setActiveSection] =
    useState("profile");

  const [showWelcome, setShowWelcome] = useState(
    () => !localStorage.getItem("artMailProfile")
  );

  const [showAccountForm, setShowAccountForm] =
    useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [laterMessage, setLaterMessage] =
    useState(false);

  const [settingsUsername, setSettingsUsername] =
    useState("");

  const [settingsEmail, setSettingsEmail] =
    useState("");

  /* =========================================================
     CREATE POST STATE
  ========================================================= */

  const [showCreatePost, setShowCreatePost] =
    useState(false);

  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] =
    useState("");

  const [postPrice, setPostPrice] = useState("");

  const [postDetails, setPostDetails] =
    useState("");

  const [postTheme, setPostTheme] = useState("");

  const [postImage, setPostImage] = useState("");

  const [postImageName, setPostImageName] =
    useState("");

  const [postError, setPostError] = useState("");

  /* =========================================================
     REFRESH PROFILE DATA
  ========================================================= */

  const refreshProfileData = () => {
    const saved = getSavedAccount();

    if (!saved) {
      setAccount(null);
      return;
    }

    setAccount(getFreshAccount(saved));
  };

  /* =========================================================
     LISTEN FOR CHANGES
  ========================================================= */

  useEffect(() => {
    const handleProfileDataChange = () => {
      refreshProfileData();
    };

    window.addEventListener(
      "art-mail-profile-update",
      handleProfileDataChange
    );

    window.addEventListener(
      "art-mail-posts-update",
      handleProfileDataChange
    );

    window.addEventListener(
      "storage",
      handleProfileDataChange
    );

    return () => {
      window.removeEventListener(
        "art-mail-profile-update",
        handleProfileDataChange
      );

      window.removeEventListener(
        "art-mail-posts-update",
        handleProfileDataChange
      );

      window.removeEventListener(
        "storage",
        handleProfileDataChange
      );
    };
  }, []);

  /* =========================================================
     CREATE ACCOUNT
  ========================================================= */

  const handleCreateAccount = (event) => {
    event.preventDefault();

    if (!username.trim()) return;
    if (!email.trim()) return;
    if (!password.trim()) return;

    const newAccount = {
      ...DEFAULT_ACCOUNT,

      username: username.trim(),

      email: email.trim(),

      password,

      joinedThemes: getJoinedThemes(),

      purchases: getSavedPurchases(),

      posts: getSavedPosts(),

      subscription: getSavedSubscription(),
    };

    localStorage.setItem(
      "artMailProfile",
      JSON.stringify(newAccount)
    );

    setAccount(newAccount);

    setShowWelcome(false);
    setShowAccountForm(false);
    setLaterMessage(false);

    setActiveSection("profile");
  };

  /* =========================================================
     MAYBE LATER
  ========================================================= */

  const handleLater = () => {
    setShowWelcome(false);
    setShowAccountForm(false);
    setLaterMessage(true);
  };

  /* =========================================================
     OPEN ACCOUNT FORM
  ========================================================= */

  const handleOpenAccountForm = () => {
    setLaterMessage(false);
    setShowAccountForm(true);
  };

  /* =========================================================
     CLOSE WELCOME
  ========================================================= */

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    setShowAccountForm(false);
  };

  /* =========================================================
     OPEN SETTINGS
  ========================================================= */

  const handleOpenSettings = () => {
    if (!account) return;

    setSettingsUsername(account.username);
    setSettingsEmail(account.email);

    setActiveSection("settings");
  };

  /* =========================================================
     SAVE SETTINGS
  ========================================================= */

  const handleSaveSettings = (event) => {
    event.preventDefault();

    if (!account) return;

    if (!settingsUsername.trim()) return;
    if (!settingsEmail.trim()) return;

    const updatedAccount = {
      ...account,

      username: settingsUsername.trim(),

      email: settingsEmail.trim(),
    };

    localStorage.setItem(
      "artMailProfile",
      JSON.stringify(updatedAccount)
    );

    setAccount(updatedAccount);

    window.dispatchEvent(
      new Event("art-mail-profile-update")
    );
  };

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    localStorage.removeItem("artMailProfile");

    setAccount(null);

    setShowWelcome(true);
    setShowAccountForm(false);
    setLaterMessage(false);
  };

  /* =========================================================
     IMAGE UPLOAD
  ========================================================= */

  const handlePostImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setPostError("Please choose an image file.");
      return;
    }

    /*
      Images are stored as data URLs so the post remains
      visible after refreshing the page.
    */

    const reader = new FileReader();

    reader.onload = () => {
      setPostImage(reader.result);
      setPostImageName(file.name);
      setPostError("");
    };

    reader.onerror = () => {
      setPostError("Something went wrong while uploading the image.");
    };

    reader.readAsDataURL(file);
  };

  /* =========================================================
     RESET POST FORM
  ========================================================= */

  const resetPostForm = () => {
    setPostTitle("");
    setPostDescription("");
    setPostPrice("");
    setPostDetails("");
    setPostTheme("");
    setPostImage("");
    setPostImageName("");
    setPostError("");
  };

  /* =========================================================
     CREATE POST
  ========================================================= */

  const handleCreatePost = (event) => {
    event.preventDefault();

    setPostError("");

    if (!postImage) {
      setPostError("Please upload an image for your post.");
      return;
    }

    if (!postTitle.trim()) {
      setPostError("Please add a title.");
      return;
    }

    if (!postDescription.trim()) {
      setPostError("Please add some details about your product.");
      return;
    }

    if (!postPrice.trim()) {
      setPostError("Please add a price.");
      return;
    }

    if (!postTheme) {
      setPostError("Please connect your post to a theme.");
      return;
    }

    const selectedTheme = clubs.find(
      (club) => String(club.id) === String(postTheme)
    );

    const newPost = {
      id: `post-${Date.now()}`,

      title: postTitle.trim(),

      description: postDescription.trim(),

      price: postPrice.trim(),

      details: postDetails.trim(),

      image: postImage,

      imageName: postImageName,

      username: account.username,

      userEmail: account.email,

      themeId: selectedTheme?.id || postTheme,

      themeName:
        selectedTheme?.name ||
        selectedTheme?.title ||
        "Art Mail Community",

      date: new Date().toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      ),

      createdAt: Date.now(),
    };

    const existingPosts = getSavedPosts();

    const updatedPosts = [
      newPost,
      ...existingPosts,
    ];

    savePosts(updatedPosts);

    setAccount((previous) => {
      if (!previous) return previous;

      return {
        ...previous,
        posts: updatedPosts,
      };
    });

    resetPostForm();

    setShowCreatePost(false);

    setActiveSection("posts");
  };

  /* =========================================================
     DELETE POST
  ========================================================= */

  const handleDeletePost = (postId) => {
    const confirmed = window.confirm(
      "Remove this post from your profile?"
    );

    if (!confirmed) return;

    const updatedPosts = getSavedPosts().filter(
      (post) => post.id !== postId
    );

    savePosts(updatedPosts);

    setAccount((previous) => {
      if (!previous) return previous;

      return {
        ...previous,
        posts: updatedPosts,
      };
    });
  };

  /* =========================================================
     PROFILE SECTION
  ========================================================= */

  const renderProfileSection = () => {
    return (
      <section className="profile-dashboard-section">

        <div className="profile-section-intro">

          <span className="profile-section-kicker">
            Your little corner
          </span>

          <h1>
            Welcome back,
            <br />
            {account.username}.
          </h1>

          <p>
            Everything connected to your Art Mail Club
            experience, gathered in one place.
          </p>

        </div>

        <div className="profile-main-card">

          <div className="profile-avatar">
            <span>AM</span>
          </div>

          <div className="profile-main-info">

            <span className="profile-card-label">
              MEMBER
            </span>

            <h2>{account.username}</h2>

            <p>{account.email}</p>

          </div>

          <div className="profile-member-mark">
            <span>ART</span>
            <strong>MAIL</strong>
          </div>

        </div>

        <div className="profile-stats-grid">

          <article className="profile-stat-card">

            <span>POSTS</span>

            <strong>
              {account.posts.length}
            </strong>

            <p>
              Products you've shared
            </p>

          </article>

          <article className="profile-stat-card">

            <span>THEMES</span>

            <strong>
              {account.joinedThemes.length}
            </strong>

            <p>
              Clubs you've joined
            </p>

          </article>

          <article className="profile-stat-card">

            <span>ORDERS</span>

            <strong>
              {account.purchases.length}
            </strong>

            <p>
              Purchases made
            </p>

          </article>

        </div>

        <div className="profile-create-banner">

          <div className="profile-create-banner-icon">
            +
          </div>

          <div>
            <span className="profile-card-label">
              SHARE SOMETHING
            </span>

            <h3>
              Have something beautiful to share?
            </h3>

            <p>
              Create a post, add your product details,
              choose a community theme, and let it find
              its people.
            </p>
          </div>

          <button
            type="button"
            className="profile-primary-button"
            onClick={() => {
              resetPostForm();
              setShowCreatePost(true);
            }}
          >
            Create a Post
            <span>→</span>
          </button>

        </div>

        <div className="profile-note-card">

          <span className="profile-note-symbol">
            ✦
          </span>

          <div>

            <span className="profile-card-label">
              A LITTLE REMINDER
            </span>

            <p>
              Your profile is where your Art Mail Club
              journey starts. Join a theme, create
              something to share, or simply explore.
            </p>

          </div>

        </div>

      </section>
    );
  };

  /* =========================================================
     POSTS
  ========================================================= */

  const renderPostsSection = () => {
    return (
      <section className="profile-dashboard-section">

        <div className="profile-section-intro profile-posts-heading">

          <div>
            <span className="profile-section-kicker">
              Your creations
            </span>

            <h1>
              My Posts
            </h1>

            <p>
              Products and things you've shared with
              the Art Mail community.
            </p>
          </div>

          <button
            type="button"
            className="profile-primary-button"
            onClick={() => {
              resetPostForm();
              setShowCreatePost(true);
            }}
          >
            Create a Post
            <span>→</span>
          </button>

        </div>

        {account.posts.length === 0 ? (

          <div className="profile-empty-state profile-post-empty">

            <div className="profile-empty-symbol">
              +
            </div>

            <span className="profile-card-label">
              NO POSTS YET
            </span>

            <h2>
              Your first post
              <br />
              starts here.
            </h2>

            <p>
              Upload an image, tell people about your
              product, add the price, and connect it to
              a community theme.
            </p>

            <button
              type="button"
              className="profile-primary-button"
              onClick={() => {
                resetPostForm();
                setShowCreatePost(true);
              }}
            >
              Create My First Post
              <span>→</span>
            </button>

          </div>

        ) : (

          <div className="profile-post-grid">

            {account.posts.map((post) => (

              <article
                className="profile-post-card"
                key={post.id}
              >

                <div className="profile-post-image-wrap">

                  <img
                    src={post.image}
                    alt={post.title}
                    className="profile-post-image"
                  />

                  <span className="profile-post-theme">
                    {post.themeName}
                  </span>

                </div>

                <div className="profile-post-content">

                  <div className="profile-post-topline">

                    <span>
                      {post.date}
                    </span>

                    <strong>
                      {post.price}
                    </strong>

                  </div>

                  <h2>
                    {post.title}
                  </h2>

                  <p className="profile-post-description">
                    {post.description}
                  </p>

                  {post.details && (
                    <div className="profile-post-details">

                      <span className="profile-card-label">
                        DETAILS
                      </span>

                      <p>
                        {post.details}
                      </p>

                    </div>
                  )}

                  <div className="profile-post-footer">

                    <span>
                      By {post.username}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeletePost(post.id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>
    );
  };

  /* =========================================================
     THEMES
  ========================================================= */

  const renderThemesSection = () => {
    return (
      <section className="profile-dashboard-section">

        <div className="profile-section-intro">

          <span className="profile-section-kicker">
            Your discoveries
          </span>

          <h1>
            My Themes
          </h1>

          <p>
            The worlds and themes you've chosen to
            become part of.
          </p>

        </div>

        {account.joinedThemes.length === 0 ? (

          <div className="profile-empty-state">

            <div className="profile-empty-symbol">
              ✦
            </div>

            <span className="profile-card-label">
              NO THEMES YET
            </span>

            <h2>
              Nothing has found
              <br />
              its way here yet.
            </h2>

            <p>
              You haven't joined a community club yet.
              Explore Community and when you find one
              that feels like yours, it'll appear here.
            </p>

          </div>

        ) : (

          <div className="profile-theme-list">

            {account.joinedThemes.map((theme) => (

              <article
                className="profile-theme-card"
                key={theme.id}
              >

                <span>
                  THEME
                </span>

                <h2>
                  {theme.name}
                </h2>

                <p>
                  {theme.description}
                </p>

                <strong>
                  →
                </strong>

              </article>

            ))}

          </div>

        )}

      </section>
    );
  };

  /* =========================================================
     SUBSCRIPTION
  ========================================================= */

  const renderSubscriptionSection = () => {
    return (
      <section className="profile-dashboard-section">

        <div className="profile-section-intro">

          <span className="profile-section-kicker">
            Your mail journey
          </span>

          <h1>
            Subscription
          </h1>

          <p>
            Keep track of the subscription connected
            to your account.
          </p>

        </div>

        <div className="profile-subscription-card">

          <div>

            <span className="profile-card-label">
              CURRENT PLAN
            </span>

            <h2>
              {account.subscription.name}
            </h2>

            <p>
              {account.subscription.status}
            </p>

          </div>

          <div className="profile-subscription-mark">
            {account.subscription.active
              ? "✦"
              : "—"}
          </div>

        </div>

        {!account.subscription.active && (

          <div className="profile-empty-state profile-empty-state-small">

            <span className="profile-card-label">
              NOT SUBSCRIBED
            </span>

            <h2>
              Your mailbox is
              <br />
              still waiting.
            </h2>

            <p>
              Visit Subscription to choose your
              correspondence experience.
            </p>

          </div>

        )}

      </section>
    );
  };

  /* =========================================================
     HISTORY
  ========================================================= */

  const renderHistorySection = () => {
    return (
      <section className="profile-dashboard-section">

        <div className="profile-section-intro">

          <span className="profile-section-kicker">
            Your paper trail
          </span>

          <h1>
            History
          </h1>

          <p>
            A record of the purchases you've made
            through Art Mail Club.
          </p>

        </div>

        {account.purchases.length === 0 ? (

          <div className="profile-empty-state">

            <div className="profile-empty-symbol">
              ↺
            </div>

            <span className="profile-card-label">
              NO PURCHASES YET
            </span>

            <h2>
              Your history is
              <br />
              still empty.
            </h2>

            <p>
              When you purchase a mailer or subscription,
              it will appear here.
            </p>

          </div>

        ) : (

          <div className="profile-history-list">

            {account.purchases.map(
              (purchase, index) => (

                <article
                  className="profile-history-item"
                  key={purchase.id || index}
                >

                  <div className="profile-history-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div>

                    <span>
                      {purchase.date ||
                        "Purchase"}
                    </span>

                    <h3>
                      {purchase.name ||
                        "Art Mail Purchase"}
                    </h3>

                  </div>

                  <strong>
                    {purchase.price || "—"}
                  </strong>

                </article>

              )
            )}

          </div>

        )}

      </section>
    );
  };

  /* =========================================================
     SETTINGS
  ========================================================= */

  const renderSettingsSection = () => {
    return (
      <section className="profile-dashboard-section">

        <div className="profile-section-intro">

          <span className="profile-section-kicker">
            Your account
          </span>

          <h1>
            Settings
          </h1>

          <p>
            Change the details connected to your
            Art Mail Club account.
          </p>

        </div>

        <form
          className="profile-settings-card"
          onSubmit={handleSaveSettings}
        >

          <div className="profile-settings-field">

            <label htmlFor="profile-settings-username">
              Username
            </label>

            <input
              id="profile-settings-username"
              type="text"
              value={settingsUsername}
              onChange={(event) =>
                setSettingsUsername(
                  event.target.value
                )
              }
            />

          </div>

          <div className="profile-settings-field">

            <label htmlFor="profile-settings-email">
              Email
            </label>

            <input
              id="profile-settings-email"
              type="email"
              value={settingsEmail}
              onChange={(event) =>
                setSettingsEmail(
                  event.target.value
                )
              }
            />

          </div>

          <div className="profile-settings-divider" />

          <div className="profile-settings-password">

            <span className="profile-card-label">
              PASSWORD
            </span>

            <p>
              Password changes can be connected to
              your authentication system later.
            </p>

          </div>

          <button
            type="submit"
            className="profile-primary-button"
          >
            Save Changes
            <span>→</span>
          </button>

          <button
            type="button"
            className="profile-logout-button"
            onClick={handleLogout}
          >
            Sign out
          </button>

        </form>

      </section>
    );
  };

  /* =========================================================
     ACTIVE SECTION
  ========================================================= */

  const renderActiveSection = () => {
    switch (activeSection) {
      case "posts":
        return renderPostsSection();

      case "themes":
        return renderThemesSection();

      case "subscription":
        return renderSubscriptionSection();

      case "history":
        return renderHistorySection();

      case "settings":
        return renderSettingsSection();

      case "profile":
      default:
        return renderProfileSection();
    }
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <>
      <Navbar variant="profile" />

      <main className="profile-page">

        <div
          className="profile-background-circle profile-background-circle-one"
          aria-hidden="true"
        />

        <div
          className="profile-background-circle profile-background-circle-two"
          aria-hidden="true"
        />

        <div className="profile-dashboard">

          {/* SIDEBAR */}

          <aside className="profile-sidebar">

            <div className="profile-sidebar-top">

              <span className="profile-sidebar-kicker">
                ART MAIL CLUB
              </span>

              <h2>
                My little
                <br />
                mailbox.
              </h2>

            </div>

            <nav className="profile-navigation">

              {PROFILE_NAV_ITEMS.map((item) => (

                <button
                  type="button"
                  key={item.id}
                  className={
                    activeSection === item.id
                      ? "profile-nav-item profile-nav-item-active"
                      : "profile-nav-item"
                  }
                  onClick={() => {

                    if (item.id === "settings") {
                      handleOpenSettings();
                    } else {
                      setActiveSection(item.id);
                    }

                  }}
                >

                  <span className="profile-nav-icon">
                    {item.icon}
                  </span>

                  <span>
                    {item.label}
                  </span>

                  {activeSection === item.id && (
                    <span className="profile-nav-arrow">
                      →
                    </span>
                  )}

                </button>

              ))}

            </nav>

            <div className="profile-sidebar-bottom">

              <span>
                A quiet place
                <br />
                for your mail.
              </span>

            </div>

          </aside>

          {/* CONTENT */}

          <div className="profile-dashboard-content">

            {account &&
              renderActiveSection()}

            {!account &&
              !laterMessage &&
              !showWelcome && (

                <div className="profile-logged-out-state">

                  <h1>
                    Your mailbox is waiting.
                  </h1>

                  <button
                    type="button"
                    className="profile-primary-button"
                    onClick={() =>
                      setShowWelcome(true)
                    }
                  >
                    Create Your Account
                    <span>→</span>
                  </button>

                </div>

              )}

            {laterMessage &&
              !account && (

                <div className="profile-later-state">

                  <span className="profile-later-symbol">
                    ✦
                  </span>

                  <span className="profile-card-label">
                    NO PROBLEM
                  </span>

                  <h1>
                    Sure!
                    <br />
                    Take your time.
                  </h1>

                  <p>
                    Do explore more around Art Mail Club.
                    When you're ready to create your
                    little mailbox, we'll be right here.
                  </p>

                  <button
                    type="button"
                    className="profile-primary-button"
                    onClick={() =>
                      setShowWelcome(true)
                    }
                  >
                    Create My Account
                    <span>→</span>
                  </button>

                </div>

              )}

          </div>

        </div>

        {/* =====================================================
            CREATE POST MODAL
        ===================================================== */}

        {showCreatePost && account && (

          <div
            className="profile-modal-backdrop"
            role="presentation"
          >

            <div
              className="profile-create-post-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="create-post-title"
            >

              <button
                type="button"
                className="profile-modal-close"
                onClick={() => {
                  setShowCreatePost(false);
                  resetPostForm();
                }}
                aria-label="Close"
              >
                ×
              </button>

              <div className="profile-create-post-header">

                <span className="profile-section-kicker">
                  Share with the community
                </span>

                <h2 id="create-post-title">
                  Create a Post.
                </h2>

                <p>
                  Add your image, tell people about
                  your product, set the price, and
                  connect it to a community theme.
                </p>

              </div>

              <form
                className="profile-create-post-form"
                onSubmit={handleCreatePost}
              >

                {/* IMAGE */}

                <div className="profile-upload-section">

                  <label className="profile-upload-box">

                    {postImage ? (

                      <img
                        src={postImage}
                        alt="Post preview"
                        className="profile-upload-preview"
                      />

                    ) : (

                      <div className="profile-upload-placeholder">

                        <span>
                          +
                        </span>

                        <strong>
                          Upload Image
                        </strong>

                        <small>
                          Choose an image from your device
                        </small>

                      </div>

                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePostImageChange}
                    />

                  </label>

                  {postImageName && (
                    <span className="profile-upload-name">
                      {postImageName}
                    </span>
                  )}

                </div>

                {/* TITLE */}

                <div className="profile-post-form-field">

                  <label htmlFor="post-title">
                    Product / Post Title
                  </label>

                  <input
                    id="post-title"
                    type="text"
                    value={postTitle}
                    onChange={(event) =>
                      setPostTitle(
                        event.target.value
                      )
                    }
                    placeholder="e.g. Hand-painted postcard set"
                  />

                </div>

                {/* DESCRIPTION */}

                <div className="profile-post-form-field">

                  <label htmlFor="post-description">
                    About this product
                  </label>

                  <textarea
                    id="post-description"
                    value={postDescription}
                    onChange={(event) =>
                      setPostDescription(
                        event.target.value
                      )
                    }
                    placeholder="Tell the community what makes this special..."
                    rows="4"
                  />

                </div>

                {/* PRICE + THEME */}

                <div className="profile-post-form-row">

                  <div className="profile-post-form-field">

                    <label htmlFor="post-price">
                      Price
                    </label>

                    <div className="profile-price-input">

                      <span>
                        ₹
                      </span>

                      <input
                        id="post-price"
                        type="text"
                        value={postPrice}
                        onChange={(event) =>
                          setPostPrice(
                            event.target.value
                          )
                        }
                        placeholder="500"
                      />

                    </div>

                  </div>

                  <div className="profile-post-form-field">

                    <label htmlFor="post-theme">
                      Community Theme
                    </label>

                    <select
                      id="post-theme"
                      value={postTheme}
                      onChange={(event) =>
                        setPostTheme(
                          event.target.value
                        )
                      }
                    >

                      <option value="">
                        Choose a theme
                      </option>

                      {clubs.map((club) => (

                        <option
                          key={club.id}
                          value={club.id}
                        >
                          {club.name ||
                            club.title ||
                            "Art Mail Club"}
                        </option>

                      ))}

                    </select>

                  </div>

                </div>

                {/* DETAILS */}

                <div className="profile-post-form-field">

                  <label htmlFor="post-details">
                    Product Details
                    <span>
                      Optional
                    </span>
                  </label>

                  <textarea
                    id="post-details"
                    value={postDetails}
                    onChange={(event) =>
                      setPostDetails(
                        event.target.value
                      )
                    }
                    placeholder="Materials, size, quantity, shipping information, etc."
                    rows="4"
                  />

                </div>

                {postError && (

                  <div className="profile-post-error">
                    {postError}
                  </div>

                )}

                <div className="profile-create-post-actions">

                  <button
                    type="button"
                    className="profile-secondary-button"
                    onClick={() => {
                      setShowCreatePost(false);
                      resetPostForm();
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="profile-primary-button"
                  >
                    Post It
                    <span>→</span>
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

        {/* =====================================================
            WELCOME MODAL
        ===================================================== */}

        {showWelcome && (

          <div
            className="profile-modal-backdrop"
            role="presentation"
          >

            <div
              className="profile-welcome-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="profile-welcome-title"
            >

              <button
                type="button"
                className="profile-modal-close"
                onClick={handleCloseWelcome}
                aria-label="Close"
              >
                ×
              </button>

              <div className="profile-modal-symbol">
                ✦
              </div>

              {!showAccountForm ? (

                <>

                  <span className="profile-section-kicker">
                    Welcome to Art Mail Club
                  </span>

                  <h2 id="profile-welcome-title">
                    Your little mailbox
                    <br />
                    starts here.
                  </h2>

                  <p>
                    Create your own Art Mail Club profile
                    to keep track of your themes,
                    subscriptions, purchases, posts,
                    and everything that finds its way
                    into your mailbox.
                  </p>

                  <div className="profile-welcome-actions">

                    <button
                      type="button"
                      className="profile-primary-button"
                      onClick={
                        handleOpenAccountForm
                      }
                    >
                      Create Your Account
                      <span>→</span>
                    </button>

                    <button
                      type="button"
                      className="profile-secondary-button"
                      onClick={handleLater}
                    >
                      Maybe Later
                    </button>

                  </div>

                </>

              ) : (

                <>

                  <span className="profile-section-kicker">
                    Let's make it yours
                  </span>

                  <h2 id="profile-welcome-title">
                    Create your account.
                  </h2>

                  <p>
                    Just a few details and your personal
                    Art Mail Club space is ready.
                  </p>

                  <form
                    className="profile-account-form"
                    onSubmit={handleCreateAccount}
                  >

                    <div className="profile-form-field">

                      <label htmlFor="profile-username">
                        Username
                      </label>

                      <input
                        id="profile-username"
                        type="text"
                        value={username}
                        onChange={(event) =>
                          setUsername(
                            event.target.value
                          )
                        }
                        placeholder="Choose a username"
                        autoComplete="username"
                        required
                      />

                    </div>

                    <div className="profile-form-field">

                      <label htmlFor="profile-email">
                        Email
                      </label>

                      <input
                        id="profile-email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                          setEmail(
                            event.target.value
                          )
                        }
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                      />

                    </div>

                    <div className="profile-form-field">

                      <label htmlFor="profile-password">
                        Password
                      </label>

                      <input
                        id="profile-password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                          setPassword(
                            event.target.value
                          )
                        }
                        placeholder="Create a password"
                        autoComplete="new-password"
                        required
                      />

                    </div>

                    <button
                      type="submit"
                      className="profile-primary-button profile-create-button"
                    >
                      Create My Account
                      <span>→</span>
                    </button>

                  </form>

                </>

              )}

            </div>

          </div>

        )}

      </main>

      <Footer variant="profile" />
    </>
  );
}

export default Profile;
