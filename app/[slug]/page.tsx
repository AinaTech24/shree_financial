import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import DedicatedServiceView from "@/components/DedicatedServiceView";
import CommissionPdfViewer from "@/components/CommissionPdfViewer";
import services from "@/content/services.json";
import legal from "@/content/legal.json";

type Sec = { h: string; html: string };
const S = services as Record<string, { title: string; sections: Sec[] }>;
const L = legal as Record<string, { title: string; html: string }>;

export function generateStaticParams() {
  return [...Object.keys(S), ...Object.keys(L), "scheme-wise-commission-disclosure"].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "scheme-wise-commission-disclosure") {
    return {
      title: "Scheme-Wise Commission Disclosure | Shah Financial Services",
      description: "Review brokerage and trail commission disclosures for 28 registered AMCs.",
    };
  }
  const t = S[slug]?.title ?? L[slug]?.title;
  return t ? { title: `${t} | Shah Financial Services` } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Handle Scheme-Wise Commission Disclosure
  if (slug === "scheme-wise-commission-disclosure") {
    return (
      <>
        <PageHero
          title="Scheme-Wise Commission Disclosure"
          sub="Official brokerage and trail commission disclosure structures across all registered AMCs."
          trail={[
            { label: "Home", href: "/" },
            { label: "Compliance", href: "/commission-disclosures" },
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

  // Handle Dedicated Service Page
  const svc = S[slug];
  if (svc) {
    return <DedicatedServiceView slug={slug} service={svc} />;
  }

  // Handle Legal / Policy Document Page
  const doc = L[slug];
  if (!doc) notFound();

  // If this is the commission disclosures page, embed the PDF viewer alongside the table!
  const isCommissionPage = slug === "commission-disclosures";

  return (
    <>
      <PageHero
        title={doc.title}
        trail={[
          { label: "Home", href: "/" },
          { label: "Legal & Regulatory", href: "#" },
        ]}
      />
      <section className="section tight">
        <div className="wrap">
          <article className="sec-card prose legal" style={{ padding: "40px 48px", borderRadius: "20px" }}>
            <div dangerouslySetInnerHTML={{ __html: doc.html }} />
          </article>

          {isCommissionPage && (
            <div style={{ marginTop: 48 }}>
              <div className="sec-head" style={{ marginBottom: 24 }}>
                <span className="eyebrow">Direct AMC Structures</span>
                <h2>Scheme-Wise Brokerage &amp; Commission Files</h2>
                <p>Click "Show PDF" to view or download original AMC brokerage schedule documents.</p>
              </div>
              <CommissionPdfViewer />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
