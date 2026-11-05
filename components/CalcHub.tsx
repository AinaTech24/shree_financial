"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import ModernCalculator from "./ModernCalculator";
import type { Calc } from "@/content/site";

export interface CalculatorCardData {
  slug: string;
  title: string;
  badge: string;
  badgeType: "blue" | "emerald" | "purple" | "amber" | "rose" | "teal" | "cyan" | "pink" | "indigo" | "sky";
  desc: string;
  stat1Label: string;
  stat1Val: string;
  stat2Label: string;
  stat2Val: string;
}

// 14 Core Investment Calculators matching Image 3 specification
export const INVESTMENT_CALCULATOR_CARDS: CalculatorCardData[] = [
  {
    slug: "sip-calculator",
    title: "SIP Calculator",
    badge: "MOST POPULAR",
    badgeType: "blue",
    desc: "Calculate prospective wealth creation and rupee cost averaging via disciplined monthly systematic investments.",
    stat1Label: "SAMPLE MONTHLY SIP",
    stat1Val: "₹10,000 / mo",
    stat2Label: "10-YR COMPOUNDING",
    stat2Val: "₹23.23 Lakhs",
  },
  {
    slug: "lumpsum-calculator",
    title: "Lumpsum Calculator",
    badge: "COMPOUNDING",
    badgeType: "emerald",
    desc: "Estimate prospective wealth growth for one-time investments with Rule of 72 doubling frequency benchmarks.",
    stat1Label: "SAMPLE INVESTMENT",
    stat1Val: "₹1,00,000",
    stat2Label: "10-YR COMPOUNDING",
    stat2Val: "₹3.11 Lakhs",
  },
  {
    slug: "stp-calculator",
    title: "STP Calculator",
    badge: "SYSTEMATIC TRANSFER",
    badgeType: "indigo",
    desc: "Plan phased capital transfers from liquid debt to high-growth equity funds to mitigate market entry volatility.",
    stat1Label: "TRANSFER MODE",
    stat1Val: "Debt to Equity",
    stat2Label: "PRIMARY BENEFIT",
    stat2Val: "Rupee Averaging",
  },
  {
    slug: "swp-calculator",
    title: "SWP Calculator",
    badge: "REGULAR CASHFLOW",
    badgeType: "amber",
    desc: "Design dependable, tax-efficient monthly income cashflows while keeping your core underlying capital invested.",
    stat1Label: "SAMPLE CORPUS",
    stat1Val: "₹50 Lakhs",
    stat2Label: "MONTHLY CASHFLOW",
    stat2Val: "₹35,000 / mo",
  },
  {
    slug: "retirement-plan",
    title: "Retirement Corpus Calculator",
    badge: "FINANCIAL FREEDOM",
    badgeType: "purple",
    desc: "Determine your inflation-adjusted retirement corpus to enjoy lifelong financial independence and peace of mind.",
    stat1Label: "TARGET CORPUS",
    stat1Val: "Inflation Indexed",
    stat2Label: "POST-RETIREMENT",
    stat2Val: "Monthly SWP",
  },
  {
    slug: "delay-plan",
    title: "Investment Delay Calculator",
    badge: "OPPORTUNITY COST",
    badgeType: "rose",
    desc: "Discover the staggering compounding wealth lost by delaying your investment start date by just a few years.",
    stat1Label: "DELAY IMPACT",
    stat1Val: "Exponential Loss",
    stat2Label: "STARTING EARLY",
    stat2Val: "Compounding Edge",
  },
  {
    slug: "life-insurance-plan",
    title: "Life Insurance Calculator",
    badge: "FAMILY PROTECTION",
    badgeType: "teal",
    desc: "Calculate your ideal family term insurance cover using scientific Human Life Value (HLV) principles.",
    stat1Label: "METHODOLOGY",
    stat1Val: "HLV Formula",
    stat2Label: "COVERAGE GOAL",
    stat2Val: "Debt & Income Free",
  },
  {
    slug: "emi-plan",
    title: "EMI Calculator",
    badge: "LOAN REPAYMENT",
    badgeType: "cyan",
    desc: "Calculate exact home or personal loan EMIs, interest outgo breakdown, and accelerated payoff schedules.",
    stat1Label: "SAMPLE LOAN",
    stat1Val: "₹25 Lakhs",
    stat2Label: "SCHEDULE",
    stat2Val: "Monthly Principal/Int",
  },
  {
    slug: "calculator.php",
    title: "TAX Calculator",
    badge: "TAX SAVING",
    badgeType: "blue",
    desc: "Compare Old vs New Tax Regime deductions, Section 80C mutual funds, and optimize your annual tax liability.",
    stat1Label: "TAX REGIMES",
    stat1Val: "Old vs New",
    stat2Label: "ELSS BENEFIT",
    stat2Val: "Sec 80C Deductions",
  },
  {
    slug: "marriage-plan",
    title: "Marriage Expense Calculator",
    badge: "FAMILY MILESTONE",
    badgeType: "pink",
    desc: "Plan a dedicated investment bucket for your child's wedding factoring in 10%+ ceremonial lifestyle inflation.",
    stat1Label: "TARGET HORIZON",
    stat1Val: "7 to 18 Years",
    stat2Label: "FINANCIAL PEACE",
    stat2Val: "100% Debt Free",
  },
  {
    slug: "education-plan",
    title: "Education Cost Calculator",
    badge: "HIGHER STUDIES",
    badgeType: "indigo",
    desc: "Secure target funding for premier university degrees in India or abroad with currency-adjusted SIP targets.",
    stat1Label: "INFLATION FACTOR",
    stat1Val: "10-12% Annual",
    stat2Label: "GLOBAL STUDIES",
    stat2Val: "Forex Hedged",
  },
  {
    slug: "house-plan",
    title: "Home Loan Calculator",
    badge: "REAL ESTATE",
    badgeType: "emerald",
    desc: "Plan your down payment savings and estimate affordable home loan repayments without financial stress.",
    stat1Label: "DOWN PAYMENT",
    stat1Val: "20% Target",
    stat2Label: "EMI BURDEN",
    stat2Val: "Affordable Debt",
  },
  {
    slug: "car-plan",
    title: "Car Purchase Calculator",
    badge: "VEHICLE PURCHASE",
    badgeType: "amber",
    desc: "Accumulate capital for your dream car through disciplined investing to purchase with minimum or zero debt.",
    stat1Label: "TARGET TIME",
    stat1Val: "2 to 5 Years",
    stat2Label: "ADVANTAGE",
    stat2Val: "Save Loan Interest",
  },
  {
    slug: "vacation-plan",
    title: "Vacation Budget Calculator",
    badge: "TRAVEL & LEISURE",
    badgeType: "sky",
    desc: "Budget and save systematically for your annual domestic or international holiday dream trips.",
    stat1Label: "TRIP FREQUENCY",
    stat1Val: "Annual Holiday",
    stat2Label: "FOLIO TYPE",
    stat2Val: "Dedicated Goal",
  },
];

