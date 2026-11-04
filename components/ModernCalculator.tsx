"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Calculator as CalcIcon,
  RotateCcw,
  CheckCircle2,
  ChevronUp,
  ChevronDown,
  Info,
} from "lucide-react";

export type CalcMode = "lumpsum" | "sip";

interface ModernCalculatorProps {
  initialMode?: CalcMode;
  showModeSwitcher?: boolean;
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

export default function ModernCalculator({
  initialMode = "lumpsum",
  showModeSwitcher = true,
}: ModernCalculatorProps) {
  const [mode, setMode] = useState<CalcMode>(initialMode);

  // Lumpsum state
  const [lumpAmount, setLumpAmount] = useState<number>(100000);
  const [lumpRate, setLumpRate] = useState<number>(12);
  const [lumpYears, setLumpYears] = useState<number>(10);

  // SIP state
  const [sipAmount, setSipAmount] = useState<number>(10000);
  const [sipRate, setSipRate] = useState<number>(12);
  const [sipYears, setSipYears] = useState<number>(10);

  const tableScrollRef = useRef<HTMLDivElement>(null);

  const isLump = mode === "lumpsum";
  const amount = isLump ? lumpAmount : sipAmount;
  const setAmount = isLump ? setLumpAmount : setSipAmount;

  const rate = isLump ? lumpRate : sipRate;
  const setRate = isLump ? setLumpRate : setSipRate;

  const years = isLump ? lumpYears : sipYears;
  const setYears = isLump ? setLumpYears : setSipYears;

  const handleReset = () => {
    if (isLump) {
      setLumpAmount(100000);
      setLumpRate(12);
      setLumpYears(10);
    } else {
      setSipAmount(10000);
      setSipRate(12);
      setSipYears(10);
    }
  };

  // Calculations
  const { totalInvested, totalMaturity, capitalGains, principalPercent, gainsPercent, progression } =
    useMemo(() => {
      let invested = 0;
      let maturity = 0;

      if (isLump) {
        invested = amount;
        maturity = amount * Math.pow(1 + rate / 100, years);
      } else {
        const monthlyRate = rate / 12 / 100;
        const months = years * 12;
        invested = amount * months;
        if (monthlyRate > 0) {
          maturity =
            amount *
            ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
            (1 + monthlyRate);
        } else {
          maturity = invested;
        }
      }

      const gains = Math.max(0, maturity - invested);
      const pPercent = maturity > 0 ? Math.round((invested / maturity) * 100) : 100;
      const gPercent = Math.max(0, 100 - pPercent);

      const tableData = [];
      for (let y = 1; y <= years; y++) {
        if (isLump) {
          const val = amount * Math.pow(1 + rate / 100, y);
          tableData.push({
            year: y,
            initialCapital: amount,
            projectedValue: Math.round(val),
          });
        } else {
          const m = y * 12;
          const inv = amount * m;
          const r = rate / 12 / 100;
          const val = r > 0 ? amount * ((Math.pow(1 + r, m) - 1) / r) * (1 + r) : inv;
          tableData.push({
            year: y,
            initialCapital: inv,
            projectedValue: Math.round(val),
          });
        }
      }

      return {
        totalInvested: invested,
        totalMaturity: maturity,
        capitalGains: gains,
        principalPercent: pPercent,
        gainsPercent: gPercent,
        progression: tableData,
      };
    }, [isLump, amount, rate, years]);

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
  const maxProgValue = progression.length > 0 ? progression[progression.length - 1].projectedValue : 1;
  const chartWidth = 700;
  const chartHeight = 180;
  const points = progression.map((d, idx) => {
    const x = progression.length > 1 ? (idx / (progression.length - 1)) * (chartWidth - 40) + 20 : 20;
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
  const gainsStroke = (gainsPercent / 100) * circumference;
  const principalStroke = circumference - gainsStroke;

  return (
    <div className="theme-calc-container">
      {/* Top Header Row with Badges, Title, Mode Switcher, and Reset */}
      <div className="theme-calc-header">
        <div className="theme-calc-header-left">
          <div className="theme-calc-badges-row">
            <span className="badge-investment">INVESTMENT</span>
            <span className="badge-core-tool">★ CORE TOOL</span>
            {showModeSwitcher && (
              <div className="theme-mode-tabs">
                <button
                  type="button"
                  className={`theme-mode-tab ${mode === "lumpsum" ? "active" : ""}`}
                  onClick={() => setMode("lumpsum")}
                >
                  Lumpsum
                </button>
                <button
                  type="button"
                  className={`theme-mode-tab ${mode === "sip" ? "active" : ""}`}
                  onClick={() => setMode("sip")}
                >
                  Monthly SIP
                </button>
              </div>
            )}
          </div>

          <h2 className="theme-calc-title">
            {isLump ? "Lumpsum Calculator" : "SIP Calculator"}
          </h2>
          <p className="theme-calc-sub">
            {isLump
              ? "Estimate prospective compounding growth for one-time lump sum mutual fund investments."
              : "Forecast prospective compounding growth for disciplined monthly systematic investments."}
          </p>
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
            {/* Input 1: Total Investment Amount */}
            <div className="theme-input-group">
              <div className="input-label-row">
                <label htmlFor="theme-amount">
                  {isLump ? "TOTAL INVESTMENT AMOUNT" : "MONTHLY SIP AMOUNT"}
                </label>
                <div className="input-value-pill">
                  <span className="pill-currency">₹</span>
                  <input
                    id="theme-amount"
                    type="number"
                    min={isLump ? 5000 : 500}
                    max={isLump ? 50000000 : 2000000}
                    step={isLump ? 10000 : 500}
                    value={amount}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (!isNaN(v)) setAmount(v);
                    }}
                    aria-label="Investment Amount"
                  />
                </div>
              </div>

              <div className="slider-wrapper">
                <input
                  type="range"
                  min={isLump ? 5000 : 500}
                  max={isLump ? 5000000 : 200000}
                  step={isLump ? 5000 : 500}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="theme-range-slider"
                />
                <div className="slider-limits">
                  <span>{isLump ? "₹5,000" : "₹500"}</span>
                  <span>{isLump ? "₹50,00,000" : "₹2,00,000"}</span>
                </div>
              </div>
            </div>

            {/* Input 2: Expected Return Rate (P.A) */}
            <div className="theme-input-group">
              <div className="input-label-row">
                <label htmlFor="theme-rate">EXPECTED RETURN RATE (P.A)</label>
                <div className="input-value-pill">
                  <input
                    id="theme-rate"
                    type="number"
                    min={1}
                    max={30}
                    step={0.5}
                    value={rate}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (!isNaN(v)) setRate(v);
                    }}
                    aria-label="Expected Return Rate"
                  />
                  <span className="pill-percent">%</span>
                </div>
              </div>

