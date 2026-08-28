export type GalleryCategory =
  | "Places"
  | "Street"
  | "Details"
  | "Moments";

export type GalleryItem = {
  id: number;
  title: string;
  description: string;
  category: GalleryCategory;
  location?: string;
  date?: string;
  image?: string;
};