import Link from "next/link";

import { aiDevelopmentEntries } from "@/data/aiDevelopment";

export default function AIDevelopmentPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#171717]">
      <section className="border-b border-black/5">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <Link
            href="/"
            className="text-sm text-black/45 transition hover:text-black"
          >
            ← Back to Portfolio
          </Link>

          <p className="mt-12 text-sm font-medium uppercase tracking-[0.2em] text-black/40">
            AI Development Log
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            How AI helped me build this project — and where judgment still mattered.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-black/55">
            This project was built through an AI-assisted workflow. The goal
            was not to accept generated code blindly, but to use AI to explore
            approaches, challenge assumptions, debug issues, and iterate faster
            while validating decisions against actual framework behavior,
            runtime results, and application requirements.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="space-y-6">
          {aiDevelopmentEntries.map((entry) => (
            <article
              key={entry.id}
              className="rounded-3xl border border-black/5 bg-white p-7 shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-black/35">
                    {entry.stage}
                  </p>

                  <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                    {entry.title}
                  </h2>
                </div>

                <span className="rounded-full bg-black/[0.04] px-3 py-1.5 text-xs text-black/45">
                  AI-assisted
                </span>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <LogBlock
                  label="Problem"
                  text={entry.problem}
                />

                <LogBlock
                  label="AI Contribution"
                  text={entry.aiContribution}
                />

                <LogBlock
                  label="Human Decision"
                  text={entry.humanDecision}
                />

                <LogBlock
                  label="Outcome"
                  text={entry.outcome}
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

type LogBlockProps = {
  label: string;
  text: string;
};

function LogBlock({
  label,
  text,
}: LogBlockProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-black/35">
        {label}
      </p>

      <p className="mt-3 leading-7 text-black/65">
        {text}
      </p>
    </div>
  );
}