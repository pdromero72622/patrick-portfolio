import SectionLabel from "@/components/ui/SectionLabel";
import Link from "next/link";

export default function AIWorkflowSection() {
  return (
    <section id="ai" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel>Built With AI</SectionLabel>

            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
              AI is part of the workflow, not a substitute for understanding
              the problem.
            </h2>

            <Link
              href="/ai-development"
              className="mt-7 inline-flex text-sm font-medium transition hover:underline"
            >
              View the AI development log →
            </Link>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-[#f7f7f5] p-7">
              <p className="text-xs font-medium uppercase tracking-wider text-black/35">
                Problem
              </p>

              <p className="mt-3 leading-7">
                Understand unfamiliar code and determine where a business rule
                actually belongs.
              </p>
            </div>

            <div className="rounded-3xl bg-[#f7f7f5] p-7">
              <p className="text-xs font-medium uppercase tracking-wider text-black/35">
                AI Contribution
              </p>

              <p className="mt-3 leading-7">
                Explore architecture, trace possible dependencies, compare
                implementation approaches, and surface edge cases.
              </p>
            </div>

            <div className="rounded-3xl bg-[#f7f7f5] p-7">
              <p className="text-xs font-medium uppercase tracking-wider text-black/35">
                Human Decision
              </p>

              <p className="mt-3 leading-7">
                Validate the proposed solution against the codebase, data,
                business requirements, and actual application behavior before
                implementing it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}