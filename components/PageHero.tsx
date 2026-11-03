import Link from "next/link";

export default function PageHero({ title, sub, trail }: { title: string; sub?: string; trail?: { label: string; href: string }[] }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <div className="crumbs">
          <Link href="/">Home</Link>
          {trail?.map((t) => (<span key={t.href}> / <Link href={t.href}>{t.label}</Link></span>))}
          {" / "}{title}
        </div>
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
    </section>
  );
}
