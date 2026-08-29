export default function ContactSection() {
  return (
    <section className="border-t border-black/5 bg-[#171717] text-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
          Contact
        </p>

        <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
          Interested in building something useful together?
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/55">
          I&apos;m open to remote development opportunities,
          AI-assisted product work, internal tools, workflow
          automation, and modern web application projects.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="mailto:rompatero@gmail.com"
            className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-black"
          >
            Email Me
          </a>

          <a
            href="GITHUB_URL_HERE"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-white/80"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}