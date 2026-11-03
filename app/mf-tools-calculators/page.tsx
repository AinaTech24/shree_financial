import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { CalcGroup } from "@/components/CalcHub";
import { MF_CALCS, SIP_NOTE } from "@/content/site";

export const metadata: Metadata = {
  title: "MF Tools & Performance Calculators | Shah Financial Services",
  description: "Analyze historical SIP performance, NAV trends, STP/SWP outcomes, and top-performing schemes.",
};

export default function MfToolsCalculatorsPage() {
  return (
    <>
      <PageHero
        title="MF Tools Calculators"
        sub="Backtest historical mutual fund returns, check NAV histories, and evaluate scheme performance."
        trail={[
          { label: "Home", href: "/" },
          { label: "Calculators", href: "/calculator" },
        ]}
      />
      <section className="section tight">
        <div className="wrap">
          <CalcGroup calcs={MF_CALCS} />
        </div>
      </section>
    </>
  );
}
