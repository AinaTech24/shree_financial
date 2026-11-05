"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Phone,
  Sparkles,
  Award,
  Wallet,
  TrendingUp,
  Activity,
  MessageCircle,
  ExternalLink,
  Layers,
  FileText,
} from "lucide-react";
import { SERVICES, SITE, tel } from "@/content/site";

interface ServiceViewProps {
  slug: string;
  service: {
    title: string;
    sections: { h: string; html: string }[];
  };
}

const SERVICE_META: Record<
  string,
  {
    categoryBadge: string;
    heroSubtitle: string;
    minInvestment: string;
    horizon: string;
    liquidity: string;
    riskLevel: string;
    highlights: string[];
    processSteps: { title: string; desc: string }[];
  }
> = {
  "mutual-funds": {
    categoryBadge: "Long-Term Capital Compounding",
    heroSubtitle:
      "A diversified, professionally managed pathway to participate in India's economic growth through transparent, SEBI-regulated schemes.",
    minInvestment: "₹500 / month SIP",
    horizon: "3 to 10+ Years",
    liquidity: "High (T+1 / T+2 Days)",
    riskLevel: "Low to High (Scheme Dependent)",
    highlights: [
      "Access to professional fund management teams",
      "Diversification across 40+ stocks per scheme",
      "Full liquidity with no long lock-in on open-ended funds",
      "Automated monthly SIP for compounding discipline",
    ],
    processSteps: [
      { title: "Define Financial Goals", desc: "Identify your time horizon and capital requirements." },
      { title: "Risk Profile Analysis", desc: "Assess risk tolerance to pick suitable fund categories." },
      { title: "100% Paperless KYC", desc: "Complete paperless digital onboarding in minutes." },
      { title: "Ongoing Tracking & Reviews", desc: "Periodic portfolio review to keep you on track." },
    ],
  },
  "goal-based-mutual-fund-investing": {
    categoryBadge: "Purpose-Driven Milestone Investing",
    heroSubtitle:
      "Transform random savings into targeted milestones — linking every rupee invested to a tangible life ambition.",
    minInvestment: "Customized to Goal",
    horizon: "1 to 20+ Years",
    liquidity: "Structured by Goal Date",
    riskLevel: "Balanced Asset Allocation",
    highlights: [
      "Eliminates guesswork with mathematical goal tracking",
      "Dynamic asset allocation between equity & debt",
      "Milestone-based progress monitoring",
      "Disciplined SIP execution aligned with salary cycle",
    ],
    processSteps: [
      { title: "List Life Milestones", desc: "Map goals like education, home down payment, and retirement." },
      { title: "Calculate Inflation Cost", desc: "Project future target values factoring inflation." },
      { title: "Targeted Scheme Allocation", desc: "Deploy capital into ideal risk-adjusted funds." },
      { title: "De-risking As Target Nears", desc: "Systematically move equity gains to debt near maturity." },
    ],
  },
  pms: {
    categoryBadge: "High Net-Worth Portfolio Management",
    heroSubtitle:
      "Direct equity and bespoke asset management for discerning investors seeking active alpha generation through SEBI-registered portfolio managers.",
    minInvestment: "₹50 Lakhs (SEBI Mandate)",
    horizon: "3 to 7+ Years",
    liquidity: "Direct Demat Ownership",
    riskLevel: "High Alpha Potential",
    highlights: [
      "Individual Demat accounts with direct stock ownership",
      "Focused portfolios of 15 to 25 high-conviction ideas",
      "Direct interactions with expert fund management teams",
      "Complete transaction and holding transparency",
    ],
    processSteps: [
      { title: "Investor Suitability", desc: "Review investor profile, liquidity, and investment charter." },
      { title: "Strategy Selection", desc: "Choose between focused equity, multi-cap, or value strategies." },
      { title: "Account & Custody Setup", desc: "Seamless onboarding with registered custodians." },
      { title: "Detailed Reporting", desc: "Receive comprehensive monthly performance and audit statements." },
    ],
  },
  retirement: {
    categoryBadge: "Post-Work Financial Freedom",
    heroSubtitle:
      "Build a robust, inflation-proof nest egg that generates predictable monthly income and ensures financial independence for life.",
    minInvestment: "₹2,000 / month SIP or Lump sum",
    horizon: "10 to 30 Years",
    liquidity: "Structured for Retirement",
    riskLevel: "Gradual De-risking Profile",
    highlights: [
      "Protects lifestyle against healthcare and living inflation",
      "Calculated Systematic Withdrawal Plan (SWP) post-retirement",
      "Minimizes tax burden compared to traditional fixed deposits",
      "Eliminates dependency and ensures dignified living",
    ],
    processSteps: [
      { title: "Estimate Retirement Outgo", desc: "Calculate future living and medical costs with inflation." },
      { title: "Accumulation Phase", desc: "Aggressive compounding in equity mutual funds." },
      { title: "Transition Strategy", desc: "Systematic reallocation to conservative and debt funds." },
      { title: "Distribution via SWP", desc: "Enjoy regular monthly cashflows while preserving corpus." },
    ],
  },
  "child-marriage": {
    categoryBadge: "Family Milestone Goals",
    heroSubtitle:
      "Celebrate your child's momentous wedding celebration stress-free with a dedicated, ring-fenced compounding corpus.",
    minInvestment: "₹2,500 / month SIP",
    horizon: "7 to 18 Years",
    liquidity: "Goal-Locked Discipline",
    riskLevel: "Moderate to Growth Oriented",
    highlights: [
      "Buffers against 10%+ annualized wedding inflation",
      "Mix of equity compounding and gold asset allocation",
      "Avoids costly personal loans or distress liquidation of assets",
      "Complete peace of mind for the family",
    ],
    processSteps: [
      { title: "Determine Horizon", desc: "Identify number of years until the anticipated wedding." },
      { title: "Estimate Budget", desc: "Factor in venue, gold, hospitality, and ceremonial costs." },
      { title: "Dedicated SIP Bucket", desc: "Maintain a segregated portfolio untouched by other expenses." },
      { title: "Orderly Liquidation", desc: "Shift to stable liquid assets 1-2 years prior to wedding." },
    ],
  },
  education: {
    categoryBadge: "Next-Generation Higher Studies",
    heroSubtitle:
      "Equip your children with world-class education in India or premier international universities through foresight and systematic investing.",
    minInvestment: "₹3,000 / month SIP",
    horizon: "5 to 15 Years",
    liquidity: "Tuition-Schedule Aligned",
    riskLevel: "Growth with Milestone Preservation",
    highlights: [
      "Counters escalating 10-12% education inflation in India and abroad",
      "Hedges against currency depreciation for foreign degrees",
      "Ensures dreams are never compromised by financial constraints",
      "Automated monthly investments grow with your salary",
    ],
    processSteps: [
      { title: "Define Career Aspirations", desc: "Identify target degrees, universities, and target year." },
      { title: "Currency & Fee Estimation", desc: "Factor in tuition, boarding, living costs, and forex." },
      { title: "Growth Allocation", desc: "Deploy in diversified equity funds for early compounding." },
      { title: "Fee-Milestone Payouts", desc: "Systematically disburse funds as university semesters begin." },
    ],
  },
  bonds: {
    categoryBadge: "Fixed Income & Capital Preservation",
    heroSubtitle:
      "Secure predictable regular income, preserve capital safety, and optimize returns with sovereign, corporate, and postal savings instruments.",
    minInvestment: "₹10,000 / one-time",
    horizon: "1 to 10 Years",
    liquidity: "Periodic Interest & Redemption",
    riskLevel: "Low to Sovereign Risk",
    highlights: [
      "Government-backed security and AAA-rated corporate safety",
      "Regular half-yearly or annual coupon payments",
      "Exemptions on capital gains via Section 54EC bonds",
      "Postal small savings schemes for capital preservation",
    ],
    processSteps: [
      { title: "Assess Cashflow Needs", desc: "Determine frequency of desired interest payouts." },
      { title: "Credit Quality Filter", desc: "Filter highest-rated instruments to prevent credit risk." },
      { title: "Yield Curve Optimization", desc: "Lock in attractive yields during high-rate market cycles." },
      { title: "Direct Execution", desc: "Receive automated interest credited directly to your bank." },
    ],
  },
};

