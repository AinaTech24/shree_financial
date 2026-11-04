"use client";

import React, { useState } from "react";
import { FEATURES } from "@/content/site";
import {
  LineChart,
  RefreshCw,
  Target,
  Search,
} from "lucide-react";

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  "Portfolio Analysis": <LineChart size={24} className="text-blue-600" />,
  "Invest Online": <RefreshCw size={24} className="text-blue-600" />,
  "Goal Tracker": <Target size={24} className="text-blue-600" />,
  "Research": <Search size={24} className="text-blue-600" />,
};

export default function FeatureTabs() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="platform-features-cards-grid">
      {FEATURES.map((f, idx) => (
        <div
          key={f.title}
          className={`platform-feature-card ${idx === activeIdx ? "active" : ""}`}
          onMouseEnter={() => setActiveIdx(idx)}
          onClick={() => setActiveIdx(idx)}
        >
          <div className="feature-icon-container">
            {FEATURE_ICONS[f.title] || (
              <img src={f.icon} alt={f.title} className="feature-icon-img" />
            )}
          </div>
          <div className="feature-text-container">
            <h3 className="feature-card-title">{f.title}</h3>
            <p className="feature-card-desc">{f.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
