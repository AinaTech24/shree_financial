import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { PAY_GROUPS } from "@/content/site";

export const metadata: Metadata = { title: "Pay Premium Online" };

export default function Page() {
  return (
    <>
      <PageHero title="Pay Premium Online" />
      <section className="section tight">
        <div className="wrap">
          {PAY_GROUPS.map((g) => (
            <div className="pay-group" key={g.title}>
              <h2>{g.title}</h2>
              <div className="pay-grid">
                {g.items.map((it, n) =>
                  it.href ? (
                    <a key={n} className="pay-tile" href={it.href} target="_blank" rel="noopener noreferrer"><img src={`/img/amc/${it.img}`} alt="" /></a>
                  ) : (
                    <span key={n} className="pay-tile"><img src={`/img/amc/${it.img}`} alt="" /></span>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
