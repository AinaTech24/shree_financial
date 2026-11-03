import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { CalcGroup } from "@/components/CalcHub";
import { INVEST_CALCS, SIP_NOTE } from "@/content/site";

export const metadata: Metadata = {
  title: "Investment Calculators | Shah Financial Services",
  description: "Calculate SIP, Lumpsum, SWP, STP, Retirement Corpus, and Life Insurance needs.",
};

export default function InvestmentCalculatorsPage() {
  return (
    <>
      <PageHero
        title="Investment Calculators"
        sub="Forecast compounding returns, plan systematic investments, and benchmark with the Rule of 72."
        trail={[
          { label: "Home", href: "/" },
          { label: "Calculators", href: "/calculator" },
        ]}
      />
      <section className="section tight">
        <div className="wrap">
          <CalcGroup calcs={INVEST_CALCS} />
        </div>
      </section>
    </>
  );
}
