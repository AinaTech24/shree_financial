"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import { Sparkles, TrendingUp, ShieldCheck, ArrowRight, Calculator as CalcIcon, RefreshCw } from "lucide-react";
import { SIP_NOTE } from "@/content/site";

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

export default function ModernCalculator({ initialMode = "lumpsum", showModeSwitcher = true }: ModernCalculatorProps) {
  const [mode, setMode] = useState<CalcMode>(initialMode);

  // Lumpsum defaults
  const [lumpAmount, setLumpAmount] = useState<number>(500000);
  const [lumpRate, setLumpRate] = useState<number>(12);
  const [lumpYears, setLumpYears] = useState<number>(10);

  // SIP defaults
  const [sipAmount, setSipAmount] = useState<number>(10000);
  const [sipRate, setSipRate] = useState<number>(12);
  const [sipYears, setSipYears] = useState<number>(10);

  const isLump = mode === "lumpsum";
  const amount = isLump ? lumpAmount : sipAmount;
  const setAmount = isLump ? setLumpAmount : setSipAmount;

  const rate = isLump ? lumpRate : sipRate;
  const setRate = isLump ? setLumpRate : setSipRate;

  const years = isLump ? lumpYears : sipYears;
  const setYears = isLump ? setLumpYears : setSipYears;

  // Calculation formulas
  let totalMaturity = 0;
  let totalInvested = 0;
  let capitalGains = 0;

  if (isLump) {
    totalInvested = amount;
    totalMaturity = amount * Math.pow(1 + rate / 100, years);
    capitalGains = Math.max(0, totalMaturity - totalInvested);
  } else {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    totalInvested = amount * months;
    if (monthlyRate > 0) {
      totalMaturity = amount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    } else {
      totalMaturity = totalInvested;
    }
    capitalGains = Math.max(0, totalMaturity - totalInvested);
  }

  const multiple = totalInvested > 0 ? (totalMaturity / totalInvested).toFixed(2) : "1.00";
  const principalPercent = totalMaturity > 0 ? Math.round((totalInvested / totalMaturity) * 100) : 100;
  const gainsPercent = Math.max(0, 100 - principalPercent);

  // Rule of 72 stats
  const doublingYears = rate > 0 ? (72 / rate).toFixed(1) : "0";

  // Yearly progression breakdown
  const progression = [];
  for (let y = 1; y <= years; y++) {
    if (isLump) {
      const val = amount * Math.pow(1 + rate / 100, y);
      const gain = val - amount;
      progression.push({
        year: y,
        invested: amount,
        gains: Math.round(gain),
        total: Math.round(val),
      });
    } else {
      const m = y * 12;
      const inv = amount * m;
      const r = rate / 12 / 100;
      const val = r > 0 ? amount * ((Math.pow(1 + r, m) - 1) / r) * (1 + r) : inv;
      const gain = val - inv;
      progression.push({
        year: y,
        invested: inv,
        gains: Math.round(gain),
        total: Math.round(val),
      });
    }
  }

  return (
    <div className="modern-calc-wrap">
      {/* Top Badge & Header */}
      <div className="calc-header-block">
        <div className="calc-badge">
          <span className="calc-badge-icon">
            <TrendingUp size={14} />
          </span>
          <span>{isLump ? "ONE-TIME CAPITAL COMPOUNDING" : "MONTHLY WEALTH COMPOUNDING"}</span>
        </div>

        <h2 className="calc-main-title">
          <span>{isLump ? "Lumpsum" : "SIP"}</span> <span className="highlight">Calculator</span>
        </h2>

        <p className="calc-subtitle">
          {isLump
            ? "Calculate how a single one-time capital investment expands over multi-year horizons via uninterrupted compounding growth."
            : "Calculate how disciplined monthly contributions compound into a substantial wealth corpus through market cycles."}
        </p>

        {showModeSwitcher && (
          <div className="calc-switcher">
            <button
              type="button"
              className={`switcher-tab ${isLump ? "active" : ""}`}
              onClick={() => setMode("lumpsum")}
            >
              Lumpsum Calculator
            </button>
            <button
              type="button"
              className={`switcher-tab ${!isLump ? "active" : ""}`}
              onClick={() => setMode("sip")}
            >
              SIP Calculator
            </button>
          </div>
        )}
      </div>

      {/* Main 2-column Grid */}
      <div className="calc-body-grid">
        {/* Left Column: Sliders & Pills */}
        <div className="calc-card calc-inputs-card">
          {/* Amount input */}
          <div className="calc-fld-group">
            <div className="fld-header">
              <label htmlFor="inv-amount">
                {isLump ? "One-Time Investment Amount" : "Monthly Investment Amount"}
              </label>
              <div className="fld-input-box">
                <span className="fld-prefix">₹</span>
                <input
                  id="inv-amount"
                  type="number"
                  min={isLump ? 5000 : 500}
                  max={isLump ? 10000000 : 1000000}
                  step={isLump ? 10000 : 1000}
                  value={amount}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (!isNaN(v)) setAmount(v);
                  }}
                  aria-label="Investment Amount"
                />
              </div>
            </div>

            <div className="fld-slider-wrap">
              <input
                type="range"
                min={isLump ? 10000 : 500}
                max={isLump ? 10000000 : 200000}
                step={isLump ? 10000 : 500}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="custom-range"
              />
              <div className="range-ticks">
                <span>{isLump ? "₹10,000" : "₹500"}</span>
                <span>{isLump ? "₹50 Lakhs" : "₹1 Lakh"}</span>
                <span>{isLump ? "₹1 Crore" : "₹2 Lakhs"}</span>
              </div>
            </div>

            <div className="quick-pills">
              {isLump
                ? [100000, 500000, 1000000, 2500000].map((v) => (
                    <button
                      key={v}
                      type="button"
                      className={`quick-pill ${amount === v ? "active" : ""}`}
                      onClick={() => setAmount(v)}
                    >
                      {formatCompactInr(v)}
                    </button>
                  ))
                : [2000, 5000, 10000, 25000].map((v) => (
                    <button
                      key={v}
                      type="button"
                      className={`quick-pill ${amount === v ? "active" : ""}`}
                      onClick={() => setAmount(v)}
                    >
                      {formatInr(v)} / mo
                    </button>
                  ))}
            </div>
          </div>

          {/* Expected Return input */}
          <div className="calc-fld-group">
            <div className="fld-header">
              <label htmlFor="cagr-rate">Expected Annual Return (CAGR)</label>
              <div className="fld-input-box">
                <input
                  id="cagr-rate"
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
                <span className="fld-suffix">%</span>
              </div>
            </div>

            <div className="fld-slider-wrap">
              <input
                type="range"
                min={1}
                max={30}
                step={0.5}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="custom-range"
              />
              <div className="range-ticks">
                <span>8% (Fixed income)</span>
                <span>13% (Equity average)</span>
                <span>30%</span>
              </div>
            </div>

            <div className="quick-pills">
              {[10, 12, 14, 16].map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`quick-pill ${rate === r ? "active" : ""}`}
                  onClick={() => setRate(r)}
                >
                  {r}% p.a.
                </button>
              ))}
            </div>
          </div>

          {/* Investment Horizon input */}
          <div className="calc-fld-group">
            <div className="fld-header">
              <label htmlFor="inv-horizon">Investment Horizon (Years)</label>
              <div className="fld-input-box">
                <input
                  id="inv-horizon"
                  type="number"
                  min={1}
                  max={30}
                  step={1}
                  value={years}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (!isNaN(v)) setYears(Math.max(1, Math.min(35, v)));
                  }}
                  aria-label="Investment Horizon"
                />
                <span className="fld-suffix">Yrs</span>
              </div>
            </div>

            <div className="fld-slider-wrap">
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="custom-range"
              />
              <div className="range-ticks">
                <span>1 Year</span>
                <span>15 Years</span>
                <span>30 Years</span>
              </div>
            </div>

            <div className="quick-pills">
              {[3, 5, 10, 15].map((y) => (
                <button
                  key={y}
                  type="button"
                  className={`quick-pill ${years === y ? "active" : ""}`}
                  onClick={() => setYears(y)}
                >
                  {y} Years
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Dark Summary Card + Benchmark Card */}
        <div className="calc-summary-column">
          {/* Dark Navy Result Card */}
          <div className="calc-dark-card">
            <div className="dark-card-eyebrow">TOTAL MATURITY VALUE</div>
            <div className="dark-card-number">{formatCompactInr(totalMaturity)}</div>
            <div className="dark-card-raw">({formatInr(totalMaturity)})</div>

            <div className="dark-card-divider" />

            <div className="dark-card-split-stats">
              <div className="split-stat">
                <span className="stat-label">{isLump ? "Initial Capital" : "Total Invested"}</span>
                <span className="stat-val">{formatCompactInr(totalInvested)}</span>
              </div>
              <div className="split-stat">
                <span className="stat-label">Est. Capital Gain</span>
                <span className="stat-val gain-green">+{formatCompactInr(capitalGains)}</span>
              </div>
            </div>

            <div className="growth-multiple-row">
              <span>Capital Growth Multiple:</span>
              <strong className="multiple-badge">{multiple}x</strong>
            </div>

            {/* Split Progress Bar */}
            <div className="split-progress-container">
              <div
                className="split-progress-principal"
                style={{ width: `${principalPercent}%` }}
                title={`Principal: ${principalPercent}%`}
              />
              <div
                className="split-progress-gains"
                style={{ width: `${gainsPercent}%` }}
                title={`Gains: ${gainsPercent}%`}
              />
            </div>
            <div className="split-progress-legend">
              <span className="legend-item">
                <i className="legend-dot principal" /> Principal ({principalPercent}%)
              </span>
              <span className="legend-item">
                <i className="legend-dot gains" /> Gains ({gainsPercent}%)
              </span>
            </div>
          </div>

          {/* Light Benchmark Card (Rule of 72) */}
          <div className="calc-benchmark-card">
            <div className="benchmark-badge">
              <Sparkles size={14} className="spark-icon" />
              <span>THE RULE OF 72 BENCHMARK</span>
            </div>

            <h4 className="benchmark-title">How Fast Your Capital Doubles</h4>

            <p className="benchmark-desc">
              {isLump ? (
                <>
                  At <strong>{rate}% CAGR</strong>, by the Rule of 72 (72 / {rate}), your capital doubles approximately every{" "}
                  <strong>{doublingYears} years</strong>. Over {years} years, your money will multiply by{" "}
                  <strong>{multiple} times</strong>!
                </>
              ) : (
                <>
                  With disciplined SIP investing at <strong>{rate}% CAGR</strong> over {years} years, your money multiplies by{" "}
                  <strong>{multiple} times</strong>, generating <strong>+{formatCompactInr(capitalGains)}</strong> in pure compounded gains!
                </>
              )}
            </p>

            <div className="benchmark-mini-table">
              <div className="mini-row">
                <span>Starting Capital</span>
                <strong>{formatCompactInr(totalInvested)}</strong>
              </div>
              <div className="mini-row">
                <span>Estimated Compounded Gains</span>
                <strong className="gain-green">+{formatCompactInr(capitalGains)}</strong>
              </div>
              <div className="mini-row final">
                <span>Final Portfolio Value</span>
                <strong>{formatCompactInr(totalMaturity)}</strong>
              </div>
            </div>

            <Link href="/contact" className="benchmark-action-btn">
              <span>Inquire for {isLump ? "Lumpsum" : "SIP"} Investment</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Card: Yearly Capital Growth Progression Table */}
      <div className="calc-card progression-card">
        <div className="progression-header">
          <h3 className="progression-title">Yearly Capital Growth Progression</h3>
          <p className="progression-sub">
            Track the compounding progression on your {formatCompactInr(totalInvested)} investment across {years} years.
          </p>
        </div>

        <div className="progression-table-wrap">
          <table className="progression-table">
            <thead>
              <tr>
                <th>YEAR</th>
                <th>{isLump ? "INITIAL PRINCIPAL" : "CUMULATIVE INVESTED"}</th>
                <th>CUMULATIVE GAINS</th>
                <th>TOTAL PORTFOLIO VALUE</th>
              </tr>
            </thead>
            <tbody>
              {progression.map((row) => (
                <tr key={row.year}>
                  <td className="year-cell">Year {row.year}</td>
                  <td>{formatInr(row.invested)}</td>
                  <td className="gain-cell">+{formatInr(row.gains)}</td>
                  <td className="total-cell">{formatInr(row.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="calc-compliance-note">{SIP_NOTE}</p>
    </div>
  );
}

