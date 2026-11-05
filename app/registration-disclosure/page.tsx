import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { ShieldCheck, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Registration & Commission Disclosure | Shah Financial Services",
  description:
    "Indicative Trail Commission Range Across Scheme Categories (p.a.) as per AMFI/SEBI regulatory distribution guidelines.",
};

interface SchemeTrail {
  schemeType: string;
  category: string;
  trailYear1: string;
  trailYear2Onwards: string;
}

const SCHEME_TRAIL_RANGES: SchemeTrail[] = [
  { schemeType: "Arbitrage", category: "Hybrid", trailYear1: "0.40% - 0.75%", trailYear2Onwards: "0.40% - 0.75%" },
  { schemeType: "ELSS (Tax Saving)", category: "Equity", trailYear1: "0.75% - 1.25%", trailYear2Onwards: "0.75% - 1.25%" },
  { schemeType: "Equity Oriented (Large, Mid, Small, Flexi Cap)", category: "Equity", trailYear1: "0.70% - 1.35%", trailYear2Onwards: "0.70% - 1.35%" },
  { schemeType: "Aggressive Hybrid", category: "Hybrid", trailYear1: "0.65% - 1.15%", trailYear2Onwards: "0.65% - 1.15%" },
  { schemeType: "Fixed Maturity Plans (FMP)", category: "Debt", trailYear1: "0.10% - 0.40%", trailYear2Onwards: "0.10% - 0.40%" },
  { schemeType: "Fund of Funds (FoF)", category: "Other", trailYear1: "0.30% - 0.80%", trailYear2Onwards: "0.30% - 0.80%" },
  { schemeType: "Gilt Schemes", category: "Debt", trailYear1: "0.20% - 0.50%", trailYear2Onwards: "0.20% - 0.50%" },
  { schemeType: "Hybrid Debt Oriented", category: "Hybrid", trailYear1: "0.40% - 0.85%", trailYear2Onwards: "0.40% - 0.85%" },
  { schemeType: "Income Schemes", category: "Debt", trailYear1: "0.30% - 0.75%", trailYear2Onwards: "0.30% - 0.75%" },
  { schemeType: "Index Funds / ETFs", category: "Passive", trailYear1: "0.10% - 0.40%", trailYear2Onwards: "0.10% - 0.40%" },
  { schemeType: "Liquid / Ultra Short Term", category: "Liquid", trailYear1: "0.05% - 0.15%", trailYear2Onwards: "0.05% - 0.15%" },
  { schemeType: "Short-Term Income", category: "Debt", trailYear1: "0.25% - 0.60%", trailYear2Onwards: "0.25% - 0.60%" },
  { schemeType: "Thematic / Sectoral", category: "Equity", trailYear1: "0.75% - 1.40%", trailYear2Onwards: "0.75% - 1.40%" },
];

export default function RegistrationDisclosurePage() {
  return (
    <>
      <PageHero
        title="Registration & Commission Disclosure"
        sub="Full transparency on indicative trail commission ranges across scheme categories distributed by Shah Financial Services."
        trail={[
          { label: "Home", href: "/" },
          { label: "Compliance", href: "/disclaimer" },
        ]}
      />

      <section className="section white">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Regulatory Compliance</span>
            <h2>Indicative Trail Commission Range Across Scheme Categories (p.a.)</h2>
            <p>
              In accordance with SEBI Circular No. SEBI/HO/IMD/DF2/CIR/P/2018/137 and AMFI guidelines, below are the indicative trail commission ranges across 13 major scheme categories:
            </p>
          </div>

          {/* Desktop Table View (>= 768px) */}
          <div className="table-responsive-wrapper table-desktop-view">
            <table className="clean-compliance-table">
              <thead>
                <tr>
                  <th style={{ width: "70px", textAlign: "center" }}>Sr. No</th>
                  <th>Scheme Category</th>
                  <th style={{ width: "150px" }}>Asset Class</th>
                  <th style={{ width: "190px", textAlign: "center" }}>Trail 1st Year</th>
                  <th style={{ width: "210px", textAlign: "center" }}>Trail 2nd Year Onwards</th>
                </tr>
              </thead>
              <tbody>
                {SCHEME_TRAIL_RANGES.map((row, idx) => (
                  <tr key={row.schemeType}>
                    <td style={{ textAlign: "center", fontWeight: 700, color: "#64748b" }}>
                      {idx + 1}
                    </td>
                    <td>
                      <strong style={{ color: "#0f172a" }}>{row.schemeType}</strong>
                    </td>
                    <td>
                      <span className="amc-code-badge">{row.category}</span>
                    </td>
                    <td style={{ textAlign: "center", fontWeight: 700, color: "#2563eb" }}>
                      {row.trailYear1}
                    </td>
                    <td style={{ textAlign: "center", fontWeight: 700, color: "#059669" }}>
                      {row.trailYear2Onwards}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View (< 768px) - 100% responsive, no horizontal cutoff */}
          <div className="scheme-trail-mobile-cards table-mobile-cards-view">
            {SCHEME_TRAIL_RANGES.map((row, idx) => (
              <div key={row.schemeType} className="scheme-trail-card">
                <div className="scheme-card-top">
                  <div className="scheme-sr-pill">#{idx + 1}</div>
                  <div className="scheme-info-stack">
                    <h4 className="scheme-name">{row.schemeType}</h4>
                    <span className="scheme-asset-badge">{row.category}</span>
                  </div>
                </div>

                <div className="scheme-rates-grid">
                  <div className="rate-box year1">
                    <span className="rate-label">Trail 1st Year</span>
                    <strong className="rate-val">{row.trailYear1}</strong>
                  </div>
                  <div className="rate-box year2">
                    <span className="rate-label">Trail 2nd Year Onwards</span>
                    <strong className="rate-val">{row.trailYear2Onwards}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Distributor Regulatory Credentials */}
          <div className="distributor-credentials-card" style={{ marginTop: "32px" }}>
            <h4 className="distributor-creds-title">
              <ShieldCheck size={20} className="text-indigo-600" />
              <span>Distributor Registration Details</span>
            </h4>
            <div className="distributor-creds-grid">
              <div className="cred-item">
                <span className="cred-label">Entity Name</span>
                <strong className="cred-val">Shah Financial Services</strong>
              </div>
              <div className="cred-item">
                <span className="cred-label">AMFI ARN</span>
                <strong className="cred-val">ARN-173086</strong>
                <small className="cred-sub">Valid till: 11/11/2029</small>
              </div>
              <div className="cred-item">
                <span className="cred-label">APMI PMS APRN</span>
                <strong className="cred-val">APRN-04142</strong>
                <small className="cred-sub">Valid till: 29/06/2029</small>
              </div>
            </div>
          </div>

          {/* Regulatory Note */}
          <div className="compliance-disclaimer-box" style={{ marginTop: "24px" }}>
            <div className="statutory-content-row">
              <Info size={20} className="statutory-info-icon" />
              <div className="statutory-text">
                <strong>Important Disclosure:</strong> Commissions are paid on a trailing basis by the Asset Management Companies (AMCs) from the scheme&apos;s Total Expense Ratio (TER). Trail commissions are subject to clawback, T30/B30 regulatory changes, and periodic AMC rate revisions. Shah Financial Services does not charge any upfront or  fees from investors.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
