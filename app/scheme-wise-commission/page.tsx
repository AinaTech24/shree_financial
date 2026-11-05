"use client";

import React, { useState, useMemo } from "react";
import PageHero from "@/components/PageHero";
import { AMC_DISCLOSURES, AmcPdf } from "@/content/amcs";
import { Eye, ExternalLink, FileText, Search, ShieldCheck, X } from "lucide-react";

export default function SchemeWiseCommissionTablePage() {
  const [search, setSearch] = useState("");
  const [activePdf, setActivePdf] = useState<AmcPdf | null>(null);

  const mfDisclosures = useMemo(() => {
    const list = AMC_DISCLOSURES.filter((item) => item.category === "Mutual Fund");
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <>
      <PageHero
        title="Scheme-Wise Commission Disclosure"
        sub="In accordance with SEBI circulars and AMFI regulations, below is the schedule of trail commissions across all registered AMCs."
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
              Review official brokerage and trail commission structures for each individual Asset Management Company (AMC).
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6 max-w-md">
            <div className="relative flex items-center">
              <Search size={16} className="absolute left-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search AMC (e.g. HDFC, SBI, ICICI, Nippon...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 text-xs font-semibold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="table-responsive-wrapper">
            <table className="clean-compliance-table">
              <thead>
                <tr>
                  <th style={{ width: "80px", textAlign: "center" }}>Sr. No</th>
                  <th>AMC Name</th>
                  <th style={{ width: "220px" }}>Disclosure Period</th>
                  <th style={{ width: "180px", textAlign: "center" }}>Action</th>
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
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setActivePdf(amc)}
                          className="btn-show-pdf"
                          title="View PDF directly in page"
                        >
                          <Eye size={14} />
                          <span>Show</span>
                        </button>
                        <a
                          href={`/AMCs/${encodeURIComponent(amc.fileName)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-view-tab"
                          title="Open PDF in new tab"
                        >
                          <ExternalLink size={13} />
                        </a>
                      </div>
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

      {/* PDF Modal Viewer (Opens directly on screen without downloading) */}
      {activePdf && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm"
          onClick={() => setActivePdf(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-indigo-600" />
                <div>
                  <h3 className="font-bold text-slate-900 text-base leading-tight">
                    {activePdf.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Brokerage Structure — {activePdf.period}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`/AMCs/${encodeURIComponent(activePdf.fileName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100"
                >
                  <ExternalLink size={13} />
                  <span>Open in Tab</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActivePdf(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                  aria-label="Close PDF Viewer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body: PDF Embed */}
            <div className="flex-1 w-full h-full bg-slate-100 relative">
              <iframe
                src={`/AMCs/${encodeURIComponent(activePdf.fileName)}#toolbar=1`}
                title={`${activePdf.name} Commission Structure`}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
