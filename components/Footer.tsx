import Link from "next/link";
import { SERVICES, SITE, tel } from "@/content/site";
import { ShieldCheck, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const REGULATORY_PORTALS = [
  { name: "NSE", href: "https://www.nseindia.com/" },
  { name: "BSE", href: "https://www.bseindia.com/" },
  { name: "SEBI", href: "https://www.sebi.gov.in/" },
  { name: "RBI", href: "https://www.rbi.org.in/" },
  { name: "CDSL", href: "https://www.cdslindia.com/" },
  { name: "NCDEX", href: "https://www.ncdex.com/" },
  { name: "MCX", href: "https://www.mcxindia.com/" },
];

const COMPLIANCE_NAV_LINKS = [
  { label: "AMFI Risk Factors", href: "/risk-factors", external: false },
  { label: "Terms & Conditions", href: "/terms-of-service", external: false },
  { label: "Disclaimer", href: "/disclaimer", external: false },
  { label: "Investor Charter", href: "/investor-charter", external: false },
  { label: "Fund Selection & Suitability Policy", href: "/fund-selection-policy", external: false },
  { label: "Client Onboarding & KYC Policy", href: "/client-onboarding", external: false },
  { label: "Rights & Obligations Of Investors", href: "/rights-and-obligations", external: false },
  { label: "Do's and Don'ts for Investors", href: "/dos-and-donts", external: false },
  { label: "Privacy Policy", href: "/privacy-policy", external: false },
  { label: "AMFI Code of Conduct", href: "/AMFI_Code-of-Conduct.pdf", external: true },
  { label: "SEBI Circulars", href: "https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=1&ssid=7&smid=0", external: true },
  { label: "KIM / SID / SAI", href: "https://www.sebi.gov.in/filings/mutual-funds.html", external: true },
  { label: "Factsheet", href: "https://www.amfiindia.com/online-center/download-factsheets", external: true },
  { label: "Scheme-Wise Commission Disclosure", href: "/scheme-wise-commission", external: false },
  { label: "Registration Disclosure", href: "/registration-disclosure", external: false },
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
            <li><Link href="/scheme-wise-commission">AMC Commission Disclosure</Link></li>
            <li><Link href="/registration-disclosure">Registration Disclosure</Link></li>
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
                  {SITE.phones.map((p) => (
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

      {/* Regulatory & Compliance Deep-Navy Section (AMFI/SEBI Standard Compliance) */}
      <div className="regulatory-section-dark">
        <div className="wrap">
          {/* 1. Important Regulatory & Exchange Portals (Top Capsules Row) */}
          <div className="regulatory-portals-capsules-block">
            <h5 className="portals-title-centered">IMPORTANT REGULATORY &amp; EXCHANGE PORTALS</h5>
            <div className="portals-capsules-row">
              {REGULATORY_PORTALS.map((portal) => (
                <a
                  key={portal.name}
                  href={portal.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portal-capsule-btn"
                >
                  <span>{portal.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* 2. Statutory Risk & Market Disclaimers (Centered, 12px text) */}
          <div className="regulatory-disclaimers-text">
            <p>
              Investments in securities markets are subject to market risks. Mutual Fund investments are subject to
              market risks. Please read all scheme-related documents carefully before investing. Past performance is
              not indicative of future returns.
            </p>
            <p>
              The value of investments may fluctuate due to various factors including market conditions, interest rate
              movements, credit quality of underlying securities, and liquidity in the market.
            </p>
            <p>
              Different types of financial products carry different levels of risk. Investors should evaluate their risk
              appetite and investment objectives before making any investment decision.
            </p>
            <p>
              Please refer to the respective offering documents such as the Scheme Information Document (SID), Key
              Information Memorandum (KIM), Disclosure Documents, or other product-specific materials for detailed risk
              factors.
            </p>
            <div className="regulatory-credentials-centered">
              <p>
                AMFI Registered Mutual Fund Distributor | ARN: <strong>ARN-173086</strong> | Date:{" "}
                <strong>09/11/2020</strong> | Valid Till: <strong>11/11/2029</strong>
              </p>
              <p>
                For Grievances contact: <strong>+91 8141112000 / +91 9825423773</strong> | Email:{" "}
                <a href={`mailto:${SITE.email}`} className="footer-gold-link">
                  {SITE.email}
                </a>
              </p>
            </div>
          </div>

          {/* 3. Regulatory & Compliance Navigation Links (Centered, single pipe-separated row) */}
          <div className="regulatory-compliance-links-row">
            {COMPLIANCE_NAV_LINKS.map((item, idx) => (
              <span key={item.label} className="compliance-link-wrapper">
                {idx > 0 && <span className="compliance-pipe">|</span>}
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="compliance-nav-link"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} className="compliance-nav-link">
                    {item.label}
                  </Link>
                )}
              </span>
            ))}
          </div>

          {/* 4. Industry Badges (Centered) */}
          <div className="regulatory-industry-badges-row">
            <div className="industry-badge-card">
              <img src="/images/amfi-logo.webp" alt="AMFI Registered Mutual Fund Distributor" />
            </div>
            <div className="industry-badge-card">
              <img src="/images/mf-sahi-hai-logo.webp" alt="Mutual Funds Sahi Hai" />
            </div>
          </div>

          {/* 5. Bottom Copyright & Attribution Bar */}
          <div className="regulatory-bottom-bar">
            <span>© 2026 Shah Financial Services. All rights reserved.</span>
            <span>
              Designed by{" "}
              <a
                href="https://ainatech.in"
                target="_blank"
                rel="noopener noreferrer"
                className="ainatech-link"
              >
                AinaTech Services LLP
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
