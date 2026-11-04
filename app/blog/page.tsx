import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
<<<<<<< HEAD
import LiveBlogFeed from "@/components/LiveBlogFeed";
=======
import BlogView from "@/components/BlogView";
import posts from "@/content/blog.json";
>>>>>>> f79a62daf99d52674dfc4ea3f048d39e8db3d898

export const metadata: Metadata = {
  title: "Financial Knowledge & Live Market Feeds | Shah Financial Services",
  description:
<<<<<<< HEAD
    "Stay informed with real-time financial market intelligence, mutual fund insights, SIP guides, and economic trends from MoneyControl, Economic Times, and Mint.",
=======
    "Real-time market insights, mutual fund updates, and investor education curated from MoneyControl, ET Mutual Funds, Mint Money, and Shah Financial Services.",
>>>>>>> f79a62daf99d52674dfc4ea3f048d39e8db3d898
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Knowledge Hub & Market Insights"
<<<<<<< HEAD
        sub="Real-time financial intelligence curated from India's leading financial authorities to empower your wealth decisions."
        trail={[{ label: "Home", href: "/" }]}
      />

      <section className="section tight blog-main-section">
        <div className="wrap">
          <LiveBlogFeed />
=======
        sub="Stay informed with real-time mutual fund trends, macroeconomic updates, and wealth strategies."
        trail={[{ label: "Home", href: "/" }]}
      />

      <section className="section tight">
        <div className="wrap">
          <BlogView inHousePosts={posts} />
>>>>>>> f79a62daf99d52674dfc4ea3f048d39e8db3d898
        </div>
      </section>
    </>
  );
}
