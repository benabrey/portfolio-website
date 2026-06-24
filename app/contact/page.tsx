"use client";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult("Sending...");
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "bcbe5fa4-b2bd-4650-bc3a-ed9dc54e822b");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (data.success) {
      setResult("Message Sent!");
      (e.target as HTMLFormElement).reset();
    } else {
      setResult("Something went wrong. Try again");
    }
  };

  return (
    <main className="contact-page">
      {/* Rainbow stripe */}
      <div className="rainbow-stripe">
        <span className="s1" />
        <span className="s2" />
        <span className="s3" />
        <span className="s4" />
        <span className="s5" />
        <span className="s6" />
      </div>

      <section className="contact-hero">
        <div className="contact-sunburst" />

        <motion.div
          className="contact-inner"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="contact-side-badge" variants={fadeUp}>
            ✦ Side C ✦
          </motion.div>

          <motion.h1 className="contact-title" variants={fadeUp}>
            It&apos;s all in the
            <span className="contact-title-accent"> Details</span>
          </motion.h1>

          <motion.p className="contact-sub" variants={fadeUp}>
            Got a project in mind? Send over the details and I&apos;ll get back
            to you.
          </motion.p>

          <motion.form
            className="contact-form"
            variants={stagger}
            onSubmit={onSubmit}
          >
            <motion.div className="form-group" variants={fadeUp}>
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                className="form-input"
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                required
              />
            </motion.div>

            <motion.div className="form-group" variants={fadeUp}>
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </motion.div>

            <motion.div className="form-group" variants={fadeUp}>
              <label className="form-label" htmlFor="message">
                Your Vision
              </label>
              <textarea
                className="form-input form-textarea"
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                rows={5}
                required
              />
            </motion.div>

            <motion.button
              className="form-submit"
              type="submit"
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Send It ✦
            </motion.button>
            {result && (
              <motion.p
                className="form-result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {result}
              </motion.p>
            )}
          </motion.form>
        </motion.div>
      </section>

      <div className="rainbow-stripe">
        <span className="s6" />
        <span className="s5" />
        <span className="s4" />
        <span className="s3" />
        <span className="s2" />
        <span className="s1" />
      </div>
    </main>
  );
}
