import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import posts from "@/content/blog.json";

export const metadata: Metadata = { title: "Blog" };

export default function Page() {
  return (
    <>
      <PageHero title="Blog" />
      <section className="section tight">
        <div className="wrap blog-grid">
          {posts.map((p) => (
            <Link href={`/blog/${p.id}`} className="blog-card" key={p.id}>
              <img src={p.img} alt="" />
              <div>
                <span className="tag">{p.cat}</span>
                <h3>{p.title}</h3>
                <span className="more">Read More →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