              <div className="slider-wrapper">
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={0.5}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="theme-range-slider"
                />
                <div className="slider-limits">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>
            </div>

            {/* Input 3: Time Period */}
            <div className="theme-input-group">
              <div className="input-label-row">
                <label htmlFor="theme-years">TIME PERIOD</label>
                <div className="input-value-pill">
                  <input
                    id="theme-years"
                    type="number"
                    min={1}
                    max={40}
                    step={1}
                    value={years}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (!isNaN(v)) setYears(Math.max(1, Math.min(40, v)));
                    }}
                    aria-label="Time Period"
                  />
                  <span className="pill-years">{years === 1 ? "Year" : "Years"}</span>
                </div>
              </div>

              <div className="slider-wrapper">
                <input
                  type="range"
                  min={1}
                  max={40}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="theme-range-slider"
                />
                <div className="slider-limits">
                  <span>1 Year</span>
                  <span>40 Years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info callout */}
          <div className="theme-calc-tip-box">
            <span className="tip-bulb">💡</span>
            <p>
              Systematic discipline and regular contributions help counter inflation while working toward
              your long-term milestones.
            </p>
          </div>
        </div>

        {/* Right: 3 Stacked Cards */}
        <div className="theme-calc-metrics-stack">
          {/* Card 1: Maturity Value (Dark Card) */}
          <div className="metric-card dark-maturity-card">
            <div className="metric-top-label">
              <TrendingUp size={15} className="metric-icon" />
              <span>MATURITY VALUE</span>
            </div>
            <div className="metric-huge-number text-neon-green">
              {formatCompactInr(totalMaturity)}
            </div>
            <div className="metric-sub-label">Terminal estimated outcome</div>
          </div>

          {/* Card 2: Principal Invested (White Card) */}
          <div className="metric-card light-metric-card">
            <div className="metric-top-label text-slate-500">
              <span className="metric-symbol">₹</span>
              <span>PRINCIPAL INVESTED</span>
            </div>
            <div className="metric-huge-number text-slate-900">
              {formatCompactInr(totalInvested)}
            </div>
            <div className="metric-sub-label">Baseline Financial Requirement</div>
          </div>

          {/* Card 3: Estimated Gain (White Card) */}
          <div className="metric-card light-metric-card">
            <div className="metric-top-label text-slate-500">
              <Sparkles size={14} className="text-emerald-500" />
              <span>ESTIMATED GAIN</span>
            </div>
            <div className="metric-huge-number text-emerald-600">
              {formatCompactInr(capitalGains)}
            </div>
            <div className="metric-sub-label">Compounded growth or financial benefit</div>
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
            {progression.map((row) => (
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
                  <span className="donut-center-sub">GAIN RATIO</span>
                  <span className="donut-center-main">{gainsPercent}%</span>
                </div>
              </div>

              <div className="donut-legend-row">
                <div className="legend-entry">
                  <span className="legend-color-dot dot-principal" />
                  <span>Initial Investment</span>
                </div>
                <div className="legend-entry">
                  <span className="legend-color-dot dot-gains" />
                  <span>Compounded Gain</span>
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
              <li>
                <CheckCircle2 size={14} className="check-icon" />
                <span>PATIENT LONG-TERM CAPITAL COMPOUNDING</span>
              </li>
              <li>
                <CheckCircle2 size={14} className="check-icon" />
                <span>AVOIDING TIMING THE STOCK MARKET</span>
              </li>
              <li>
                <CheckCircle2 size={14} className="check-icon" />
                <span>DIVERSIFIED EQUITY FUND ALLOCATION</span>
              </li>
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
