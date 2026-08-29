import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import Link from "next/link";

export default function BeyondBuildSection() {
  return (
    <section id="beyond" className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionLabel>Beyond the Build</SectionLabel>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Things that catch my attention away from the keyboard.
          </h2>

          <p className="mt-5 max-w-lg leading-7 text-black/55">
            A future collection of photographs, places, moments, and details
            I&apos;ve captured outside of development work.
          </p>
          <Link
            href="/beyond-the-build"
            className="mt-7 inline-flex text-sm font-medium transition hover:underline"
          >
            Explore the gallery →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src="/gallery/quiet-streets-1.jpg"
              alt="A quiet road at sunset with mountains in the distance"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>

          <div className="relative mt-10 aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src="/gallery/a-different-view-1.jpg"
              alt="A calm lakeside scene at sunset with a dock and small boats"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}