import { SITE, tel } from "@/content/site";
import { Phone, Mail, MapPin, Clock, MessageCircle, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="contact-info-card-redesign">
      <div className="ci-badge-row">
        <span className="ci-category-pill">Head Office &amp; Advisory Desk</span>
      </div>

      <h3 className="ci-title">Talk to Our Financial Experts</h3>
      <p className="ci-description">
        Whether you are planning your first SIP, rebalancing an existing portfolio, or need support with digital KYC,
        our team in Khambhat is ready to assist you.
      </p>

      <div className="ci-channels-stack">
        {/* Telephone Helplines */}
        <div className="ci-channel-item">
          <div className="ci-icon-bubble phone-bubble">
            <Phone size={18} />
          </div>
          <div className="ci-channel-content">
            <span className="ci-channel-label">Dedicated Phone Helplines</span>
            <div className="ci-phone-pills-row">
              {SITE.phones.map((p) => (
                <a key={p} href={tel(p)} className="ci-phone-pill" title={`Call ${p}`}>
                  <Phone size={13} className="pill-icon" />
                  <span>{p}</span>
                </a>
              ))}
            </div>
            <span className="ci-hint">Tap any number to call our desk directly</span>
          </div>
        </div>

        {/* WhatsApp Chat */}
        <div className="ci-channel-item whatsapp-item">
          <div className="ci-icon-bubble whatsapp-bubble">
            <MessageCircle size={18} />
          </div>
          <div className="ci-channel-content">
            <span className="ci-channel-label">Direct WhatsApp Assistance</span>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=Hello%20Shah%20Financial%20Services,%20I%20would%20like%20to%20know%20more%20about%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="ci-whatsapp-action-btn"
            >
              <span>+91 8141112000 (Chat on WhatsApp)</span>
              <ExternalLink size={14} />
            </a>
            <span className="ci-hint">Quick response during business hours</span>
          </div>
        </div>

        {/* Email Addresses */}
        <div className="ci-channel-item">
          <div className="ci-icon-bubble email-bubble">
            <Mail size={18} />
          </div>
          <div className="ci-channel-content">
            <span className="ci-channel-label">Email Support</span>
            <div className="ci-email-stack">
              <a href={`mailto:${SITE.email}`} className="ci-email-link">
                <strong>Primary:</strong> {SITE.email}
              </a>
              {SITE.email2 && (
                <a href={`mailto:${SITE.email2}`} className="ci-email-link secondary">
                  <strong>Alternative:</strong> {SITE.email2}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Office Address */}
        <div className="ci-channel-item">
          <div className="ci-icon-bubble address-bubble">
            <MapPin size={18} />
          </div>
          <div className="ci-channel-content">
            <span className="ci-channel-label">Registered Office</span>
            <p className="ci-address-text">
              A-111/112, Siddh Sagar Complex, First Floor, Near Railway Station, Khambhat - 388620, Gujarat, India
            </p>
            <a
              href="https://maps.google.com/?q=Shah+Financial+Services+Khambhat"
              target="_blank"
              rel="noopener noreferrer"
              className="ci-maps-link"
            >
              <span>Open in Google Maps</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Working Hours */}
        <div className="ci-channel-item">
          <div className="ci-icon-bubble clock-bubble">
            <Clock size={18} />
          </div>
          <div className="ci-channel-content">
            <span className="ci-channel-label">Office &amp; Help Desk Hours</span>
            <p className="ci-hours-text">
              <strong>Monday – Saturday:</strong> 9:30 AM – 6:30 PM
            </p>
            <p className="ci-hours-sub">Sunday: By Appointment Only</p>
          </div>
        </div>
      </div>

      <div className="ci-footer-trust-strip">
        <div className="ci-trust-point">
          <ShieldCheck size={16} className="text-amber-500" />
          <span>AMFI ARN-173086</span>
        </div>
        <div className="ci-trust-point">
          <CheckCircle2 size={16} className="text-emerald-500" />
          <span>APMI APRN-04142</span>
        </div>
        <div className="ci-trust-point">
          <CheckCircle2 size={16} className="text-blue-500" />
          <span>17+ Years in Khambhat</span>
        </div>
      </div>
    </div>
  );
}
