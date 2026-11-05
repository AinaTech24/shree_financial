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
  Building,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Shah Financial Services",
  description:
    "Connect with Shah Financial Services in Khambhat, Gujarat. Call +91 8141112000, chat on WhatsApp, or book a free financial portfolio consultation.",
};

const CONTACT_FAQS = [
  {
    q: "Do you charge any upfront consultation fee?",
    a: "No. As an AMFI-registered Mutual Fund Distributor, we do not charge investors any upfront fees. We receive regulated trail commissions directly from Asset Management Companies.",
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
    q: "How soon will your team contact me after submitting an inquiry?",
    a: "Our team reviews all inquiries promptly and connects within 24 business hours (Monday to Saturday, 9:30 AM to 6:30 PM).",
  },
];

export default function ContactPage() {
  return (
    <div className="contact-page-unified-root">
      {/* 1. Page Hero */}
      <PageHero
        title="Get in Touch with Our Team"
        sub="We are here to assist you with milestone goal assessment, mutual fund investments, and comprehensive portfolio reviews."
        trail={[{ label: "Home", href: "/" }]}
      />

      {/* 2. Unified 2-Column Contact & Consultation Hub */}
      <section className="section white contact-unified-section">
        <div className="wrap">
          <div className="contact-unified-grid">
            {/* Left Column: Direct Communication Hub & Registered Office */}
            <div className="contact-info-card">
              <div className="contact-info-header">
                <span className="contact-badge-pill">Direct Channels &amp; Office</span>
                <h2 className="contact-info-title">Connect with Our Distribution Team</h2>
                <p className="contact-info-subtitle">
                  Serving families across Gujarat and India since 2007 with AMFI-registered mutual fund distribution and
                  disciplined milestone investing support.
                </p>
              </div>

              {/* Action Channels Stack */}
              <div className="contact-channels-stack">
                {/* 1. Phone Helpline */}
                <div className="contact-channel-row">
                  <div className="channel-icon-bubble bg-indigo">
                    <Phone size={20} />
                  </div>
                  <div className="channel-row-content">
                    <span className="channel-row-label">Helpline Numbers</span>
                    <div className="channel-row-links">
                      {SITE.phones.slice(0, 2).map((p, idx) => (
                        <span key={p}>
                          {idx > 0 && <span className="channel-sep">•</span>}
                          <a href={tel(p)} className="channel-link-bold">
                            {p}
                          </a>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. WhatsApp Instant */}
                <div className="contact-channel-row">
                  <div className="channel-icon-bubble bg-emerald">
                    <MessageCircle size={20} />
                  </div>
                  <div className="channel-row-content">
                    <span className="channel-row-label">WhatsApp Fast Chat</span>
                    <a
                      href={`https://wa.me/${SITE.whatsapp}?text=Hello%20Shah%20Financial%20Services,%20I%20would%20like%20to%20know%20more%20about%20your%20services.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-whatsapp-btn"
                    >
                      <span>Chat on WhatsApp ({SITE.whatsapp})</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>

                {/* 3. Email Inquiries */}
                <div className="contact-channel-row">
                  <div className="channel-icon-bubble bg-amber">
                    <Mail size={20} />
                  </div>
                  <div className="channel-row-content">
                    <span className="channel-row-label">Email Support</span>
                    <div className="channel-row-links">
                      <a href={`mailto:${SITE.email}`} className="channel-link-bold">
                        {SITE.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* 4. Head Office Address */}
                <div className="contact-channel-row">
                  <div className="channel-icon-bubble bg-rose">
                    <MapPin size={20} />
                  </div>
                  <div className="channel-row-content">
                    <span className="channel-row-label">Khambhat Head Office</span>
                    <p className="channel-address-text">
                      A-111/112, Siddh Sagar Complex, First Floor, Near Railway Station, Khambhat-388620 Gujarat
                    </p>
                    <a
                      href={SITE.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="channel-sub-action"
                    >
                      <span>Get Directions on Map</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                {/* 5. Working Hours */}
                <div className="contact-channel-row">
                  <div className="channel-icon-bubble bg-slate">
                    <Clock size={20} />
                  </div>
                  <div className="channel-row-content">
                    <span className="channel-row-label">Working Hours</span>
                    <p className="channel-hours-text">
                      Monday – Saturday: <strong>9:30 AM to 6:30 PM</strong>
                      <br />
                      <span className="text-muted text-xs">Sunday: Closed (Available for emergency portfolio requests)</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Regulatory Redressal Strip */}
              <div className="contact-regulatory-box">
                <div className="regulatory-meta-row">
                  <ShieldCheck size={16} className="text-indigo-600 flex-shrink-0" />
                  <div className="regulatory-meta-text">
                    <strong>AMFI ARN-173086</strong> • <strong>APMI APRN-04142</strong>
                    <div className="grievance-line">
                      Grievance Officer: <span>Mr. Ronak Nalinkumar Shah (+91 9825423773)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="contact-trust-pills">
                <span className="contact-trust-pill">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  100% Confidential
                </span>
                <span className="contact-trust-pill">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  Fast Response (Within 24h)
                </span>
                <span className="contact-trust-pill">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  Zero Obligation
                </span>
              </div>
            </div>

            {/* Right Column: Book Consultation Form */}
            <div className="contact-form-card">
              <div className="contact-form-header">
                <span className="form-category-pill">Online Consultation</span>
                <h3 className="form-title">Book a Free Consultation</h3>
                <p className="form-subtitle">
                  Fill out your details below and our AMFI registered distribution specialist will reach out to discuss your goals.
                </p>
              </div>

              <LeadForm
                subject="Contact Page Consultation Request"
                showService
                submitLabel="Submit Consultation Request"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Location Map */}
      <section className="section tight contact-map-section">
        <div className="wrap">
          <div className="map-container-card">
            <div className="map-header">
              <div>
                <h3 className="map-title">Interactive Location Map</h3>
                <p className="map-subtitle">Conveniently located near Khambhat Railway Station at Siddh Sagar Complex.</p>
              </div>
              <a
                href={SITE.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline map-external-btn"
              >
                <span>Open in Google Maps App</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="map-frame-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.0825721867116!2d72.6148386!3d22.3127027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f71e626e632b5%3A0xe54ef4827aa71383!2sShah%20Financial%20Services!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="380"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Shah Financial Services Khambhat Office Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Contact FAQs */}
      <section className="section white contact-faqs-section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Investor FAQs</span>
            <h2>Frequently Asked Questions</h2>
            <p>Clear, straightforward answers about our mutual fund distribution and investor onboarding.</p>
          </div>

          <div className="contact-faqs-grid">
            {CONTACT_FAQS.map((faq, idx) => (
              <div key={idx} className="contact-faq-item">
                <div className="faq-q-row">
                  <HelpCircle size={18} className="faq-icon text-indigo-600" />
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
