"use client";

import React, { useState, useMemo } from "react";
import {
  FileText,
  Search,
  Eye,
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
            placeholder="Search by AMC name (e.g. HDFC, SBI, ICICI...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          {search && (
            <button type="button" className="clear-btn" onClick={() => setSearch("")}>
              <X size={16} />
            </button>
          )}
        </div>
        <div className="filter-count">
          Showing <strong>{filteredPdfs.length}</strong> of <strong>{AMC_DISCLOSURES.length}</strong> AMC Disclosures
        </div>
      </div>

      {/* Simple Table List */}
      <div className="amc-table-list">
        <div className="amc-table-header">
          <span>AMC Name</span>
          <span>Period</span>
          <span>Category</span>
          <span>Action</span>
        </div>
        {filteredPdfs.map((amc) => {
          const pdfPath = `/AMCs/${encodeURIComponent(amc.fileName)}`;
          return (
            <div key={amc.fileName} className="amc-table-row">
              <div className="amc-row-name">
                <div className="amc-row-code">{amc.code}</div>
                <span>{amc.name}</span>
              </div>
              <span className="amc-row-period">{amc.period}</span>
              <span className={`amc-row-cat ${amc.category === "PMS / AIF" ? "pms" : ""}`}>{amc.category}</span>
              <button
                type="button"
                className="btn-show-pdf"
                onClick={() => setActivePdf(amc)}
              >
                <Eye size={15} />
                <span>View PDF</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* PDF Modal Viewer */}
      {activePdf && (
        <div className="pdf-modal-backdrop" onClick={() => setActivePdf(null)}>
          <div className="pdf-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="pdf-modal-header">
              <div className="modal-title-wrap">
                <FileText size={22} className="text-amber-500" />
                <div>
                  <h3 className="modal-amc-title">{activePdf.name}</h3>
                  <p className="modal-doc-meta">{activePdf.period}</p>
                </div>
              </div>
              <div className="modal-action-buttons">
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setActivePdf(null)}
                  title="Close PDF Viewer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="pdf-modal-body">
              <object
                data={`/AMCs/${encodeURIComponent(activePdf.fileName)}`}
                type="application/pdf"
                width="100%"
                height="100%"
                className="pdf-object-frame"
              >
                <div className="pdf-fallback-notice">
                  <p>Your browser does not support inline PDF viewing.</p>
                  <a
                    href={`/AMCs/${encodeURIComponent(activePdf.fileName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Click here to open and view the PDF in a new tab
                  </a>
                </div>
              </object>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
