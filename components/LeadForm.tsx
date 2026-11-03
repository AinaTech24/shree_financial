"use client";
import { useEffect, useState } from "react";
import { CONTACT_SERVICES, SITE } from "@/content/site";

const newCaptcha = () => {
  const a = Math.floor(Math.random() * 12) + 1;
  const b = Math.floor(Math.random() * 12) + 1;
  return { a, b };
};

type Props = { showService?: boolean; subject: string; extra?: string; submitLabel?: string; onBack?: () => void };

/** Delivers via NEXT_PUBLIC_FORM_ENDPOINT (JSON POST) when configured, otherwise opens the visitor's mail app addressed to info@shahfs.com. */
export default function LeadForm({ showService = false, subject, extra = "", submitLabel = "Submit", onBack }: Props) {
  const [cap, setCap] = useState({ a: 0, b: 0 });
  useEffect(() => setCap(newCaptcha()), []);
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [done, setDone] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const er: Record<string, string> = {};
    if (!v("name")) er.name = "Name required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) er.email = "Invalid Email";
    if (!/^[6-9]\d{9}$/.test(v("mobile"))) er.mobile = "Invalid Mobile";
    if (showService && !v("service")) er.service = "Please select a service";
    if (v("message").length < 5) er.message = "Message too short";
    if (!cap.a || Number(v("captcha")) !== cap.a + cap.b) er.captcha = "Incorrect answer";
    setErrs(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    const payload = { subject, name: v("name"), email: v("email"), mobile: v("mobile"), service: v("service"), message: v("message"), extra };
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    try {
      if (endpoint) {
        const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error("failed");
        setDone("Thank you! Your message has been sent. We will get back to you shortly.");
      } else {
        const body = `Name: ${payload.name}\nEmail: ${payload.email}\nMobile: ${payload.mobile}\n${payload.service ? "Service: " + payload.service + "\n" : ""}${extra ? extra + "\n" : ""}\nMessage:\n${payload.message}`;
        window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setDone("Your email app has been opened with your message addressed to " + SITE.email + ". Please press send there to complete your enquiry.");
      }
      form.reset();
      setCap(newCaptcha());
    } catch {
      setErrs({ form: "Could not send right now. Please call us or email " + SITE.email });
    } finally {
      setBusy(false);
    }
  }

  const f = (k: string) => (errs[k] ? "bad" : "");
  return (
    <form className="form" onSubmit={submit} noValidate>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" autoComplete="name" className={f("name")} />
        <div className="err">{errs.name}</div>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" className={f("email")} />
        <div className="err">{errs.email}</div>
      </div>
      <div className={showService ? "" : "full"}>
        <label htmlFor="mobile">Mobile</label>
        <input id="mobile" name="mobile" inputMode="numeric" maxLength={10} autoComplete="tel-national" className={f("mobile")} />
        <div className="err">{errs.mobile}</div>
      </div>
      {showService && (
        <div>
          <label htmlFor="service">Service</label>
          <select id="service" name="service" defaultValue="" className={f("service")}>
            <option value="">-- Select Service --</option>
            {CONTACT_SERVICES.map((s) => (<option key={s}>{s}</option>))}
          </select>
          <div className="err">{errs.service}</div>
        </div>
      )}
      <div className="full">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" className={f("message")} />
        <div className="err">{errs.message}</div>
      </div>
      <div className="full">
        <div className="captcha">
          <span className="q">Solve: {cap.a || "…"} + {cap.b || "…"} = ?</span>
          <input name="captcha" inputMode="numeric" aria-label="Captcha answer" className={f("captcha")} />
          <button type="button" className="refresh" aria-label="New captcha" onClick={() => setCap(newCaptcha())}>↻</button>
        </div>
        <div className="err">{errs.captcha}</div>
      </div>
      {errs.form && <div className="full err" role="alert">{errs.form}</div>}
      {done && <div className="form-ok" role="status">{done}</div>}
      <div className="full" style={{ display: "flex", gap: 12 }}>
        {onBack && <button type="button" className="btn btn-ghost" onClick={onBack}>Back</button>}
        <button className="btn btn-primary" disabled={busy}>{busy ? "Please wait..." : submitLabel}</button>
      </div>
    </form>
  );
}
