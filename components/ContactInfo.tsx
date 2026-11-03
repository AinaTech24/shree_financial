import { SITE, tel } from "@/content/site";
import { Phone, Mail, MapPin, Clock, MessageCircle, ExternalLink, ShieldCheck } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="contact-info-redesign">
      <div className="contact-info-header">
        <span className="contact-pill">Office &amp; Support</span>
        <h3 className="contact-heading">Talk to Our Financial Experts</h3>
        <p className="contact-sub">
          Have questions about mutual funds, SIPs, PMS, or your existing portfolio? We are here to help.
        </p>
      </div>

      <div className="contact-details-stack">
        {/* Phone Numbers */}
        <div className="ci-card-row">
          <div className="ci-icon-box phone">
            <Phone size={20} />
          </div>
          <div className="ci-row-content">
            <small>Call Our Helpline</small>
            <div className="phone-list-stack">
              {SITE.phones.map((p) => (
                <a key={p} href={tel(p)} className="ci-phone-link">
                  {p}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* WhatsApp Direct */}
        <div className="ci-card-row">
          <div className="ci-icon-box whatsapp">
            <MessageCircle size={20} />
          </div>
          <div className="ci-row-content">
            <small>Direct WhatsApp Chat</small>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=Hello%20Shah%20Financial%20Services,%20I%20would%20like%20to%20know%20more%20about%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="ci-whatsapp-link"
            >
              <span>+91 8141112000 (Chat on WhatsApp)</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Emails */}
        <div className="ci-card-row">
          <div className="ci-icon-box email">
            <Mail size={20} />
          </div>
          <div className="ci-row-content">
            <small>Email Address</small>
            <div>
              <a href={`mailto:${SITE.email}`} className="ci-mail-link">
                {SITE.email}
              </a>
            </div>
            <div>
              <a href={`mailto:${SITE.email2}`} className="ci-mail-link">
                {SITE.email2}
              </a>
            </div>
          </div>
        </div>

        {/* Office Address */}
        <div className="ci-card-row">
          <div className="ci-icon-box address">
            <MapPin size={20} />
          </div>
          <div className="ci-row-content">
            <small>Registered Office</small>
            <p className="ci-address-text">{SITE.address}</p>
            <a
              href={SITE.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ci-maps-button"
            >
              <span>Open in Google Maps</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Business Hours */}
        <div className="ci-card-row">
          <div className="ci-icon-box clock">
            <Clock size={20} />
          </div>
          <div className="ci-row-content">
            <small>Working Hours</small>
            <p className="ci-hours-text">Monday – Saturday: 9:30 AM – 6:30 PM</p>
            <span className="ci-hours-sub">Sunday: By Appointment Only</span>
          </div>
        </div>
      </div>

      <div className="contact-trust-footer">
        <ShieldCheck size={16} className="text-amber-500" />
        <span>AMFI Registered Mutual Fund Distributor • ARN-173086</span>
      </div>
    </div>
  );
}
