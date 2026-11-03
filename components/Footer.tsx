import Link from "next/link";
import { POLICY_LINKS, SERVICES, SITE, tel } from "@/content/site";
import { ShieldCheck, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const REGULATORY_PORTALS = [
  { name: "NSE", href: "https://www.nseindia.com" },
  { name: "BSE", href: "https://www.bseindia.com" },
  { name: "SEBI", href: "https://www.sebi.gov.in" },
  { name: "RBI", href: "https://www.rbi.org.in" },
  { name: "CDSL", href: "https://www.cdslindia.com" },
  { name: "NCDEX", href: "https://www.ncdex.com" },
  { name: "MCX", href: "https://www.mcxindia.com" },
];

export default function Footer() {
  return (
    <footer className="footer-redesign">
      {/* Upper Navigation & Brand Tier */}
      <div className="wrap footer-upper-grid">
        <div className="footer-col-brand">
          <div className="f-logo">
            <img src="/img/misc/logo.png" alt="Shah Financial Services" />
          </div>
          <p className="f-tagline">{SITE.tagline}</p>
          <div className="f-stores-row">
            <a href={SITE.playStore} target="_blank" rel="noopener noreferrer" className="store-pill">
              <img src="/img/misc/android-btn.webp" alt="Get it on Google Play" />
            </a>
            <a href={SITE.appStore} target="_blank" rel="noopener noreferrer" className="store-pill">
              <img src="/img/misc/apple-btn.webp" alt="Download on the App Store" />
            </a>
          </div>
        </div>

        <div className="footer-col-links">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-links-list">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/calculator">Calculators Hub</Link></li>
            <li><Link href="/scheme-wise-commission-disclosure">AMC Commission Disclosure</Link></li>
            <li><Link href="/financial-fitness">Financial Fitness</Link></li>
            <li><Link href="/risk-profile">Risk Profile</Link></li>
            <li><Link href="/blog">Knowledge Hub / Blog</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-col-links">
          <h4 className="footer-col-title">Our Services</h4>
          <ul className="footer-links-list">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`}>{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col-contact">
          <h4 className="footer-col-title">Get In Touch</h4>
          <ul className="footer-contact-items">
            <li>
              <Phone size={16} className="contact-icon" />
              <div>
                <small>Helpline</small>
                <div className="phone-stack">
                  {SITE.phones.map((p, i) => (
                    <a key={p} href={tel(p)} className="contact-link">
                      {p}
                    </a>
                  ))}
                </div>
              </div>
            </li>
            <li>
              <Mail size={16} className="contact-icon" />
              <div>
                <small>Email Inquiries</small>
                <div><a href={`mailto:${SITE.email}`} className="contact-link">{SITE.email}</a></div>
                <div><a href={`mailto:${SITE.email2}`} className="contact-link">{SITE.email2}</a></div>
              </div>
            </li>
            <li>
              <MapPin size={16} className="contact-icon" />
              <div>
                <small>Head Office</small>
                <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer" className="contact-link address">
                  {SITE.address}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Regulatory & Compliance Deep-Navy Section (Matching Image 2) */}
      <div className="regulatory-section-dark">
        <div className="wrap">
          {/* Important Portals */}
          <div className="regulatory-portals-block">
            <h5 className="portals-title">IMPORTANT REGULATORY &amp; EXCHANGE PORTALS</h5>
            <div className="portals-row">
              {REGULATORY_PORTALS.map((portal, idx) => (
                <span key={portal.name} className="portal-entry">
                  {idx > 0 && <span className="portal-pipe">|</span>}
                  <a href={portal.href} target="_blank" rel="noopener noreferrer" className="portal-link">
                    {portal.name}
                  </a>
                </span>
              ))}
            </div>
          </div>

          {/* Regulatory Risk Disclaimers */}
          <div className="regulatory-paragraphs">
            <p>
              Investments in securities markets are subject to market risks. Mutual Fund investments are subject to
              market risks. Please read all scheme-related documents carefully before investing. Past performance is
              not indicative of future returns.
            </p>
            <p>
              The value of investments may fluctuate due to various factors including market conditions, interest rate
              movements, credit quality of underlying securities, and liquidity in the market. Different types of
              financial products carry different levels of risk. Investors should evaluate their risk appetite and
              investment objectives before making any investment decision.
            </p>
            <p>
              Please refer to the respective offering documents such as the Scheme Information Document (SID), Key
              Information Memorandum (KIM), Disclosure Documents, or other product-specific materials for detailed risk
              factors.
            </p>
          </div>

          {/* AMFI Registered Mutual Fund Distributor Box */}
          <div className="regulatory-reg-box">
            <p className="reg-text-main">
              AMFI Registered Mutual Fund Distributor | ARN: <strong>ARN-173086</strong> | Inception:{" "}
              <strong>2007</strong> | Valid Till: <strong>11/11/2029</strong>
            </p>
            <p className="reg-text-sub">
              For Grievances contact: <strong>+91 8141112000 / +91 9825423773</strong> | Grievance Officer:{" "}
              <strong>Mr. Ronak Nalinkumar Shah</strong> | Email:{" "}
              <a href="mailto:info@shahfs.com" className="gold-link">
                info@shahfs.com
              </a>
            </p>
            <p className="reg-text-sub">
              APMI Registration (PMS): <strong>APRN-04142</strong> (Valid till: 29/06/2029) | AMFI SIF:{" "}
              <strong>ARN-173086</strong> | GSTIN: <strong>{SITE.gstin}</strong>
            </p>
          </div>

          {/* Amber Compliance Links */}
          <div className="regulatory-policy-links">
            {POLICY_LINKS.map((l, idx) => (
              <span key={l.label} className="policy-link-item">
                {idx > 0 && <span className="policy-pipe">|</span>}
                {l.external ? (
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="gold-policy-link">
                    {l.label}
                  </a>
                ) : (
                  <Link href={l.href} className="gold-policy-link">
                    {l.label}
                  </Link>
                )}
              </span>
            ))}
          </div>

          {/* Badges Cards (AMFI + Mutual Funds Sahi Hai) */}
          <div className="regulatory-badges-row">
            <div className="reg-badge-card">
              <img src="/img/misc/amfi.webp" alt="AMFI Registered Mutual Fund Distributor" />
            </div>
            <div className="reg-badge-card">
              <img src="/img/misc/mutualfund.webp" alt="Mutual Funds Sahi Hai" />
            </div>
          </div>

          {/* Bottom Copyright & Credit Row */}
          <div className="regulatory-bottom-bar">
            <span>© 2026 SHAH FINANCIAL SERVICES. All rights reserved.</span>
            <span>Designed by AinaTech Services LLP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
