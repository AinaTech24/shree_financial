"use client";

import React, { useState, useMemo } from "react";
import {
  FileText,
  Search,
  Eye,
  Download,
  ExternalLink,
  X,
  Building2,
  Calendar,
  CheckCircle2,
  Shield,
  Filter,
} from "lucide-react";

export interface AmcPdf {
  code: string;
  name: string;
  fileName: string;
  period: string;
  sizeKb: number;
  category: "Mutual Fund" | "PMS / AIF";
}

export const AMC_DISCLOSURES: AmcPdf[] = [
  {
    code: "HDFC",
    name: "HDFC Mutual Fund",
    fileName: "HDFC BROKERAGE STRUCTURE JULY TO SEP.pdf",
    period: "July to September",
    sizeKb: 264,
    category: "Mutual Fund",
  },
  {
    code: "SBI",
    name: "SBI Mutual Fund",
    fileName: "SBI BROKERAGE STRUCTURE JULY TO SEP.pdf",
    period: "July to September",
    sizeKb: 17,
    category: "Mutual Fund",
  },
  {
    code: "ICICI",
    name: "ICICI Prudential Mutual Fund",
    fileName: "ICICI BROKERAGE STRUCTURE JULY TO SEP.pdf",
    period: "July to September",
    sizeKb: 387,
    category: "Mutual Fund",
  },
  {
    code: "NIPPON",
    name: "Nippon India Mutual Fund",
    fileName: "NIPPON BROKERAGE STRUCTURE JULY TO SEP.pdf",
    period: "July to September",
    sizeKb: 209,
    category: "Mutual Fund",
  },
  {
    code: "KOTAK",
    name: "Kotak Mahindra Mutual Fund",
    fileName: "KOTAK BROKERAGE STRUCTURE JULY TO SEP.pdf",
    period: "July to September",
    sizeKb: 192,
    category: "Mutual Fund",
  },
  {
    code: "ABSL",
    name: "Aditya Birla Sun Life Mutual Fund",
    fileName: "ABSL BROKERAGE STRUCTURE JULY TO SEP.pdf",
    period: "July to September",
    sizeKb: 153,
    category: "Mutual Fund",
  },
  {
    code: "AXIS",
    name: "Axis Mutual Fund",
    fileName: "AXIS BROKERAGE STRUCTURE SEP MONTH.pdf",
    period: "September Month",
    sizeKb: 49,
    category: "Mutual Fund",
  },
  {
    code: "TATA",
    name: "Tata Mutual Fund",
    fileName: "TATA BROKERAGE STRUCTURE JULY TO SEP.pdf",
    period: "July to September",
    sizeKb: 222,
    category: "Mutual Fund",
  },
  {
    code: "PPFAS",
    name: "Parag Parikh Mutual Fund (PPFAS)",
    fileName: "PPFAS BROKERAGE STRUCTURE SEP MONTH.pdf",
    period: "September Month",
    sizeKb: 206,
    category: "Mutual Fund",
  },
  {
    code: "QUANT",
    name: "Quant Mutual Fund",
    fileName: "QUANT BROKERAGE STRUCTURE SEP MONTH.pdf",
    period: "September Month",
    sizeKb: 159,
    category: "Mutual Fund",
  },
  {
    code: "MIRAE",
    name: "Mirae Asset Mutual Fund",
    fileName: "MIRAE BROKERAGE STRUCTURE JULY TO SEP.pdf",
    period: "July to September",
    sizeKb: 94,
    category: "Mutual Fund",
  },
  {
    code: "MOTILAL",
    name: "Motilal Oswal Mutual Fund",
    fileName: "MOTILAL BROKERAGE STRUCTURE JULY TO NOTICE.pdf",
    period: "July to Notice Period",
    sizeKb: 475,
    category: "Mutual Fund",
  },
  {
    code: "DSP",
    name: "DSP Mutual Fund",
    fileName: "DSP BROKERAGE STRUCTURE JULY TO SEP.pdf",
    period: "July to September",
    sizeKb: 70,
    category: "Mutual Fund",
  },
  {
    code: "BANDHAN",
    name: "Bandhan Mutual Fund",
    fileName: "BANDHAN BROKERAGE STRUCTURE JULY TO NOTICE.pdf",
    period: "July to Notice Period",
    sizeKb: 143,
    category: "Mutual Fund",
  },
  {
    code: "CANARA",
    name: "Canara Robeco Mutual Fund",
    fileName: "CANARA BROKERAGE STRUCTURE JULY TO SEP.pdf",
    period: "July to September",
    sizeKb: 67,
    category: "Mutual Fund",
  },
  {
    code: "EDELWEISS",
    name: "Edelweiss Mutual Fund",
    fileName: "EDELWEISS BROKERAGE STRUCTURE JULY TO SEP.pdf",
    period: "July to September",
    sizeKb: 228,
    category: "Mutual Fund",
  },
  {
    code: "FRANKLIN",
    name: "Franklin Templeton Mutual Fund",
    fileName: "FRANKLIN BROKERAGE STRUCTURE JULY TO SEP.pdf",
    period: "July to September",
    sizeKb: 94,
    category: "Mutual Fund",
  },
  {
    code: "HSBC",
    name: "HSBC Mutual Fund",
    fileName: "HSBC BROKERAGE STRUCTURE AUG MONTH.pdf",
    period: "August Month",
    sizeKb: 249,
    category: "Mutual Fund",
  },
  {
    code: "INVESCO",
    name: "Invesco Mutual Fund",
    fileName: "INVESCO BROKERAGE STRUCTURE JULY TO SEP.pdf",
    period: "July to September",
    sizeKb: 64,
    category: "Mutual Fund",
  },
  {
    code: "LIC",
    name: "LIC Mutual Fund",
    fileName: "LIC BROKERAGE STRUCTURE JULY TO SEP.pdf",
    period: "July to September",
    sizeKb: 79,
    category: "Mutual Fund",
  },
  {
    code: "MAHINDRA",
    name: "Mahindra Manulife Mutual Fund",
    fileName: "MAHINDRA BROKERAGE STRUCTURE JULY TO NOTICE.pdf",
    period: "July to Notice Period",
    sizeKb: 67,
    category: "Mutual Fund",
  },
  {
    code: "PGIM",
    name: "PGIM India Mutual Fund",
    fileName: "PGIM BROKERAGE STRUCTURE JULY TO SEP.pdf",
    period: "July to September",
    sizeKb: 371,
    category: "Mutual Fund",
  },
  {
    code: "SUNDARAM",
    name: "Sundaram Mutual Fund",
    fileName: "SUNDARAM BROKERAGE STRUCTURE JULY TO SEP.pdf",
    period: "July to September",
    sizeKb: 41,
    category: "Mutual Fund",
  },
  {
    code: "UTI",
    name: "UTI Mutual Fund",
    fileName: "UTI BROKERAGE STRUCTURE JULY TO SEP.pdf",
    period: "July to September",
    sizeKb: 15,
    category: "Mutual Fund",
  },
  {
    code: "WHITEOAK",
    name: "WhiteOak Capital Mutual Fund",
    fileName: "WHITEOAK BROKERAGE STRUCTURE JULY TO SEP.pdf",
    period: "July to September",
    sizeKb: 26,
    category: "Mutual Fund",
  },
  {
    code: "BAJAJ",
    name: "Bajaj Finserv Mutual Fund",
    fileName: "BAJAJ BROKERAGE STRUCTURE JULY TO SEP.pdf",
    period: "July to September",
    sizeKb: 186,
    category: "Mutual Fund",
  },
  {
    code: "HELIOS",
    name: "Helios Mutual Fund",
    fileName: "HELIOS BROKERAGE STRUCTURE JULY TO SEP-compressed.pdf",
    period: "July to September",
    sizeKb: 297,
    category: "Mutual Fund",
  },
  {
    code: "ABAKKUS",
    name: "Abakkus Asset Manager (PMS/AIF)",
    fileName: "ABAKKUS BROKERAGE STRUCTURE SEP MONTH.pdf",
    period: "September Month",
    sizeKb: 132,
    category: "PMS / AIF",
  },
];

