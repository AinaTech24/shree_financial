import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import LiveBlogFeed from "@/components/LiveBlogFeed";

export const metadata: Metadata = {
  title: "Financial Knowledge & Live Market Feeds | Shah Financial Services",
  description:
    "Stay informed with real-time financial market intelligence, mutual fund insights, SIP guides, and economic trends from MoneyControl, Economic Times, and Mint.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Knowledge Hub & Market Insights"
        sub="Real-time financial intelligence curated from India's leading financial authorities to empower your wealth decisions."
        trail={[{ label: "Home", href: "/" }]}
      />

      <section className="section tight blog-main-section">
        <div className="wrap">
          <LiveBlogFeed />
        </div>
      </section>
    </>
  );
}
