"use client";
import { useState } from "react";
import LeadForm from "@/components/LeadForm";

type Q = { q: string; a: string[] };
type Band = { max: number; title: string; text: string };

export default function Quiz({ kind, questions, bands, subject }: { kind: "fitness" | "risk"; questions: Q[]; bands: Band[]; subject: string }) {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState<(number | null)[]>(() => questions.map(() => null));
  const [form, setForm] = useState(false);
  const total = questions.length;
  const finished = step >= total;

  // Fitness: "Yes" (index 0) scores 1. Risk: option index + 1 (1–5).
  const score = ans.reduce<number>((s, a) => s + (a === null ? 0 : kind === "fitness" ? (a === 0 ? 1 : 0) : a + 1), 0);
  const maxScore = kind === "fitness" ? total : total * 5;
  const pct = Math.round((score / maxScore) * 100);
  const band = bands.find((b) => pct <= b.max) ?? bands[bands.length - 1];

  const choose = (i: number) => {
    const next = [...ans];
    next[step] = i;
    setAns(next);
    setTimeout(() => setStep((s) => Math.min(s + 1, total)), 180);
  };

  const summary = questions.map((q, n) => `Q${n + 1}. ${q.q}\n   -> ${ans[n] === null ? "-" : q.a[ans[n] as number]}`).join("\n");
  const extra = `${kind === "fitness" ? "Financial Fitness" : "Risk Profile"} result: ${band.title} (score ${score}/${maxScore})\n\n${summary}\n`;

  return (
    <div className="quiz">
      <div className="steps" role="tablist" aria-label="Progress">
        {questions.map((_, n) => (
          <button key={n} aria-label={`Question ${n + 1}`} className={n < step ? "done" : n === step ? "cur" : ""} onClick={() => ans.slice(0, n).every((a) => a !== null) && setStep(n)} />
        ))}
      </div>

      {!finished && (
        <>
          <div className="q-num">Question {step + 1} of {total}</div>
          <h2>{questions[step].q}</h2>
          <div className="opts" role="radiogroup">
            {questions[step].a.map((o, i) => (
              <button key={o} role="radio" aria-checked={ans[step] === i} className={`opt ${ans[step] === i ? "sel" : ""}`} onClick={() => choose(i)}>
                <span className="rad" />{o}
              </button>
            ))}
          </div>
          <div className="q-nav">
            <button className="btn btn-ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>← Back</button>
            <button className="btn btn-primary" disabled={ans[step] === null} onClick={() => setStep(step + 1)}>{step === total - 1 ? "See result" : "Next →"}</button>
          </div>
        </>
      )}

      {finished && !form && (
        <div className="result">
          <div className="q-num">{kind === "fitness" ? "Your financial fitness" : "Your risk profile"}</div>
          <div className="score">{score}<small style={{ fontSize: 24, color: "var(--muted)" }}> / {maxScore}</small></div>
          <h2>{band.title}</h2>
          <p>{band.text}</p>
          <div className="meter"><i style={{ width: `${pct}%` }} /></div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 30, flexWrap: "wrap" }}>
            <button className="btn btn-ghost" onClick={() => { setStep(0); setAns(questions.map(() => null)); }}>Retake</button>
            <button className="btn btn-primary" onClick={() => setForm(true)}>Send my result to Shah Financial →</button>
          </div>
          <p className="note" style={{ marginTop: 22 }}>This questionnaire is for general self-assessment only and is not investment advice. Shah Financial Services is NOT a SEBI Registered Investment Adviser.</p>
        </div>
      )}

      {finished && form && (
        <>
          <h2 style={{ marginTop: 6 }}>{kind === "fitness" ? "Health Form" : "Risk Form"}</h2>
          <LeadForm subject={subject} extra={extra} onBack={() => setForm(false)} />
        </>
      )}
    </div>
  );
}
