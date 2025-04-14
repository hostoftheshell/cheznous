import { defineCollection, z } from "astro:content";

const eventCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      isVisible: z.boolean().default(true),
      heading: z.string().max(50).optional().nullable(),
      image: z.object({
        src: image(),
        alt: z.string().max(500).trim(),
      }),
      title: z.string().max(100),
      date: z.date(),
      time: z
        .string()
        .regex(/^\d{2}:\d{2}$/)
        .optional()
        .nullable(),
      description: z.string().max(1000),
      link: z.string().url().optional().nullable(),
    }),
});

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
    heading: z.string().max(50),
    subheading: z.string().max(50),
    paragraph: z.string().max(1500).optional().default("Aucun texte fournie."),
  }),
});

const menuCollection = defineCollection({
  schema: z.object({
    menus: z.array(
      z.object({
        title: z.string().max(50),
        url: z.string(),
      }),
    ),
  }),
});

export const collections = {
  restaurant: restaurantCollection,
  global: globalCollection,
  menu: menuCollection,
  event: eventCollection,
};

export interface Titles {
  SITE_TITLE: string;
  HERO_TITLE: string;
}

export interface SocialLinks {
  instagram: string;
  facebook?: string;
  [key: string]: string | undefined;
}

export interface SiteConfig {
  titles: Titles;
  socials: SocialLinks;
  url: string;
}

export const siteConfig: SiteConfig = {
  titles: {
    SITE_TITLE: "Chez Nous",
    HERO_TITLE: "Pizza,\nPasta,\nDolce vita",
  },
  socials: {
    instagram: "https://www.instagram.com/cheznous89270/",
    facebook: "https://www.facebook.com/cheznous89270/",
  },
  url: "https://cheznous89270.netlify.app/",
};
