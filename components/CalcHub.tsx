"use client";

import React, { useRef, useState } from "react";
import type { Calc } from "@/content/site";
import ModernCalculator from "./ModernCalculator";
import {
  PieChart,
  Coins,
  Repeat,
  Wallet,
  Armchair,
  Hourglass,
  ShieldAlert,
  Percent,
  Receipt,
  Heart,
  GraduationCap,
  Home,
  Car,
  Plane,
  TrendingUp,
  Activity,
  Compass,
  FileSpreadsheet,
  X,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

const P = "3b3f98";
const S = "6d70b3";
const W = "ffffff";

function src(c: Calc) {
  const login = encodeURIComponent("https://shahfs.com/login.php");
  return `${c.domain}/${c.dir}/${c.cat}/${c.slug}?apikey=red&primarycolor=${P}&secondarycolor=${S}&primaryactive=${W}&redirecturl=${login}`;
}

// Icon mapping helper
function getCalcMeta(slug: string, title: string) {
  switch (slug) {
    case "sip-calculator":
      return {
        icon: <PieChart size={28} className="text-indigo-600" />,
        badge: "Most Popular",
        desc: "Calculate long-term wealth creation via monthly systematic investments.",
        isNative: true,
        mode: "sip" as const,
      };
    case "lumpsum-calculator":
      return {
        icon: <Coins size={28} className="text-amber-600" />,
        badge: "Compounding",
        desc: "Estimate one-time capital growth and Rule of 72 doubling benchmarks.",
        isNative: true,
        mode: "lumpsum" as const,
      };
    case "stp-calculator":
      return {
        icon: <Repeat size={28} className="text-blue-600" />,
        badge: "Transfer",
        desc: "Plan phased systematic capital transfers from debt to equity schemes.",
        isNative: false,
      };
    case "swp-calculator":
      return {
        icon: <Wallet size={28} className="text-emerald-600" />,
        badge: "Regular Income",
        desc: "Design monthly cashflows while preserving your underlying capital base.",
        isNative: false,
      };
    case "retirement-plan":
      return {
        icon: <Armchair size={28} className="text-purple-600" />,
        badge: "Retirement",
        desc: "Determine your ideal inflation-adjusted retirement corpus for financial independence.",
        isNative: false,
      };
    case "delay-plan":
      return {
        icon: <Hourglass size={28} className="text-rose-600" />,
        badge: "Delay Cost",
        desc: "Discover the staggering compounding cost of delaying your investments.",
        isNative: false,
      };
    case "life-insurance-plan":
      return {
        icon: <ShieldAlert size={28} className="text-teal-600" />,
        badge: "Protection",
        desc: "Compute the ideal family protection cover based on Human Life Value (HLV).",
        isNative: false,
      };
    case "emi-plan":
      return {
        icon: <Percent size={28} className="text-cyan-600" />,
        badge: "Repayment",
        desc: "Calculate loan EMIs, total interest outgo, and amortization schedules.",
        isNative: false,
      };
    case "calculator.php":
      return {
        icon: <Receipt size={28} className="text-slate-600" />,
        badge: "Tax Saving",
        desc: "Compare old vs new tax regime and optimize Section 80C mutual fund deductions.",
        isNative: false,
      };
    case "marriage-plan":
      return {
        icon: <Heart size={28} className="text-pink-600" />,
        badge: "Life Event",
        desc: "Forecast child wedding expenses factoring inflation and targeted timelines.",
        isNative: false,
      };
    case "education-plan":
      return {
        icon: <GraduationCap size={28} className="text-amber-700" />,
        badge: "Higher Studies",
        desc: "Plan for escalating higher education costs in India and international universities.",
        isNative: false,
      };
    case "house-plan":
      return {
        icon: <Home size={28} className="text-emerald-700" />,
        badge: "Real Estate",
        desc: "Plan down-payment savings and affordable monthly mortgage outgo.",
        isNative: false,
      };
    case "car-plan":
      return {
        icon: <Car size={28} className="text-blue-700" />,
        badge: "Vehicle",
        desc: "Plan targeted SIP savings to buy your dream car debt-free or low EMI.",
        isNative: false,
      };
    case "vacation-plan":
      return {
        icon: <Plane size={28} className="text-sky-600" />,
        badge: "Travel",
        desc: "Budget and save systematically for your annual domestic and global travel dreams.",
        isNative: false,
      };
    // MF Tools
    case "sip-performance":
      return {
        icon: <TrendingUp size={28} className="text-indigo-600" />,
        badge: "Performance",
        desc: "Backtest historical SIP returns across top-performing mutual fund schemes.",
        isNative: false,
      };
    case "stp-performance":
      return {
        icon: <Activity size={28} className="text-blue-600" />,
        badge: "Historical",
        desc: "Examine past performance of systematic transfer plans in market corrections.",
        isNative: false,
      };
    case "swp-performance":
      return {
        icon: <Wallet size={28} className="text-emerald-600" />,
        badge: "Cashflow",
        desc: "Review past SWP withdrawal histories and portfolio longevity records.",
        isNative: false,
      };
    case "scheme-performance":
      return {
        icon: <FileSpreadsheet size={28} className="text-indigo-700" />,
        badge: "Schemes",
        desc: "Detailed trailing and point-to-point performance comparison of mutual fund schemes.",
        isNative: false,
      };
    case "fund-performance":
      return {
        icon: <TrendingUp size={28} className="text-amber-600" />,
        badge: "Top Funds",
        desc: "Rankings and performance metrics of premier funds in various asset categories.",
        isNative: false,
      };
    case "nav-finder":
      return {
        icon: <Compass size={28} className="text-teal-600" />,
        badge: "NAV Tracker",
        desc: "Check historical and current Net Asset Values across all registered AMCs.",
        isNative: false,
      };
    default:
      return {
        icon: <PieChart size={28} className="text-indigo-600" />,
        badge: "Calculator",
        desc: "Comprehensive financial planning and wealth projection tool.",
        isNative: false,
      };
  }
}

export function CalcGroup({ title, calcs }: { title?: string; calcs: Calc[] }) {
  // Default to lumpsum or first calc if on calculator page
  const [cur, setCur] = useState<Calc | null>(null);
  const [nativeMode, setNativeMode] = useState<"lumpsum" | "sip" | null>("lumpsum");
  const panel = useRef<HTMLDivElement>(null);

  const pick = (c: Calc) => {
    const meta = getCalcMeta(c.slug, c.title);
    if (meta.isNative && meta.mode) {
      setNativeMode(meta.mode);
      setCur(c);
    } else {
      setNativeMode(null);
      setCur(c);
    }
    setTimeout(() => {
      panel.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  return (
    <div className="calc-group-container">
      {title && (
        <div className="calc-group-header">
          <h2 className="calc-group-heading">{title}</h2>
          <p className="calc-group-sub">Select any calculator below to project your wealth, EMIs, or retirement goals.</p>
        </div>
      )}

      {/* Grid of Redesigned Modern Cards */}
      <div className="modern-calc-cards-grid">
        {calcs.map((c) => {
          const meta = getCalcMeta(c.slug, c.title);
          const isSelected = cur?.slug === c.slug;

          return (
            <div
              key={c.slug}
              role="button"
              tabIndex={0}
              className={`modern-calc-card ${isSelected ? "selected" : ""}`}
              onClick={() => pick(c)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  pick(c);
                }
              }}
            >
              <div className="card-top-row">
                <div className="card-icon-bubble">{meta.icon}</div>
                <span className="card-category-badge">{meta.badge}</span>
              </div>

              <h3 className="card-calc-title">{c.title}</h3>
              <p className="card-calc-desc">{meta.desc}</p>

              <div className="card-footer-action">
                <span className="action-text">{isSelected ? "Currently Active" : "Calculate Now"}</span>
                <ChevronRight size={16} className="chevron-icon" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Active Panel */}
      <div className="calc-interactive-panel" ref={panel}>
        {nativeMode ? (
          <div className="native-calc-holder">
            <ModernCalculator key={nativeMode} initialMode={nativeMode} showModeSwitcher={true} />
          </div>
        ) : cur ? (
          <div className="calc-panel" style={{ ["--hm" as string]: cur.minH }}>
            <header className="calc-panel-header">
              <div className="calc-panel-title-area">
                <div className="panel-badge-icon">{getCalcMeta(cur.slug, cur.title).icon}</div>
                <div>
                  <h3 className="panel-title">{cur.title}</h3>
                  <p className="panel-desc">{getCalcMeta(cur.slug, cur.title).desc}</p>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-ghost panel-close-btn"
                onClick={() => setNativeMode("lumpsum")}
              >
                <X size={16} />
                <span>Reset to Lumpsum</span>
              </button>
            </header>
            <CalcFrame key={cur.slug} calc={cur} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function CalcFrame({ calc }: { calc: Calc }) {
  return (
    <>
      <style>{`@media (min-width: 1081px){ .calc-panel iframe{ height:${calc.maxH} !important } }`}</style>
      <iframe src={src(calc)} title={calc.title} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    </>
  );
}
