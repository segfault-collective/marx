import { z, reference } from 'astro:content';
import { type Marginalia } from './marginalia';

export const postSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string().url().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  publishedAt: z.coerce.date(),
  downloadPath: z.string().optional(),
  marginalia: z.array(reference('marginalia')).default([]),
});

export type Post = z.infer<typeof postSchema>;

export type PostWithMarginalia = Omit<Post, 'marginalia'> & {
  marginalia: Marginalia[];
};

export const getDisplayDate = (post: Pick<Post, 'publishedAt'>) =>
  `Δημοσιεύτηκε στις ${post.publishedAt.toLocaleDateString('el-GR')}`;
