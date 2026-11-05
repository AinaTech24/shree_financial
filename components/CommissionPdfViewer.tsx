"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  FileText,
  Search,
  Eye,
  ExternalLink,
  Download,
  X,
  Shield,
  CheckCircle2,
} from "lucide-react";

import { AMC_DISCLOSURES, AmcPdf } from "@/content/amcs";
export { AMC_DISCLOSURES };
export type { AmcPdf };

export default function CommissionPdfViewer() {
  const [search, setSearch] = useState("");
  const [activePdf, setActivePdf] = useState<AmcPdf | null>(null);

  const filteredPdfs = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return AMC_DISCLOSURES;
    return AMC_DISCLOSURES.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q)
    );
  }, [search]);

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
    <div className="pdf-disclosure-container">
      {/* Top Banner */}
      <div className="disclosure-banner-card">
        <div className="banner-icon-col">
          <Shield size={32} className="text-amber-500" />
        </div>
        <div className="banner-content-col">
          <h3>SEBI &amp; AMFI Regulatory Commission Disclosure</h3>
          <p>
            In accordance with SEBI Circulars and AMFI Code of Conduct, <strong>Shah Financial Services</strong> (ARN-173086)
            discloses all brokerage and trail commission structures received from Asset Management Companies for mutual fund
            and PMS distribution.
          </p>
          <div className="banner-tags">
            <span className="banner-tag"><CheckCircle2 size={14} /> AMFI Code Compliant</span>
            <span className="banner-tag"><CheckCircle2 size={14} /> Full Transparency</span>
            <span className="banner-tag"><CheckCircle2 size={14} /> 28 Registered AMC Structures</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="disclosure-filter-bar">
        <div className="search-input-wrap">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search AMC (e.g. HDFC, SBI, ICICI, Nippon, Axis...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            aria-label="Search AMC Disclosures"
          />
          {search && (
            <button
              type="button"
              className="clear-btn"
              onClick={() => setSearch("")}
              aria-label="Clear search input"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="filter-count">
          Showing <strong>{filteredPdfs.length}</strong> of <strong>{AMC_DISCLOSURES.length}</strong> AMC Disclosures
        </div>
      </div>

      {/* Clean Responsive Compliance Table */}
      <div className="table-responsive-wrapper">
        <div className="mobile-table-scroll-hint">
          <span>← Swipe horizontally to view full table details →</span>
        </div>
        <table className="clean-compliance-table amc-disclosure-table">
          <thead>
            <tr>
              <th className="col-sr">Sr. No</th>
              <th className="col-amc">AMC Name</th>
              <th className="col-cat">Category</th>
              <th className="col-period">Disclosure Period</th>
              <th className="col-action">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPdfs.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty-search-td">
                  No AMCs found matching &quot;{search}&quot;. Please try a different search keyword.
                </td>
              </tr>
            ) : (
              filteredPdfs.map((amc, idx) => (
                <tr key={amc.code}>
                  <td className="cell-sr">
                    {idx + 1}
                  </td>
                  <td className="cell-amc">
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
                  <td className="cell-cat">
                    <span className={`amc-row-cat ${amc.category === "PMS / AIF" ? "pms" : ""}`}>
                      {amc.category}
                    </span>
                  </td>
                  <td className="cell-period">
                    {amc.period}
                  </td>
                  <td className="cell-action">
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

      {/* Floating Popup Modal Dialog */}
      {activePdf && (
        <div
          className="pdf-modal-backdrop"
          onClick={() => setActivePdf(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-amc-title-viewer"
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
                    <h3 id="modal-amc-title-viewer" className="modal-amc-title">
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
    </div>
  );
}
