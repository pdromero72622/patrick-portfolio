import Link from "next/link";

import type { Project } from "@/types/project";

type ProjectCaseStudyProps = {
  project: Project;
};

export default function ProjectCaseStudy({
  project,
}: ProjectCaseStudyProps) {
  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#171717]">
      <section className="border-b border-black/5">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <Link
            href="/#projects"
            className="text-sm text-black/45 transition hover:text-black"
          >
            ← Back to Projects
          </Link>

          <p className="mt-12 text-sm font-medium uppercase tracking-[0.2em] text-black/40">
            Project Case Study
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
            {project.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-black/60">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black/55"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <InfoBlock
            title="My Role"
            text={project.role}
          />

          <InfoBlock
            title="Environment"
            text={project.environment}
          />
        </div>
      </section>

      <CaseStudySection
        title="The Problem"
        text={project.problem}
      />

      <ListSection
        title="What I Worked On"
        items={project.contribution}
      />

      <ListSection
        title="Technical Challenges"
        items={project.challenges}
      />

      <ListSection
        title="Tools & Technologies"
        items={project.tools}
        compact
      />

      <ListSection
        title="What I Learned"
        items={project.lessons}
      />

      <ListSection
        title="What I Would Improve Today"
        items={project.improvements}
      />

      {project.slug === "workflow-operations" && (
        <section className="border-t border-black/5 bg-[#171717] text-white">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <p className="text-sm uppercase tracking-[0.2em] text-white/40">
              Live Demo
            </p>

            <h2 className="mt-4 text-3xl font-semibold">
              Try the workflow yourself.
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-white/55">
              Create your own request, move it through the approval flow,
              and explore the reporting dashboard.
            </p>

            <Link
              href="/workflow"
              className="mt-8 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-medium text-black"
            >
              Open Workflow Demo →
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}

type InfoBlockProps = {
  title: string;
  text: string;
};

function InfoBlock({
  title,
  text,
}: InfoBlockProps) {
  return (
    <div>
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-black/35">
        {title}
      </p>

      <p className="mt-4 leading-7 text-black/65">
        {text}
      </p>
    </div>
  );
}

type CaseStudySectionProps = {
  title: string;
  text: string;
};

function CaseStudySection({
  title,
  text,
}: CaseStudySectionProps) {
  return (
    <section className="border-t border-black/5 bg-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-black/35">
          {title}
        </p>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-black/65">
          {text}
        </p>
      </div>
    </section>
  );
}

type ListSectionProps = {
  title: string;
  items: string[];
  compact?: boolean;
};

function ListSection({
  title,
  items,
  compact = false,
}: ListSectionProps) {
  return (
    <section className="border-t border-black/5">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-black/35">
          {title}
        </p>

        {compact ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black/60"
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div
                key={item}
                className="flex gap-4"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />

                <p className="leading-7 text-black/65">
                  {item}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}