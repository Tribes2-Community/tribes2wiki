import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        /** Categories the page carried on the original MediaWiki wiki. */
        categories: z.array(z.string()).default([]),
        /**
         * Provenance for content recovered from the Internet Archive.
         * Absent on pages written fresh by the current community.
         */
        source: z
          .object({
            /** Original URL on tribes2wiki.com. */
            url: z.string().url(),
            /** Wayback capture this page was recovered from. */
            archived: z.string(),
            /** "Last modified" date shown in the original page footer. */
            lastModified: z.string().optional(),
          })
          .optional(),
        /** Set on placeholder pages for articles the archive never captured. */
        stub: z.boolean().default(false),
        /**
         * Where material on this page came from, when it came from an identifiable
         * author outside this project. There is no site-wide content licence, so
         * each page carries its own terms, and outside authors keep their copyright
         * in their own work.
         */
        attribution: z
          .array(
            z.object({
              /** The work, e.g. "TribesNEXT: A newbie's guide". */
              source: z.string(),
              /** Who wrote it. */
              author: z.string(),
              url: z.string().url().optional(),
              /** Licence it is offered under, if any. */
              license: z.string().optional(),
              /** What was taken: "adapted", "quoted", "used as reference". */
              extent: z.string().optional(),
            }),
          )
          .default([]),
      }),
    }),
  }),
};
