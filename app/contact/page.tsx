import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import ContactInfo from "@/components/ContactInfo";
import { SITE } from "@/content/site";
import { MapPin, Phone, Mail, ShieldCheck, CheckCircle2, Clock, Sparkles, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Shah Financial Services",
  description:
    "Get in touch with Shah Financial Services in Khambhat, Gujarat. Call +91 8141112000, chat on WhatsApp, or book a free financial planning consultation.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Get In Touch With Us"
        sub="We are dedicated to helping you achieve financial freedom with personalized, AMFI-certified wealth guidance."
        trail={[{ label: "Home", href: "/" }]}
      />

      <section className="section contact-redesign-section">
        <div className="wrap">
          {/* Quick Reassurance Cards */}
          <div className="contact-trust-bar">
            <div className="trust-bar-card">
              <div className="trust-icon-box">
                <Clock size={20} className="text-indigo-600" />
              </div>
              <div>
                <strong>Prompt 24H Response</strong>
                <span>Direct advisor callbacks for every enquiry</span>
              </div>
            </div>

            <div className="trust-bar-card">
              <div className="trust-icon-box">
                <ShieldCheck size={20} className="text-emerald-600" />
              </div>
              <div>
                <strong>Zero Advisory Fees</strong>
                <span>Free portfolio reviews &amp; goal structuring</span>
              </div>
            </div>

            <div className="trust-bar-card">
              <div className="trust-icon-box">
                <CheckCircle2 size={20} className="text-blue-600" />
              </div>
              <div>
                <strong>AMFI &amp; APMI Registered</strong>
                <span>ARN-173086 • Fully compliant distributor</span>
              </div>
            </div>
          </div>

          {/* Main 2-Column Contact Grid */}
          <div className="contact-main-grid">
            {/* Left: Contact Info */}
            <div className="contact-col-info">
              <ContactInfo />
            </div>

            {/* Right: Modern Consultation Form (No Captcha) */}
            <div className="contact-col-form">
              <div className="form-card-wrapper">
                <div className="form-card-header">
                  <span className="form-badge">
                    <Sparkles size={13} className="text-amber-500" />
                    <span>Free Wealth Consultation</span>
                  </span>
                  <h3>Send Us an Online Enquiry</h3>
                  <p>
                    Fill in your details below and an experienced advisor will connect with you to review your goals.
                  </p>
                </div>
                <LeadForm showService={true} subject="Website Contact Page Consultation Request" />
              </div>
            </div>
          </div>

          {/* Office Location & Google Maps */}
          <div className="contact-map-card">
            <div className="map-card-header">
              <div className="map-header-left">
                <div className="map-icon-box">
                  <MapPin size={22} className="text-amber-500" />
                </div>
                <div>
                  <h4>Visit Our Registered Office in Khambhat</h4>
                  <p>A-111/112, Siddh Sagar Complex, First Floor, Near Railway Station, Khambhat - 388620</p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Shah+Financial+Services+Khambhat"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost map-directions-btn"
              >
                <span>Get Driving Directions</span>
              </a>
            </div>

            <div className="map-iframe-container">
              <iframe
                title="Shah Financial Services Office Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.079294247551!2d72.6179379!3d22.3128422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f7d2426998ff5%3A0xe54e26eb84b72ae4!2sShah%20Financial%20Services!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="380"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
