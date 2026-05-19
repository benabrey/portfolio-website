import React from "react";
import TechStack from "../components/TechStack";

export default function page() {
  return (
    <main>
      <section className="about section" aria-label="About me">
        <div className="about-video-bg">
          <video autoPlay muted loop playsInline>
            <source src="/videos/oneZero.mp4" type="video/mp4" />
          </video>
          <div className="about-video-overlay" />
        </div>

        <div className="about reveal">
          <div className="about-image-wrap">
            <img src="/images/BenAbout.jpg" loading="lazy" alt="me" />
          </div>
          <div className="about-text">
            <h2 className="section-title">About Me</h2>
            <p className="about-body">
              I am a 3rd year computer science student with a passion for UI/UX
              design and making websites as functional and aesthetic as
              possible.
            </p>
            <a href="/works" className="hero-cta">
              <span>View My Previous Works</span>
            </a>
          </div>
        </div>
      </section>

      <section className="about techstack">
        <div className="techstack reveal">
          <TechStack />
        </div>
      </section>
    </main>
  );
}
