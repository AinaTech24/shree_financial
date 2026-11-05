export interface AmcPdf {
  code: string;
  name: string;
  fileName: string;
  period: string;
  sizeKb: number;
  category: "Mutual Fund" | "PMS / AIF";
}

export const AMC_DISCLOSURES: AmcPdf[] = [
  { code: "HDFC", name: "HDFC Mutual Fund", fileName: "HDFC BROKERAGE STRUCTURE JULY TO SEP.pdf", period: "July to September", sizeKb: 264, category: "Mutual Fund" },
  { code: "SBI", name: "SBI Mutual Fund", fileName: "SBI BROKERAGE STRUCTURE JULY TO SEP.pdf", period: "July to September", sizeKb: 17, category: "Mutual Fund" },
  { code: "ICICI", name: "ICICI Prudential Mutual Fund", fileName: "ICICI BROKERAGE STRUCTURE JULY TO SEP.pdf", period: "July to September", sizeKb: 387, category: "Mutual Fund" },
  { code: "NIPPON", name: "Nippon India Mutual Fund", fileName: "NIPPON BROKERAGE STRUCTURE JULY TO SEP.pdf", period: "July to September", sizeKb: 209, category: "Mutual Fund" },
  { code: "KOTAK", name: "Kotak Mahindra Mutual Fund", fileName: "KOTAK BROKERAGE STRUCTURE JULY TO SEP.pdf", period: "July to September", sizeKb: 192, category: "Mutual Fund" },
  { code: "ABSL", name: "Aditya Birla Sun Life Mutual Fund", fileName: "ABSL BROKERAGE STRUCTURE JULY TO SEP.pdf", period: "July to September", sizeKb: 153, category: "Mutual Fund" },
  { code: "AXIS", name: "Axis Mutual Fund", fileName: "AXIS BROKERAGE STRUCTURE SEP MONTH.pdf", period: "September Month", sizeKb: 49, category: "Mutual Fund" },
  { code: "TATA", name: "Tata Mutual Fund", fileName: "TATA BROKERAGE STRUCTURE JULY TO SEP.pdf", period: "July to September", sizeKb: 222, category: "Mutual Fund" },
  { code: "PPFAS", name: "Parag Parikh Mutual Fund (PPFAS)", fileName: "PPFAS BROKERAGE STRUCTURE SEP MONTH.pdf", period: "September Month", sizeKb: 206, category: "Mutual Fund" },
  { code: "QUANT", name: "Quant Mutual Fund", fileName: "QUANT BROKERAGE STRUCTURE SEP MONTH.pdf", period: "September Month", sizeKb: 159, category: "Mutual Fund" },
  { code: "MIRAE", name: "Mirae Asset Mutual Fund", fileName: "MIRAE BROKERAGE STRUCTURE JULY TO SEP.pdf", period: "July to September", sizeKb: 94, category: "Mutual Fund" },
  { code: "MOTILAL", name: "Motilal Oswal Mutual Fund", fileName: "MOTILAL BROKERAGE STRUCTURE JULY TO NOTICE.pdf", period: "July to Notice Period", sizeKb: 475, category: "Mutual Fund" },
  { code: "DSP", name: "DSP Mutual Fund", fileName: "DSP BROKERAGE STRUCTURE JULY TO SEP.pdf", period: "July to September", sizeKb: 70, category: "Mutual Fund" },
  { code: "BANDHAN", name: "Bandhan Mutual Fund", fileName: "BANDHAN BROKERAGE STRUCTURE JULY TO NOTICE.pdf", period: "July to Notice Period", sizeKb: 143, category: "Mutual Fund" },
  { code: "CANARA", name: "Canara Robeco Mutual Fund", fileName: "CANARA BROKERAGE STRUCTURE JULY TO SEP.pdf", period: "July to September", sizeKb: 67, category: "Mutual Fund" },
  { code: "EDELWEISS", name: "Edelweiss Mutual Fund", fileName: "EDELWEISS BROKERAGE STRUCTURE JULY TO SEP.pdf", period: "July to September", sizeKb: 228, category: "Mutual Fund" },
  { code: "FRANKLIN", name: "Franklin Templeton Mutual Fund", fileName: "FRANKLIN BROKERAGE STRUCTURE JULY TO SEP.pdf", period: "July to September", sizeKb: 94, category: "Mutual Fund" },
  { code: "HSBC", name: "HSBC Mutual Fund", fileName: "HSBC BROKERAGE STRUCTURE AUG MONTH.pdf", period: "August Month", sizeKb: 249, category: "Mutual Fund" },
  { code: "INVESCO", name: "Invesco Mutual Fund", fileName: "INVESCO BROKERAGE STRUCTURE JULY TO SEP.pdf", period: "July to September", sizeKb: 64, category: "Mutual Fund" },
  { code: "LIC", name: "LIC Mutual Fund", fileName: "LIC BROKERAGE STRUCTURE JULY TO SEP.pdf", period: "July to September", sizeKb: 79, category: "Mutual Fund" },
  { code: "MAHINDRA", name: "Mahindra Manulife Mutual Fund", fileName: "MAHINDRA BROKERAGE STRUCTURE JULY TO NOTICE.pdf", period: "July to Notice Period", sizeKb: 67, category: "Mutual Fund" },
  { code: "PGIM", name: "PGIM India Mutual Fund", fileName: "PGIM BROKERAGE STRUCTURE JULY TO SEP.pdf", period: "July to September", sizeKb: 371, category: "Mutual Fund" },
  { code: "SUNDARAM", name: "Sundaram Mutual Fund", fileName: "SUNDARAM BROKERAGE STRUCTURE JULY TO SEP.pdf", period: "July to September", sizeKb: 41, category: "Mutual Fund" },
  { code: "UTI", name: "UTI Mutual Fund", fileName: "UTI BROKERAGE STRUCTURE JULY TO SEP.pdf", period: "July to September", sizeKb: 15, category: "Mutual Fund" },
  { code: "WHITEOAK", name: "WhiteOak Capital Mutual Fund", fileName: "WHITEOAK BROKERAGE STRUCTURE JULY TO SEP.pdf", period: "July to September", sizeKb: 26, category: "Mutual Fund" },
  { code: "BAJAJ", name: "Bajaj Finserv Mutual Fund", fileName: "BAJAJ BROKERAGE STRUCTURE JULY TO SEP.pdf", period: "July to September", sizeKb: 186, category: "Mutual Fund" },
  { code: "HELIOS", name: "Helios Mutual Fund", fileName: "HELIOS BROKERAGE STRUCTURE JULY TO SEP-compressed.pdf", period: "July to September", sizeKb: 297, category: "Mutual Fund" },
  { code: "ABAKKUS", name: "Abakkus Asset Manager (PMS/AIF)", fileName: "ABAKKUS BROKERAGE STRUCTURE SEP MONTH.pdf", period: "September Month", sizeKb: 132, category: "PMS / AIF" },
];

