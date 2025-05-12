// src/types/content.ts
import type { ImageMetadata } from "astro";
import type { CollectionEntry } from "astro:content";
export type BaseImage = {
  src: ImageMetadata;
  alt: string;
  width?: number;
  height?: number;
};

export type RestaurantEntry = CollectionEntry<"restaurant">;
export type NearbyEntry = CollectionEntry<"nearby">;
