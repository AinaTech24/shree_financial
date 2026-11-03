"use client";
import { useState } from "react";
import { FEATURES, SITE } from "@/content/site";

export default function FeatureTabs() {
  const [i, setI] = useState(0);
  return (
    <div className="feat">
      <div className="feat-phone"><img key={i} src={FEATURES[i].img} alt={FEATURES[i].title} /></div>
      <div>
        <div className="feat-list">
          {FEATURES.map((f, n) => (
            <button key={f.title} className={`feat-item ${n === i ? "on" : ""}`} onMouseEnter={() => setI(n)} onFocus={() => setI(n)} onClick={() => setI(n)}>
              <img src={f.icon} alt="" />
              <span><h3>{f.title}</h3><p>{f.text}</p></span>
            </button>
          ))}
        </div>
        <div className="stores">
          <a href={SITE.playStore} target="_blank" rel="noopener noreferrer"><img src="/img/misc/android-btn.webp" alt="Get it on Google Play" /></a>
          <a href={SITE.appStore} target="_blank" rel="noopener noreferrer"><img src="/img/misc/apple-btn.webp" alt="Download on the App Store" /></a>
        </div>
      </div>
    </div>
  );
}