export default function CommissionPdfViewer() {
  const [search, setSearch] = useState("");
  const [activePdf, setActivePdf] = useState<AmcPdf | null>(null);

  const filteredPdfs = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return AMC_DISCLOSURES;
    return AMC_DISCLOSURES.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.fileName.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="pdf-disclosure-container">
      {/* Top Banner / Disclaimer Box */}
      <div className="disclosure-banner-card">
        <div className="banner-icon-col">
          <Shield size={32} className="text-amber-500" />
        </div>
        <div className="banner-content-col">
          <h3>SEBI & AMFI Regulatory Commission Disclosure</h3>
          <p>
            In accordance with SEBI Circulars and AMFI Code of Conduct, <strong>Shah Financial Services</strong> (ARN-173086)
            discloses all brokerage and trail commission structures received from Asset Management Companies for mutual fund
            and PMS distribution. These commissions are embedded in the scheme’s Total Expense Ratio (TER) and are paid
            directly by the AMCs without adding any additional fee to the investor.
          </p>
          <div className="banner-tags">
            <span className="banner-tag">
              <CheckCircle2 size={14} /> AMFI Code Compliant
            </span>
            <span className="banner-tag">
              <CheckCircle2 size={14} /> Full Transparency
            </span>
            <span className="banner-tag">
              <CheckCircle2 size={14} /> 28 Registered AMC Structures
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="disclosure-filter-bar">
        <div className="search-input-wrap">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by AMC name (e.g. HDFC, SBI, ICICI, Nippon, Quant...)"
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

      {/* Grid of AMC PDF Cards */}
      <div className="amc-cards-grid">
        {filteredPdfs.map((amc) => {
          const pdfPath = `/AMCs/${encodeURIComponent(amc.fileName)}`;

          return (
            <div key={amc.fileName} className="amc-pdf-card">
              <div className="card-top">
                <div className="amc-avatar">
                  <Building2 size={22} className="amc-avatar-icon" />
                </div>
                <div className="amc-badge-group">
                  <span className="amc-period-badge">
                    <Calendar size={12} /> {amc.period}
                  </span>
                  <span className="amc-size-badge">{amc.sizeKb} KB</span>
                </div>
              </div>

              <h4 className="amc-title">{amc.name}</h4>
              <p className="amc-doc-name">{amc.fileName}</p>

              <div className="amc-btn-group">
                {/* SHOW PDF BUTTON */}
                <button
                  type="button"
                  className="btn-show-pdf"
                  onClick={() => setActivePdf(amc)}
                >
                  <Eye size={16} />
                  <span>Show PDF</span>
                </button>

                {/* DOWNLOAD BUTTON */}
                <a
                  href={pdfPath}
                  download={amc.fileName}
                  className="btn-download-pdf"
                  title="Download PDF"
                >
                  <Download size={16} />
                </a>

                {/* OPEN IN NEW TAB */}
                <a
                  href={pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-external-pdf"
                  title="Open in New Tab"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive PDF Modal Viewer */}
      {activePdf && (
        <div className="pdf-modal-backdrop" onClick={() => setActivePdf(null)}>
          <div className="pdf-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="pdf-modal-header">
              <div className="modal-title-wrap">
                <FileText size={22} className="text-amber-500" />
                <div>
                  <h3 className="modal-amc-title">{activePdf.name}</h3>
                  <p className="modal-doc-meta">
                    {activePdf.fileName} • {activePdf.period} • {activePdf.sizeKb} KB
                  </p>
                </div>
              </div>

              <div className="modal-action-buttons">
                <a
                  href={`/AMCs/${encodeURIComponent(activePdf.fileName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-icon-btn"
                  title="Open in New Tab"
                >
                  <ExternalLink size={18} />
                </a>
                <a
                  href={`/AMCs/${encodeURIComponent(activePdf.fileName)}`}
                  download={activePdf.fileName}
                  className="modal-icon-btn"
                  title="Download PDF"
                >
                  <Download size={18} />
                </a>
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

            {/* Embedded PDF View */}
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

