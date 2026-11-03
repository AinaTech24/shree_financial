import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Quiz from "@/components/Quiz";
import { RISK_QS } from "@/content/site";

export const metadata: Metadata = { title: "Risk Profile" };

const bands = [
  { max: 30, title: "Conservative", text: "You prefer safety of capital and steady outcomes over high growth." },
  { max: 50, title: "Moderately conservative", text: "You accept limited risk for some growth while keeping stability a priority." },
  { max: 70, title: "Moderate", text: "You are comfortable with a balance of risk and return across market cycles." },
  { max: 85, title: "Moderately aggressive", text: "You can accept meaningful ups and downs in pursuit of long-term growth." },
  { max: 100, title: "Aggressive", text: "You are comfortable with high volatility for the potential of higher long-term returns." },
];

export default function Page() {
  return (
    <>
      <PageHero title="Risk Profile" sub="Assess your risk tolerance and financial profile to customize your investments according to your risk-taking capacity." trail={[{ label: "Tools", href: "/#tools" }]} />
      <section className="section tight">
        <div className="wrap"><Quiz kind="risk" questions={RISK_QS} bands={bands} subject="Risk Profile (Risk Form) – Shah Financial Services" /></div>
      </section>
    </>
  );
}
