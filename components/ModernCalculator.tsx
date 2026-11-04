"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import {
  TrendingUp,
  RotateCcw,
  CheckCircle2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Calendar,
  Percent,
  Coins,
  Repeat,
  Wallet,
  Armchair,
  Hourglass,
  ShieldAlert,
  Home,
  Car,
  Plane,
  Heart,
  GraduationCap,
  Receipt,
} from "lucide-react";

export type CalcMode = "lumpsum" | "sip";

export interface ModernCalculatorProps {
  initialMode?: CalcMode;
  showModeSwitcher?: boolean;
  slug?: string;
}

export function formatInr(val: number): string {
  const rounded = Math.round(val);
  return "₹" + rounded.toLocaleString("en-IN");
}

export function formatCompactInr(val: number): string {
  const abs = Math.abs(val);
  if (abs >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  }
  if (abs >= 100000) {
    return `₹${(val / 100000).toFixed(2)} L`;
  }
  if (abs >= 1000) {
    return `₹${(val / 1000).toFixed(1)} K`;
  }
  return `₹${Math.round(val).toLocaleString("en-IN")}`;
}

interface SliderDef {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultVal: number;
  unit: string;
  isCurrency?: boolean;
}

interface ToolConfig {
  badge: string;
  tag: string;
  title: string;
  desc: string;
  tip: string;
  awareness: [string, string, string];
  sliders: SliderDef[];
}

