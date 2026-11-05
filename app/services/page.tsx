import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { SERVICES, SITE } from "@/content/site";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Lock,
  Layers,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services | Shah Financial Services",
  description:
    "Explore our complete suite of mutual fund distribution solutions: Mutual Funds, Goal-Based Investing, PMS & AIF, Retirement Planning, Child Education & Marriage, and Bonds.",
};

interface ServiceMeta {
  category: string;
  description: string;
  pill1: string;
  pill2: string;
  highlight: string;
}

const SERVICE_DETAILS: Record<string, ServiceMeta> = {
  "mutual-funds": {
    category: "Capital Compounding",
    description:
      "Access equity, hybrid, debt, and liquid funds managed by India's top asset management companies with disciplined SIP allocation.",
    pill1: "Paperless SIP & Lumpsum",
    pill2: "40+ AMCs Integrated",
    highlight: "Start from ₹500/mo",
  },
  "goal-based-mutual-fund-investing": {
    category: "Milestone Goals",
    description:
      "Link every rupee of mutual fund allocation to specific milestones such as buying a home, higher studies, or family wealth.",
    pill1: "Custom Asset Allocation",
    pill2: "Glide-Path Strategy",
    highlight: "Target-Date Precision",
  },
  pms: {
    category: "HNI Solutions",
    description:
      "Bespoke equity and multi-asset portfolio management for HNIs demanding high-conviction stock selection and institutional oversight.",
    pill1: "Direct Stock Ownership",
    pill2: "APMI APRN-04142",
    highlight: "SEBI Min. ₹50 Lakhs",
  },
  retirement: {
    category: "Financial Freedom",
    description:
      "Engineer an inflation-indexed corpus generating dependable, tax-efficient monthly income via systematic withdrawal plans (SWP).",
    pill1: "Inflation-Proof Corpus",
    pill2: "Monthly SWP Cashflow",
    highlight: "Lifelong Dignity",
  },
  "child-marriage": {
    category: "Family Milestone",
    description:
      "Ring-fence a dedicated long-term investment bucket for your child's wedding without touching retirement savings or taking loans.",
    pill1: "Earmarked Growth Folio",
    pill2: "Gradual De-risking",
    highlight: "100% Debt-Free",
  },
  education: {
    category: "Higher Studies",
    description:
      "Equip your children for premier higher education in India or overseas with calculated inflation-adjusted monthly SIP roadmaps.",
    pill1: "Overseas Inflation Hedge",
    pill2: "Timely Fee Liquidity",
    highlight: "Global Dream Ready",
  },
  bonds: {
    category: "Capital Preservation",
    description:
      "Secure predictable recurring yields and capital protection with Sovereign Gold Bonds, RBI floating bonds, and AAA corporate securities.",
    pill1: "Sovereign & AAA Safety",
    pill2: "Predictable Yields",
    highlight: "Fixed Coupon Returns",
  },
};

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Goal Discovery",
    desc: "We analyze your investment horizon, liquidity needs, and risk tolerance through structured profiling.",
  },
  {
    step: "02",
    title: "Scheme Selection",
    desc: "We filter through 40+ AMCs to select top-quartile funds matching your specific goal objectives.",
  },
  {
    step: "03",
    title: "Paperless Execution",
    desc: "Instant digital KYC and account setup via integrated AMFI, NSE MF Invest, and MFU platforms.",
  },
  {
    step: "04",
    title: "Ongoing Monitoring",
    desc: "Periodic portfolio reviews and annual rebalancing ensure your investments stay strictly on course.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Mutual Fund Distribution Solutions"
        sub="Institutional-grade mutual fund distribution and disciplined milestone-based investing powered by 17+ years of AMFI-certified expertise."
        trail={[{ label: "Home", href: "/" }]}
      />

      {/* Main Services Modern Cards Grid */}
      <section className="section white services-overview-section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">All Solutions</span>
            <h2>Designed for Every Milestone &amp; Life Stage</h2>
            <p>
              Whether you are taking your first step with a ₹500 SIP or deploying family wealth, our
              distributor guidance provides the discipline, transparency, and structure you need.
            </p>
          </div>

          <div className="modern-services-grid">
            {SERVICES.map((s) => {
              const details = SERVICE_DETAILS[s.slug] || {
                category: "Mutual Fund Solutions",
                description: "Mutual fund distribution solutions tailored to your long-term milestones.",
                pill1: "100% Digital Execution",
                pill2: "AMFI Regulated Support",
                highlight: "Transparent & ethical",
              };

              return (
                <div key={s.slug} className="modern-service-card">
                  {/* Card Header: Icon & Category Badge */}
                  <div className="modern-service-top">
                    <div className="modern-service-icon-box">
                      <img src={s.icon} alt={s.label} className="modern-service-icon-img" />
                    </div>
                    <span className="modern-service-badge">{details.category}</span>
                  </div>

                  {/* Title & Description */}
                  <div className="modern-service-content">
                    <h3 className="modern-service-heading">{s.label}</h3>
                    <p className="modern-service-text">{details.description}</p>
                  </div>

                  {/* Feature Micro-Pills */}
                  <div className="modern-service-pills">
                    <span className="modern-micro-pill">
                      <ShieldCheck size={13} className="micro-pill-icon text-indigo-600" />
                      {details.pill1}
                    </span>
                    <span className="modern-micro-pill">
                      <TrendingUp size={13} className="micro-pill-icon text-emerald-600" />
                      {details.pill2}
                    </span>
                  </div>

                  {/* Card Footer: Highlight Note & Action Link */}
                  <div className="modern-service-footer">
                    <span className="modern-service-highlight">
                      <Sparkles size={12} className="text-amber-500" />
                      {details.highlight}
                    </span>

                    <Link href={`/${s.slug}`} className="modern-service-btn">
                      <span>Explore In Detail</span>
                      <ArrowRight size={14} className="btn-arrow" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Structured Distribution Process Section */}
      <section className="section process-section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Our Methodology</span>
            <h2>How We Support Your Investment Journey</h2>
            <p>A systematic 4-step framework engineered for long-term consistency and investor peace of mind.</p>
          </div>

          <div className="process-steps-grid">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="process-step-card">
                <span className="step-number">{step.step}</span>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Consultation Strip */}
      <section className="section white">
        <div className="wrap">
          <div className="services-bottom-cta">
            <div className="cta-left">
              <span className="eyebrow" style={{ color: "#ffffff" }}>
                Ethical Mutual Fund Distribution
              </span>
              <h3>Need Help Choosing the Right Service?</h3>
              <p>
                Schedule a 20-minute discussion with our senior distribution specialists in Khambhat. We will assist you with
                mutual fund portfolio tracking and disciplined milestone allocation with zero obligation.
              </p>
            </div>
            <div className="cta-right">
              <Link href="/contact" className="btn btn-primary cta-btn-white">
                <span>Connect with Us</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
