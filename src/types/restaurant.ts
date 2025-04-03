import type { ImageMetadata } from "astro";

export type RestaurantImage = {
  src: ImageMetadata;
  alt: string;
  width?: number;
  height?: number;
};

export type RestaurantData = {
  id: number;
  title: string;
  description?: string;
  image?: RestaurantImage;
};

export type RestaurantEntry = {
  data: RestaurantData;
  slug: string;
  body: string;
};
