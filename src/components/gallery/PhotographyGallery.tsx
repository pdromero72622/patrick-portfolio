"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import type {
  GalleryCategory,
  GalleryItem,
} from "@/types/gallery";

type PhotographyGalleryProps = {
  items: GalleryItem[];
};

type GalleryFilter = "All" | GalleryCategory;

const filters: GalleryFilter[] = [
  "All",
  "Places",
  "Street",
  "Details",
  "Moments",
];

export default function PhotographyGallery({
  items,
}: PhotographyGalleryProps) {
  const [filter, setFilter] =
    useState<GalleryFilter>("All");

  const [selectedItem, setSelectedItem] =
    useState<GalleryItem | null>(null);

  const filteredItems = useMemo(() => {
    if (filter === "All") {
      return items;
    }

    return items.filter(
      (item) => item.category === filter
    );
  }, [filter, items]);

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2">
        {filters.map((item) => {
          const isActive = filter === item;

          return (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-black text-white"
                  : "border border-black/10 bg-white text-black/55 hover:bg-black/[0.03]"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedItem(item)}
            className="group text-left"
          >
            <div
              className={`relative overflow-hidden rounded-3xl bg-black/[0.06] ${
                index % 3 === 1
                  ? "aspect-[4/5]"
                  : "aspect-[4/4.4]"
              }`}
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto h-10 w-10 rounded-full border border-black/10" />

                    <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-black/25">
                      Photo Placeholder
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="px-1 pt-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-medium">
                    {item.title}
                  </h2>

                  {item.location && (
                    <p className="mt-1 text-sm text-black/40">
                      {item.location}
                    </p>
                  )}
                </div>

                <span className="rounded-full bg-black/[0.04] px-3 py-1 text-xs text-black/45">
                  {item.category}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Close image"
            onClick={() => setSelectedItem(null)}
            className="absolute right-6 top-6 rounded-full bg-white/10 px-4 py-2 text-xl text-white transition hover:bg-white/20"
          >
            ×
          </button>

          <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-[#171717] text-white shadow-2xl">
            <div className="grid lg:grid-cols-[1.4fr_0.6fr]">
              <div className="relative min-h-[420px] bg-white/5 lg:min-h-[650px]">
                {selectedItem.image ? (
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    fill
                    sizes="80vw"
                    className="object-contain"
                    priority
                  />
                ) : (
                  <div className="flex h-full min-h-[420px] items-center justify-center">
                    <p className="text-sm uppercase tracking-[0.18em] text-white/25">
                      Your photograph will appear here
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-end p-8">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/35">
                  {selectedItem.category}
                </p>

                <h2 className="mt-4 text-2xl font-semibold">
                  {selectedItem.title}
                </h2>

                <p className="mt-4 leading-7 text-white/55">
                  {selectedItem.description}
                </p>

                {(selectedItem.location ||
                  selectedItem.date) && (
                  <div className="mt-8 border-t border-white/10 pt-5 text-sm text-white/35">
                    {selectedItem.location && (
                      <p>{selectedItem.location}</p>
                    )}

                    {selectedItem.date && (
                      <p className="mt-1">
                        {selectedItem.date}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}