export const MF_TOOLS_CARDS: CalculatorCardData[] = [
  {
    slug: "sip-performance",
    title: "SIP Performance",
    badge: "HISTORICAL RETURNS",
    badgeType: "indigo",
    desc: "Analyze historical rolling and point-to-point SIP returns across top-performing mutual fund schemes.",
    stat1Label: "TRACKING PERIOD",
    stat1Val: "3Y, 5Y & 10Y Rolling",
    stat2Label: "DATABASE",
    stat2Val: "All Registered AMCs",
  },
  {
    slug: "stp-performance",
    title: "STP Performance",
    badge: "TRANSFER TRACKER",
    badgeType: "blue",
    desc: "Examine past performance and drawdown mitigation of systematic transfer plans in volatile market cycles.",
    stat1Label: "BACKTESTING",
    stat1Val: "Systematic Transfers",
    stat2Label: "RISK SHIELD",
    stat2Val: "Market Correction",
  },
  {
    slug: "swp-performance",
    title: "SWP Performance",
    badge: "CASHFLOW LONGEVITY",
    badgeType: "emerald",
    desc: "Review historical monthly SWP withdrawal records, residual capital growth, and dividend yields.",
    stat1Label: "CASHFLOW PROOF",
    stat1Val: "Real Historical Data",
    stat2Label: "CAPITAL HEALTH",
    stat2Val: "Residual Corpus",
  },
  {
    slug: "scheme-performance",
    title: "Scheme Performance",
    badge: "SCHEME ANALYTICS",
    badgeType: "purple",
    desc: "Comprehensive trailing and annual return comparisons across 40+ asset management companies in India.",
    stat1Label: "CATEGORY FILTER",
    stat1Val: "Equity / Debt / Hybrid",
    stat2Label: "BENCHMARK",
    stat2Val: "Nifty / Sensex Aligned",
  },
  {
    slug: "fund-performance",
    title: "Fund Performance",
    badge: "QUARTILE RANKINGS",
    badgeType: "amber",
    desc: "Evaluate top-performing funds across Large, Mid, Small, Flexi Cap, and Arbitrage scheme categories.",
    stat1Label: "RANKINGS",
    stat1Val: "Top Quartile Schemes",
    stat2Label: "RISK METRICS",
    stat2Val: "Sharpe & Alpha Ratios",
  },
  {
    slug: "nav-finder",
    title: "NAV Finder",
    badge: "NET ASSET VALUE",
    badgeType: "teal",
    desc: "Look up daily historical Net Asset Values (NAV), dividend histories, and portfolio growth curves.",
    stat1Label: "DATA UPDATES",
    stat1Val: "Daily Real-Time NAV",
    stat2Label: "HISTORY ARCHIVE",
    stat2Val: "10+ Years Historical",
  },
];

