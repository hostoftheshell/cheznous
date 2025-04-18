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

const nearbyCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      id: z.number().int().positive(),
      title: z.string().max(50),
      description: z
        .string()
        .max(2000)
        .optional()
        .default("Aucune description fournie."),
      image: z
        .object({
          src: image(),
          alt: z.string().max(500).trim(),
        })
        .optional(),
      url: z.string().url().optional().nullable(),
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

const workinghoursCollection = defineCollection({
  schema: z.object({
    working_hours: z.object({
      lundi: z.object({
        midi: z.string(),
        soir: z.string(),
      }),
      mardi: z.object({
        midi: z.string(),
        soir: z.string(),
      }),
      mercredi: z.object({
        midi: z.string(),
        soir: z.string(),
      }),
      jeudi: z.object({
        midi: z.string(),
        soir: z.string(),
      }),
      vendredi: z.object({
        midi: z.string(),
        soir: z.string(),
      }),
      samedi: z.object({
        midi: z.string(),
        soir: z.string(),
      }),
      dimanche: z.object({
        midi: z.string(),
        soir: z.string(),
      }),
    }),
  }),
});

export const collections = {
  restaurant: restaurantCollection,
  nearby: nearbyCollection,
  global: globalCollection,
  menu: menuCollection,
  event: eventCollection,
  workinghours: workinghoursCollection,
};

export interface SiteConfig {
  titles: {
    SITE_TITLE: string;
    HERO_TITLE: string;
  };
  socials: {
    instagram: string;
    facebook: string;
  };
  url: string;
  contact: {
    address: string;
    phone: string;
    phoneLink: string;
    email: string;
  };
  openingHours: string;
  slogan: string;
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

  contact: {
    address: "7 place de la Convention – 89270 Vermenton",
    phone: "03 86 51 89 56",
    phoneLink: "+33686518956",
    email: "contact@cheznous89270.com",
  },

  openingHours:
    "Ouvert du mardi au samedi de 11h30 à 14h30 et de 18h30 à 21h. Le dimanche, uniquement le midi de 11h30 à 14h30.",
  slogan: "Pizzas artisanales préparées à la maison",
};
