"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Phone,
  Layers,
  Sparkles,
  BarChart3,
  Calendar,
  Lock,
  Percent,
  HelpCircle,
  Briefcase,
  Award,
} from "lucide-react";
import { SERVICES, SITE, tel } from "@/content/site";
import LeadForm from "./LeadForm";

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
    categoryBadge: "Wealth Creation & Compounding",
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
    categoryBadge: "Purpose-Driven Financial Planning",
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
    categoryBadge: "Family Milestone Planning",
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
      "Postal small savings schemes for guaranteed stability",
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
    heroSubtitle: "Comprehensive wealth distribution and advisory support customized to your financial journey.",
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
    <div className="dedicated-service-page">
      {/* Hero Section */}
      <section className="service-hero-section">
        <div className="wrap">
          <div className="service-hero-grid">
            <div className="service-hero-content">
              <div className="service-category-badge">
                <Sparkles size={14} className="sparkle-icon" />
                <span>{meta.categoryBadge}</span>
              </div>

              <h1 className="service-hero-title">{service.title}</h1>

              <p className="service-hero-lead">{meta.heroSubtitle}</p>

              <div className="service-trust-tags">
                <span className="trust-tag">
                  <ShieldCheck size={16} /> AMFI Registered (ARN-173086)
                </span>
                <span className="trust-tag">
                  <CheckCircle2 size={16} /> 100% Paperless Process
                </span>
                <span className="trust-tag">
                  <Award size={16} /> Serving Since 2007
                </span>
              </div>

              <div className="service-cta-row">
                <Link href="/contact" className="btn btn-primary">
                  <span>Start Investing Today</span>
                  <ArrowRight size={16} />
                </Link>
                <a href={tel(SITE.phones[0])} className="btn btn-ghost">
                  <Phone size={16} />
                  <span>Call: {SITE.phones[0]}</span>
                </a>
              </div>
            </div>

            {/* Quick Consultation Card */}
            <div className="service-hero-card">
              <div className="hero-lead-card">
                <h3>Get Personal Advice</h3>
                <p>Have questions about {service.title}? Speak with an experienced AMFI registered distributor.</p>
                <LeadForm showService={false} subject={`Enquiry: ${service.title}`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fast Facts Bar */}
      <section className="service-fast-facts-bar">
        <div className="wrap">
          <div className="fast-facts-grid">
            <div className="fact-item">
              <span className="fact-label">Recommended Horizon</span>
              <strong className="fact-val">{meta.horizon}</strong>
            </div>
            <div className="fact-item">
              <span className="fact-label">Minimum Outgo</span>
              <strong className="fact-val">{meta.minInvestment}</strong>
            </div>
            <div className="fact-item">
              <span className="fact-label">Liquidity Profile</span>
              <strong className="fact-val">{meta.liquidity}</strong>
            </div>
            <div className="fact-item">
              <span className="fact-label">Risk Spectrum</span>
              <strong className="fact-val">{meta.riskLevel}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="section white">
        <div className="wrap">
          <div className="service-body-grid">
            {/* Left Content Column */}
            <div className="service-body-content">
              {contentSections.map((sec, i) => (
                <div key={sec.h} className="service-content-block">
                  <div className="sec-title-with-pill">
                    <span className="sec-num-badge">0{i + 1}</span>
                    <h2 className="sec-block-title">{sec.h}</h2>
                  </div>
                  <div className="sec-block-html prose" dangerouslySetInnerHTML={{ __html: sec.html }} />
                </div>
              ))}

              {/* 4-Step Process Section */}
              <div className="service-process-box">
                <div className="sec-head">
                  <span className="eyebrow">Our Methodology</span>
                  <h2>How We Guide You to Success</h2>
                  <p>A systematic, transparent process ensuring your capital works diligently for you.</p>
                </div>

                <div className="process-steps-grid">
                  {meta.processSteps.map((step, idx) => (
                    <div key={step.title} className="process-step-card">
                      <div className="step-number">{idx + 1}</div>
                      <h4 className="step-title">{step.title}</h4>
                      <p className="step-desc">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Calculator Banner Link */}
              <div className="service-calc-cta-banner">
                <div className="calc-banner-text">
                  <h3>Project Your Investment Growth</h3>
                  <p>Use our interactive calculators with Rule of 72 benchmarks and yearly compounding tables.</p>
                </div>
                <Link href="/calculator" className="btn btn-gold">
                  <span>Open Calculators Hub</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right Sticky Sidebar */}
            <aside className="service-sidebar">
              {/* Key Benefits Card */}
              <div className="sidebar-card benefits-card">
                <h4 className="sidebar-card-title">Key Highlights</h4>
                <ul className="benefits-list">
                  {meta.highlights.map((h) => (
                    <li key={h}>
                      <CheckCircle2 size={16} className="benefit-icon" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Need Guidance Box */}
              <div className="sidebar-card help-card">
                <div className="help-icon-wrap">
                  <Phone size={24} />
                </div>
                <h4>Have Questions?</h4>
                <p>Speak directly with our investment experts in Khambhat, Gujarat.</p>
                <div className="help-phone-stack">
                  {SITE.phones.map((p) => (
                    <a key={p} href={tel(p)} className="help-phone-btn">
                      {p}
                    </a>
                  ))}
                </div>
                <Link href="/contact" className="btn btn-ghost sidebar-btn">
                  Write to Us
                </Link>
              </div>

              {/* Regulatory Notice */}
              <div className="sidebar-card notice-card">
                <h5>Regulatory Disclosure</h5>
                <p>
                  Mutual Fund investments are subject to market risks. Please read all scheme-related documents
                  carefully before investing. Past performance is not indicative of future returns. Shah Financial
                  Services is an AMFI registered Mutual Fund Distributor (ARN-173086).
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Explore Other Services Grid (Replacing cramped sidebar) */}
      <section className="section other-services-section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Explore More</span>
            <h2>Explore Our Other Services</h2>
            <p>Comprehensive financial solutions designed to protect and compound your family wealth.</p>
          </div>

          <div className="other-services-grid">
            {otherServices.map((s) => (
              <Link key={s.slug} href={`/${s.slug}`} className="other-service-card">
                <div className="card-icon-area">
                  <img src={s.icon} alt="" className="other-service-icon" />
                </div>
                <h4 className="other-service-title">{s.label}</h4>
                <span className="other-service-link">
                  Learn More <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