const TOOL_CONFIGS: Record<string, ToolConfig> = {
  "lumpsum-calculator": {
    badge: "INVESTMENT",
    tag: "★ CORE TOOL",
    title: "Lumpsum Calculator",
    desc: "Estimate prospective compounding growth for one-time lump sum mutual fund investments.",
    tip: "One-time lump sum investments benefit heavily from the Rule of 72 doubling frequency in high-quality equity funds.",
    awareness: [
      "PATIENT LONG-TERM CAPITAL COMPOUNDING",
      "AVOIDING TIMING THE STOCK MARKET",
      "DIVERSIFIED EQUITY FUND ALLOCATION",
    ],
    sliders: [
      { id: "amount", label: "TOTAL INVESTMENT AMOUNT", min: 5000, max: 5000000, step: 5000, defaultVal: 100000, unit: "₹", isCurrency: true },
      { id: "rate", label: "EXPECTED RETURN RATE (P.A)", min: 1, max: 30, step: 0.5, defaultVal: 12, unit: "%" },
      { id: "years", label: "TIME PERIOD", min: 1, max: 40, step: 1, defaultVal: 10, unit: "Years" },
    ],
  },
  "sip-calculator": {
    badge: "INVESTMENT",
    tag: "★ MOST POPULAR",
    title: "SIP Calculator",
    desc: "Calculate long-term wealth creation and rupee-cost averaging via monthly systematic investments.",
    tip: "Systematic discipline and regular contributions help counter inflation while working toward your long-term milestones.",
    awareness: [
      "RUPEE COST AVERAGING THROUGH VOLATILITY",
      "DISCIPLINED AUTOMATIC BANK DEBITS",
      "STEP-UP SIPS TO BOOST FINAL CORPUS",
    ],
    sliders: [
      { id: "amount", label: "MONTHLY SIP AMOUNT", min: 500, max: 200000, step: 500, defaultVal: 10000, unit: "₹", isCurrency: true },
      { id: "rate", label: "EXPECTED RETURN RATE (P.A)", min: 1, max: 30, step: 0.5, defaultVal: 12, unit: "%" },
      { id: "years", label: "TIME PERIOD", min: 1, max: 40, step: 1, defaultVal: 10, unit: "Years" },
    ],
  },
  "stp-calculator": {
    badge: "PORTFOLIO",
    tag: "TRANSFER STRATEGY",
    title: "STP Calculator",
    desc: "Plan phased systematic capital transfers from liquid/debt funds into high-growth equity schemes.",
    tip: "STP reduces the timing risk of parking lump sum windfalls by deploying capital steadily over 6 to 36 months.",
    awareness: [
      "LIQUID FUND YIELDS ON IDLE CAPITAL",
      "DISCIPLINED STAGGERED EQUITY ENTRY",
      "ELIMINATION OF VOLATILITY TIMING ANXIETY",
    ],
    sliders: [
      { id: "amount", label: "INITIAL DEBT CORPUS", min: 50000, max: 5000000, step: 25000, defaultVal: 500000, unit: "₹", isCurrency: true },
      { id: "transfer", label: "MONTHLY STP TRANSFER", min: 5000, max: 250000, step: 5000, defaultVal: 25000, unit: "₹", isCurrency: true },
      { id: "equityRate", label: "EXPECTED EQUITY RETURN (P.A)", min: 6, max: 24, step: 0.5, defaultVal: 12, unit: "%" },
      { id: "years", label: "HORIZON PERIOD", min: 1, max: 15, step: 1, defaultVal: 5, unit: "Years" },
    ],
  },
  "swp-calculator": {
    badge: "RETIREMENT",
    tag: "REGULAR CASHFLOW",
    title: "SWP Calculator",
    desc: "Design monthly cashflows and tax-efficient pension payouts while preserving your underlying capital.",
    tip: "Systematic Withdrawal Plans (SWP) offer significantly lower capital gains tax compared to standard bank FD interest.",
    awareness: [
      "TAX EFFICIENT MONTHLY PENSION PAYOUTS",
      "REMAINDER CORPUS CONTINUES TO COMPOUND",
      "INFLATION-INDEXED DRAWDOWN SCHEDULES",
    ],
    sliders: [
      { id: "amount", label: "TOTAL RETIREMENT CORPUS", min: 500000, max: 20000000, step: 100000, defaultVal: 2500000, unit: "₹", isCurrency: true },
      { id: "withdrawal", label: "MONTHLY SWP WITHDRAWAL", min: 5000, max: 200000, step: 2500, defaultVal: 20000, unit: "₹", isCurrency: true },
      { id: "rate", label: "EXPECTED PORTFOLIO RETURN (P.A)", min: 4, max: 18, step: 0.5, defaultVal: 9, unit: "%" },
      { id: "years", label: "WITHDRAWAL TENURE", min: 1, max: 30, step: 1, defaultVal: 15, unit: "Years" },
    ],
  },
  "retirement-plan": {
    badge: "RETIREMENT",
    tag: "FINANCIAL INDEPENDENCE",
    title: "Retirement Corpus Calculator",
    desc: "Determine your ideal inflation-adjusted retirement corpus for financial independence and peace of mind.",
    tip: "Every 1% change in inflation compounds substantially over 25+ retirement years — early planning creates security.",
    awareness: [
      "ACCOUNTING FOR POST-RETIREMENT HEALTH COSTS",
      "INFLATION BEATING EQUITY ALLOCATION",
      "ZERO DEBT RETIREMENT TRANSITION",
    ],
    sliders: [
      { id: "currentAge", label: "CURRENT AGE", min: 20, max: 55, step: 1, defaultVal: 32, unit: "Years" },
      { id: "retireAge", label: "DESIRED RETIREMENT AGE", min: 45, max: 70, step: 1, defaultVal: 60, unit: "Years" },
      { id: "monthlyExp", label: "CURRENT MONTHLY EXPENSES", min: 15000, max: 500000, step: 5000, defaultVal: 45000, unit: "₹", isCurrency: true },
      { id: "inflation", label: "EXPECTED INFLATION RATE", min: 3, max: 10, step: 0.5, defaultVal: 6, unit: "%" },
    ],
  },
  "delay-plan": {
    badge: "OPPORTUNITY COST",
    tag: "TIME VALUE",
    title: "Investment Delay Calculator",
    desc: "Discover the compounding cost of delaying your investments by just a few months or years.",
    tip: "Starting just 3 years earlier can nearly double your final wealth accumulation due to exponential compounding.",
    awareness: [
      "THE EXPENSIVE PRICE OF PROCRASTINATION",
      "EARLIER START BEATS HIGHER CAPITAL LATER",
      "START SMALL TODAY RATHER THAN BIG TOMORROW",
    ],
    sliders: [
      { id: "sip", label: "PLANNED MONTHLY SIP", min: 1000, max: 100000, step: 1000, defaultVal: 10000, unit: "₹", isCurrency: true },
      { id: "delay", label: "DELAY IN STARTING", min: 1, max: 10, step: 1, defaultVal: 3, unit: "Years" },
      { id: "rate", label: "EXPECTED RETURN (P.A)", min: 8, max: 20, step: 0.5, defaultVal: 12, unit: "%" },
      { id: "years", label: "TOTAL INVESTMENT HORIZON", min: 5, max: 35, step: 1, defaultVal: 20, unit: "Years" },
    ],
  },
  "life-insurance-plan": {
    badge: "PROTECTION",
    tag: "HUMAN LIFE VALUE",
    title: "Life Insurance Calculator",
    desc: "Compute the ideal family protection term cover based on Human Life Value (HLV) and debt liabilities.",
    tip: "A pure term insurance cover equal to 15-20x of your annual income shields family goals from unexpected disruption.",
    awareness: [
      "PURE TERM INSURANCE OVER ENDOWMENT PLANS",
      "COVERING ALL HOME & PERSONAL LIABILITIES",
      "PROTECTING LIVING EXPENSES UNTIL RETIREMENT",
    ],
    sliders: [
      { id: "income", label: "ANNUAL GROSS INCOME", min: 300000, max: 10000000, step: 100000, defaultVal: 1200000, unit: "₹", isCurrency: true },
      { id: "age", label: "YOUR CURRENT AGE", min: 21, max: 55, step: 1, defaultVal: 32, unit: "Years" },
      { id: "liabilities", label: "OUTSTANDING DEBT / LOANS", min: 0, max: 20000000, step: 100000, defaultVal: 2500000, unit: "₹", isCurrency: true },
      { id: "savings", label: "EXISTING SAVINGS / ASSETS", min: 0, max: 10000000, step: 100000, defaultVal: 1000000, unit: "₹", isCurrency: true },
    ],
  },
  "emi-plan": {
    badge: "LOAN & DEBT",
    tag: "AMORTIZATION",
    title: "EMI Calculator",
    desc: "Calculate loan monthly EMIs, total interest outgo, and overall repayment liability.",
    tip: "Making an extra prepayment of even 1 EMI per year can dramatically slash your overall interest duration.",
    awareness: [
      "PREPAYMENT STRATEGIES REDUCE INTEREST OUTGO",
      "MAINTAINING EMI UNDER 40% OF NET INCOME",
      "COMPARING FLOATING VS FIXED RATE LOANS",
    ],
    sliders: [
      { id: "amount", label: "LOAN AMOUNT", min: 50000, max: 10000000, step: 50000, defaultVal: 1500000, unit: "₹", isCurrency: true },
      { id: "rate", label: "INTEREST RATE (P.A)", min: 6, max: 20, step: 0.25, defaultVal: 9, unit: "%" },
      { id: "years", label: "LOAN TENURE", min: 1, max: 30, step: 1, defaultVal: 10, unit: "Years" },
    ],
  },
  "house-plan": {
    badge: "REAL ESTATE",
    tag: "DREAM HOME",
    title: "Home Loan Calculator",
    desc: "Plan down-payment requirements, affordable mortgage EMIs, and long-term interest costs.",
    tip: "A dedicated SIP starting 3 to 5 years earlier comfortably funds the 20% down payment and registration fees.",
    awareness: [
      "OPTIMIZING DOWN PAYMENT TO REDUCE LOAN",
      "TAX DEDUCTIONS UNDER SECTION 24B & 80C",
      "BUILDING AN EMERGENCY BUFFER FOR HOME EMIS",
    ],
    sliders: [
      { id: "amount", label: "HOME LOAN AMOUNT", min: 500000, max: 30000000, step: 100000, defaultVal: 4000000, unit: "₹", isCurrency: true },
      { id: "rate", label: "HOME LOAN INTEREST RATE", min: 7, max: 15, step: 0.1, defaultVal: 8.6, unit: "%" },
      { id: "years", label: "LOAN TENURE", min: 5, max: 30, step: 1, defaultVal: 20, unit: "Years" },
    ],
  },
  "car-plan": {
    badge: "LIFESTYLE",
    tag: "VEHICLE PURCHASE",
    title: "Car Purchase Calculator",
    desc: "Plan targeted savings to buy your dream car debt-free or calculate low EMI repayment schedules.",
    tip: "Buying a vehicle with cash accumulated via mutual fund SIPs saves substantial finance interest charges.",
    awareness: [
      "PREVENTING DEPRECIATING ASSET DEBT",
      "ACCOUNTING FOR INSURANCE & UPKEEP COSTS",
      "TARGET-DATE SHORT TERM DEBT FUNDS",
    ],
    sliders: [
      { id: "amount", label: "CAR LOAN / COST", min: 200000, max: 10000000, step: 50000, defaultVal: 1200000, unit: "₹", isCurrency: true },
      { id: "rate", label: "INTEREST RATE", min: 7, max: 18, step: 0.5, defaultVal: 9.5, unit: "%" },
      { id: "years", label: "FINANCE PERIOD", min: 1, max: 7, step: 1, defaultVal: 5, unit: "Years" },
    ],
  },
  "marriage-plan": {
    badge: "GOAL PLANNING",
    tag: "LIFE MILESTONE",
    title: "Marriage Expense Calculator",
    desc: "Forecast child wedding expenses factoring inflation and targeted investment compounding.",
    tip: "Wedding costs inflate faster than standard CPI (~7-9% annually). Ring-fenced equity funds counter this escalation.",
    awareness: [
      "RING-FENCED DEDICATED WEDDING CORPUS",
      "SHIFTING TO LIQUID FUNDS 1 YEAR BEFORE EVENT",
      "DEBT-FREE CELEBRATION DISCIPLINE",
    ],
    sliders: [
      { id: "cost", label: "CURRENT ESTIMATED WEDDING COST", min: 500000, max: 10000000, step: 100000, defaultVal: 2000000, unit: "₹", isCurrency: true },
      { id: "years", label: "YEARS UNTIL WEDDING", min: 1, max: 25, step: 1, defaultVal: 12, unit: "Years" },
      { id: "inflation", label: "EXPECTED INFLATION (P.A)", min: 4, max: 12, step: 0.5, defaultVal: 7, unit: "%" },
      { id: "rate", label: "INVESTMENT RETURN (P.A)", min: 8, max: 18, step: 0.5, defaultVal: 12, unit: "%" },
    ],
  },
  "education-plan": {
    badge: "HIGHER STUDIES",
    tag: "CHILD FUTURE",
    title: "Education Cost Calculator",
    desc: "Plan for escalating higher education costs in India and international universities through systematic investing.",
    tip: "Higher education inflation averages 8-10% annually in India and abroad. Starting early protects child aspirations.",
    awareness: [
      "HEDGING AGAINST CURRENCY DEPRECIATION FOR ABROAD",
      "CHILD-SPECIFIC SOLUTION ORIENTED FUNDS",
      "PREVENTING BURDENSOME EDUCATION LOANS",
    ],
    sliders: [
      { id: "cost", label: "CURRENT DEGREE COST", min: 500000, max: 15000000, step: 100000, defaultVal: 2500000, unit: "₹", isCurrency: true },
      { id: "years", label: "YEARS TO COLLEGE ADMISSION", min: 1, max: 20, step: 1, defaultVal: 10, unit: "Years" },
      { id: "inflation", label: "EDUCATION INFLATION (P.A)", min: 4, max: 14, step: 0.5, defaultVal: 8, unit: "%" },
      { id: "rate", label: "EXPECTED RETURN (P.A)", min: 8, max: 18, step: 0.5, defaultVal: 12, unit: "%" },
    ],
  },
  "vacation-plan": {
    badge: "TRAVEL & LEISURE",
    tag: "HOLIDAY BUDGET",
    title: "Vacation Budget Calculator",
    desc: "Budget and save systematically for your annual domestic and global travel dreams without credit debt.",
    tip: "Vacation planning through recurring ultra-short duration or arbitrage funds delivers tax-efficient holiday savings.",
    awareness: [
      "GUILT-FREE HOLIDAYS FUNDED BY COMPOUNDING",
      "ELIMINATING POST-VACATION CREDIT CARD BILLS",
      "FOREIGN EXCHANGE VOLATILITY SAFEGUARDS",
    ],
    sliders: [
      { id: "cost", label: "CURRENT VACATION ESTIMATE", min: 50000, max: 2000000, step: 25000, defaultVal: 350000, unit: "₹", isCurrency: true },
      { id: "years", label: "YEARS UNTIL VACATION", min: 1, max: 10, step: 1, defaultVal: 3, unit: "Years" },
      { id: "inflation", label: "TRAVEL INFLATION (P.A)", min: 3, max: 12, step: 0.5, defaultVal: 6, unit: "%" },
      { id: "rate", label: "EXPECTED RETURN (P.A)", min: 6, max: 15, step: 0.5, defaultVal: 9, unit: "%" },
    ],
  },
  "calculator.php": {
    badge: "TAX PLANNING",
    tag: "SECTION 80C",
    title: "TAX Saving Calculator",
    desc: "Optimize Section 80C mutual fund deductions (ELSS) and build wealth while slashing taxable income.",
    tip: "ELSS mutual funds offer the shortest 3-year lock-in among all 80C instruments and provide higher long-term compounding.",
    awareness: [
      "SHORTEST 3-YEAR LOCK-IN AMONG 80C OPTIONS",
      "TAX DEDUCTIONS UP TO ₹1,50,000 PER YEAR",
      "LONG TERM CAPITAL APPRECIATION FOCUS",
    ],
    sliders: [
      { id: "income", label: "ANNUAL GROSS INCOME", min: 500000, max: 5000000, step: 50000, defaultVal: 1200000, unit: "₹", isCurrency: true },
      { id: "elss", label: "PLANNED ELSS INVESTMENT", min: 10000, max: 150000, step: 5000, defaultVal: 150000, unit: "₹", isCurrency: true },
      { id: "health", label: "HEALTH INSURANCE (SEC 80D)", min: 0, max: 100000, step: 5000, defaultVal: 25000, unit: "₹", isCurrency: true },
      { id: "rate", label: "PROJECTED ELSS RETURN (P.A)", min: 8, max: 18, step: 0.5, defaultVal: 13, unit: "%" },
    ],
  },
  "sip-performance": {
    badge: "PERFORMANCE",
    tag: "HISTORICAL TRACK",
    title: "SIP Performance Calculator",
    desc: "Evaluate retrospective returns and wealth generated by historical mutual fund SIPs across market cycles.",
    tip: "Long-term historical rolling returns of equity mutual funds demonstrate consistent wealth compounding over 5+ year horizons.",
    awareness: [
      "HISTORICAL ROLLING RETURN ANALYSIS",
      "AVOIDING RECENCY BIAS IN FUND SELECTION",
      "LONG-TERM CONSISTENCY OVER PEAK RETURNS",
    ],
    sliders: [
      { id: "amount", label: "MONTHLY SIP AMOUNT", min: 1000, max: 200000, step: 1000, defaultVal: 15000, unit: "₹", isCurrency: true },
      { id: "rate", label: "HISTORICAL CAGR RETURN", min: 5, max: 25, step: 0.5, defaultVal: 14.5, unit: "%" },
      { id: "years", label: "INVESTMENT DURATION", min: 1, max: 25, step: 1, defaultVal: 10, unit: "Years" },
    ],
  },
  "stp-performance": {
    badge: "PERFORMANCE",
    tag: "STAGGERED YIELDS",
    title: "STP Performance Calculator",
    desc: "Analyze retrospective outcomes of staggered systematic capital transfers from debt to equity.",
    tip: "STP preserves capital downside while systematically participating in volatile market troughs.",
    awareness: [
      "DEFENSIVE CAPITAL ALLOCATION STRATEGY",
      "MINIMIZING PEAK-MARKET ENTRY RISK",
      "BALANCED DUAL-SCHEME COMPOUNDING",
    ],
    sliders: [
      { id: "amount", label: "SOURCE DEBT ALLOCATION", min: 100000, max: 5000000, step: 50000, defaultVal: 1000000, unit: "₹", isCurrency: true },
      { id: "transfer", label: "MONTHLY TRANSFER AMOUNT", min: 10000, max: 200000, step: 5000, defaultVal: 50000, unit: "₹", isCurrency: true },
      { id: "equityRate", label: "TARGET SCHEME CAGR", min: 6, max: 24, step: 0.5, defaultVal: 13, unit: "%" },
      { id: "years", label: "TRANSFER HORIZON", min: 1, max: 10, step: 1, defaultVal: 5, unit: "Years" },
    ],
  },
  "swp-performance": {
    badge: "PERFORMANCE",
    tag: "PORTFOLIO LONGEVITY",
    title: "SWP Performance Calculator",
    desc: "Review past SWP withdrawal histories, sustainable withdrawal rates, and capital preservation.",
    tip: "A prudent SWP withdrawal rate of 6-8% allows the underlying mutual fund corpus to outlive standard retirement life expectancies.",
    awareness: [
      "SUSTAINABLE 6% TO 8% DRAWDOWN DISCIPLINE",
      "TAX ARBITRAGE OVER CONVENTIONAL ANNUITIES",
      "LONG TERM RETIREMENT PEACE OF MIND",
    ],
    sliders: [
      { id: "amount", label: "INITIAL CORPUS", min: 500000, max: 20000000, step: 100000, defaultVal: 3000000, unit: "₹", isCurrency: true },
      { id: "withdrawal", label: "MONTHLY WITHDRAWAL", min: 5000, max: 250000, step: 5000, defaultVal: 25000, unit: "₹", isCurrency: true },
      { id: "rate", label: "HISTORICAL FUND CAGR", min: 4, max: 18, step: 0.5, defaultVal: 10.5, unit: "%" },
      { id: "years", label: "WITHDRAWAL PERIOD", min: 1, max: 30, step: 1, defaultVal: 15, unit: "Years" },
    ],
  },
  "scheme-performance": {
    badge: "COMPARATIVE",
    tag: "SCHEME ANALYTICS",
    title: "Scheme Performance Analyzer",
    desc: "Compare benchmark-beating potential, CAGR, and point-to-point returns across diversified mutual fund schemes.",
    tip: "Consistency across bear and bull market phases is a superior indicator of fund management quality than single-year rank.",
    awareness: [
      "CATEGORY BENCHMARK COMPARISONS",
      "STANDARD DEVIATION & SHARPE RATIOS",
      "EXPERIENCED FUND MANAGEMENT TRACK RECORD",
    ],
    sliders: [
      { id: "amount", label: "SCHEME INVESTMENT AMOUNT", min: 10000, max: 5000000, step: 10000, defaultVal: 200000, unit: "₹", isCurrency: true },
      { id: "rate", label: "SCHEME HISTORICAL RETURN", min: 5, max: 28, step: 0.5, defaultVal: 15, unit: "%" },
      { id: "years", label: "EVALUATION PERIOD", min: 1, max: 20, step: 1, defaultVal: 7, unit: "Years" },
    ],
  },
  "fund-performance": {
    badge: "ANALYTICS",
    tag: "TOP QUARTILE",
    title: "Fund Performance Calculator",
    desc: "Analyze top quartile fund performance, alpha generation, and wealth accumulation over time.",
    tip: "A well-diversified portfolio of top quartile funds balances high equity growth with sector risk containment.",
    awareness: [
      "ALPHA GENERATION ABOVE INDEX",
      "EXPENSE RATIO & PORTFOLIO TURNOVER",
      "MULTI-CAP ASSET ALLOCATION RIGOR",
    ],
    sliders: [
      { id: "amount", label: "MONTHLY ALLOCATION", min: 1000, max: 200000, step: 1000, defaultVal: 20000, unit: "₹", isCurrency: true },
      { id: "rate", label: "FUND CATEGORY CAGR", min: 6, max: 26, step: 0.5, defaultVal: 14, unit: "%" },
      { id: "years", label: "HOLDING TIMELINE", min: 1, max: 25, step: 1, defaultVal: 10, unit: "Years" },
    ],
  },
  "nav-finder": {
    badge: "VALUATION",
    tag: "NAV TRACKER",
    title: "NAV Finder Calculator",
    desc: "Calculate units acquired, Net Asset Value growth trends, and current portfolio valuation.",
    tip: "Purchasing more units during temporary NAV dips lowers your overall portfolio average cost through rupee-cost averaging.",
    awareness: [
      "NAV REPRESENTS NET ASSETS DIVIDED BY UNITS",
      "DAILY CUT-OFF TIMINGS FOR SAME-DAY NAV",
      "RUPEE COST AVERAGING LOWERING ACQUISITION COST",
    ],
    sliders: [
      { id: "amount", label: "INVESTMENT CAPITAL", min: 5000, max: 2000000, step: 5000, defaultVal: 100000, unit: "₹", isCurrency: true },
      { id: "rate", label: "NAV GROWTH RATE (P.A)", min: 4, max: 25, step: 0.5, defaultVal: 13, unit: "%" },
      { id: "years", label: "HOLDING PERIOD", min: 1, max: 15, step: 1, defaultVal: 5, unit: "Years" },
    ],
  },
};

