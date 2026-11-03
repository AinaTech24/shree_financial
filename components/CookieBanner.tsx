"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem("cookieConsent")) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);
  const set = (v: string) => {
    try {
      localStorage.setItem("cookieConsent", v);
    } catch {}
    setShow(false);
  };
  if (!show) return null;
  return (
    <div className="cookie" role="dialog" aria-label="Cookie notice">
      <p>
        We use only essential cookies required for the functioning of this website. These cookies do not collect any personal or sensitive personal data. By continuing to use the website, you acknowledge our use of such cookies. For more details, please refer to our <Link href="/cookie-policy">Cookie Policy</Link> .
      </p>
      <div className="acts">
        <button className="btn btn-primary" onClick={() => set("accepted")}>Accept</button>
        <button className="btn btn-ghost" onClick={() => set("rejected")}>Reject</button>
      </div>
    </div>
  );
}
