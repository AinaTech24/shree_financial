import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { SERVICES, SITE } from "@/content/site";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services | Shah Financial Services",
  description:
    "Explore our full suite of wealth distribution services: Mutual Funds, Goal-Based Investing, PMS & AIF, Retirement Planning, Child Education & Marriage, and Bonds.",
};

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  "mutual-funds":
    "Participate in India's long-term economic growth through equity, hybrid, debt, and liquid funds managed by top fund managers.",
  "goal-based-mutual-fund-investing":
    "Structure your investments around clearly defined life milestones — home purchase, emergency corpus, and wealth creation.",
  pms:
    "High-conviction direct equity and customized portfolio management services for discerning HNIs and corporate investors.",
  retirement:
    "Build a self-sustaining, inflation-indexed retirement fund that delivers steady monthly pension cashflows via SWP.",
  "child-marriage":
    "Ring-fenced long-term compounding portfolio to celebrate your child's grand wedding milestone completely debt-free.",
  education:
    "Ensure world-class university education in India and overseas without financial compromise through goal-targeted SIPs.",
  bonds:
    "Secure fixed recurring coupons, protect capital safety, and optimize returns with sovereign and AAA-rated corporate debt instruments.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Financial Services"
        sub="Tailored wealth distribution and goal-based planning powered by 17+ years of expertise."
        trail={[{ label: "Home", href: "/" }]}
      />

      <section className="section white">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Comprehensive Solutions</span>
            <h2>Tailored Strategies for Every Financial Milestone</h2>
            <p>
              Whether you are taking your very first step with a ₹500 SIP or managing a multi-crore family portfolio, our
              AMFI-registered advisory distribution ensures you stay on the path to financial freedom.
            </p>
          </div>

          <div className="services-overview-grid">
            {SERVICES.map((s) => (
              <div key={s.slug} className="service-overview-card">
                <div className="card-top-icon">
                  <img src={s.icon} alt={s.label} className="service-img-icon" />
                </div>
                <h3 className="card-service-title">{s.label}</h3>
                <p className="card-service-text">{SERVICE_DESCRIPTIONS[s.slug] || "Professional distribution support."}</p>

                <div className="card-service-features">
                  <span className="feature-item">
                    <CheckCircle2 size={14} className="feature-check" /> 100% Paperless Execution
                  </span>
                  <span className="feature-item">
                    <CheckCircle2 size={14} className="feature-check" /> Zero Advisory Fees
                  </span>
                </div>

                <Link href={`/${s.slug}`} className="service-detail-btn">
                  <span>Explore Service</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

