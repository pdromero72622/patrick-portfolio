const skills = [
  "ASP.NET",
  "SQL Server",
  "REST APIs",
  "Next.js",
  "TypeScript",
  "Supabase",
  "AI-Assisted Development",
];

const projects = [
  {
    title: "Production Planning & Sequencing Platform",
    description:
      "Enterprise manufacturing system supporting production planning, scheduling, sequencing, reporting, API integrations, and multi-environment deployment.",
    tags: ["Enterprise Systems", "SQL", "APIs", "Azure DevOps"],
  },
  {
    title: "Delivery Scheduling & Approval Platform",
    description:
      "Enterprise logistics workflow supporting delivery schedules, supplier coordination, approvals, reporting, and complex business rules.",
    tags: ["Workflow Design", "MVC", "SQL", "Business Logic"],
  },
  {
    title: "Workflow Operations Demo",
    description:
      "A modern internal-tool style application demonstrating request creation, approval workflows, activity history, filtering, and reporting.",
    tags: ["Next.js", "TypeScript", "Supabase", "AI-Assisted"],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#171717]">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f7f7f5]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="#" className="text-lg font-semibold tracking-tight">
            Patrick Romero
          </a>

          <nav className="hidden gap-8 text-sm text-black/60 md:flex">
            <a href="#about" className="transition hover:text-black">
              About
            </a>
            <a href="#projects" className="transition hover:text-black">
              Projects
            </a>
            <a href="#ai" className="transition hover:text-black">
              AI Workflow
            </a>
            <a href="#beyond" className="transition hover:text-black">
              Beyond the Build
            </a>
          </nav>
        </div>
      </header>

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
            workflow automation, modern web technologies, and better ways to
            turn business requirements into practical solutions.
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

      <section id="about" className="border-t border-black/5 bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/40">
              About
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              I like figuring out how things work — especially when the answer
              is not obvious.
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-black/60">
              My background is in enterprise web application development,
              working across business workflows, APIs, databases, reporting,
              deployment environments, and established codebases. I enjoy
              breaking complicated requirements into smaller technical
              problems and turning them into solutions that actually work.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-black/60">
              More recently, AI has become part of that process. I use tools
              such as ChatGPT and Claude to explore approaches, analyze code,
              investigate errors, challenge assumptions, and iterate faster
              while keeping the final technical decisions grounded in actual
              requirements and system behavior.
            </p>
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/40">
            Featured Work
          </p>

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

      <section id="workflow-demo" className="bg-[#171717] text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
              Interactive Project
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              Workflow Operations Demo
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/55">
              A small business workflow application built to demonstrate the
              full loop: creating a request, saving drafts, submitting for
              review, approving or rejecting work, and tracking activity.
            </p>

            <div className="mt-8">
              <span className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/60">
                Coming next
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm text-white/40">Request</p>
                <p className="mt-1 font-medium">REQ-0012</p>
              </div>

              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/70">
                Pending Approval
              </span>
            </div>

            <div className="space-y-6 py-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-white/35">
                  Title
                </p>
                <p className="mt-2">Supplier Delivery Schedule Adjustment</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/35">
                    Category
                  </p>
                  <p className="mt-2 text-white/75">Operations</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-white/35">
                    Priority
                  </p>
                  <p className="mt-2 text-white/75">High</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="text-xs uppercase tracking-wider text-white/35">
                  Recent Activity
                </p>

                <div className="mt-5 space-y-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-white/70">
                      Submitted for approval
                    </span>
                    <span className="text-white/35">09:41</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-white/70">Saved as draft</span>
                    <span className="text-white/35">09:36</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-white/70">Request created</span>
                    <span className="text-white/35">09:32</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ai" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/40">
                Built With AI
              </p>

              <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
                AI is part of the workflow, not a substitute for understanding
                the problem.
              </h2>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl bg-[#f7f7f5] p-7">
                <p className="text-xs font-medium uppercase tracking-wider text-black/35">
                  Problem
                </p>
                <p className="mt-3 leading-7">
                  Understand unfamiliar code and determine where a business
                  rule actually belongs.
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

      <section id="beyond" className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/40">
              Beyond the Build
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Things that catch my attention away from the keyboard.
            </h2>

            <p className="mt-5 max-w-lg leading-7 text-black/55">
              A future collection of photographs, places, moments, and details
              I&apos;ve captured outside of development work.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[4/5] rounded-3xl bg-black/10" />
            <div className="mt-10 aspect-[4/5] rounded-3xl bg-black/5" />
          </div>
        </div>
      </section>

      <footer className="border-t border-black/5 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-black/45 sm:flex-row sm:items-center sm:justify-between">
          <p>Patrick Daniel V. Romero</p>
          <p>Built with Next.js, TypeScript & AI-assisted development.</p>
        </div>
      </footer>
    </main>
  );
}