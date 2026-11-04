"use client";

import { useState } from "react";
import { CONTACT_SERVICES, SITE } from "@/content/site";
import { Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

type Props = {
  showService?: boolean;
  subject: string;
  extra?: string;
  submitLabel?: string;
  onBack?: () => void;
};

/**
 * Clean, high-converting consultation inquiry form with static validation (no dynamic math captcha).
 * Delivers via NEXT_PUBLIC_FORM_ENDPOINT (JSON POST) when configured, or opens mail client as fallback.
 */
export default function LeadForm({
  showService = false,
  subject,
  extra = "",
  submitLabel = "Submit Consultation Request",
  onBack,
}: Props) {
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [done, setDone] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const er: Record<string, string> = {};

    if (!v("name")) er.name = "Please enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) {
      er.email = "Please enter a valid email address";
    }
    if (!/^[6-9]\d{9}$/.test(v("mobile").replace(/[\s+-]/g, ""))) {
      er.mobile = "Please enter a valid 10-digit mobile number";
    }
    if (showService && !v("service")) {
      er.service = "Please select a service";
    }
    if (v("message").length < 5) {
      er.message = "Please provide details about your inquiry (at least 5 characters)";
    }

    setErrs(er);
    if (Object.keys(er).length > 0) return;

    setBusy(true);
    const payload = {
      subject,
      name: v("name"),
      email: v("email"),
      mobile: v("mobile"),
      service: v("service"),
      message: v("message"),
      extra,
    };

    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("failed");
        setDone("Thank you! Your message has been sent. An advisor will contact you within 24 business hours.");
      } else {
        const body = `Name: ${payload.name}\nEmail: ${payload.email}\nMobile: ${payload.mobile}\n${
          payload.service ? "Service: " + payload.service + "\n" : ""
        }${extra ? extra + "\n" : ""}\nMessage:\n${payload.message}`;
        window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;
        setDone("Your inquiry has been prepared. Please press send in your email client to complete submission.");
      }
      form.reset();
    } catch {
      setErrs({ form: "Could not send right now. Please call us directly at +91 8141112000." });
    } finally {
      setBusy(false);
    }
  }

  const f = (k: string) => (errs[k] ? "input-field bad" : "input-field");

  return (
    <form className="modern-lead-form" onSubmit={submit} noValidate>
      <div className="form-row-2col">
        <div className="form-group">
          <label htmlFor="lead-name">Your Full Name *</label>
          <input
            id="lead-name"
            name="name"
            autoComplete="name"
            placeholder="e.g. Ramesh Patel"
            className={f("name")}
          />
          {errs.name && <div className="field-err">{errs.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="lead-email">Email Address *</label>
          <input
            id="lead-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="e.g. ramesh@example.com"
            className={f("email")}
          />
          {errs.email && <div className="field-err">{errs.email}</div>}
        </div>
      </div>

      <div className="form-row-2col">
        <div className="form-group">
          <label htmlFor="lead-mobile">Mobile Number (10 Digits) *</label>
          <div className="phone-input-wrap">
            <span className="phone-prefix">+91</span>
            <input
              id="lead-mobile"
              name="mobile"
              inputMode="numeric"
              maxLength={10}
              autoComplete="tel-national"
              placeholder="98765 43210"
              className={f("mobile")}
            />
          </div>
          {errs.mobile && <div className="field-err">{errs.mobile}</div>}
        </div>

        {showService ? (
          <div className="form-group">
            <label htmlFor="lead-service">Interested Service *</label>
            <select id="lead-service" name="service" defaultValue="" className={f("service")}>
              <option value="">-- Select Service --</option>
              {CONTACT_SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errs.service && <div className="field-err">{errs.service}</div>}
          </div>
        ) : (
          <div className="form-group">
            <label htmlFor="lead-city">City / Location</label>
            <input
              id="lead-city"
              name="city"
              placeholder="e.g. Khambhat, Anand, Vadodara"
              className="input-field"
            />
          </div>
        )}
      </div>

      <div className="form-group full-width">
        <label htmlFor="lead-message">Your Message / Requirement *</label>
        <textarea
          id="lead-message"
          name="message"
          rows={4}
          placeholder="Tell us about your investment goals, starting SIP amount, portfolio review requests, or any questions..."
          className={f("message")}
        />
        {errs.message && <div className="field-err">{errs.message}</div>}
      </div>

      {errs.form && (
        <div className="form-alert-err" role="alert">
          <AlertCircle size={16} />
          <span>{errs.form}</span>
        </div>
      )}

      {done && (
        <div className="form-alert-success" role="status">
          <CheckCircle2 size={18} className="text-emerald-500" />
          <span>{done}</span>
        </div>
      )}

      <div className="form-action-row">
        {onBack && (
          <button type="button" className="btn btn-ghost" onClick={onBack}>
            Back
          </button>
        )}
        <button type="submit" className="btn btn-primary lead-submit-btn" disabled={busy}>
          <Send size={16} />
          <span>{busy ? "Submitting Request..." : submitLabel}</span>
        </button>
      </div>

      <div className="form-privacy-note">
        <small>
          🔒 Your information is confidential and protected. Zero spam. AMFI Registered Distributor.
        </small>
      </div>
    </form>
  );
}
