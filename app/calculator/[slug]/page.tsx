import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { SingleCalcView } from "@/components/CalcHub";
import { INVEST_CALCS } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return INVEST_CALCS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calc = INVEST_CALCS.find((c) => c.slug === slug);
  if (!calc) return { title: "Calculator Not Found" };
  return {
    title: `${calc.title} | Shah Financial Services`,
    description: `Use our free ${calc.title} to project your wealth and plan your financial goals.`,
  };
}

export default async function CalcPage({ params }: Props) {
  const { slug } = await params;
  const calc = INVEST_CALCS.find((c) => c.slug === slug);
  if (!calc) notFound();

  return (
    <>
      <PageHero
        title={calc.title}
        sub={`Use our free ${calc.title} to project your wealth and plan your financial goals.`}
        trail={[
          { label: "Home", href: "/" },
          { label: "Calculators", href: "/calculator" },
        ]}
      />
      <section className="section tight">
        <div className="wrap">
          <SingleCalcView calc={calc} />
        </div>
      </section>
    </>
  );
}

