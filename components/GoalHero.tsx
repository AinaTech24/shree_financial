  "use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { GOALS, SITE, tel } from "@/content/site";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Phone, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function GoalHero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % GOALS.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const go = (n: number) => setI((n + GOALS.length) % GOALS.length);
  const cur = GOALS[i];

  return (
    <section
      className="hero-redesign-clean"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Life goals"
    >
      <div className="hero-ambient-bg" />

<<<<<<< HEAD
      <div className="wrap hero-wrap">
        {/* Active Goal Showcase Grid */}
        <div className="hero-active-grid">
          <div className="hero-copy-col">
            <div className="hero-goal-eyebrow">
              <Sparkles size={14} className="sparkle-icon" />
              <span>Targeted Goal Planning</span>
=======
      <div className="wrap hero-clean-wrap">
        {/* Main 2-Column Hero Showcase (Vertically Centered & Large Image) */}
        <div className="hero-centered-grid">
          {/* Centered Left Content Column */}
          <div className="hero-copy-centered">
            <div className="hero-badge-eyebrow">
              <Sparkles size={14} className="sparkle-amber" />
              <span>Targeted Goal Planning • Mutual Funds &amp; PMS</span>
>>>>>>> f79a62daf99d52674dfc4ea3f048d39e8db3d898
            </div>

            <h1 className="hero-main-title">
              Plan Your <span className="title-gradient">{cur.title}</span> With High-Conviction Schemes
            </h1>

            <p className="hero-main-sub">{cur.text}</p>

            <div className="hero-stats-band">
              <div className="h-stat-item">
                <strong>17+ Years</strong>
                <span>Advisory Legacy</span>
              </div>
              <div className="h-stat-sep" />
              <div className="h-stat-item">
                <strong>ARN-173086</strong>
                <span>AMFI Registered</span>
              </div>
              <div className="h-stat-sep" />
              <div className="h-stat-item">
                <strong>5,000+</strong>
                <span>Satisfied Clients</span>
              </div>
            </div>

<<<<<<< HEAD
            <div className="hero-actions-row">
              <Link href="/contact" className="btn btn-primary hero-btn">
                <span>Start Your {cur.title} Plan</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="btn btn-ghost hero-ghost-btn">
                <span>Explore All Services</span>
=======
            <div className="hero-cta-group">
              <Link href="/login" className="btn btn-primary hero-primary-btn">
                <span>{cur.cta}</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn btn-ghost hero-secondary-btn">
                <span>Book Free Consultation</span>
>>>>>>> f79a62daf99d52674dfc4ea3f048d39e8db3d898
              </Link>
            </div>
          </div>

<<<<<<< HEAD
          <div className="hero-visual-col">
            <div className="hero-image-wrapper enlarged-hero-wrapper">
              <img src={cur.img} alt={cur.title} className="hero-goal-image enlarged-hero-image" />
              <div className="hero-image-glow" />
              <div className="hero-goal-overlay-badge">
                <span className="goal-badge-dot" />
                <span>{cur.title}</span>
              </div>
=======
          {/* Large Scale Visual Column (Matching Content Height) */}
          <div className="hero-visual-large">
            <div className="hero-large-image-box">
              <img
                src={cur.img}
                alt={cur.title}
                className="hero-large-image"
                loading="eager"
              />
              <div className="hero-glow-backdrop" />
>>>>>>> f79a62daf99d52674dfc4ea3f048d39e8db3d898
            </div>
          </div>
        </div>

        {/* Carousel Controls Bar */}
        <div className="hero-carousel-nav">
          <button
            type="button"
            className="carousel-nav-btn prev"
            aria-label="Previous Goal"
            onClick={() => go(i - 1)}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="carousel-dots-group">
            {GOALS.map((g, n) => (
              <button
                key={g.title}
                type="button"
                className={`carousel-dot-pill ${n === i ? "active" : ""}`}
                aria-label={`Switch to ${g.title}`}
                onClick={() => setI(n)}
              >
                <span className="dot-label">{g.title}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="carousel-nav-btn next"
            aria-label="Next Goal"
            onClick={() => go(i + 1)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
