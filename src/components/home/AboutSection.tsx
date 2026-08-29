import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";

export default function AboutSection() {
  return (
    <section id="about" className="border-t border-black/5 bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionLabel>About</SectionLabel>

          <div className="relative mt-8 aspect-[4/5] max-w-md overflow-hidden rounded-3xl bg-black/[0.04]">
            <Image
              src="/profile/about-profile.png"
              alt="Patrick Romero outdoors"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority={false}
            />
          </div>
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
            breaking complicated requirements into smaller technical problems
            and turning them into solutions that actually work.
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-black/60">
            More recently, AI has become part of that process. I use tools such
            as ChatGPT and Claude to explore approaches, analyze code,
            investigate errors, challenge assumptions, and iterate faster while
            keeping the final technical decisions grounded in actual
            requirements and system behavior.
          </p>
        </div>
      </div>
    </section>
  );
}