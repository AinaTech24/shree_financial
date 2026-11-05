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

          {/* Clean Responsive Compliance Table */}
          <div className="table-responsive-wrapper">
            <div className="mobile-table-scroll-hint">
              <span>← Swipe horizontally to view full rate columns →</span>
            </div>
            <table className="clean-compliance-table reg-disclosure-table">
              <thead>
                <tr>
                  <th className="col-sr">Sr. No</th>
                  <th className="col-scheme">Scheme Category</th>
                  <th className="col-asset">Asset Class</th>
                  <th className="col-rate-y1">Trail 1st Year</th>
                  <th className="col-rate-y2">Trail 2nd Year Onwards</th>
                </tr>
              </thead>
              <tbody>
                {SCHEME_TRAIL_RANGES.map((row, idx) => (
                  <tr key={row.schemeType}>
                    <td className="cell-sr">
                      {idx + 1}
                    </td>
                    <td className="cell-scheme">
                      <strong>{row.schemeType}</strong>
                    </td>
                    <td className="cell-asset">
                      <span className="amc-code-badge">{row.category}</span>
                    </td>
                    <td className="cell-rate y1">
                      {row.trailYear1}
                    </td>
                    <td className="cell-rate y2">
                      {row.trailYear2Onwards}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                <strong>Important Disclosure:</strong> Commissions are paid on a trailing basis by the Asset Management Companies (AMCs) from the scheme&apos;s Total Expense Ratio (TER). Trail commissions are subject to clawback, T30/B30 regulatory changes, and periodic AMC rate revisions. Shah Financial Services does not charge any upfront or advisory fees from investors.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
