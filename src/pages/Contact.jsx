import "../components/Contact/Contact.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import bg3 from "../assets/images/other/bg3.jpeg";

function Contact() {
  return (
    <>
      <Navbar variant="contact" />

      <main className="contact">

        {/* ==================================================
            BACKGROUND ARTWORK
            ================================================== */}

        <img
          className="contact-background"
          src={bg3}
          alt=""
        />

        {/* ==================================================
            SUBTLE OVERLAY
            ================================================== */}

        <div className="contact-overlay" />

        {/* ==================================================
            CONTACT CONTENT
            ================================================== */}

        <section className="contact-content">

          <div className="contact-card">

            <p className="contact-tag">
              Join Our Journey
            </p>

            <h1>
              Ready to Exchange
              <br />
              Your First Letter?
            </h1>

            <p className="contact-intro">
              Become part of a warm community where creativity,
              kindness, and handwritten stories are shared one
              envelope at a time.
            </p>

            <form className="contact-form">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
              />

              <textarea
                name="message"
                rows="5"
                placeholder="Tell us why you'd love to join..."
                required
              />

              <button type="submit">
                Join the Club
              </button>

            </form>

          </div>

        </section>

      </main>
<Footer variant="contact" />
    </>
  );
}

export default Contact;
