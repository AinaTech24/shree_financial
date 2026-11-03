"use client";
import Script from "next/script";
import { useState } from "react";
import { SITE } from "@/content/site";

declare global {
  interface Window {
    GetSubmitLogin?: () => boolean | void;
  }
}

/**
 * Posts to the existing portfolio portal exactly like the original login page.
 * Password encryption is performed by the portal's own scripts (loaded below), so no credentials logic lives here.
 */
export default function LoginForm() {
  const [type, setType] = useState("CLIENT");
  const [forgot, setForgot] = useState(false);
  const [msg, setMsg] = useState("");

  return (
    <>
      <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js" strategy="afterInteractive" />
      <Script src="https://portfolio.shahfs.com/js/aes.js" strategy="lazyOnload" />
      <Script src="https://portfolio.shahfs.com/js/login_script.js" strategy="lazyOnload" />
      <form
        className="login-form"
        action={SITE.portalLogin}
        method="POST"
        onSubmit={(e) => {
          if (typeof window.GetSubmitLogin !== "function") {
            e.preventDefault();
            setMsg("The secure login is still loading. Please try again in a moment.");
            return;
          }
          if (window.GetSubmitLogin() === false) e.preventDefault();
        }}
      >
        <div className="seg" role="radiogroup" aria-label="Login type">
          {[["CLIENT", "Client"], ["EMPLOYEE", "Employee"], ["ADVISOR", "Admin"]].map(([v, l]) => (
            <label key={v}>
              <input type="radio" name="loginType" value={v} checked={type === v} onChange={() => setType(v)} />
              <span>{l}</span>
            </label>
          ))}
        </div>
        <input type="hidden" name="loginFor" value={type} />
        <input type="hidden" name="callbackUrl" value="https://shahfs.com/login" />
        <div className="row">
          <div>
            <label className="l" htmlFor="inputEmail">Username</label>
            <input id="inputEmail" name="username" type="text" autoComplete="username" required />
          </div>
          <div>
            <label className="l" htmlFor="inputPassword">Password</label>
            <input id="inputPassword" name="password" type="password" autoComplete="current-password" required />
          </div>
        </div>
        {msg && <p className="err" style={{ color: "var(--bad)", marginBottom: 12 }} role="alert">{msg}</p>}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <button className="btn btn-primary">Login</button>
          <button type="button" className="btn btn-ghost" onClick={() => setForgot(true)}>Forgot Password?</button>
        </div>
      </form>

      {forgot && (
        <div className="modal-bg" onClick={() => setForgot(false)}>
          <div className="modal" role="dialog" aria-label="Forgot Password" onClick={(e) => e.stopPropagation()}>
            <button className="x" aria-label="Close" onClick={() => setForgot(false)}>×</button>
            <h3>Forgot Password</h3>
            <p className="note" style={{ margin: "0 0 18px" }}>Password reset is handled on the secure portfolio portal. Use the “Forgot Password” option there with your username.</p>
            <a className="btn btn-primary" href="https://portfolio.shahfs.com" target="_blank" rel="noopener noreferrer">Open portfolio portal</a>
          </div>
        </div>
      )}
    </>
  );
}
