import { defineMiddleware } from 'astro:middleware';
import { middleware } from 'astro:i18n';

const locales = ['en', 'fr'];

// Astro's built-in i18n middleware with prefixDefaultLocale behavior
const astroI18nMiddleware = middleware({
  redirectToDefaultLocale: true,
  prefixDefaultLocale: true,
});

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Let Keystatic admin UI and its API routes pass through freely.
  // These must NOT be intercepted by the i18n router.
  if (pathname.startsWith('/keystatic') || pathname.startsWith('/api/keystatic')) {
    return next();
  }

  // For everything else, run Astro's standard i18n routing
  return astroI18nMiddleware(context, next);
});
