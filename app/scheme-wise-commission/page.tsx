import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { AMC_DISCLOSURES } from "@/content/amcs";
import { Download, FileText, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Scheme-Wise Commission Disclosure | Shah Financial Services",
  description:
    "Review brokerage and trail commission structure disclosures across registered Asset Management Companies (AMCs) distributed by Shah Financial Services.",
};

export default function SchemeWiseCommissionTablePage() {
  const mfDisclosures = AMC_DISCLOSURES.filter((item) => item.category === "Mutual Fund");

  return (
    <>
      <PageHero
        title="Scheme-Wise Commission Disclosure"
        sub="In accordance with SEBI circulars and AMFI regulations, below is the schedule of commissions received across all registered AMCs."
        trail={[
          { label: "Home", href: "/" },
          { label: "Compliance & Regulatory", href: "/disclaimer" },
        ]}
      />

      <section className="section white">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Regulatory Transparency</span>
            <h2>Mutual Fund</h2>
            <p>
              Download official brokerage and trail commission structures for each individual Asset Management Company (AMC).
            </p>
          </div>

          <div className="table-responsive-wrapper">
            <table className="clean-compliance-table">
              <thead>
                <tr>
                  <th style={{ width: "90px", textAlign: "center" }}>Sr. No</th>
                  <th>AMC Name</th>
                  <th style={{ width: "220px" }}>Disclosure Period</th>
                  <th style={{ width: "160px", textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {mfDisclosures.map((amc, idx) => (
                  <tr key={amc.code}>
                    <td style={{ textAlign: "center", fontWeight: 700, color: "#64748b" }}>
                      {idx + 1}
                    </td>
                    <td>
                      <div className="amc-name-cell">
                        <FileText size={18} className="text-indigo-600 flex-shrink-0" />
                        <div>
                          <strong>{amc.name}</strong>
                          <span className="amc-code-badge">{amc.code}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: "#475569", fontSize: "14px" }}>
                      {amc.period}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <a
                        href={`/AMCs/${encodeURIComponent(amc.fileName)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="btn-download-pdf"
                      >
                        <Download size={14} />
                        <span>Download</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Statutory Note */}
          <div className="compliance-disclaimer-box mt-10">
            <div className="flex items-start gap-3">
              <ShieldCheck size={20} className="text-emerald-600 flex-shrink-0 mt-1" />
              <div className="text-xs text-slate-600 leading-relaxed">
                <strong>Statutory Note on Commission:</strong> As per SEBI regulations, all trail commissions are embedded in the Base Expense Ratio (BER) of the regular plan of respective schemes and are paid directly by the AMCs. No separate distribution fee or advisory charge is levied on investors by Shah Financial Services (ARN-173086).
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

