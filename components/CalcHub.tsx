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
    title: "Retirement Calculator",
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
    title: "Delay Cost Calculator",
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
    title: "Marriage Calculator",
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
    title: "Education Calculator",
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
    title: "House Planning Calculator",
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
    title: "Car Planning Calculator",
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
    title: "Vacation Calculator",
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

function renderCalcCard(item: CalculatorCardData) {
  return (
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
        <span>Calculate Now</span>
        <ArrowRight size={15} className="btn-arrow" />
      </div>
    </Link>
  );
}

/**
 * Main Calculator Hub Page (/calculator)
 * Shows all calculators in modern, clean cards matching Image 3.
 * Clicking navigates to that calculator's separate page!
 */
export function CalcHub() {
  return (
    <div className="calc-hub-cards-wrapper">
      {/* Group 1: Investment Calculators (14 Cards) */}
      <section className="calc-hub-group">
        <div className="sec-head">
          <span className="eyebrow">Wealth &amp; Milestones</span>
          <h2>Investment Calculators</h2>
          <p>Estimate compounding returns, forecast milestone corpuses, and model tax-efficient cashflows.</p>
        </div>

        <div className="calc-cards-grid">
          {INVESTMENT_CALCULATOR_CARDS.map((item) => renderCalcCard(item))}
        </div>
      </section>

      {/* Group 2: MF Tools Calculators (6 Cards) */}
      <section className="calc-hub-group mt-16">
        <div className="sec-head">
          <span className="eyebrow">Performance &amp; Analysis</span>
          <h2>Mutual Fund Tools</h2>
          <p>Historical backtesting, NAV tracking, and trailing return comparisons across 40+ AMCs.</p>
        </div>

        <div className="calc-cards-grid">
          {MF_TOOLS_CARDS.map((item) => renderCalcCard(item))}
        </div>
      </section>
    </div>
  );
}

/**
 * Dedicated Single Calculator Page (/calculator/[slug])
 * Renders ONLY the specific calculator requested, followed by other recommended calculators.
 */
export function SingleCalcView({ calc }: { calc: Calc }) {
  const otherCalcs = ALL_CALCULATOR_CARDS.filter((c) => c.slug !== calc.slug).slice(0, 3);

  return (
    <div className="single-calc-dedicated-root">
      {/* The Specific Calculator */}
      <div className="single-calc-workbench">
        <ModernCalculator key={calc.slug} slug={calc.slug} />
      </div>

      {/* Explore Other Calculators Section */}
      <section className="section other-calcs-section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">More Financial Tools</span>
            <h2>Explore Other Calculators</h2>
            <p>Access our comprehensive suite of goal planning and portfolio performance calculators.</p>
          </div>

          <div className="calc-cards-grid">
            {otherCalcs.map((item) => renderCalcCard(item))}
          </div>

          <div className="text-center mt-10">
            <Link href="/calculator" className="btn btn-outline">
              <span>View All 20 Calculators</span>
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
