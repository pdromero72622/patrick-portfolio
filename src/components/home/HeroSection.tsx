import { skills } from "@/data/skills";

export default function HeroSection() {
  return (
    <section className="mx-auto flex min-h-[82vh] max-w-6xl items-center px-6 py-24">
      <div className="max-w-4xl">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.22em] text-black/45">
          Developer · Problem Solver · AI-Assisted Builder
        </p>

        <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-6xl md:text-7xl">
          I build systems that turn complex workflows into working software.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-black/60">
          Enterprise developer exploring AI-native product development,
          workflow automation, modern web technologies, and better ways to turn
          business requirements into practical solutions.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-black/80"
          >
            View Projects
          </a>

          <a
            href="#workflow-demo"
            className="rounded-full border border-black/15 px-6 py-3 text-sm font-medium transition hover:bg-black/5"
          >
            Explore Workflow Demo
          </a>
        </div>

        <div className="mt-12 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black/60"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}