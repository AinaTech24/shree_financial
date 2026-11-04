"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { SERVICES, SITE, tel } from "@/content/site";
<<<<<<< HEAD
import {
  Phone,
  Mail,
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
  UserCheck,
  ArrowRight,
} from "lucide-react";

const SERVICE_TAGS: Record<string, string> = {
  "mutual-funds": "Equity, Debt, Hybrid & Liquid Systematic SIPs",
  "goal-based-mutual-fund-investing": "Purpose-driven milestone wealth creation",
  pms: "Discretionary & non-discretionary HNI portfolios",
  retirement: "Inflation-indexed corpus & monthly SWP cashflows",
  "child-marriage": "Dedicated ring-fenced wedding milestone corpus",
  education: "Target-date higher studies in India & overseas",
  bonds: "Fixed coupon government & corporate debt securities",
};
=======
import { Phone, Mail, ChevronDown, Menu, X, UserCheck } from "lucide-react";
>>>>>>> f79a62daf99d52674dfc4ea3f048d39e8db3d898

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const act = (p: string) => (path === p ? "active" : "");
  const close = () => {
    setOpen(false);
    setActiveDropdown(null);
  };

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 350);
  };

  return (
    <>
      {/* Utility Bar */}
      <div className="utility">
        <div className="wrap utility-flex">
          <div className="u-phones">
            <span className="u-label">
              <Phone size={13} /> Helpline:
            </span>
            {SITE.phones.map((p, idx) => (
              <span key={p}>
                {idx > 0 && <span className="u-sep">|</span>}
                <a href={tel(p)}>{p}</a>
              </span>
            ))}
          </div>

          <div className="u-right-block">
            <div className="u-mail">
              <Mail size={13} />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </div>
            <span className="u-arn-badge">AMFI ARN-173086</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="header">
        <div className="wrap">
          <Link href="/" className="brand" aria-label="Shah Financial Services home" onClick={close}>
            <img src="/img/misc/logo.png" alt="Shah Financial Services" />
          </Link>

          <ul className="nav">
            <li>
              <Link href="/" className={act("/")}>
                Home
              </Link>
            </li>

            <li>
              <Link href="/about" className={act("/about")}>
                About Us
              </Link>
            </li>

            {/* Services Dropdown (Spacious, No Icons) */}
            <li
              className={`nav-dropdown-item ${activeDropdown === "services" ? "is-open" : ""}`}
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/services"
                className={`nav-link ${path.startsWith("/services") ? "active" : ""}`}
                onClick={close}
              >
                Services <ChevronDown size={14} className="chevron-icon" />
              </Link>
              <div
                className={`dd dd-spacious-services ${activeDropdown === "services" ? "open" : ""}`}
                onMouseEnter={() => handleMouseEnter("services")}
                onMouseLeave={handleMouseLeave}
              >
                <div className="dd-spacious-header">
                  <div>
                    <span className="dd-spacious-eyebrow">Wealth Management &amp; Distribution</span>
                    <h4 className="dd-spacious-title">Explore Our Financial Solutions</h4>
                  </div>
                  <Link href="/services" className="dd-view-all-btn" onClick={close}>
                    <span>View All Services Overview</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                <div className="dd-services-layout">
                  {SERVICES.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/${s.slug}`}
                      className="dd-service-item-noicon"
                      onClick={close}
                    >
                      <div className="dd-service-text">
                        <strong className="dd-service-name">{s.label}</strong>
                        <p className="dd-service-desc">
                          {SERVICE_TAGS[s.slug] || "Tailored distribution & planning"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="dd-spacious-footer">
                  <div className="dd-trust-line">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    <span>AMFI Registered Distributor ARN-173086 • Serving Investors Since 2007</span>
                  </div>
                </div>
              </div>
            </li>

<<<<<<< HEAD
            {/* Calculators: Direct Link */}
            <li>
              <Link
                href="/calculator"
                className={`nav-link ${path.startsWith("/calculator") ? "active" : ""}`}
              >
                Calculators
              </Link>
            </li>

            {/* Blog */}
            <li>
              <Link
                href="/blog"
                className={`nav-link ${path.startsWith("/blog") ? "active" : ""}`}
              >
=======
            {/* Calculators Dropdown */}
            <li className="nav-dropdown-item">
              <button
                className={`nav-link ${path.includes("calc") ? "active" : ""}`}
                aria-haspopup="true"
              >
                Calculators <ChevronDown size={14} className="chevron-icon" />
              </button>
              <div className="dd">
                <Link href="/calculator" className="dd-item">
                  <strong>Calculators Hub (14 Tools)</strong>
                </Link>
                <Link href="/investment-calculators" className="dd-item">
                  Investment &amp; Goal Calculators
                </Link>
                <Link href="/mf-tools-calculators" className="dd-item">
                  MF Performance Calculators
                </Link>
              </div>
            </li>

            <li>
              <Link href="/blog" className={act("/blog")}>
>>>>>>> f79a62daf99d52674dfc4ea3f048d39e8db3d898
                Blog
              </Link>
            </li>

            {/* Contact Us */}
            <li>
              <Link href="/contact" className={act("/contact")}>
                Contact Us
              </Link>
            </li>

            <li>
              <Link href="/login" className="login-btn">
                <UserCheck size={16} />
                <span>Portfolio Login</span>
              </Link>
            </li>
          </ul>

          <button
            className="burger"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <nav className="mobile-nav" onClick={(e) => (e.target as HTMLElement).closest("a") && close()}>
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
<<<<<<< HEAD
            <Link href="/services">Services</Link>
            <Link href="/calculator">Calculators</Link>
=======
            <details>
              <summary>Services</summary>
              <div className="mobile-sub">
                <Link href="/services">All Services Overview</Link>
                {SERVICES.map((s) => (
                  <Link key={s.slug} href={`/${s.slug}`}>
                    {s.label}
                  </Link>
                ))}
              </div>
            </details>
            <details>
              <summary>Calculators</summary>
              <div className="mobile-sub">
                <Link href="/calculator">Calculators Hub (All 14)</Link>
                <Link href="/investment-calculators">Investment Calculators</Link>
                <Link href="/mf-tools-calculators">MF Tools Calculators</Link>
              </div>
            </details>
>>>>>>> f79a62daf99d52674dfc4ea3f048d39e8db3d898
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/login" className="mobile-login-btn">
              Portfolio Login
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
