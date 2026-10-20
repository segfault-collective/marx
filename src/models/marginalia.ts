import { z } from 'astro/zod';

export const marginaliaSchema = z.object({
  slug: z.string(),
  title: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  publishedAt: z.coerce.date(),
  downloadPath: z.string().optional(),
});

export type Marginalia = z.infer<typeof marginaliaSchema>;

export const getDisplayDate = (marginalia: Pick<Marginalia, 'publishedAt'>) =>
  `Δημοσιεύτηκε στις ${marginalia.publishedAt.toLocaleDateString('el-GR')}`;
