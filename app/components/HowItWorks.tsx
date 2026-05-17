"use client";
import { useState, useEffect, useRef } from "react";

const steps = [
  {
    num: "01",
    label: "Tell me your vision",
    desc: "Fill out the contact form with your ideas",
    video: "/videos/typing.mp4",
    body: "Fill out the contact form with your ideas, goals, and any inspiration you have. I'll respond within 48 hours to discuss your project and get things moving.",
  },
  {
    num: "02",
    label: "I build it",
    desc: "Custom coded, no templates",
    video: "/videos/personCoding.mp4",
    body: "I hand-code your site from scratch — no page builders, no templates. Clean, fast, and built exactly to your spec with regular check-ins along the way.",
  },
  {
    num: "03",
    label: "You go live",
    desc: "Launch and start growing",
    video: "/videos/celebrating.mp4",
    body: "Once you're happy with the result, I help you launch and get online. I'm available for tweaks and support after launch too.",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(()=>{
    videoRef.current?.load();
    }, [activeStep]);

  return (
    <section className="hiw">
      <div className="hiw-bg">
        <video
          ref={videoRef}
          className="hiw-bg-video"
          src={steps[activeStep].video}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hiw-bg-overlay" />
      </div>
      <div className="hiw-inner">
        <div className="section-label">How It Works</div>
        <h2 className="section-title">Three steps to your <br/> <em>dream website</em></h2>
        <p className="hiw-sub">Simple process, professional results</p>
        <div className="hiw-steps">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`hiw-step ${activeStep === i ? "active" : ""}`}
              onClick={() => setActiveStep(i)}
            >
              <div className="hiw-num">{step.num}</div>
              <div className="hiw-step-label">{step.label}</div>
              <div className="hiw-step-desc">{step.desc}</div>
              {i < steps.length -1 && <div className="hiw-connector" />}
            </div>
          ))}
        </div>
        <div className="hiw-detail">
          <div className="hiw-detail-title">{steps[activeStep].label}</div>
          <div className="hiw-detail-body">{steps[activeStep].body}</div>
        </div>
      </div>
    </section>
  );
}
