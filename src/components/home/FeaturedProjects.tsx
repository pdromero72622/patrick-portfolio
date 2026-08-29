import SectionLabel from "@/components/ui/SectionLabel";
import { projects } from "@/data/projects";
import Link from "next/link";
import {
  Factory,
  Truck,
  Workflow,
} from "lucide-react";

export default function FeaturedProjects() {
  const projectIcons = {
    "production-planning": Factory,
    "delivery-scheduling": Truck,
    "workflow-operations": Workflow,
  };
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12">
        <SectionLabel>Featured Work</SectionLabel>

        <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
          Systems, workflows, and things I&apos;ve helped make real.
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="flex min-h-[340px] flex-col rounded-3xl border border-black/8 bg-white p-7"
          >
            {(() => {
              const Icon =
                projectIcons[
                  project.slug as keyof typeof projectIcons
                ];

              return (
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
              );
            })()}

            <h3 className="text-xl font-semibold tracking-tight">
              {project.title}
            </h3>

            <p className="mt-4 leading-7 text-black/55">
                {project.summary}
            </p>

            <Link
                href={`/projects/${project.slug}`}
                className="mt-6 inline-flex text-sm font-medium text-black transition hover:underline"
            >
                View case study →
            </Link>

            <div className="mt-auto flex flex-wrap gap-2 pt-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-black/[0.04] px-3 py-1.5 text-xs text-black/55"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}