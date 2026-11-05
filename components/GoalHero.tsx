"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { GOALS, SITE } from "@/content/site";
import { ShieldCheck, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export default function GoalHero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % GOALS.length), 6500);
    return () => clearInterval(t);
  }, [paused]);

  const go = (n: number) => setI((n + GOALS.length) % GOALS.length);
  const cur = GOALS[i];

  return (
    <section
      className="hero-redesign"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Life goals"
    >
      <div className="hero-mesh-background" />

      <div className="wrap hero-wrap">
        {/* 1. Top Regulatory & Digital Trust Badges (Image 7 Specification) */}
        <div className="hero-trust-bar">
          <div className="hero-trust-badge">
            <ShieldCheck size={15} className="text-emerald-600" />
            <span>AMFI Registered Distributor (ARN-173086) • Founded in 2007</span>
          </div>
          <div className="hero-trust-badge">
            <CheckCircle2 size={15} className="text-emerald-600" />
            <span>100% Paperless Digital Investment</span>
          </div>
        </div>

        {/* 2. Interactive Goal Tabs Selector (Image 7 Specification) */}
        <div className="hero-goal-selector-bar" role="tablist" aria-label="Goal selection">
          {GOALS.map((g, idx) => (
            <button
              key={g.title}
              type="button"
              role="tab"
              aria-selected={idx === i}
              className={`goal-tab-pill ${idx === i ? "active" : ""}`}
              onClick={() => setI(idx)}
            >
              <span>{g.title}</span>
            </button>
          ))}
        </div>

        {/* 3. Active Goal Showcase Content & Visual Grid */}
        <div className="hero-active-grid">
          <div className="hero-copy-col">
            <div className="hero-goal-eyebrow">
              <span>GOAL PLANNING</span>
            </div>

            <h1 className="hero-headline">
              Plan Your <span className="headline-highlight">{cur.title}</span> With High-Conviction Mutual Funds
            </h1>

            <p className="hero-description">{cur.text}</p>

            <div className="hero-stat-chips">
              <div className="stat-chip">
                <strong>17+</strong>
                <span>Years Legacy</span>
              </div>
              <div className="stat-chip">
                <strong>₹500</strong>
                <span>Starting SIP</span>
              </div>
              <div className="stat-chip">
                <strong>5,000+</strong>
                <span>Satisfied Clients</span>
              </div>
            </div>

            <div className="hero-actions-row">
              <Link href="/contact" className="btn btn-primary hero-btn">
                <span>Start Your {cur.title} Plan</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="btn btn-ghost hero-ghost-btn">
                <span>Explore All Services</span>
              </Link>
            </div>
          </div>

          <div className="hero-visual-col">
            <div className="hero-image-wrapper enlarged-hero-wrapper">
              <img src={cur.img} alt={cur.title} className="hero-goal-image enlarged-hero-image" />
              <div className="hero-image-glow" />
              <div className="hero-goal-overlay-badge">
                <span className="goal-badge-dot" />
                <span>{cur.title}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Carousel Navigation Controls Bar */}
        <div className="hero-controls-bar">
          <button
            type="button"
            className="hero-arrow-btn"
            aria-label="Previous goal"
            onClick={() => go(i - 1)}
          >
            <ChevronLeft size={18} />
          </button>

          <div className="hero-dots-row">
            {GOALS.map((g, n) => (
              <button
                key={g.title}
                type="button"
                className={`hero-dot-indicator ${n === i ? "active" : ""}`}
                aria-label={`Jump to ${g.title}`}
                onClick={() => setI(n)}
              />
            ))}
          </div>

          <button
            type="button"
            className="hero-arrow-btn"
            aria-label="Next goal"
            onClick={() => go(i + 1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
