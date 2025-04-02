import { defineCollection, z } from "astro:content";

const restaurantCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      id: z.number().int().positive(),
      title: z.string().max(50),
      description: z
        .string()
        .max(200)
        .optional()
        .default("Aucune description fournie."),
      image: z
        .object({
          src: image(),
          alt: z.string().max(500).trim(),
        })
        .optional(),
    }),
});

const globalCollection = defineCollection({
  schema: z.object({
    // Adjust fields to match your restaurant-text.md frontmatter
    heading: z.string().max(50),
    subheading: z.string().max(50),
    paragraph: z.string().max(1500).optional().default("Aucun texte fournie."),
  }),
});

export const collections = {
  restaurant: restaurantCollection,
  global: globalCollection,
};