export default function ModernCalculator({
  initialMode = "lumpsum",
  showModeSwitcher = false,
  slug,
}: ModernCalculatorProps) {
  // Determine effective slug
  const activeSlug = slug || (initialMode === "sip" ? "sip-calculator" : "lumpsum-calculator");
  const config = TOOL_CONFIGS[activeSlug] || TOOL_CONFIGS["lumpsum-calculator"];

  // Initialize values
  const [values, setValues] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    config.sliders.forEach((s) => {
      init[s.id] = s.defaultVal;
    });
    return init;
  });

  const tableScrollRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    const res: Record<string, number> = {};
    config.sliders.forEach((s) => {
      res[s.id] = s.defaultVal;
    });
    setValues(res);
  };

  const updateVal = (id: string, val: number) => {
    setValues((prev) => ({ ...prev, [id]: val }));
  };

  // Perform Calculation depending on activeSlug
  const calcOutput = useMemo(() => {
    const v = values;

    if (activeSlug === "lumpsum-calculator" || activeSlug === "scheme-performance" || activeSlug === "nav-finder") {
      const amount = v.amount ?? 100000;
      const rate = v.rate ?? 12;
      const years = v.years ?? 10;
      const invested = amount;
      const maturity = amount * Math.pow(1 + rate / 100, years);
      const gains = Math.max(0, maturity - invested);
      const pPercent = maturity > 0 ? Math.round((invested / maturity) * 100) : 100;
      const gPercent = Math.max(0, 100 - pPercent);

      const tableData = [];
      for (let y = 1; y <= years; y++) {
        tableData.push({
          year: y,
          initialCapital: invested,
          projectedValue: Math.round(amount * Math.pow(1 + rate / 100, y)),
        });
      }

      return {
        maturityLabel: "MATURITY VALUE",
        maturityVal: maturity,
        maturitySub: "Terminal estimated outcome",
        primaryLabel: "PRINCIPAL INVESTED",
        primaryVal: invested,
        primarySub: "Baseline Financial Requirement",
        secondaryLabel: "ESTIMATED GAIN",
        secondaryVal: gains,
        secondarySub: "Compounded growth or financial benefit",
        donutLabel: "GAIN RATIO",
        donutPercent: gPercent,
        donutLegend: ["Principal Invested", "Compounded Gain"] as [string, string],
        progression: tableData,
      };
    }

    if (activeSlug === "sip-calculator" || activeSlug === "sip-performance" || activeSlug === "fund-performance") {
      const amount = v.amount ?? 10000;
      const rate = v.rate ?? 12;
      const years = v.years ?? 10;
      const months = years * 12;
      const invested = amount * months;
      const r = rate / 12 / 100;
      const maturity = r > 0 ? amount * ((Math.pow(1 + r, months) - 1) / r) * (1 + r) : invested;
      const gains = Math.max(0, maturity - invested);
      const pPercent = maturity > 0 ? Math.round((invested / maturity) * 100) : 100;
      const gPercent = Math.max(0, 100 - pPercent);

      const tableData = [];
      for (let y = 1; y <= years; y++) {
        const m = y * 12;
        const inv = amount * m;
        const val = r > 0 ? amount * ((Math.pow(1 + r, m) - 1) / r) * (1 + r) : inv;
        tableData.push({
          year: y,
          initialCapital: inv,
          projectedValue: Math.round(val),
        });
      }

      return {
        maturityLabel: "MATURITY VALUE",
        maturityVal: maturity,
        maturitySub: "Terminal estimated outcome",
        primaryLabel: "TOTAL INVESTED",
        primaryVal: invested,
        primarySub: "Monthly Cumulative Outflow",
        secondaryLabel: "ESTIMATED GAIN",
        secondaryVal: gains,
        secondarySub: "Compounded wealth created",
        donutLabel: "GAIN RATIO",
        donutPercent: gPercent,
        donutLegend: ["Total Invested", "Compounded Gain"] as [string, string],
        progression: tableData,
      };
    }

    if (activeSlug === "stp-calculator" || activeSlug === "stp-performance") {
      const amount = v.amount ?? 500000;
      const transfer = v.transfer ?? 25000;
      const equityRate = v.equityRate ?? 12;
      const years = v.years ?? 5;
      const totalMonths = years * 12;
      const numTransfers = Math.min(totalMonths, Math.floor(amount / transfer));
      const eqR = equityRate / 12 / 100;

      let eqVal = 0;
      if (eqR > 0 && numTransfers > 0) {
        eqVal = transfer * ((Math.pow(1 + eqR, numTransfers) - 1) / eqR) * (1 + eqR);
        // remaining years compounding in equity
        const remMonths = totalMonths - numTransfers;
        if (remMonths > 0) {
          eqVal *= Math.pow(1 + eqR, remMonths);
        }
      }

      const totalValue = eqVal;
      const gains = Math.max(0, totalValue - amount);
      const gPercent = totalValue > 0 ? Math.min(100, Math.round((gains / totalValue) * 100)) : 0;

      const tableData = [];
      for (let y = 1; y <= years; y++) {
        const m = y * 12;
        const tCount = Math.min(m, numTransfers);
        const curEq = eqR > 0 && tCount > 0 ? transfer * ((Math.pow(1 + eqR, tCount) - 1) / eqR) * (1 + eqR) : amount;
        tableData.push({
          year: y,
          initialCapital: amount,
          projectedValue: Math.round(curEq),
        });
      }

      return {
        maturityLabel: "PROJECTED VALUE",
        maturityVal: totalValue,
        maturitySub: "Combined STP terminal growth",
        primaryLabel: "INITIAL DEBT CORPUS",
        primaryVal: amount,
        primarySub: "Staggered lump sum capital",
        secondaryLabel: "ESTIMATED GAIN",
        secondaryVal: gains,
        secondarySub: "Equity compounding returns",
        donutLabel: "GAIN RATIO",
        donutPercent: gPercent,
        donutLegend: ["Base Capital", "Compounded Gains"] as [string, string],
        progression: tableData,
      };
    }

    if (activeSlug === "swp-calculator" || activeSlug === "swp-performance") {
      const amount = v.amount ?? 2500000;
      const withdrawal = v.withdrawal ?? 20000;
      const rate = v.rate ?? 9;
      const years = v.years ?? 15;
      const totalMonths = years * 12;
      const r = rate / 12 / 100;

      let bal = amount;
      let totalWithdrawn = 0;
      const tableData = [];

      for (let y = 1; y <= years; y++) {
        for (let m = 1; m <= 12; m++) {
          bal = bal * (1 + r) - withdrawal;
          if (bal < 0) bal = 0;
          totalWithdrawn += withdrawal;
        }
        tableData.push({
          year: y,
          initialCapital: Math.round(totalWithdrawn),
          projectedValue: Math.round(bal),
        });
      }

      const netWealth = totalWithdrawn + bal;
      const gain = Math.max(0, netWealth - amount);
      const withdrawPercent = netWealth > 0 ? Math.round((totalWithdrawn / netWealth) * 100) : 50;

      return {
        maturityLabel: "REMAINING BALANCE",
        maturityVal: bal,
        maturitySub: `After ${years} years of payouts`,
        primaryLabel: "TOTAL CASH WITHDRAWN",
        primaryVal: totalWithdrawn,
        primarySub: "Steady monthly pension cashflow",
        secondaryLabel: "WEALTH PRESERVED",
        secondaryVal: gain,
        secondarySub: "Growth earned over withdrawals",
        donutLabel: "WITHDRAWAL RATIO",
        donutPercent: withdrawPercent,
        donutLegend: ["Cash Paid Out", "Retained Capital"] as [string, string],
        progression: tableData,
      };
    }

    if (activeSlug === "retirement-plan") {
      const currentAge = v.currentAge ?? 32;
      const retireAge = v.retireAge ?? 60;
      const monthlyExp = v.monthlyExp ?? 45000;
      const inflation = v.inflation ?? 6;

      const yearsToRetire = Math.max(1, retireAge - currentAge);
      const futureMonthlyExp = monthlyExp * Math.pow(1 + inflation / 100, yearsToRetire);
      const annualPostExp = futureMonthlyExp * 12;
      // Real rate post retirement ~2% (8% return - 6% inflation)
      const realRate = 0.02;
      const retirementYears = 25;
      const corpusNeeded = annualPostExp * ((1 - Math.pow(1 + realRate, -retirementYears)) / realRate);

      // Monthly SIP needed at 12%
      const r = 0.12 / 12;
      const m = yearsToRetire * 12;
      const monthlySip = (corpusNeeded * r) / ((Math.pow(1 + r, m) - 1) * (1 + r));

      const tableData = [];
      for (let y = 1; y <= yearsToRetire; y++) {
        const ym = y * 12;
        const curSipVal = (monthlySip * ((Math.pow(1 + r, ym) - 1) / r)) * (1 + r);
        tableData.push({
          year: y,
          initialCapital: Math.round(monthlySip * ym),
          projectedValue: Math.round(curSipVal),
        });
      }

      return {
        maturityLabel: "REQUIRED CORPUS",
        maturityVal: corpusNeeded,
        maturitySub: `Target fund needed at age ${retireAge}`,
        primaryLabel: "FUTURE MONTHLY EXPENSE",
        primaryVal: futureMonthlyExp,
        primarySub: `Adjusted for ${inflation}% inflation`,
        secondaryLabel: "REQUIRED MONTHLY SIP",
        secondaryVal: monthlySip,
        secondarySub: "Disciplined SIP needed today",
        donutLabel: "CORPUS SCALE",
        donutPercent: 75,
        donutLegend: ["Accumulated Wealth", "Inflation Cost"] as [string, string],
        progression: tableData,
      };
    }

    if (activeSlug === "delay-plan") {
      const sip = v.sip ?? 10000;
      const delay = v.delay ?? 3;
      const rate = v.rate ?? 12;
      const years = v.years ?? 20;

      const r = rate / 12 / 100;
      const mTotal = years * 12;
      const onTimeVal = r > 0 ? sip * ((Math.pow(1 + r, mTotal) - 1) / r) * (1 + r) : sip * mTotal;

      const delayedMonths = Math.max(1, (years - delay) * 12);
      const delayedVal = r > 0 ? sip * ((Math.pow(1 + r, delayedMonths) - 1) / r) * (1 + r) : sip * delayedMonths;

      const delayCost = Math.max(0, onTimeVal - delayedVal);
      const lossPercent = onTimeVal > 0 ? Math.round((delayCost / onTimeVal) * 100) : 35;

      const tableData = [];
      for (let y = 1; y <= years; y++) {
        const ym = y * 12;
        const onT = sip * ((Math.pow(1 + r, ym) - 1) / r) * (1 + r);
        tableData.push({
          year: y,
          initialCapital: sip * ym,
          projectedValue: Math.round(onT),
        });
      }

      return {
        maturityLabel: "COST OF DELAY",
        maturityVal: delayCost,
        maturitySub: `Loss caused by waiting ${delay} years`,
        primaryLabel: "ON-TIME MATURITY",
        primaryVal: onTimeVal,
        primarySub: "Starting SIP immediately today",
        secondaryLabel: "DELAYED MATURITY",
        secondaryVal: delayedVal,
        secondarySub: `Starting after ${delay} years`,
        donutLabel: "LOSS RATIO",
        donutPercent: lossPercent,
        donutLegend: ["Lost Compounding", "Retained Wealth"] as [string, string],
        progression: tableData,
      };
    }

    if (activeSlug === "life-insurance-plan") {
      const income = v.income ?? 1200000;
      const age = v.age ?? 32;
      const liabilities = v.liabilities ?? 2500000;
      const savings = v.savings ?? 1000000;

      const yearsToProtect = Math.max(5, 60 - age);
      const incomeReplacement = income * yearsToProtect * 0.7;
      const recommendedCover = Math.max(2500000, incomeReplacement + liabilities - savings);

      const tableData = [];
      for (let y = 1; y <= 10; y++) {
        tableData.push({
          year: y,
          initialCapital: income * y,
          projectedValue: Math.round(recommendedCover),
        });
      }

      return {
        maturityLabel: "RECOMMENDED COVER",
        maturityVal: recommendedCover,
        maturitySub: "Ideal pure term life cover (HLV)",
        primaryLabel: "FAMILY INCOME SECURITY",
        primaryVal: incomeReplacement,
        primarySub: `Replacement for ${yearsToProtect} earning years`,
        secondaryLabel: "NET DEBT LIABILITY",
        secondaryVal: Math.max(0, liabilities - savings),
        secondarySub: "Debt minus existing investments",
        donutLabel: "PROTECTION",
        donutPercent: 80,
        donutLegend: ["Income Cover", "Debt Protection"] as [string, string],
        progression: tableData,
      };
    }

    if (activeSlug === "emi-plan" || activeSlug === "house-plan" || activeSlug === "car-plan") {
      const amount = v.amount ?? (activeSlug === "house-plan" ? 4000000 : activeSlug === "car-plan" ? 1200000 : 1500000);
      const rate = v.rate ?? (activeSlug === "house-plan" ? 8.6 : activeSlug === "car-plan" ? 9.5 : 9);
      const years = v.years ?? (activeSlug === "house-plan" ? 20 : activeSlug === "car-plan" ? 5 : 10);

      const r = rate / 12 / 100;
      const n = years * 12;
      const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = emi * n;
      const totalInterest = Math.max(0, totalPayment - amount);
      const interestPercent = totalPayment > 0 ? Math.round((totalInterest / totalPayment) * 100) : 30;

      const tableData = [];
      let remBal = amount;
      for (let y = 1; y <= years; y++) {
        for (let m = 1; m <= 12; m++) {
          const intPart = remBal * r;
          const prinPart = emi - intPart;
          remBal -= prinPart;
          if (remBal < 0) remBal = 0;
        }
        tableData.push({
          year: y,
          initialCapital: Math.round(emi * 12 * y),
          projectedValue: Math.round(remBal),
        });
      }

      return {
        maturityLabel: "MONTHLY EMI",
        maturityVal: emi,
        maturitySub: `Monthly repayment for ${years} years`,
        primaryLabel: "LOAN PRINCIPAL",
        primaryVal: amount,
        primarySub: "Baseline borrowed amount",
        secondaryLabel: "TOTAL INTEREST PAYABLE",
        secondaryVal: totalInterest,
        secondarySub: "Interest cost over loan tenure",
        donutLabel: "INTEREST RATIO",
        donutPercent: interestPercent,
        donutLegend: ["Loan Principal", "Total Interest"] as [string, string],
        progression: tableData,
      };
    }

    if (activeSlug === "marriage-plan" || activeSlug === "education-plan" || activeSlug === "vacation-plan") {
      const cost = v.cost ?? (activeSlug === "marriage-plan" ? 2000000 : activeSlug === "education-plan" ? 2500000 : 350000);
      const years = v.years ?? (activeSlug === "marriage-plan" ? 12 : activeSlug === "education-plan" ? 10 : 3);
      const inflation = v.inflation ?? (activeSlug === "education-plan" ? 8 : activeSlug === "marriage-plan" ? 7 : 6);
      const rate = v.rate ?? (activeSlug === "vacation-plan" ? 9 : 12);

      const futureCost = cost * Math.pow(1 + inflation / 100, years);
      const r = rate / 12 / 100;
      const m = years * 12;
      const monthlySip = r > 0 ? (futureCost * r) / ((Math.pow(1 + r, m) - 1) * (1 + r)) : futureCost / m;
      const totalInvested = monthlySip * m;
      const gain = Math.max(0, futureCost - totalInvested);
      const gainPercent = futureCost > 0 ? Math.round((gain / futureCost) * 100) : 40;

      const tableData = [];
      for (let y = 1; y <= years; y++) {
        const ym = y * 12;
        const curVal = r > 0 ? monthlySip * ((Math.pow(1 + r, ym) - 1) / r) * (1 + r) : monthlySip * ym;
        tableData.push({
          year: y,
          initialCapital: Math.round(monthlySip * ym),
          projectedValue: Math.round(curVal),
        });
      }

      return {
        maturityLabel: "FUTURE GOAL COST",
        maturityVal: futureCost,
        maturitySub: `Adjusted for ${inflation}% inflation in ${years} yrs`,
        primaryLabel: "REQUIRED MONTHLY SIP",
        primaryVal: monthlySip,
        primarySub: "Monthly savings to reach milestone",
        secondaryLabel: "WEALTH CREATED BY SIP",
        secondaryVal: gain,
        secondarySub: "Compounding returns saving your money",
        donutLabel: "GROWTH RATIO",
        donutPercent: gainPercent,
        donutLegend: ["Invested Capital", "Compounding Return"] as [string, string],
        progression: tableData,
      };
    }

    // Default / Tax Calculator
    const income = v.income ?? 1200000;
    const elss = v.elss ?? 150000;
    const health = v.health ?? 25000;
    const rate = v.rate ?? 13;
    const taxSaved = Math.round((elss + health) * 0.312);
    const futureElssValue = elss * Math.pow(1 + rate / 100, 3); // 3 year lockin

    const tableData = [
      { year: 1, initialCapital: elss, projectedValue: Math.round(elss * (1 + rate / 100)) },
      { year: 2, initialCapital: elss, projectedValue: Math.round(elss * Math.pow(1 + rate / 100, 2)) },
      { year: 3, initialCapital: elss, projectedValue: Math.round(futureElssValue) },
      { year: 5, initialCapital: elss, projectedValue: Math.round(elss * Math.pow(1 + rate / 100, 5)) },
      { year: 10, initialCapital: elss, projectedValue: Math.round(elss * Math.pow(1 + rate / 100, 10)) },
    ];

    return {
      maturityLabel: "ANNUAL TAX SAVED",
      maturityVal: taxSaved,
      maturitySub: "Direct income tax saved under Sec 80C & 80D",
      primaryLabel: "PLANNED ELSS INVESTMENT",
      primaryVal: elss,
      primarySub: "Eligible for 80C tax deduction",
      secondaryLabel: "3-YEAR ELSS MATURITY",
      secondaryVal: futureElssValue,
      secondarySub: `Projected compounding at ${rate}% P.A`,
      donutLabel: "SAVING RATIO",
      donutPercent: 31,
      donutLegend: ["Tax Saved", "Tax Payable"] as [string, string],
      progression: tableData,
    };
  }, [activeSlug, values]);

  const scrollToTable = (position: "top" | "end") => {
    if (tableScrollRef.current) {
      if (position === "top") {
        tableScrollRef.current.scrollTop = 0;
      } else {
        tableScrollRef.current.scrollTop = tableScrollRef.current.scrollHeight;
      }
    }
  };

  // SVG Chart points
  const maxProgValue =
    calcOutput.progression.length > 0
      ? Math.max(...calcOutput.progression.map((d) => d.projectedValue), 1)
      : 1;
  const chartWidth = 700;
  const chartHeight = 180;
  const points = calcOutput.progression.map((d, idx) => {
    const x =
      calcOutput.progression.length > 1
        ? (idx / (calcOutput.progression.length - 1)) * (chartWidth - 40) + 20
        : 20;
    const y = chartHeight - 30 - (d.projectedValue / maxProgValue) * (chartHeight - 50);
    return { x, y, value: d.projectedValue };
  });

  const svgPath =
    points.length > 0
      ? `M ${points[0].x} ${points[0].y} ` +
        points
          .slice(1)
          .map((p) => `L ${p.x} ${p.y}`)
          .join(" ")
      : "";

  const areaPath =
    points.length > 0
      ? `${svgPath} L ${points[points.length - 1].x} ${chartHeight - 20} L ${points[0].x} ${
          chartHeight - 20
        } Z`
      : "";

  // Donut circumference (radius 50)
  const donutRadius = 50;
  const circumference = 2 * Math.PI * donutRadius;
  const gainsStroke = (Math.min(100, Math.max(0, calcOutput.donutPercent)) / 100) * circumference;
  const principalStroke = circumference - gainsStroke;

  return (
    <div className="theme-calc-container">
      {/* Top Header Row with Badges, Title, Mode Switcher, and Reset */}
      <div className="theme-calc-header">
        <div className="theme-calc-header-left">
          <div className="theme-calc-badges-row">
            <span className="badge-investment">{config.badge}</span>
            <span className="badge-core-tool">{config.tag}</span>
            {showModeSwitcher && (
              <div className="theme-mode-tabs">
                <Link
                  href="/calculator/lumpsum-calculator"
                  className={`theme-mode-tab ${activeSlug === "lumpsum-calculator" ? "active" : ""}`}
                >
                  Lumpsum
                </Link>
                <Link
                  href="/calculator/sip-calculator"
                  className={`theme-mode-tab ${activeSlug === "sip-calculator" ? "active" : ""}`}
                >
                  Monthly SIP
                </Link>
              </div>
            )}
          </div>

          <h2 className="theme-calc-title">{config.title}</h2>
          <p className="theme-calc-sub">{config.desc}</p>
        </div>

        <button type="button" className="theme-calc-reset-btn" onClick={handleReset}>
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>

      {/* Main Grid: Parameters on Left, 3 Metric Cards on Right */}
      <div className="theme-calc-top-grid">
        {/* Left: Parameters & Inputs Card */}
        <div className="theme-calc-inputs-card">
          <div className="inputs-card-header">
            <h3>Parameters &amp; Inputs</h3>
            <span className="badge-live-calc">LIVE CALCULATION</span>
          </div>

          <div className="inputs-controls-stack">
            {config.sliders.map((s) => {
              const currentVal = values[s.id] ?? s.defaultVal;
              return (
                <div className="theme-input-group" key={s.id}>
                  <div className="input-label-row">
                    <label htmlFor={`theme-${s.id}`}>{s.label}</label>
                    <div className="input-value-pill">
                      {s.isCurrency && <span className="pill-currency">₹</span>}
                      <input
                        id={`theme-${s.id}`}
                        type="number"
                        min={s.min}
                        max={s.max}
                        step={s.step}
                        value={currentVal}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (!isNaN(v)) updateVal(s.id, v);
                        }}
                        aria-label={s.label}
                      />
                      {!s.isCurrency && <span className="pill-percent">{s.unit}</span>}
                    </div>
                  </div>

                  <div className="slider-wrapper">
                    <input
                      type="range"
                      min={s.min}
                      max={s.max}
                      step={s.step}
                      value={currentVal}
                      onChange={(e) => updateVal(s.id, Number(e.target.value))}
                      className="theme-range-slider"
                    />
                    <div className="slider-limits">
                      <span>{s.isCurrency ? formatCompactInr(s.min) : `${s.min} ${s.unit}`}</span>
                      <span>{s.isCurrency ? formatCompactInr(s.max) : `${s.max} ${s.unit}`}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info callout */}
          <div className="theme-calc-tip-box">
            <span className="tip-bulb">💡</span>
            <p>{config.tip}</p>
          </div>
        </div>

        {/* Right: 3 Stacked Cards */}
        <div className="theme-calc-metrics-stack">
          {/* Card 1: Maturity Value (Dark Card) */}
          <div className="metric-card dark-maturity-card">
            <div className="metric-top-label">
              <TrendingUp size={15} className="metric-icon" />
              <span>{calcOutput.maturityLabel}</span>
            </div>
            <div className="metric-huge-number text-neon-green">
              {formatCompactInr(calcOutput.maturityVal)}
            </div>
            <div className="metric-sub-label">{calcOutput.maturitySub}</div>
          </div>

          {/* Card 2: Primary Invested (White Card) */}
          <div className="metric-card light-metric-card">
            <div className="metric-top-label text-slate-500">
              <span className="metric-symbol">₹</span>
              <span>{calcOutput.primaryLabel}</span>
            </div>
            <div className="metric-huge-number text-slate-900">
              {formatCompactInr(calcOutput.primaryVal)}
            </div>
            <div className="metric-sub-label">{calcOutput.primarySub}</div>
          </div>

          {/* Card 3: Estimated Gain / Secondary (White Card) */}
          <div className="metric-card light-metric-card">
            <div className="metric-top-label text-slate-500">
              <Sparkles size={14} className="text-emerald-500" />
              <span>{calcOutput.secondaryLabel}</span>
            </div>
            <div className="metric-huge-number text-emerald-600">
              {formatCompactInr(calcOutput.secondaryVal)}
            </div>
            <div className="metric-sub-label">{calcOutput.secondarySub}</div>
          </div>
        </div>
      </div>

      {/* Middle Section: Table on Left, Yield Breakdown & Investor Awareness on Right */}
      <div className="theme-calc-middle-grid">
        {/* Left Column: Progression Table */}
        <div className="theme-calc-table-card">
          <div className="table-card-header">
            <div className="table-header-col">YEAR</div>
            <div className="table-header-col">INITIAL CAPITAL</div>
            <div className="table-header-col text-right">
              <span>PROJECTED VALUE</span>
              <div className="table-nav-arrows">
                <button
                  type="button"
                  className="table-nav-btn"
                  title="Scroll to Top"
                  onClick={() => scrollToTable("top")}
                >
                  Top <ChevronUp size={13} />
                </button>
                <button
                  type="button"
                  className="table-nav-btn"
                  title="Scroll to End"
                  onClick={() => scrollToTable("end")}
                >
                  End <ChevronDown size={13} />
                </button>
              </div>
            </div>
          </div>

          <div className="table-rows-scroll" ref={tableScrollRef}>
            {calcOutput.progression.map((row) => (
              <div className="theme-table-row" key={row.year}>
                <div className="theme-td td-year">Year {row.year}</div>
                <div className="theme-td td-initial">{formatCompactInr(row.initialCapital)}</div>
                <div className="theme-td td-projected text-neon-table">
                  {formatCompactInr(row.projectedValue)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Yield Breakdown + Investor Awareness */}
        <div className="theme-calc-middle-right">
          {/* Yield Breakdown Donut Card */}
          <div className="yield-breakdown-card">
            <div className="yield-card-title">YIELD BREAKDOWN</div>
            <div className="yield-chart-container">
              <div className="donut-svg-wrapper">
                <svg width="150" height="150" viewBox="0 0 130 130" className="donut-chart">
                  {/* Background Principal Ring */}
                  <circle
                    cx="65"
                    cy="65"
                    r={donutRadius}
                    fill="transparent"
                    stroke="#94a3b8"
                    strokeWidth="14"
                  />
                  {/* Foreground Gains Ring */}
                  <circle
                    cx="65"
                    cy="65"
                    r={donutRadius}
                    fill="transparent"
                    stroke="#22c55e"
                    strokeWidth="14"
                    strokeDasharray={`${gainsStroke} ${principalStroke}`}
                    strokeDashoffset={circumference / 4}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dasharray 0.3s ease" }}
                  />
                </svg>
                <div className="donut-center-content">
                  <span className="donut-center-sub">{calcOutput.donutLabel}</span>
                  <span className="donut-center-main">{calcOutput.donutPercent}%</span>
                </div>
              </div>

              <div className="donut-legend-row">
                <div className="legend-entry">
                  <span className="legend-color-dot dot-principal" />
                  <span>{calcOutput.donutLegend[0]}</span>
                </div>
                <div className="legend-entry">
                  <span className="legend-color-dot dot-gains" />
                  <span>{calcOutput.donutLegend[1]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Investor Awareness Dark Navy Card */}
          <div className="investor-awareness-card">
            <div className="awareness-header">
              <CheckCircle2 size={15} className="text-emerald-400" />
              <span>INVESTOR AWARENESS</span>
            </div>

            <ul className="awareness-check-list">
              {config.awareness.map((item, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={14} className="check-icon" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link href="/contact" className="awareness-enquire-btn">
              <span>Enquire with Our Team →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Card: Compound Growth Curve */}
      <div className="compound-growth-card">
        <div className="growth-curve-header">
          <span className="growth-curve-title">COMPOUND GROWTH CURVE</span>
          <div className="growth-curve-legend">
            <div className="legend-line-item">
              <span className="legend-line line-future" />
              <span>Future Value</span>
            </div>
            <div className="legend-line-item">
              <span className="legend-line line-initial" />
              <span>Initial Capital</span>
            </div>
          </div>
        </div>

        <div className="growth-svg-container">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="none"
            className="growth-svg"
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Baseline horizontal line for initial capital */}
            <line
              x1="20"
              y1={chartHeight - 35}
              x2={chartWidth - 20}
              y2={chartHeight - 35}
              stroke="#cbd5e1"
              strokeDasharray="4 4"
              strokeWidth="1.5"
            />

            {/* Shaded Area */}
            {areaPath && <path d={areaPath} fill="url(#areaGradient)" />}

            {/* Line Curve */}
            {svgPath && (
              <path
                d={svgPath}
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* End Node Dot */}
            {points.length > 0 && (
              <circle
                cx={points[points.length - 1].x}
                cy={points[points.length - 1].y}
                r="4.5"
                fill="#2563eb"
                stroke="#ffffff"
                strokeWidth="2"
              />
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
