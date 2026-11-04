"use client";
import { useState } from "react";
import { FEATURES } from "@/content/site";

export default function FeatureTabs() {
  const [i, setI] = useState(0);
  return (
    <div className="feat-grid-layout">
      {FEATURES.map((f, n) => (
        <div
          key={f.title}
          className={`feat-grid-card ${n === i ? "on" : ""}`}
          onMouseEnter={() => setI(n)}
          onClick={() => setI(n)}
        >
          <div className="feat-grid-icon">
            <img src={f.icon} alt="" />
          </div>
          <div className="feat-grid-text">
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