export default function DedicatedServiceView({ slug, service }: ServiceViewProps) {
  const meta = SERVICE_META[slug] || {
    categoryBadge: "Financial Service",
    heroSubtitle: "Comprehensive mutual fund distribution and disciplined assistance customized to your financial journey.",
    minInvestment: "Flexible",
    horizon: "Medium to Long Term",
    liquidity: "Product Dependent",
    riskLevel: "Profile Aligned",
    highlights: [
      "Transparent fee structure with zero hidden charges",
      "AMFI registered distribution support since 2007",
      "Comprehensive tracking on web and mobile application",
      "Dedicated relationship manager support",
    ],
    processSteps: [
      { title: "Initial Consultation", desc: "Discuss your goals and current financial standing." },
      { title: "Solution Customization", desc: "Select the most appropriate investment vehicles." },
      { title: "Seamless Execution", desc: "Digital onboarding and transparent execution." },
      { title: "Regular Review", desc: "Keep your investments aligned with life changes." },
    ],
  };

  const otherServices = SERVICES.filter((s) => s.slug !== slug);
  const contentSections = service.sections.filter((s) => s.html);

  return (
    <div className="dedicated-service-page-v2">
      {/* 1. Clean Service Hero */}
      <section className="svc-hero-clean">
        <div className="wrap">
          <div className="svc-hero-inner">
            <span className="svc-hero-badge">
              <Sparkles size={13} className="text-indigo-600" />
              {meta.categoryBadge}
            </span>

            <h1 className="svc-hero-title">{service.title}</h1>

            <p className="svc-hero-desc">{meta.heroSubtitle}</p>

            <div className="svc-hero-trust-row">
              <span className="svc-trust-pill">
                <ShieldCheck size={14} className="text-indigo-600" />
                AMFI Registered (ARN-173086)
              </span>
              <span className="svc-trust-pill">
                <CheckCircle2 size={14} className="text-emerald-600" />
                100% Paperless Process
              </span>
              <span className="svc-trust-pill">
                <Award size={14} className="text-amber-600" />
                Serving Since 2007
              </span>
            </div>
          </div>

          {/* 2. Key Parameters Simple Card (Replaces the dark bar) */}
          <div className="svc-key-facts-card">
            <div className="fact-cell">
              <div className="fact-icon-bubble bg-indigo">
                <Clock size={18} />
              </div>
              <div className="fact-data">
                <span className="fact-label">Recommended Horizon</span>
                <strong className="fact-val">{meta.horizon}</strong>
              </div>
            </div>

            <div className="fact-cell">
              <div className="fact-icon-bubble bg-emerald">
                <Wallet size={18} />
              </div>
              <div className="fact-data">
                <span className="fact-label">Minimum Outgo</span>
                <strong className="fact-val">{meta.minInvestment}</strong>
              </div>
            </div>

            <div className="fact-cell">
              <div className="fact-icon-bubble bg-blue">
                <Activity size={18} />
              </div>
              <div className="fact-data">
                <span className="fact-label">Liquidity Profile</span>
                <strong className="fact-val">{meta.liquidity}</strong>
              </div>
            </div>

            <div className="fact-cell">
              <div className="fact-icon-bubble bg-amber">
                <TrendingUp size={18} />
              </div>
              <div className="fact-data">
                <span className="fact-label">Risk Spectrum</span>
                <strong className="fact-val">{meta.riskLevel}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content & Sidebar (Simple Cards Layout) */}
      <section className="section white svc-body-section">
        <div className="wrap">
          <div className="svc-content-layout">
            {/* Left Column: Simple Cards for all Service Sections */}
            <div className="svc-primary-cards">
              {contentSections.map((sec, idx) => (
                <div key={idx} className="svc-simple-card">
                  <div className="svc-card-header">
                    <span className="svc-card-step-badge">0{idx + 1}</span>
                    <h2 className="svc-card-heading">{sec.h}</h2>
                  </div>
                  <div
                    className="svc-card-body prose"
                    dangerouslySetInnerHTML={{ __html: sec.html }}
                  />
                </div>
              ))}

              {/* 4-Step Methodology Card */}
              <div className="svc-simple-card svc-methodology-card">
                <div className="svc-card-header">
                  <span className="svc-card-step-badge">
                    <Layers size={14} />
                  </span>
                  <div>
                    <h2 className="svc-card-heading">How We Guide You to Success</h2>
                    <p className="svc-card-sub">
                      A systematic 4-step framework engineered for long-term consistency and peace of mind.
                    </p>
                  </div>
                </div>

                <div className="svc-methodology-grid">
                  {meta.processSteps.map((step, idx) => (
                    <div key={step.title} className="method-step-box">
                      <span className="method-num">{idx + 1}</span>
                      <h4 className="method-title">{step.title}</h4>
                      <p className="method-desc">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Calculator Banner Card */}
              <div className="svc-calc-cta-card">
                <div className="cta-calc-content">
                  <span className="cta-calc-tag">Financial Assessment Tools</span>
                  <h3 className="cta-calc-title">Assess Your SIP &amp; Milestone Growth</h3>
                  <p className="cta-calc-desc">
                    Use our interactive financial calculators with Rule of 72 doubling benchmarks and year-by-year compounding tables.
                  </p>
                </div>
                <Link href="/calculator" className="btn btn-primary cta-calc-btn">
                  <span>Explore All Calculators</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Right Column: Sticky Sidebar Simple Cards */}
            <aside className="svc-sidebar-cards">
              {/* Card 1: Key Highlights */}
              <div className="svc-side-card">
                <h3 className="side-card-title">Key Highlights</h3>
                <ul className="side-highlights-list">
                  {meta.highlights.map((h) => (
                    <li key={h} className="side-highlight-item">
                      <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 2: Speak with Our Team */}
              <div className="svc-side-card help-side-card">
                <div className="help-icon-bubble">
                  <Phone size={22} />
                </div>
                <h3 className="side-card-title">Speak with Our Team</h3>
                <p className="help-side-text">
                  Have questions about this service? Speak directly with our AMFI registered specialists in Khambhat.
                </p>

                <div className="help-direct-phones">
                  {SITE.phones.slice(0, 2).map((p) => (
                    <a key={p} href={tel(p)} className="help-phone-row">
                      <Phone size={14} className="text-indigo-600" />
                      <span>{p}</span>
                    </a>
                  ))}
                </div>

                <a
                  href={`https://wa.me/${SITE.whatsapp}?text=Hello%20Shah%20Financial%20Services,%20I%20have%20an%20inquiry%20regarding%20${encodeURIComponent(service.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="side-whatsapp-action"
                >
                  <MessageCircle size={16} />
                  <span>Chat on WhatsApp</span>
                  <ExternalLink size={13} />
                </a>

                <Link href="/contact" className="side-consult-btn">
                  Book Free Consultation →
                </Link>
              </div>

              {/* Card 3: Regulatory Notice */}
              <div className="svc-side-card compliance-side-card">
                <span className="compliance-tag">Regulatory Disclosure</span>
                <p className="compliance-text">
                  Mutual Fund investments are subject to market risks. Please read all scheme-related documents
                  carefully before investing. Past performance is not indicative of future returns. Shah Financial
                  Services is an AMFI registered Mutual Fund Distributor (ARN-173086).
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 4. Explore Other Services Grid (Simple Cards) */}
      <section className="section tight other-services-section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">More Solutions</span>
            <h2>Explore Our Other Services</h2>
            <p>Comprehensive financial solutions designed to protect and compound your family wealth.</p>
          </div>

          <div className="other-services-grid">
            {otherServices.map((s) => (
              <Link key={s.slug} href={`/${s.slug}`} className="other-service-simple-card">
                <div className="other-svc-icon-box">
                  <img src={s.icon} alt="" className="other-svc-icon" />
                </div>
                <h4 className="other-svc-title">{s.label}</h4>
                <span className="other-svc-action">
                  Learn More <ArrowRight size={14} className="arrow" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
