// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import rehypeClassNames from 'rehype-class-names';
import remarkSupersub from 'remark-supersub';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import icon from 'astro-icon';
import { unified } from '@astrojs/markdown-remark';

import {
  h1Styles,
  h2Styles,
  h3Styles,
  h4Styles,
  h5Styles,
  h6Styles,
  linkStyles,
} from './src/components/typography';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    processor: unified({
      remarkPlugins: [
        // @ts-ignore: remark-supersub plugin type mismatch.
        remarkSupersub,
        remarkMath,
      ],
      rehypePlugins: [
        rehypeKatex,
        [
          rehypeClassNames,
          {
            p: 'text-black/85 dark:text-white/85 text-base/7 md:text-lg/9 text-left sm:text-justify mb-6',
            a: linkStyles,
            h1: h1Styles,
            h2: h2Styles,
            h3: h3Styles,
            h4: h4Styles,
            h5: h5Styles,
            h6: h6Styles,
            ul: 'list-disc pl-6 mb-4',
            ol: 'list-decimal pl-6 mb-4 [&_ol]:list-[lower-greek] [&_ol_ol]:list-[lower-roman]',
            li: 'text-black/90 dark:text-white/90 text-base/7 md:text-lg/9 text-left sm:text-justify',
            pre: 'p-4 font-mono bg-black/5 overflow-x-auto mb-6',
            blockquote:
              'text-base/loose pl-4 border-l-4 border-black/10 dark:border-white/10 mb-4',
            table:
              'w-full border-collapse mb-6 overflow-x-auto text-sm md:text-base',
            thead: 'bg-black/5 dark:bg-white/10',
            th: 'border border-black/10 dark:border-white/10 px-4 py-2 font-semibold text-black/90 dark:text-white/90',
            td: 'border border-black/10 dark:border-white/10 px-4 py-2 text-black/80 dark:text-white/80',
            tbody: 'bg-white dark:bg-transparent',
            'tr:nth-child(even)': 'bg-black/5 dark:bg-white/5', // striped rows
            img: 'w-full',
            hr: 'my-10 text-black/15',
          },
        ],
      ],
      remarkRehype: {
        footnoteLabel: 'Σημειώσεις',
      },
    }),
    shikiConfig: {
      theme: 'catppuccin-macchiato',
    },
  },
  integrations: [
    icon({
      iconDir: 'src/assets/icons',
    }),
  ],
});
