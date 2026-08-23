import { useEffect, useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Footer from "../components/Footer/Footer";

import "../components/Hero/Home.css";

import product1 from "../assets/images/other/1.jpeg";
import product2 from "../assets/images/other/2.jpeg";
import product3 from "../assets/images/other/3.jpeg";
import product4 from "../assets/images/other/4.jpeg";
import product5 from "../assets/images/other/5.jpeg";
import product6 from "../assets/images/other/6.jpeg";

import { clubs } from "../data/communityData";

/* =========================================================
   DEFAULT PRODUCTS
========================================================= */

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    image: product1,
    category: "Stationery",
    name: "Garden Letter Set",
    description:
      "A soft collection of beautiful papers made for handwritten notes.",
    price: "$12",
    seller: {
      username: "Art Mail Club",
      email: "hello@artmailclub.com",
    },
    theme: "Garden Letters",
    isCommunityPost: false,
  },
  {
    id: 2,
    image: product2,
    category: "Happy Mail",
    name: "Happy Mail Bundle",
    description:
      "A charming little bundle for sending something thoughtful.",
    price: "$18",
    seller: {
      username: "Art Mail Club",
      email: "hello@artmailclub.com",
    },
    theme: "Happy Mail",
    isCommunityPost: false,
  },
  {
    id: 3,
    image: product3,
    category: "Stickers",
    name: "Vintage Sticker Pack",
    description:
      "Tiny illustrated details to make every envelope feel personal.",
    price: "$8",
    seller: {
      username: "Art Mail Club",
      email: "hello@artmailclub.com",
    },
    theme: "Vintage Paper",
    isCommunityPost: false,
  },
  {
    id: 4,
    image: product4,
    category: "Letters",
    name: "Handwritten Notes Set",
    description:
      "Beautiful cards designed for slow conversations and warm words.",
    price: "$14",
    seller: {
      username: "Art Mail Club",
      email: "hello@artmailclub.com",
    },
    theme: "Slow Correspondence",
    isCommunityPost: false,
  },
  {
    id: 5,
    image: product5,
    category: "Postcards",
    name: "Little World Postcards",
    description:
      "A collection of illustrated postcards ready for your next story.",
    price: "$10",
    seller: {
      username: "Art Mail Club",
      email: "hello@artmailclub.com",
    },
    theme: "Little Worlds",
    isCommunityPost: false,
  },
  {
    id: 6,
    image: product6,
    category: "Mail Club",
    name: "The Letter Lover Kit",
    description:
      "Everything you need to turn an ordinary letter into a keepsake.",
    price: "$24",
    seller: {
      username: "Art Mail Club",
      email: "hello@artmailclub.com",
    },
    theme: "Letter Lovers",
    isCommunityPost: false,
  },
];

/* =========================================================
   STORAGE
========================================================= */

const COMMUNITY_POSTS_KEY = "art-mail-community-posts";

