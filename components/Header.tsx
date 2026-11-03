"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SERVICES, SITE, tel } from "@/content/site";
import { Phone, Mail, ChevronDown, Menu, X, UserCheck } from "lucide-react";

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const act = (p: string) => (path === p ? "active" : "");
  const close = () => setOpen(false);

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

            {/* Services Dropdown */}
            <li className="nav-dropdown-item">
              <button className={`nav-link ${path.startsWith("/services") ? "active" : ""}`} aria-haspopup="true">
                Services <ChevronDown size={14} className="chevron-icon" />
              </button>
              <div className="dd dd-wide">
                <div className="dd-header">
                  <Link href="/services" className="dd-all-link">
                    View All Services Overview →
                  </Link>
                </div>
                <div className="dd-grid-links">
                  {SERVICES.map((s) => (
                    <Link key={s.slug} href={`/${s.slug}`} className="dd-item">
                      <img src={s.icon} alt="" className="dd-icon" />
                      <div>
                        <strong>{s.label}</strong>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </li>

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
                Blog
              </Link>
            </li>

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
