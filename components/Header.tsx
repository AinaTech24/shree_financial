"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { SERVICES, SITE, tel } from "@/content/site";
import {
  Phone,
  Mail,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  UserCheck,
} from "lucide-react";

const SERVICE_TAGS: Record<string, string> = {
  "mutual-funds": "Systematic SIP & long-term compounding",
  "goal-based-mutual-fund-investing": "Purpose-driven milestone wealth creation",
  pms: "Bespoke HNI portfolio management",
  retirement: "Inflation-proof corpus & monthly SWP",
  "child-marriage": "Dedicated long-term wedding corpus",
  education: "Domestic & overseas higher studies",
  bonds: "Fixed income & capital protection",
};

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [suppressed, setSuppressed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const act = (p: string) => (path === p ? "active" : "");

  // Auto-close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setSuppressed(false);
    setOpen(false);
  }, [path]);

  const close = () => {
    setOpen(false);
    setActiveDropdown(null);
    setSuppressed(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleMouseEnter = (name: string) => {
    if (suppressed) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    setSuppressed(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 60);
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

            {/* Services Dropdown (Image 3 Style: Clean Vertical List with Subtitle and Right Chevron) */}
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
                className={`dd dd-vertical-services ${activeDropdown === "services" ? "open" : ""}`}
              >
                {/* 1. All Services Top Link */}
                <Link
                  href="/services"
                  className="dd-vertical-item"
                  onClick={close}
                >
                  <div className="dd-item-text-stack">
                    <strong className="dd-item-title">All Services</strong>
                    <span className="dd-item-sub">Explore complete financial solutions</span>
                  </div>
                  <ChevronRight size={14} className="dd-item-arrow" />
                </Link>

                {/* 2. Service Items */}
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}`}
                    className="dd-vertical-item"
                    onClick={close}
                  >
                    <div className="dd-item-text-stack">
                      <strong className="dd-item-title">{s.label}</strong>
                      <span className="dd-item-sub">
                        {SERVICE_TAGS[s.slug] || "Tailored financial planning"}
                      </span>
                    </div>
                    <ChevronRight size={14} className="dd-item-arrow" />
                  </Link>
                ))}
              </div>
            </li>

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
              <a
                href="https://shahfs.com/login.php"
                target="_blank"
                rel="noopener noreferrer"
                className="login-btn"
              >
                <UserCheck size={16} />
                <span>Portfolio Login</span>
              </a>
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
            <Link href="/services">Services</Link>
            <Link href="/calculator">Calculators</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact Us</Link>
            <a
              href="https://shahfs.com/login.php"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-login-btn"
            >
              Portfolio Login
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
