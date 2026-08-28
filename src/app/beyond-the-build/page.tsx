import Link from "next/link";

import PhotographyGallery from "@/components/gallery/PhotographyGallery";
import { galleryItems } from "@/data/gallery";

export default function BeyondTheBuildPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#171717]">
      <section className="border-b border-black/5">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Link
            href="/"
            className="text-sm text-black/45 transition hover:text-black"
          >
            ← Back to Portfolio
          </Link>

          <p className="mt-12 text-sm font-medium uppercase tracking-[0.2em] text-black/40">
            Beyond the Build
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Things that catch my attention away from the keyboard.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-black/55">
            A small collection of places, moments, details,
            and scenes I&apos;ve photographed along the way.
            Not everything I enjoy building happens on a screen.
          </p>

          <PhotographyGallery
            items={galleryItems}
          />
        </div>
      </section>

      <footer className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-black/40">
          Photographed by Patrick Daniel V. Romero.
        </div>
      </footer>
    </main>
  );
}