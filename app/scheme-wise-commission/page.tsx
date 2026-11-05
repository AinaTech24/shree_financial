"use client";

import React, { useState, useMemo, useEffect } from "react";
import PageHero from "@/components/PageHero";
import { AMC_DISCLOSURES, AmcPdf } from "@/content/amcs";
import { Eye, ExternalLink, Download, FileText, Search, ShieldCheck, X } from "lucide-react";

export default function SchemeWiseCommissionTablePage() {
  const [search, setSearch] = useState("");
  const [activePdf, setActivePdf] = useState<AmcPdf | null>(null);

  // Filter only Mutual Fund disclosures and match search term
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

  const totalMfCount = useMemo(
    () => AMC_DISCLOSURES.filter((item) => item.category === "Mutual Fund").length,
    []
  );

  // Lock body scroll when modal is active, and listen to Escape key
  useEffect(() => {
    if (activePdf) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setActivePdf(null);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activePdf]);

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
            <h2>Mutual Fund Disclosures</h2>
            <p>
              Review official brokerage and trail commission structures for each individual Asset Management Company (AMC).
            </p>
          </div>

          {/* Search and Filter Count Bar */}
          <div className="disclosure-filter-bar">
            <div className="search-input-wrap">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search AMC (e.g. HDFC, SBI, ICICI, Nippon, Axis...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
                aria-label="Search Asset Management Companies"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="clear-btn"
                  aria-label="Clear search input"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <div className="filter-count">
              Showing <strong>{mfDisclosures.length}</strong> of <strong>{totalMfCount}</strong> AMC Disclosures
            </div>
          </div>

          {/* Desktop Table View (>= 768px) */}
          <div className="table-responsive-wrapper table-desktop-view">
            <table className="clean-compliance-table">
              <thead>
                <tr>
                  <th style={{ width: "70px", textAlign: "center" }}>Sr. No</th>
                  <th>AMC Name</th>
                  <th style={{ width: "200px" }}>Disclosure Period</th>
                  <th style={{ width: "170px", textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {mfDisclosures.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="empty-search-td">
                      No AMCs found matching &quot;{search}&quot;. Please try a different search keyword.
                    </td>
                  </tr>
                ) : (
                  mfDisclosures.map((amc, idx) => (
                    <tr key={amc.code}>
                      <td style={{ textAlign: "center", fontWeight: 700, color: "#64748b" }}>
                        {idx + 1}
                      </td>
                      <td>
                        <div className="amc-name-cell">
                          <div className="amc-icon-badge">
                            <FileText size={16} />
                          </div>
                          <div className="amc-name-text">
                            <strong>{amc.name}</strong>
                            <span className="amc-code-badge">{amc.code}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: "#475569", fontSize: "14px" }}>
                        {amc.period}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <div className="table-actions-group">
                          <button
                            type="button"
                            onClick={() => setActivePdf(amc)}
                            className="btn-show-pdf"
                            title="View PDF directly in popup window"
                          >
                            <Eye size={14} />
                            <span>Show</span>
                          </button>
                          <a
                            href={`/AMCs/${encodeURIComponent(amc.fileName)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-view-tab"
                            title="Open PDF directly in new browser tab"
                          >
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View (< 768px) - 100% visible, no horizontal cutoff */}
          <div className="amc-mobile-card-list table-mobile-cards-view">
            {mfDisclosures.length === 0 ? (
              <div className="empty-search-card">
                No AMCs found matching &quot;{search}&quot;. Please try a different search keyword.
              </div>
            ) : (
              mfDisclosures.map((amc, idx) => (
                <div key={amc.code} className="amc-mobile-card">
                  <div className="amc-mobile-card-top">
                    <span className="amc-mobile-sr">#{idx + 1}</span>
                    <div className="amc-mobile-info">
                      <h4 className="amc-mobile-title">{amc.name}</h4>
                      <span className="amc-code-badge">{amc.code}</span>
                    </div>
                  </div>

                  <div className="amc-mobile-meta">
                    <span className="amc-meta-label">Brokerage Schedule:</span>
                    <span className="amc-meta-value">{amc.period}</span>
                  </div>

                  <div className="amc-mobile-actions">
                    <button
                      type="button"
                      onClick={() => setActivePdf(amc)}
                      className="btn-mobile-show"
                    >
                      <Eye size={15} />
                      <span>Show PDF</span>
                    </button>
                    <a
                      href={`/AMCs/${encodeURIComponent(amc.fileName)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-mobile-tab"
                    >
                      <ExternalLink size={14} />
                      <span>Open in Tab</span>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Statutory Note */}
          <div className="compliance-disclaimer-box" style={{ marginTop: "32px" }}>
            <div className="statutory-content-row">
              <ShieldCheck size={22} className="statutory-shield-icon" />
              <div className="statutory-text">
                <strong>Statutory Note on Commission:</strong> As per SEBI regulations, all trail commissions are embedded in the Base Expense Ratio (BER) of the regular plan of respective schemes and are paid directly by the AMCs. No separate distribution fee or charge is levied on investors by Shah Financial Services (ARN-173086).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Popup Modal Dialog */}
      {activePdf && (
        <div
          className="pdf-modal-backdrop"
          onClick={() => setActivePdf(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-amc-title"
        >
          <div
            className="pdf-modal-window"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="pdf-modal-header">
              <div className="modal-title-wrap">
                <div className="modal-amc-icon">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="modal-title-row">
                    <h3 id="modal-amc-title" className="modal-amc-title">
                      {activePdf.name}
                    </h3>
                    <span className="modal-code-badge">{activePdf.code}</span>
                  </div>
                  <p className="modal-doc-meta">
                    Brokerage Structure — {activePdf.period}
                  </p>
                </div>
              </div>

              <div className="modal-action-buttons">
                <a
                  href={`/AMCs/${encodeURIComponent(activePdf.fileName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-action-btn primary"
                  title="Open PDF in a new tab"
                >
                  <ExternalLink size={14} />
                  <span>Open in Tab</span>
                </a>
                <a
                  href={`/AMCs/${encodeURIComponent(activePdf.fileName)}`}
                  download
                  className="modal-action-btn secondary"
                  title="Download PDF file"
                >
                  <Download size={14} />
                  <span className="desktop-only">Download</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActivePdf(null)}
                  className="modal-close-btn"
                  aria-label="Close PDF Viewer"
                  title="Close (Esc)"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Mobile Browser Helper Banner */}
            <div className="pdf-modal-mobile-banner">
              <span>
                📱 Viewing on mobile? For full resolution, tap{" "}
                <a
                  href={`/AMCs/${encodeURIComponent(activePdf.fileName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Tab ↗
                </a>
              </span>
            </div>

            {/* Modal Body: PDF Embed */}
            <div className="pdf-modal-body">
              <iframe
                src={`/AMCs/${encodeURIComponent(activePdf.fileName)}#toolbar=1`}
                title={`${activePdf.name} Commission Structure`}
                className="pdf-object-frame"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
