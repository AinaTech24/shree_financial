"use client";

import React, { useState } from "react";
import { CONTACT_SERVICES, SITE } from "@/content/site";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type Props = {
  showService?: boolean;
  subject: string;
  extra?: string;
  submitLabel?: string;
  onBack?: () => void;
};

export default function LeadForm({
  showService = false,
  subject,
  extra = "",
  submitLabel = "Send Message",
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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) er.email = "Please enter a valid email address";
    if (!/^[6-9]\d{9}$/.test(v("mobile").replace(/\D/g, "")))
      er.mobile = "Please enter a valid 10-digit mobile number";
    if (showService && !v("service")) er.service = "Please select a service";
    if (v("message").length < 4) er.message = "Please write a brief note about your requirements";

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
        setDone("Thank you! Your message has been received. Our team will contact you within 24 hours.");
      } else {
        const body = `Name: ${payload.name}\nEmail: ${payload.email}\nMobile: ${payload.mobile}\n${
          payload.service ? "Service: " + payload.service + "\n" : ""
        }${extra ? extra + "\n" : ""}\nMessage:\n${payload.message}`;
        window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;
        setDone(
          "Your email app has been opened with your inquiry addressed to " +
            SITE.email +
            ". Please click Send to complete your submission."
        );
      }
      form.reset();
    } catch {
      setErrs({ form: "Could not send right now. Please call us directly at " + SITE.phones[0] });
    } finally {
      setBusy(false);
    }
  }

  const f = (k: string) => (errs[k] ? "bad" : "");

  return (
    <form className="modern-lead-form" onSubmit={submit} noValidate>
      {done && (
        <div className="lead-form-success" role="status">
          <CheckCircle2 size={20} className="success-icon" />
          <p>{done}</p>
        </div>
      )}

      {errs.form && (
        <div className="lead-form-error-alert" role="alert">
          <AlertCircle size={20} />
          <span>{errs.form}</span>
        </div>
      )}

      <div className="form-fields-grid">
        {/* Name */}
        <div className="form-field-group">
          <label htmlFor="name">Your Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. Rahul Sharma"
            autoComplete="name"
            className={`form-text-input ${f("name")}`}
          />
          {errs.name && <div className="field-err-msg">{errs.name}</div>}
        </div>

        {/* Mobile */}
        <div className="form-field-group">
          <label htmlFor="mobile">Mobile Number *</label>
          <div className="phone-input-wrap">
            <span className="phone-country-code">+91</span>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="98250 12345"
              autoComplete="tel-national"
              className={`form-text-input phone-input ${f("mobile")}`}
            />
          </div>
          {errs.mobile && <div className="field-err-msg">{errs.mobile}</div>}
        </div>

        {/* Email */}
        <div className="form-field-group">
          <label htmlFor="email">Email Address *</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="rahul@example.com"
            autoComplete="email"
            className={`form-text-input ${f("email")}`}
          />
          {errs.email && <div className="field-err-msg">{errs.email}</div>}
        </div>

        {/* Service (if enabled) */}
        {showService && (
          <div className="form-field-group">
            <label htmlFor="service">Interested Service *</label>
            <select id="service" name="service" defaultValue="" className={`form-select-input ${f("service")}`}>
              <option value="">-- Select a Service --</option>
              {CONTACT_SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errs.service && <div className="field-err-msg">{errs.service}</div>}
          </div>
        )}

        {/* Message */}
        <div className="form-field-group full-width">
          <label htmlFor="message">Your Message / Investment Goals *</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us about your investment horizon, SIP goals, or any questions you have..."
            className={`form-textarea-input ${f("message")}`}
          />
          {errs.message && <div className="field-err-msg">{errs.message}</div>}
        </div>
      </div>

      <div className="form-actions-bar">
        {onBack && (
          <button type="button" className="btn btn-ghost" onClick={onBack}>
            Back
          </button>
        )}
        <button type="submit" className="btn btn-primary submit-lead-btn" disabled={busy}>
          {busy ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>{submitLabel}</span>
              <Send size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
