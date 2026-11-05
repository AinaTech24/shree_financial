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

          <div className="table-responsive-wrapper">
            <table className="clean-compliance-table">
              <thead>
                <tr>
                  <th style={{ width: "80px", textAlign: "center" }}>Sr. No</th>
                  <th>Scheme Category</th>
                  <th style={{ width: "160px" }}>Asset Class</th>
                  <th style={{ width: "220px", textAlign: "center" }}>Trail 1st Year</th>
                  <th style={{ width: "240px", textAlign: "center" }}>Trail 2nd Year Onwards</th>
                </tr>
              </thead>
              <tbody>
                {SCHEME_TRAIL_RANGES.map((row, idx) => (
                  <tr key={row.schemeType}>
                    <td style={{ textAlign: "center", fontWeight: 700, color: "#64748b" }}>
                      {idx + 1}
                    </td>
                    <td>
                      <strong className="text-slate-900">{row.schemeType}</strong>
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

          {/* Distributor Regulatory Credentials */}
          <div className="distributor-credentials-card mt-10">
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheck size={18} className="text-indigo-600" />
              Distributor Registration Details
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-700">
              <div>
                <strong>Entity Name:</strong> Shah Financial Services
              </div>
              <div>
                <strong>AMFI ARN:</strong> ARN-173086 (Valid till: 11/11/2029)
              </div>
              <div>
                <strong>APMI PMS APRN:</strong> APRN-04142 (Valid till: 29/06/2029)
              </div>
            </div>
          </div>

          {/* Regulatory Note */}
          <div className="compliance-disclaimer-box mt-6">
            <div className="flex items-start gap-3">
              <Info size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600 leading-relaxed">
                <strong>Important Disclosure:</strong> Commissions are paid on a trailing basis by the Asset Management Companies (AMCs) from the scheme's Total Expense Ratio (TER). Trail commissions are subject to clawback, T30/B30 regulatory changes, and periodic AMC rate revisions. Shah Financial Services does not charge any upfront or advisory fees from investors.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

