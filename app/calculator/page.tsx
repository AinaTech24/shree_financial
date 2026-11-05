import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { CalcHub } from "@/components/CalcHub";
import { INVEST_CALCS } from "@/content/site";

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
          <CalcHub />
        </div>
      </section>
    </>
  );
}