export const ALL_CALCULATOR_CARDS = [...INVESTMENT_CALCULATOR_CARDS, ...MF_TOOLS_CARDS];

/**
 * Clean Line-Art SVG Icons matching Image 3 specification
 */
function renderLineArtIcon(slug: string) {
  const commonProps = {
    width: "48",
    height: "48",
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "#111827",
    strokeWidth: "1.6",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (slug) {
    case "sip-calculator":
      // Clean Pie chart icon with detached slice
      return (
        <svg {...commonProps}>
          <path d="M24 6a18 18 0 1 0 18 18h-18V6z" />
          <path d="M28 4.5A18 18 0 0 1 43.5 20H28V4.5z" />
        </svg>
      );

    case "lumpsum-calculator":
      // Stack of coins with Rupee symbol
      return (
        <svg {...commonProps}>
          <ellipse cx="24" cy="14" rx="14" ry="5.5" />
          <path d="M10 14v8c0 3 6.3 5.5 14 5.5s14-2.5 14-5.5v-8" />
          <path d="M10 22v8c0 3 6.3 5.5 14 5.5s14-2.5 14-5.5v-8" />
          <path d="M10 30v8c0 3 6.3 5.5 14 5.5s14-2.5 14-5.5v-8" />
          <path d="M21 12h6M21 14h6M23 10v7c0 2 2 2 3 2" />
        </svg>
      );

    case "stp-calculator":
      // Two documents with exchange arrows
      return (
        <svg {...commonProps}>
          <rect x="8" y="10" width="16" height="22" rx="2" />
          <path d="M12 16h8M12 20h5" />
          <rect x="24" y="16" width="16" height="22" rx="2" />
          <path d="M28 22h8M28 26h5" />
          <path d="M18 6h12l-3-3m3 3l-3 3" />
          <path d="M30 42H18l3 3m-3-3l3-3" />
        </svg>
      );

    case "swp-calculator":
      // ATM / Card dispensing currency
      return (
        <svg {...commonProps}>
          <rect x="10" y="8" width="28" height="32" rx="3" />
          <line x1="16" y1="14" x2="32" y2="14" />
          <rect x="15" y="20" width="18" height="12" rx="1.5" />
          <circle cx="24" cy="26" r="3" />
          <path d="M24 32v6m-3-3l3 3 3-3" />
        </svg>
      );

    case "retirement-plan":
      // Rocking chair
      return (
        <svg {...commonProps}>
          <path d="M16 10v18l16 2" />
          <path d="M22 14v14" />
          <path d="M28 16v12" />
          <path d="M16 28l-5 12" />
          <path d="M32 30l-4 10" />
          <path d="M8 40c8 3 24 3 32 0" />
        </svg>
      );

    case "delay-plan":
      // Hourglass with downward arrow
      return (
        <svg {...commonProps}>
          <path d="M14 8h20M14 40h20" />
          <path d="M16 8v6c0 5 4 8 8 10-4 2-8 5-8 10v6" />
          <path d="M32 8v6c0 5-4 8-8 10 4 2 8 5 8 10v6" />
          <path d="M24 21v8m-3-3l3 3 3-3" />
        </svg>
      );

    case "life-insurance-plan":
      // Shield with protecting hands / heart
      return (
        <svg {...commonProps}>
          <path d="M24 6l14 5v12c0 10-7 17-14 19-7-2-14-9-14-19V11l14-5z" />
          <path d="M24 16c-2.5-3-7 0-4 5l4 4 4-4c3-5-1.5-8-4-5z" />
        </svg>
      );

    case "emi-plan":
      // Pocket calculator with Rupee
      return (
        <svg {...commonProps}>
          <rect x="11" y="8" width="26" height="32" rx="3" />
          <rect x="15" y="13" width="18" height="8" rx="1" />
          <path d="M22 16h4M22 18h4" />
          <circle cx="17" cy="26" r="1.5" />
          <circle cx="24" cy="26" r="1.5" />
          <circle cx="31" cy="26" r="1.5" />
          <circle cx="17" cy="33" r="1.5" />
          <circle cx="24" cy="33" r="1.5" />
          <circle cx="31" cy="33" r="1.5" />
        </svg>
      );

    case "calculator.php":
      // TAX document with %
      return (
        <svg {...commonProps}>
          <path d="M12 8h24v32l-4-2-4 2-4-2-4 2-4-2-4 2V8z" />
          <text x="16" y="20" fontSize="7" fontWeight="bold" fill="#111827" stroke="none">TAX</text>
          <path d="M21 28l6-6M22 23a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm4 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
        </svg>
      );

    case "marriage-plan":
      // Two interlocking wedding rings
      return (
        <svg {...commonProps}>
          <circle cx="19" cy="24" r="9" />
          <circle cx="29" cy="24" r="9" />
          <path d="M19 15l-1-3h2l-1 3" />
        </svg>
      );

    case "education-plan":
      // Open book with graduation cap & light
      return (
        <svg {...commonProps}>
          <path d="M8 32c4-2 10-2 16 2 6-4 12-4 16-2v-18c-4-2-10-2-16 2-6-4-12-4-16-2v18z" />
          <line x1="24" y1="16" x2="24" y2="34" />
          <path d="M24 6l10 5-10 5-10-5 10-5z" />
          <path d="M17 12.5v6c2 2 5 3 7 3s5-1 7-3v-6" />
        </svg>
      );

    case "house-plan":
      // Modern house with roof
      return (
        <svg {...commonProps}>
          <path d="M8 20L24 7l16 13" />
          <path d="M12 17v21h24V17" />
          <rect x="20" y="26" width="8" height="12" />
        </svg>
      );

    case "car-plan":
      // Automobile car
      return (
        <svg {...commonProps}>
          <path d="M10 28h28l-2-10a3 3 0 0 0-3-2H17a3 3 0 0 0-3 2l-2 10z" />
          <circle cx="16" cy="34" r="4" />
          <circle cx="32" cy="34" r="4" />
          <path d="M6 28h4M20 34h8M36 28h6" />
        </svg>
      );

    case "vacation-plan":
      // Travel suitcases
      return (
        <svg {...commonProps}>
          <rect x="8" y="16" width="22" height="24" rx="2" />
          <line x1="14" y1="16" x2="14" y2="10" />
          <line x1="24" y1="16" x2="24" y2="10" />
          <line x1="14" y1="10" x2="24" y2="10" />
          <rect x="26" y="22" width="14" height="18" rx="2" />
          <line x1="30" y1="22" x2="30" y2="18" />
          <line x1="36" y1="22" x2="36" y2="18" />
          <line x1="30" y1="18" x2="36" y2="18" />
        </svg>
      );

    default:
      return (
        <svg {...commonProps}>
          <rect x="10" y="10" width="28" height="28" rx="4" />
          <circle cx="24" cy="24" r="6" />
        </svg>
      );
  }
}

/**
 * Main Calculator Hub Page (/calculator)
 * Shows the 14 minimalist cards with line-art icons matching Reference Image 3.
 */
export function CalcHub() {
  return (
    <div className="calc-hub-cards-wrapper">
      {/* 1. Primary 14 Minimalist Calculator Cards (Image 3 Specification) */}
      <section className="calc-hub-group">
        <div className="sec-head center">
          <span className="eyebrow">Financial Assessment Tools</span>
          <h2>Select a Financial Calculator</h2>
          <p>Explore our complete suite of milestone goal planning, systematic compounding, and debt amortization tools.</p>
        </div>

        {/* 14 Minimalist Cards Grid matching Image 3 */}
        <div className="calc-minimal-14-grid">
          {INVESTMENT_CALCULATOR_CARDS.map((item) => (
            <Link
              key={item.slug}
              href={`/calculator/${item.slug}`}
              className="calc-minimal-card"
            >
              <div className="calc-minimal-icon-box">
                {renderLineArtIcon(item.slug)}
              </div>
              <h3 className="calc-minimal-title">{item.title}</h3>
            </Link>
          ))}
        </div>

        {/* Regulatory Disclaimer matching Image 3 footer text */}
        <p className="calc-statutory-disclaimer-note">
          For illustration purposes only. Actual returns may vary. Maximum assumed CAGR: 12% as per firm policy (AMFI cap: 13%). Mutual Fund investments are subject to market risks.
        </p>
      </section>

      {/* 2. Group 2: Mutual Fund Analysis & Backtesting Tools (6 Cards) */}
      <section className="calc-hub-group mt-16">
        <div className="sec-head center">
          <span className="eyebrow">Historical Backtesting</span>
          <h2>Mutual Fund Performance &amp; NAV Tools</h2>
          <p>Track daily NAVs, analyze rolling returns, and evaluate scheme performance across all 40+ AMCs in India.</p>
        </div>

        <div className="calc-cards-grid">
          {MF_TOOLS_CARDS.map((item) => (
            <Link
              key={item.slug}
              href={`/calculator/${item.slug}`}
              className="modern-calc-showcase-card"
            >
              <div className="calc-card-top-row">
                <span className={`calc-card-badge badge-${item.badgeType}`}>{item.badge}</span>
              </div>
              <h3 className="calc-card-title">{item.title}</h3>
              <p className="calc-card-desc">{item.desc}</p>
              <div className="calc-card-stats-box">
                <div className="stat-col">
                  <span className="stat-label">{item.stat1Label}</span>
                  <strong className="stat-val">{item.stat1Val}</strong>
                </div>
                <div className="stat-col">
                  <span className="stat-label">{item.stat2Label}</span>
                  <strong className="stat-val">{item.stat2Val}</strong>
                </div>
              </div>
              <div className="calc-card-action-btn">
                <span>Open Tool</span>
                <ArrowRight size={15} className="btn-arrow" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

/**
 * Dedicated Single Calculator Page (/calculator/[slug])
 * Renders ONLY the specific calculator requested matching Image 1 layout!
 */
export function SingleCalcView({ calc }: { calc: Calc }) {
  const otherCalcs = INVESTMENT_CALCULATOR_CARDS.filter((c) => c.slug !== calc.slug).slice(0, 5);

  return (
    <div className="single-calc-dedicated-root">
      {/* The Specific Calculator matching Image 1 */}
      <div className="single-calc-workbench">
        <ModernCalculator key={calc.slug} slug={calc.slug} />
      </div>

      {/* Explore Other Calculators Section (Image 3 Cards Mini Grid) */}
      <section className="section white other-calcs-section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">More Calculators</span>
            <h2>Explore Other Milestone Calculators</h2>
            <p>Calculate retirement corpus, education targets, wedding expenses, and loan EMIs.</p>
          </div>

          <div className="calc-minimal-14-grid other-calcs-minimal-grid">
            {otherCalcs.map((item) => (
              <Link
                key={item.slug}
                href={`/calculator/${item.slug}`}
                className="calc-minimal-card"
              >
                <div className="calc-minimal-icon-box">
                  {renderLineArtIcon(item.slug)}
                </div>
                <h3 className="calc-minimal-title">{item.title}</h3>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/calculator" className="btn btn-outline">
              <span>View All 14 Milestone Calculators</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/** Legacy CalcGroup kept for backward compatibility */
export function CalcGroup({ title, calcs }: { title?: string; calcs?: Calc[] }) {
  return <CalcHub />;
}
