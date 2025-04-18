// src/types/content.ts
import type { ImageMetadata } from "astro";
import type { CollectionEntry } from "astro:content";
// Shared image structure (can be reused across content types)
export type BaseImage = {
  src: ImageMetadata;
  alt: string;
  width?: number;
  height?: number;
};

// Use Astro's built-in collection entry types
export type RestaurantEntry = CollectionEntry<"restaurant">;
export type NearbyEntry = CollectionEntry<"nearby">;
