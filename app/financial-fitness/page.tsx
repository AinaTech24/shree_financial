import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Quiz from "@/components/Quiz";
import { HEALTH_QS } from "@/content/site";

export const metadata: Metadata = { title: "Financial Fitness" };

const qs = HEALTH_QS.map((q) => ({ q, a: ["Yes", "No"] }));
const bands = [
  { max: 40, title: "Needs attention", text: "Several basics of financial health are not yet in place. A short conversation with our team can help you prioritise the next steps." },
  { max: 70, title: "On the right track", text: "You have some strong foundations. Closing the remaining gaps will make your finances considerably more resilient." },
  { max: 100, title: "Financially fit", text: "You are doing most things right. Keep reviewing your goals and investments periodically to stay on course." },
];

export default function Page() {
  return (
    <>
      <PageHero title="Financial Fitness" sub="Evaluate your current financial health with a comprehensive questionnaire, to enhance your Preparation and well-being." trail={[{ label: "Tools", href: "/#tools" }]} />
      <section className="section tight">
        <div className="wrap"><Quiz kind="fitness" questions={qs} bands={bands} subject="Financial Fitness (Health Form) – Shah Financial Services" /></div>
      </section>
    </>
  );
}
