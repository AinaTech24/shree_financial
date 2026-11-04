import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import { SITE, tel } from "@/content/site";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Shah Financial Services",
  description:
    "Connect with Shah Financial Services in Khambhat, Gujarat. Call +91 8141112000, chat on WhatsApp, or book a free financial portfolio consultation.",
};

const CONTACT_FAQS = [
  {
    q: "Do you charge any upfront consultation fee?",
    a: "No. As an AMFI-registered Mutual Fund Distributor, we do not charge investors any upfront advisory or consultation fees. We receive regulated trail commissions directly from Asset Management Companies.",
  },
  {
    q: "Can I invest paperlessly if I am not located in Khambhat?",
    a: "Yes! 100% of our onboarding and transaction processes are paperless and digital. Investors across India and NRI clients invest with us smoothly via web and mobile app.",
  },
  {
    q: "What documents are required to start an investment?",
    a: "To complete your paperless KYC, you only require your PAN card, Aadhaar card, a canceled cheque or bank statement, and a digital signature photograph.",
  },
  {
    q: "How soon will an advisor contact me after submitting an inquiry?",
    a: "Our team reviews all inquiries promptly and connects within 24 business hours (Monday to Saturday, 9:30 AM to 6:30 PM).",
  },
];

export default function ContactPage() {
  return (
    <div className="contact-page-redesign-root">
      {/* 1. Page Hero */}
      <PageHero
        title="Get in Touch with Our Team"
        sub="We are here to assist you with goal planning, mutual fund investments, and comprehensive portfolio reviews."
        trail={[{ label: "Home", href: "/" }]}
      />

      {/* 2. Quick Contact Channels Strip */}
      <section className="contact-channels-strip">
        <div className="wrap">
          <div className="channels-grid">
            {/* Phone */}
            <div className="channel-card">
              <div className="channel-icon-circle phone">
                <Phone size={24} />
              </div>
              <h4>Call Our Helpline</h4>
              <p>Direct telephone consultation with our distribution desk.</p>
              <div className="channel-links-stack">
                {SITE.phones.slice(0, 2).map((p) => (
                  <a key={p} href={tel(p)} className="channel-primary-link">
                    {p}
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp */}
            <div className="channel-card highlight-whatsapp">
              <div className="channel-icon-circle whatsapp">
                <MessageCircle size={24} />
              </div>
              <h4>WhatsApp Fast Chat</h4>
              <p>Instant answers and portfolio document sharing on WhatsApp.</p>
              <a
                href={`https://wa.me/${SITE.whatsapp}?text=Hello%20Shah%20Financial%20Services,%20I%20would%20like%20to%20know%20more%20about%20your%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-action"
              >
                <span>Chat on WhatsApp</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Email */}
            <div className="channel-card">
              <div className="channel-icon-circle email">
                <Mail size={24} />
              </div>
              <h4>Email Inquiries</h4>
              <p>Send statements or detailed portfolio queries.</p>
              <div className="channel-links-stack">
                <a href={`mailto:${SITE.email}`} className="channel-primary-link">
                  {SITE.email}
                </a>
                <a href={`mailto:${SITE.email2}`} className="channel-sub-link">
                  {SITE.email2}
                </a>
              </div>
            </div>

            {/* Office */}
            <div className="channel-card">
              <div className="channel-icon-circle address">
                <MapPin size={24} />
              </div>
              <h4>Visit In Person</h4>
              <p>Siddh Sagar Complex, Near Railway Station, Khambhat.</p>
              <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer" className="channel-map-link">
                <span>View Directions</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Consultation Form + Office Details */}
      <section className="section contact-main-section">
        <div className="wrap">
          <div className="contact-split-grid">
            {/* Left Column: Office & Grievance Information */}
            <div className="contact-details-panel">
              <div className="details-header">
                <span className="contact-section-pill">Registered Office</span>
                <h2>Khambhat Head Office</h2>
                <p>
                  Serving families across Gujarat and India since 2007 with AMFI-registered mutual fund distribution and
                  personalized financial guidance.
                </p>
              </div>

              <div className="info-blocks-stack">
                {/* Physical Location */}
                <div className="info-block-row">
                  <div className="info-icon-bubble">
                    <MapPin size={20} className="text-amber-500" />
                  </div>
                  <div>
                    <strong className="block-label">Office Address</strong>
                    <p className="block-text">{SITE.address}</p>
                    <a
                      href={SITE.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link-with-icon"
                    >
                      Open in Google Maps <ExternalLink size={13} />
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="info-block-row">
                  <div className="info-icon-bubble">
                    <Clock size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <strong className="block-label">Working Hours</strong>
                    <p className="block-text">Monday – Saturday: 9:30 AM to 6:30 PM</p>
                    <span className="sub-note">Sunday: Closed (Available for emergency portfolio requests)</span>
                  </div>
                </div>

                {/* Grievance & Regulatory Details */}
                <div className="info-block-row">
                  <div className="info-icon-bubble">
                    <ShieldCheck size={20} className="text-emerald-500" />
                  </div>
                  <div>
                    <strong className="block-label">Regulatory &amp; Grievance Officer</strong>
                    <p className="block-text">
                      <strong>Mr. Ronak Nalinkumar Shah</strong> (Partner &amp; Grievance Redressal Officer)
                    </p>
                    <p className="sub-note">
                      Phone: <a href="tel:+919825423773">+91 9825423773</a> • Email:{" "}
                      <a href="mailto:info@shahfs.com">info@shahfs.com</a>
                    </p>
                    <p className="sub-note">
                      AMFI ARN: <strong>ARN-173086</strong> • APMI APRN: <strong>APRN-04142</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="contact-trust-strip">
                <span className="trust-item">
                  <CheckCircle2 size={16} className="text-emerald-500" /> 100% Confidential
                </span>
                <span className="trust-item">
                  <CheckCircle2 size={16} className="text-emerald-500" /> Fast Response (Within 24h)
                </span>
                <span className="trust-item">
                  <CheckCircle2 size={16} className="text-emerald-500" /> Zero Obligation
                </span>
              </div>
            </div>

            {/* Right Column: Modern Lead Form (Without Captcha) */}
            <div className="contact-form-card">
              <div className="form-card-header">
                <span className="form-badge">Online Consultation</span>
                <h3>Book a Free Consultation</h3>
                <p>
                  Fill out your details below and our AMFI registered advisor will reach out to discuss your goals.
                </p>
              </div>

              <LeadForm showService={true} subject="Website Contact Page Consultation Request" submitLabel="Submit Consultation Request" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Google Maps Embed */}
      <section className="contact-map-section">
        <div className="wrap">
          <div className="map-embed-card">
            <div className="map-card-header">
              <div>
                <h4>Interactive Location Map</h4>
                <p>Conveniently located near Khambhat Railway Station at Siddh Sagar Complex.</p>
              </div>
              <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                <span>Open in Google Maps App</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="map-iframe-container">
              <iframe
                title="Shah Financial Services Office Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.079294247551!2d72.6179379!3d22.3128422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f7d2426998ff5%3A0xe54e26eb84b72ae4!2sShah%20Financial%20Services!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      <section className="section white contact-faq-section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Common Questions</span>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about scheduling a consultation and beginning your investment journey.</p>
          </div>

          <div className="contact-faq-grid">
            {CONTACT_FAQS.map((faq) => (
              <div key={faq.q} className="faq-card">
                <div className="faq-question">
                  <HelpCircle size={18} className="faq-icon" />
                  <h4>{faq.q}</h4>
                </div>
                <p className="faq-answer">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