function getSavedCommunityPosts() {
  try {
    const saved = localStorage.getItem(COMMUNITY_POSTS_KEY);

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/* =========================================================
   PRICE
========================================================= */

function formatPrice(value) {
  const cleaned = String(value || "")
    .replace(/[^0-9.]/g, "")
    .trim();

  if (!cleaned) {
    return "$0";
  }

  return `$${Number(cleaned).toFixed(2)}`;
}

/* =========================================================
   HOME
========================================================= */

function Home() {
  const [communityPosts, setCommunityPosts] = useState(
    () => getSavedCommunityPosts()
  );

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showCreatePost, setShowCreatePost] = useState(false);

  /*
   * Product/payment flow:
   *
   * details
   *    ↓
   * payment
   *    ↓
   * processing
   *    ↓
   * complete
   */
  const [paymentStep, setPaymentStep] = useState("details");

  /* =========================================================
     CREATE POST STATE
  ========================================================= */

  const [postImage, setPostImage] = useState("");
  const [postName, setPostName] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postPrice, setPostPrice] = useState("");
  const [postTheme, setPostTheme] = useState("");

  /* =========================================================
     PAYMENT STATE
  ========================================================= */

  const [paymentName, setPaymentName] = useState("");
  const [paymentEmail, setPaymentEmail] = useState("");

  /* Shipping address */
  const [paymentAddress, setPaymentAddress] = useState("");
  const [paymentCity, setPaymentCity] = useState("");
  const [paymentState, setPaymentState] = useState("");
  const [paymentZip, setPaymentZip] = useState("");
  const [paymentCountry, setPaymentCountry] = useState("");

  /* Fake card details */
  const [paymentCard, setPaymentCard] = useState("");
  const [paymentExpiry, setPaymentExpiry] = useState("");
  const [paymentCvv, setPaymentCvv] = useState("");

  const [orderNumber, setOrderNumber] = useState("");

  /* =========================================================
     COMMUNITY POSTS
  ========================================================= */

  useEffect(() => {
    const handlePostUpdate = () => {
      setCommunityPosts(getSavedCommunityPosts());
    };

    window.addEventListener(
      "art-mail-profile-update",
      handlePostUpdate
    );

    window.addEventListener(
      "art-mail-community-post-update",
      handlePostUpdate
    );

    window.addEventListener(
      "storage",
      handlePostUpdate
    );

    return () => {
      window.removeEventListener(
        "art-mail-profile-update",
        handlePostUpdate
      );

      window.removeEventListener(
        "art-mail-community-post-update",
        handlePostUpdate
      );

      window.removeEventListener(
        "storage",
        handlePostUpdate
      );
    };
  }, []);

  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== "Escape") {
        return;
      }

      if (paymentStep === "processing") {
        return;
      }

      if (showCreatePost) {
        setShowCreatePost(false);
        return;
      }

      if (paymentStep === "complete") {
        setSelectedProduct(null);
        setPaymentStep("details");
        setOrderNumber("");
        return;
      }

      if (paymentStep === "payment") {
        setPaymentStep("details");
        return;
      }

      if (selectedProduct) {
        setSelectedProduct(null);
      }
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
  }, [
    paymentStep,
    selectedProduct,
    showCreatePost,
  ]);

  /* =========================================================
     ALL PRODUCTS
  ========================================================= */

  const products = [
    ...communityPosts.map((post) => ({
      ...post,
      isCommunityPost: true,
    })),
    ...DEFAULT_PRODUCTS,
  ];

  /* =========================================================
     RESET PAYMENT
  ========================================================= */

  const clearPaymentForm = () => {
    setPaymentName("");
    setPaymentEmail("");

    setPaymentAddress("");
    setPaymentCity("");
    setPaymentState("");
    setPaymentZip("");
    setPaymentCountry("");

    setPaymentCard("");
    setPaymentExpiry("");
    setPaymentCvv("");

    setOrderNumber("");
  };

  /* =========================================================
     CLOSE PRODUCT MODAL
  ========================================================= */

  const closeProductModal = () => {
    if (paymentStep === "processing") {
      return;
    }

    setSelectedProduct(null);
    setPaymentStep("details");
    clearPaymentForm();
  };

  /* =========================================================
     CLOSE ALL MODALS
  ========================================================= */

  const closeAllModals = () => {
    setSelectedProduct(null);
    setShowCreatePost(false);
    setPaymentStep("details");
    clearPaymentForm();
  };

  /* =========================================================
     VIEW DETAILS
  ========================================================= */

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setPaymentStep("details");
    clearPaymentForm();
    setShowCreatePost(false);
  };

  /* =========================================================
     BUY
  ========================================================= */

  const handleBuy = () => {
    if (!selectedProduct) {
      return;
    }

    setPaymentStep("payment");
  };

  /* =========================================================
     BACK TO DETAILS
  ========================================================= */

  const handleBackToDetails = () => {
    if (paymentStep === "processing") {
      return;
    }

    setPaymentStep("details");
  };

  /* =========================================================
     PAYMENT SUBMIT
     
     FAKE PAYMENT ONLY.
     No card/payment information is sent anywhere.
  ========================================================= */

  const handlePaymentSubmit = (event) => {
    event.preventDefault();

    if (!selectedProduct) {
      return;
    }

    const cardDigits = paymentCard.replace(/\D/g, "");
    const expiryDigits = paymentExpiry.replace(/\D/g, "");
    const cvvDigits = paymentCvv.replace(/\D/g, "");

    /*
     * Basic required-field validation.
     */

    if (!paymentName.trim()) {
      return;
    }

    if (!paymentEmail.trim()) {
      return;
    }

    if (!paymentAddress.trim()) {
      return;
    }

    if (!paymentCity.trim()) {
      return;
    }

    if (!paymentState.trim()) {
      return;
    }

    if (!paymentZip.trim()) {
      return;
    }

    if (!paymentCountry.trim()) {
      return;
    }

    /*
     * Fake card validation.
     */

    if (cardDigits.length !== 16) {
      return;
    }

    if (expiryDigits.length !== 4) {
      return;
    }

    if (cvvDigits.length < 3) {
      return;
    }

    /*
     * Generate fake order number.
     */

    const generatedOrderNumber =
      `AMC-${String(
        Math.floor(100000 + Math.random() * 900000)
      )}`;

    setOrderNumber(generatedOrderNumber);

    /*
     * Show fake processing screen.
     */

    setPaymentStep("processing");

    /*
     * Fake payment delay.
     */

    window.setTimeout(() => {
      setPaymentStep("complete");
    }, 1200);
  };

  /* =========================================================
     CARD FORMATTING
  ========================================================= */

  const handleCardChange = (event) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 16);

    const formatted =
      value.match(/.{1,4}/g)?.join(" ") || "";

    setPaymentCard(formatted);
  };

  /* =========================================================
     EXPIRY FORMATTING
  ========================================================= */

  const handleExpiryChange = (event) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 4);

    if (value.length <= 2) {
      setPaymentExpiry(value);
      return;
    }

    setPaymentExpiry(
      `${value.slice(0, 2)} / ${value.slice(2)}`
    );
  };

  /* =========================================================
     CVV
  ========================================================= */

  const handleCvvChange = (event) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 4);

    setPaymentCvv(value);
  };

  /* =========================================================
     PIN / ZIP
  ========================================================= */

  const handleZipChange = (event) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 10);

    setPaymentZip(value);
  };

  /* =========================================================
     IMAGE UPLOAD
  ========================================================= */

  const handlePostImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPostImage(
        typeof reader.result === "string"
          ? reader.result
          : ""
      );
    };

    reader.readAsDataURL(file);
  };

  /* =========================================================
     CREATE POST
  ========================================================= */

  const handleCreatePost = (event) => {
    event.preventDefault();

    if (!postImage) {
      return;
    }

    if (!postName.trim()) {
      return;
    }

    if (!postDescription.trim()) {
      return;
    }

    if (!postPrice.trim()) {
      return;
    }

    let savedAccount = null;

    try {
      const saved = localStorage.getItem(
        "artMailProfile"
      );

      if (saved) {
        savedAccount = JSON.parse(saved);
      }
    } catch {
      savedAccount = null;
    }

    const username =
      savedAccount?.username ||
      "Art Mail Member";

    const email =
      savedAccount?.email ||
      "Member of Art Mail Club";

    const selectedClub = clubs.find(
      (club) =>
        String(club.id) === String(postTheme)
    );

    const themeName =
      selectedClub?.name ||
      selectedClub?.title ||
      postTheme ||
      "Art Mail Community";

    const newPost = {
      id:
        `community-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,

      image: postImage,

      category:
        postCategory.trim() ||
        "Community Market",

      name:
        postName.trim(),

      description:
        postDescription.trim(),

      price:
        formatPrice(postPrice),

      theme:
        themeName,

      themeId:
        selectedClub?.id ||
        postTheme ||
        "",

      seller: {
        username,
        email,
      },

      createdBy:
        username,

      createdAt:
        new Date().toISOString(),

      isCommunityPost: true,
    };

    const updatedPosts = [
      newPost,
      ...getSavedCommunityPosts(),
    ];

    localStorage.setItem(
      COMMUNITY_POSTS_KEY,
      JSON.stringify(updatedPosts)
    );

    setCommunityPosts(updatedPosts);

    window.dispatchEvent(
      new Event(
        "art-mail-community-post-update"
      )
    );

    setPostImage("");
    setPostName("");
    setPostCategory("");
    setPostDescription("");
    setPostPrice("");
    setPostTheme("");

    setShowCreatePost(false);
  };

  /* =========================================================
     OPEN CREATE POST
  ========================================================= */

  const openCreatePost = () => {
    setSelectedProduct(null);
    setPaymentStep("details");
    setShowCreatePost(true);
  };

  /* =========================================================
     PRODUCT / PAYMENT MODAL
  ========================================================= */

  const renderProductModal = () => {
    if (!selectedProduct) {
      return null;
    }

    return (
      <div
        className="home-modal-backdrop"
        role="presentation"
        onMouseDown={(event) => {
          if (
            event.target !== event.currentTarget
          ) {
            return;
          }

          if (paymentStep === "processing") {
            return;
          }

          closeProductModal();
        }}
      >
        <div
          className={
            paymentStep === "details"
              ? "home-product-modal"
              : "home-payment-modal"
          }
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
        >
          {/* =====================================
              CLOSE BUTTON
          ===================================== */}

          <button
            type="button"
            className="home-modal-close"
            onClick={closeProductModal}
            disabled={
              paymentStep === "processing"
            }
            aria-label="Close"
          >
            ×
          </button>

          {/* =====================================
              PRODUCT DETAILS
          ===================================== */}

          {paymentStep === "details" && (
            <>
              <div className="home-product-modal-image">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                />
              </div>

              <div className="home-product-modal-content">
                <span className="home-modal-kicker">
                  {selectedProduct.category}
                </span>

                <h2 id="product-modal-title">
                  {selectedProduct.name}
                </h2>

                <div className="home-product-modal-price">
                  {selectedProduct.price}
                </div>

                <p className="home-product-modal-description">
                  {selectedProduct.description}
                </p>

                <div className="home-product-detail-block">
                  <span>
                    PRODUCT DETAILS
                  </span>

                  <p>
                    Carefully shared through the
                    Art Mail Club community. A small
                    piece made for writing, collecting,
                    decorating, or sending something
                    meaningful.
                  </p>
                </div>

                <div className="home-product-seller">
                  <div className="home-seller-avatar">
                    {selectedProduct.seller?.username
                      ?.charAt(0)
                      ?.toUpperCase() || "A"}
                  </div>

                  <div>
                    <span>
                      POSTED BY
                    </span>

                    <strong>
                      {selectedProduct.seller
                        ?.username ||
                        "Art Mail Member"}
                    </strong>

                    <small>
                      {selectedProduct.seller
                        ?.email ||
                        "Art Mail Club member"}
                    </small>
                  </div>
                </div>

                <div className="home-product-theme">
                  <span>
                    COMMUNITY THEME
                  </span>

                  <strong>
                    {selectedProduct.theme ||
                      "Art Mail Community"}
                  </strong>
                </div>

                <button
                  type="button"
                  className="home-modal-primary-button"
                  onClick={handleBuy}
                >
                  Buy This Piece
                  <span>→</span>
                </button>
              </div>
            </>
          )}

          {/* =====================================
              PAYMENT
          ===================================== */}

          {paymentStep === "payment" && (
            <>
              <div className="home-payment-heading">
                <span className="home-modal-kicker">
                  ART MAIL CHECKOUT
                </span>

                <h2 id="product-modal-title">
                  A little something
                  <br />
                  is coming your way.
                </h2>
              </div>

              <div className="home-payment-product">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                />

                <div>
                  <span>
                    {selectedProduct.category}
                  </span>

                  <h3>
                    {selectedProduct.name}
                  </h3>

                  <strong>
                    {selectedProduct.price}
                  </strong>
                </div>
              </div>

              <form
                className="home-payment-form"
                onSubmit={handlePaymentSubmit}
              >
                {/* =================================
                    CUSTOMER INFORMATION
                ================================= */}

                <div className="home-form-row">
                  <div className="home-form-field">
                    <label htmlFor="payment-name">
                      Name
                    </label>

                    <input
                      id="payment-name"
                      type="text"
                      value={paymentName}
                      onChange={(event) =>
                        setPaymentName(
                          event.target.value
                        )
                      }
                      placeholder="Your name"
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="home-form-field">
                    <label htmlFor="payment-email">
                      Email
                    </label>

                    <input
                      id="payment-email"
                      type="email"
                      value={paymentEmail}
                      onChange={(event) =>
                        setPaymentEmail(
                          event.target.value
                        )
                      }
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                {/* =================================
                    SHIPPING ADDRESS
                ================================= */}

                <div className="home-checkout-section">
                  <span className="home-checkout-section-title">
                    SHIPPING ADDRESS
                  </span>

                  <div className="home-form-field">
                    <label htmlFor="payment-address">
                      Street Address
                    </label>

                    <input
                      id="payment-address"
                      type="text"
                      value={paymentAddress}
                      onChange={(event) =>
                        setPaymentAddress(
                          event.target.value
                        )
                      }
                      placeholder="123 Garden Street"
                      autoComplete="street-address"
                      required
                    />
                  </div>

                  <div className="home-form-row">
                    <div className="home-form-field">
                      <label htmlFor="payment-city">
                        City
                      </label>

                      <input
                        id="payment-city"
                        type="text"
                        value={paymentCity}
                        onChange={(event) =>
                          setPaymentCity(
                            event.target.value
                          )
                        }
                        placeholder="New Delhi"
                        autoComplete="address-level2"
                        required
                      />
                    </div>

                    <div className="home-form-field">
                      <label htmlFor="payment-state">
                        State
                      </label>

                      <input
                        id="payment-state"
                        type="text"
                        value={paymentState}
                        onChange={(event) =>
                          setPaymentState(
                            event.target.value
                          )
                        }
                        placeholder="Delhi"
                        autoComplete="address-level1"
                        required
                      />
                    </div>
                  </div>

                  <div className="home-form-row">
                    <div className="home-form-field">
                      <label htmlFor="payment-zip">
                        ZIP / PIN Code
                      </label>

                      <input
                        id="payment-zip"
                        type="text"
                        inputMode="numeric"
                        value={paymentZip}
                        onChange={handleZipChange}
                        placeholder="110001"
                        autoComplete="postal-code"
                        required
                      />
                    </div>

                    <div className="home-form-field">
                      <label htmlFor="payment-country">
                        Country
                      </label>

                      <input
                        id="payment-country"
                        type="text"
                        value={paymentCountry}
                        onChange={(event) =>
                          setPaymentCountry(
                            event.target.value
                          )
                        }
                        placeholder="India"
                        autoComplete="country-name"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* =================================
                    FAKE PAYMENT INFORMATION
                ================================= */}

                <div className="home-checkout-section">
                  <span className="home-checkout-section-title">
                    PAYMENT DETAILS
                  </span>

                  <div className="home-form-field">
                    <label htmlFor="payment-card">
                      Card Number
                    </label>

                    <input
                      id="payment-card"
                      type="text"
                      inputMode="numeric"
                      maxLength="19"
                      value={paymentCard}
                      onChange={handleCardChange}
                      placeholder="4242 4242 4242 4242"
                      autoComplete="cc-number"
                      required
                    />
                  </div>

                  <div className="home-form-row">
                    <div className="home-form-field">
                      <label htmlFor="payment-expiry">
                        Expiry
                      </label>

                      <input
                        id="payment-expiry"
                        type="text"
                        inputMode="numeric"
                        maxLength="7"
                        value={paymentExpiry}
                        onChange={handleExpiryChange}
                        placeholder="MM / YY"
                        autoComplete="cc-exp"
                        required
                      />
                    </div>

                    <div className="home-form-field">
                      <label htmlFor="payment-cvv">
                        CVV
                      </label>

                      <input
                        id="payment-cvv"
                        type="text"
                        inputMode="numeric"
                        maxLength="4"
                        value={paymentCvv}
                        onChange={handleCvvChange}
                        placeholder="123"
                        autoComplete="cc-csc"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* =================================
                    DEMO NOTE
                ================================= */}

                <div className="home-payment-note">
                  <span>✦</span>

                  <p>
                    This is a fictional payment
                    experience. No real payment will
                    be processed.
                  </p>
                </div>

                {/* =================================
                    ACTIONS
                ================================= */}

                <div className="home-payment-actions">
                  <button
                    type="button"
                    className="home-modal-secondary-button"
                    onClick={handleBackToDetails}
                  >
                    ← Back
                  </button>

                  <button
                    type="submit"
                    className="home-modal-primary-button"
                  >
                    Pay {selectedProduct.price}
                    <span>→</span>
                  </button>
                </div>
              </form>
            </>
          )}

          {/* =====================================
              PROCESSING
          ===================================== */}

          {paymentStep === "processing" && (
            <div className="home-payment-processing">
              <div className="home-payment-loader">
                ✦
              </div>

              <span className="home-modal-kicker">
                ART MAIL CHECKOUT
              </span>

              <h2>
                Preparing your little
                <br />
                receipt...
              </h2>

              <p>
                This is a pretend checkout for
                your Art Mail Club experience.
              </p>
            </div>
          )}

          {/* =====================================
              COMPLETE
          ===================================== */}

          {paymentStep === "complete" && (
            <div className="home-payment-success">
              <div className="home-success-symbol">
                ✦
              </div>

              <span className="home-modal-kicker">
                ORDER CONFIRMED
              </span>

              <h2>
                It's on
                <br />
                its way.
              </h2>

              <p>
                Thank you for your purchase.
                Your little piece of happy mail
                has been added to your order.
              </p>

              <div className="home-order-number">
                <span>
                  ORDER
                </span>

                <strong>
                  {orderNumber}
                </strong>
              </div>

              <button
                type="button"
                className="home-modal-primary-button"
                onClick={closeAllModals}
              >
                Back to Art Mail
                <span>→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  /* =========================================================
     CREATE POST MODAL
  ========================================================= */

  const renderCreatePostModal = () => {
    if (!showCreatePost) {
      return null;
    }

    return (
      <div
        className="home-modal-backdrop"
        role="presentation"
        onMouseDown={(event) => {
          if (
            event.target === event.currentTarget
          ) {
            setShowCreatePost(false);
          }
        }}
      >
        <div
          className="home-create-post-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-post-title"
        >
          <button
            type="button"
            className="home-modal-close"
            onClick={() =>
              setShowCreatePost(false)
            }
            aria-label="Close create post"
          >
            ×
          </button>

          <div className="home-create-post-heading">
            <span className="home-modal-kicker">
              COMMUNITY MARKET
            </span>

            <h2 id="create-post-title">
              Share a little
              <br />
              something.
            </h2>

            <p>
              Post your own piece of happy mail for
              the Art Mail Club community.
            </p>
          </div>

          <form
            className="home-create-post-form"
            onSubmit={handleCreatePost}
          >
            <div className="home-upload-area">
              {postImage ? (
                <div className="home-upload-preview">
                  <img
                    src={postImage}
                    alt="Product preview"
                  />

                  <label
                    htmlFor="post-image"
                    className="home-change-image"
                  >
                    Change Image
                  </label>
                </div>
              ) : (
                <label
                  htmlFor="post-image"
                  className="home-upload-label"
                >
                  <span className="home-upload-symbol">
                    +
                  </span>

                  <strong>
                    Upload your image
                  </strong>

                  <small>
                    JPG, PNG or WEBP
                  </small>
                </label>
              )}

              <input
                id="post-image"
                type="file"
                accept="image/*"
                onChange={handlePostImageChange}
                hidden
              />
            </div>

            <div className="home-form-row">
              <div className="home-form-field">
                <label htmlFor="post-name">
                  Product Name
                </label>

                <input
                  id="post-name"
                  type="text"
                  value={postName}
                  onChange={(event) =>
                    setPostName(
                      event.target.value
                    )
                  }
                  placeholder="What are you sharing?"
                  required
                />
              </div>

              <div className="home-form-field">
                <label htmlFor="post-category">
                  Category
                </label>

                <input
                  id="post-category"
                  type="text"
                  value={postCategory}
                  onChange={(event) =>
                    setPostCategory(
                      event.target.value
                    )
                  }
                  placeholder="Stationery, stickers..."
                />
              </div>
            </div>

            <div className="home-form-row">
              <div className="home-form-field">
                <label htmlFor="post-price">
                  Price
                </label>

                <input
                  id="post-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={postPrice}
                  onChange={(event) =>
                    setPostPrice(
                      event.target.value
                    )
                  }
                  placeholder="12.00"
                  required
                />
              </div>

              <div className="home-form-field">
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
                        "Art Mail Theme"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="home-form-field">
              <label htmlFor="post-description">
                Product Details
              </label>

              <textarea
                id="post-description"
                value={postDescription}
                onChange={(event) =>
                  setPostDescription(
                    event.target.value
                  )
                }
                placeholder="Tell people about your piece, what's included, its condition, size, story..."
                rows="5"
                required
              />
            </div>

            <div className="home-create-post-note">
              <span>✦</span>

              <p>
                Your username and email from your
                Art Mail profile will be shown with
                the post.
              </p>
            </div>

            <button
              type="submit"
              className="home-modal-primary-button"
            >
              Publish My Post
              <span>→</span>
            </button>
          </form>
        </div>
      </div>
    );
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="home-page intro-running">
      <Navbar />

      <main>
        <Hero />

        <section className="featured-products">
          <div className="featured-products-overlay" />

          <div className="featured-products-inner">
            <div className="featured-heading">
              <p className="featured-eyebrow">
                From the Art Mail Club
              </p>

              <h2>
                Little Things
                <br />
                Made for Happy Mail
              </h2>

              <p className="featured-description">
                Thoughtfully chosen pieces for
                writing, decorating, collecting,
                and sending something meaningful
                to someone you love.
              </p>

              <button
                type="button"
                className="featured-create-post-button"
                onClick={openCreatePost}
              >
                Create a Post
                <span>+</span>
              </button>
            </div>

            <div className="featured-product-grid">
              {products.map((product, index) => (
                <article
                  className="featured-product-card"
                  key={product.id}
                >
                  <div className="featured-product-image">
                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <span className="featured-product-number">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    {product.isCommunityPost && (
                      <span className="featured-community-badge">
                        COMMUNITY
                      </span>
                    )}
                  </div>

                  <div className="featured-product-info">
                    <p className="featured-product-category">
                      {product.category}
                    </p>

                    <h3>
                      {product.name}
                    </h3>

                    <p className="featured-product-description">
                      {product.description}
                    </p>

                    {product.isCommunityPost &&
                      product.seller && (
                        <p className="featured-product-seller">
                          Posted by{" "}
                          <strong>
                            {product.seller.username}
                          </strong>
                        </p>
                      )}

                    <div className="featured-product-bottom">
                      <span className="featured-product-price">
                        {product.price}
                      </span>

                      <button
                        className="featured-product-link"
                        type="button"
                        onClick={() =>
                          handleViewDetails(product)
                        }
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer variant="home" />

      {renderProductModal()}

      {renderCreatePostModal()}
    </div>
  );
}

export default Home;
