import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import ContactInfo from "@/components/ContactInfo";
import { SITE } from "@/content/site";
import { MapPin, Phone, Mail, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Shah Financial Services",
  description:
    "Get in touch with Shah Financial Services in Khambhat, Gujarat. Call +91 8141112000, visit our Siddh Sagar Complex office, or book an online consultation.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        sub="We are here to assist you with goal planning, mutual fund investments, and portfolio reviews."
        trail={[{ label: "Home", href: "/" }]}
      />

      <section className="section contact-page-section">
        <div className="wrap">
          <div className="contact-grid-wrapper">
            {/* Left: Contact Info Card */}
            <ContactInfo />

            {/* Right: Modern Consultation Lead Form */}
            <div className="contact-form-container">
              <div className="form-card-header">
                <span className="form-badge">Schedule a Call</span>
                <h3>Send Us an Enquiry</h3>
                <p>Fill out the form below and one of our advisors will connect with you within 24 business hours.</p>
              </div>
              <LeadForm showService subject="Website Contact Page Consultation Request" />
            </div>
          </div>

          {/* Interactive Google Maps Embed */}
          <div className="contact-map-wrapper">
            <div className="map-header">
              <MapPin size={20} className="text-amber-500" />
              <h4>Visit Our Office in Khambhat</h4>
            </div>
            <div className="map-frame-box">
              <iframe
                title="Shah Financial Services Office Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.079294247551!2d72.6179379!3d22.3128422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f7d2426998ff5%3A0xe54e26eb84b72ae4!2sShah%20Financial%20Services!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="380"
                style={{ border: 0, borderRadius: "16px" }}
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
