import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { SERVICES, SITE } from "@/content/site";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Award,
  Clock,
  ChevronRight,
  PieChart,
  Target,
  Briefcase,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services | Shah Financial Services",
  description:
    "Explore our complete suite of wealth distribution services: Mutual Funds, Goal-Based Investing, PMS & AIF, Retirement Planning, Child Education & Marriage, and Bonds.",
};

const SERVICE_DETAILS: Record<
  string,
  {
    category: string;
    description: string;
    features: string[];
    highlight: string;
  }
> = {
  "mutual-funds": {
    category: "Wealth Creation",
    description:
      "Access equity, hybrid, debt, and liquid funds managed by India's top asset management companies. We help select schemes strictly aligned with your risk tolerance and financial objectives.",
    features: [
      "SIP, Lumpsum, STP & SWP execution",
      "Regular portfolio review & tracking",
      "Diversified large, mid, and flexi-cap schemes",
      "100% paperless digital folio creation",
    ],
    highlight: "Start with as little as ₹500/month",
  },
  "goal-based-mutual-fund-investing": {
    category: "Milestone Planning",
    description:
      "Move away from random investing. We link every rupee of your mutual fund allocation to specific real-life milestones such as buying a home, building an emergency buffer, or creating family wealth.",
    features: [
      "Custom timeline-mapped asset allocation",
      "Glide-path strategy as goals approach",
      "Inflation-adjusted target forecasting",
      "Single-view goal progress dashboard",
    ],
    highlight: "Milestone-driven peace of mind",
  },
  pms: {
    category: "High Net Worth Solutions",
    description:
      "Bespoke equity and multi-asset portfolio management for HNIs, corporate treasuries, and discerning investors demanding active stock selection and institutional oversight.",
    features: [
      "Direct ownership of high-conviction stocks",
      "Customized risk mandate and hurdle rates",
      "Detailed quarterly audit & capital gains report",
      "APMI registered distributor (APRN-04142)",
    ],
    highlight: "SEBI mandate minimum ₹50 Lakhs",
  },
  retirement: {
    category: "Financial Independence",
    description:
      "Engineer a retirement corpus that counters inflation and generates dependable, tax-efficient monthly income via systematic withdrawal plans (SWP) throughout your golden years.",
    features: [
      "Corpus requirement modeling with longevity risk",
      "Hybrid debt-equity withdrawal strategies",
      "Protection against post-retirement inflation",
      "Hassle-free auto-credited monthly cashflows",
    ],
    highlight: "Enjoy financial dignity for life",
  },
  "child-marriage": {
    category: "Family Milestone",
    description:
      "Ring-fence a dedicated long-term investment bucket for your child's wedding, ensuring you celebrate one of life's most cherished milestones without touching retirement savings or taking loans.",
    features: [
      "Long-term compounding in growth equity schemes",
      "Gradual de-risking into debt 2 years prior",
      "Separate earmarked folio for complete discipline",
      "Protection from lifestyle inflation",
    ],
    highlight: "Celebrate debt-free & stress-free",
  },
  education: {
    category: "Higher Studies",
    description:
      "Ensure premier university education in India or overseas without financial stress. We compute projected tuition and living costs with education inflation to design goal-targeted SIPs.",
    features: [
      "Currency depreciation & overseas inflation factor",
      "Calculated monthly SIP roadmap",
      "Automated debits for uninterrupted savings",
      "Liquidity planning for semester fee deadlines",
    ],
    highlight: "Secure your child's global dreams",
  },
  bonds: {
    category: "Capital Preservation",
    description:
      "Secure predictable recurring yields, preserve capital safety, and optimize fixed income returns with sovereign gold bonds, RBI floating rate bonds, and AAA corporate instruments.",
    features: [
      "High safety sovereign and AAA rated papers",
      "Predictable coupon payment calendar",
      "Effective hedge against equity market downturns",
      "Transparent secondary market liquidity",
    ],
    highlight: "Predictable, defensive cashflows",
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
        title="Comprehensive Wealth Solutions"
        sub="Institutional-grade mutual fund distribution and personalized goal-based investment planning powered by 17+ years of AMFI-certified expertise."
        trail={[{ label: "Home", href: "/" }]}
      />

      {/* Main Services Grid */}
      <section className="section white services-overview-section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">All Solutions</span>
            <h2>Designed for Every Milestone &amp; Life Stage</h2>
            <p>
              Whether you are taking your very first step with a ₹500 SIP or deploying multi-crore family wealth, our
              distributor guidance provides the discipline, transparency, and structure you need.
            </p>
          </div>

          <div className="services-showcase-grid">
            {SERVICES.map((s) => {
              const details = SERVICE_DETAILS[s.slug] || {
                category: "Financial Planning",
                description: "Personalized financial distribution tailored to your aspirations.",
                features: ["100% Digital Execution", "AMFI Regulated Support"],
                highlight: "Transparent & ethical",
              };

              return (
                <div key={s.slug} className="service-showcase-card">
                  <div className="service-card-header">
                    <div className="service-icon-container">
                      <img src={s.icon} alt={s.label} className="service-img" />
                    </div>
                    <div className="service-header-meta">
                      <span className="service-category-tag">{details.category}</span>
                      <h3 className="service-title">{s.label}</h3>
                    </div>
                  </div>

                  <p className="service-description">{details.description}</p>

                  <div className="service-features-list">
                    {details.features.map((feat, idx) => (
                      <div key={idx} className="service-feature-row">
                        <CheckCircle2 size={15} className="text-emerald-500 feat-check" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="service-card-bottom">
                    <div className="service-highlight-pill">
                      <Sparkles size={13} className="text-amber-500" />
                      <span>{details.highlight}</span>
                    </div>

                    <Link href={`/${s.slug}`} className="service-cta-link">
                      <span>Explore In Detail</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Structured Advisory Process Section */}
      <section className="section process-section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Our Methodology</span>
            <h2>How We Guide Your Wealth Journey</h2>
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
                Unbiased Advisory Distribution
              </span>
              <h3>Need Help Choosing the Right Service?</h3>
              <p>
                Schedule a 20-minute consultation with our senior advisors in Khambhat. We will review your existing
                holdings and recommend a customized goal roadmap with zero obligation.
              </p>
            </div>
            <div className="cta-right">
              <Link href="/contact" className="btn btn-primary cta-btn-white">
                <span>Book Consultation</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
