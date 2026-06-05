// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

/**
 * Tech-Stack Obfuscation Vite Plugin
 *
 * Renames all technology-identifying patterns in production builds to defeat
 * Wappalyzer / BuiltWith / WhatRuns fingerprinting:
 *
 * CSS:  --tw-* → --c-*  |  @layer names → generic  |  [data-astro-cid-] → [data-v-]
 * HTML: <meta name="generator"> removed  |  astro-island → x-frame
 *       astro-slot → x-slot  |  data-astro-cid- → data-v-
 * JS:   --tw-* → --c-*  |  "astro-island" → "x-frame"  |  "astro-slot" → "x-slot"
 *       data-astro-cid- → data-v-
 *
 * HTML and JS renames MUST stay in sync — astro-island is a customElements.define()
 * registration; the string must match between the HTML element name and the JS call.
 */
function obfuscateTechStack() {
  const layerMap = {
    'properties': 'base-props',
    'theme': 'design-tokens',
    'base': 'reset',
    'utilities': 'helpers',
    'components': 'blocks',
  };

  return {
    name: 'obfuscate-tech-stack',
    enforce: 'post',
    generateBundle(options, bundle) {
      for (const [fileName, chunk] of Object.entries(bundle)) {
        // CSS: custom props, layer names, Astro scoped-style selector prefix
        if (chunk.type === 'asset' && chunk.fileName.endsWith('.css')) {
          let css = chunk.source;
          // Covers --tw-* declarations, var(--tw-*) references, and @property --tw-*
          css = css.replace(/--tw-/g, '--c-');
          for (const [twName, genericName] of Object.entries(layerMap)) {
            css = css.replace(new RegExp(`@layer\\s+${twName}\\s*\\{`, 'g'), `@layer ${genericName}{`);
            css = css.replace(new RegExp(`@layer\\s+${twName}\\s*;`, 'g'), `@layer ${genericName};`);
            css = css.replace(new RegExp(`,\\s*${twName}\\b`, 'g'), `,${genericName}`);
          }
          // [data-astro-cid-xxxxxxxx] → [data-v-xxxxxxxx] (Vue-like; confuses scanners)
          css = css.replace(/\[data-astro-cid-/g, '[data-v-');
          chunk.source = css;
        }

        // HTML: remove generator tag, rename Astro custom element + scoped attributes
        if (chunk.type === 'asset' && chunk.fileName.endsWith('.html')) {
          if (typeof chunk.source === 'string') {
            let html = chunk.source;
            // Primary Astro fingerprint: <meta name="generator" content="Astro vX.Y.Z">
            html = html.replace(/<meta\s+name=["']generator["'][^>]*\/?>/gi, '');
            // Custom element — must match the JS customElements.define() rename below
            html = html.replace(/<astro-island(\s|\/|>)/g, '<x-frame$1');
            html = html.replace(/<\/astro-island>/g, '</x-frame>');
            // Slot attribute — must match querySelector('[astro-slot]') rename in JS
            html = html.replace(/\bastro-slot=/g, 'x-slot=');
            // Scoped style attribute — must match CSS [data-astro-cid-] rename above
            html = html.replace(/data-astro-cid-/g, 'data-v-');
            chunk.source = html;
          }
        }

        // JS: custom props + Astro runtime identifier strings
        if (chunk.type === 'chunk' && chunk.fileName.endsWith('.js')) {
          if (typeof chunk.code === 'string') {
            let code = chunk.code;
            if (code.includes('--tw-')) code = code.replace(/--tw-/g, '--c-');
            // customElements.define('astro-island', ...) → customElements.define('x-frame', ...)
            code = code.replace(/astro-island/g, 'x-frame');
            // querySelector('[astro-slot]') → querySelector('[x-slot]')
            code = code.replace(/astro-slot/g, 'x-slot');
            // setAttribute('data-astro-cid-xxx') → setAttribute('data-v-xxx')
            code = code.replace(/data-astro-cid-/g, 'data-v-');
            chunk.code = code;
          }
        }
      }
    },
  };
}

/**
 * Strip HTML Comments Plugin
 *
 * Removes all HTML comments from generated pages.
 * Frameworks often inject comments like <!-- Astro... --> that
 * reveal the technology stack to detection tools.
 */
function stripHtmlComments() {
  return {
    name: 'strip-html-comments',
    enforce: 'post',
    generateBundle(options, bundle) {
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'asset' && chunk.fileName.endsWith('.html')) {
          if (typeof chunk.source === 'string') {
            // Remove HTML comments but preserve conditional comments
            chunk.source = chunk.source.replace(/<!--\s*(?!\[if)(?!<!)(?!\[endif)[\s\S]*?-->/g, '');
          }
        }
      }
    },
  };
}

export default defineConfig({
  output: 'static',
  adapter: cloudflare({
    prerenderEnvironment: 'node',
    imageService: 'passthrough',
  }),
  // CANONICAL_DOMAIN — must stay in sync with `siteUrl` in src/layouts/BaseLayout.astro.
  // Both values are used independently: this one for Astro sitemap generation,
  // BaseLayout's for canonical URLs and all JSON-LD schema output.
  site: 'https://allstarcleaning.ca',

  // === TECH-STACK OBFUSCATION ===
  // Rename /_astro/ → /static/ to defeat Astro path detection
  build: {
    assets: 'static',
  },

  // Remove dev toolbar in production (contains Astro identifiers)
  devToolbar: {
    enabled: false,
  },

  integrations: [
    react(),
    markdoc(),
    keystatic(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', fr: 'fr' },
      },
    }),
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: 'manual',
  },

  vite: {
    optimizeDeps: {
      exclude: ['virtual:keystatic-config', 'virtual:keystatic-content-components'],
    },
    resolve: {
      alias: { '@': '/src' },
    },
    build: {
      // Never generate source maps — they reveal original file structure
      sourcemap: false,
      // Minify aggressively to remove comments and identifiers
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
        },
        format: {
          comments: false,
        },
      },
      rollupOptions: {
        output: {
          // Generic chunk naming — no framework identifiers
          chunkFileNames: 'static/[name].[hash].js',
          entryFileNames: 'static/[name].[hash].js',
          assetFileNames: 'static/[name].[hash][extname]',
        },
      },
    },
    css: {
      devSourcemap: false,
    },
    plugins: [
      obfuscateTechStack(),
      stripHtmlComments(),
    ],
  },
});
