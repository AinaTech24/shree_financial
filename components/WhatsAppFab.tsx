"use client";
import { useState } from "react";
import { SITE } from "@/content/site";

export default function WhatsAppFab() {
  const [open, setOpen] = useState(false);
  const link = `https://wa.me/+${SITE.whatsapp}?text=${encodeURIComponent("Hello Shah Financial Services, I would like to know more.")}`;
  return (
    <div className="wa-fab">
      {open && (
        <div className="wa-pop">
          <header>
            <img src="/img/misc/favicon.png" alt="" />
            <div><b>Shah Financial Services</b><small>Typically replies within an hour</small></div>
          </header>
          <div className="body">
            <p>Hello! How can we help you today?</p>
            <a className="btn" href={link} target="_blank" rel="noopener noreferrer">Whatsapp</a>
          </div>
        </div>
      )}
      <button className="wa-btn" aria-label="Chat on WhatsApp" aria-expanded={open} onClick={() => setOpen(!open)}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.1L2 22l5-1.6A9.9 9.9 0 1 0 12.04 2Zm5.7 14c-.24.67-1.4 1.28-1.93 1.33-.5.05-1.12.07-1.8-.11a12 12 0 0 1-5.5-4.1c-.5-.7-1.2-1.8-1.2-2.9 0-1.1.57-1.64.78-1.87.2-.22.44-.28.58-.28h.42c.14 0 .32-.05.5.38.2.47.65 1.6.7 1.72.06.12.1.26.02.42-.08.16-.12.26-.24.4l-.36.42c-.12.12-.24.25-.1.49.14.24.62 1.02 1.33 1.65.9.8 1.7 1.06 1.94 1.18.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12l1.66.78c.22.1.37.16.42.25.05.1.05.55-.19 1.22Z" /></svg>
      </button>
    </div>
  );
}
