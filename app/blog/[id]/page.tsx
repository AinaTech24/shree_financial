import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import posts from "@/content/blog.json";

export function generateStaticParams() {
  return posts.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = posts.find((x) => String(x.id) === id);
  return p ? { title: p.title } : {};
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = posts.find((x) => String(x.id) === id);
  if (!p) notFound();
  const related = posts.filter((x) => x.id !== p.id);
  return (
    <>
      <PageHero title="Blog" trail={[{ label: "Blog", href: "/blog" }]} />
      <section className="section tight">
        <div className="wrap">
          <article className="post">
            <h1 style={{ fontSize: "clamp(28px,4vw,44px)", marginBottom: 16 }}>{p.title}</h1>
            <div className="post-meta"><span className="tag">{p.date}</span><span className="tag">{p.cat}</span></div>
            <img className="cover" src={p.img} alt="" />
            <div className="prose" dangerouslySetInnerHTML={{ __html: p.html }} />
          </article>
          <div className="related">
            <div className="sec-head"><h2>Related Post</h2></div>
            <div className="blog-grid">
              {related.map((r) => (
                <Link href={`/blog/${r.id}`} className="blog-card" key={r.id}>
                  <img src={r.img} alt="" />
                  <div><h3>{r.title}</h3><span className="more">Read More →</span></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
