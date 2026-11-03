import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CommissionPdfViewer from "@/components/CommissionPdfViewer";

export const metadata: Metadata = {
  title: "Scheme-Wise Commission Disclosure | Shah Financial Services",
  description:
    "Review brokerage and trail commission structure disclosures across 28 registered Asset Management Companies (AMCs) distributed by Shah Financial Services.",
};

export default function SchemeWiseCommissionPage() {
  return (
    <>
      <PageHero
        title="Scheme-Wise Commission Disclosure"
        sub="Full transparency and compliance with SEBI & AMFI distributor disclosure regulations."
        trail={[
          { label: "Home", href: "/" },
          { label: "Compliance & Legal", href: "/commission-disclosures" },
        ]}
      />
      <section className="section tight">
        <div className="wrap">
          <CommissionPdfViewer />
        </div>
      </section>
    </>
  );
}

