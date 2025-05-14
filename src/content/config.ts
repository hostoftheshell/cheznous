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
    carte: z.object({
      title: z.string().max(50),
      url: z.string(),
    }),
    vins: z.object({
      title: z.string().max(50),
      url: z.string(),
    }),
    special: z
      .object({
        title: z.string().max(50),
        url: z.string(),
      })
      .optional(),
  }),
});

const closureCollection = defineCollection({
  schema: z.object({
    closure: z.object({
      isVisible: z.boolean().default(false),
      title: z.string().default(""),
      description: z.string().default(""),
      tag: z.string().default(""),
    }),
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

const settingsCollection = defineCollection({
  schema: z.object({
    site_title: z.string(),
    description: z.object({
      accueil: z.string(),
      mentions_legales: z.string(),
      politique_de_confidentialite: z.string(),
    }),
    hero_title: z.string(),
    socials: z.object({
      instagram: z.string().url(),
      facebook: z.string().url(),
    }),
    contact: z.object({
      address: z.string(),
      phone: z.string(),
      phone_link: z.string(),
      email: z.string().email(),
    }),
    opening_hours: z.string(),
    slogan: z.string(),
  }),
});

const legalCollection = defineCollection({
  type: "content",
  schema: undefined,
});

export const collections = {
  restaurant: restaurantCollection,
  nearby: nearbyCollection,
  global: globalCollection,
  menu: menuCollection,
  event: eventCollection,
  closure: closureCollection,
  workinghours: workinghoursCollection,
  site: settingsCollection,
  legal: legalCollection,
};
