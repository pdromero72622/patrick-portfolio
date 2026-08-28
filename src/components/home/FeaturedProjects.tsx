import SectionLabel from "@/components/ui/SectionLabel";
import { projects } from "@/data/projects";

export default function FeaturedProjects() {
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
            <div className="mb-12 h-12 w-12 rounded-2xl bg-black" />

            <h3 className="text-xl font-semibold tracking-tight">
              {project.title}
            </h3>

            <p className="mt-4 leading-7 text-black/55">
              {project.description}
            </p>

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