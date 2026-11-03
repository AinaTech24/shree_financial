import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { CalcGroup } from "@/components/CalcHub";
import { INVEST_CALCS, MF_CALCS, SIP_NOTE } from "@/content/site";

export const metadata: Metadata = {
  title: "Financial Calculators Hub | Shah Financial Services",
  description:
    "Comprehensive suite of financial calculators including SIP, Lumpsum, STP, SWP, Retirement Corpus, Education, and Loan EMIs.",
};

export default function CalculatorPage() {
  return (
    <>
      <PageHero
        title="Financial Calculators Hub"
        sub="Plan your investments, analyze returns, and forecast your financial milestones with precision."
        trail={[{ label: "Home", href: "/" }]}
      />
      <section className="section tight">
        <div className="wrap">
          <CalcGroup title="Investment & Goal Calculators" calcs={INVEST_CALCS} />
          <div style={{ marginTop: 64 }}>
            <CalcGroup title="Mutual Fund Analysis Tools" calcs={MF_CALCS} />
          </div>
        </div>
      </section>
    </>
  );
}
