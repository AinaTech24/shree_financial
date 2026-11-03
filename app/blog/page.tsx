import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BlogView from "@/components/BlogView";
import posts from "@/content/blog.json";

export const metadata: Metadata = {
  title: "Financial Knowledge & Live Market Feeds | Shah Financial Services",
  description:
    "Real-time market insights, mutual fund updates, and investor education curated from MoneyControl, ET Mutual Funds, Mint Money, and Shah Financial Services.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Knowledge Hub & Market Insights"
        sub="Stay informed with real-time mutual fund trends, macroeconomic updates, and wealth strategies."
        trail={[{ label: "Home", href: "/" }]}
      />

      <section className="section tight">
        <div className="wrap">
          <BlogView inHousePosts={posts} />
        </div>
      </section>
    </>
  );
}
