import { config, fields, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'team-red/all-star-cleaning',
  },
  singletons: {
    homepage: singleton({
      label: 'Homepage',
      path: 'src/content/homepage',
      format: { data: 'json' },
      schema: {

        // ──────────────────────────────────────────
        // HERO SECTION
        // ──────────────────────────────────────────
        heroImage: fields.image({
          label: 'Hero Background Photo',
          description: 'The large background photo at the top of the page',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        heroHeadlineEn: fields.text({
          label: 'Hero Headline (English)',
          defaultValue: "Ottawa's Trusted Exterior Cleaning Services",
        }),
        heroHeadlineFr: fields.text({
          label: 'Hero Headline (French)',
          defaultValue: 'Services de Nettoyage Extérieur de Confiance à Ottawa',
        }),
        heroSubtitleEn: fields.text({
          label: 'Hero Subtitle (English)',
          multiline: true,
          defaultValue: "From window cleaning to gutters and pressure washing, we've got you covered.",
        }),
        heroSubtitleFr: fields.text({
          label: 'Hero Subtitle (French)',
          multiline: true,
          defaultValue: 'Du nettoyage de vitres aux gouttières et au lavage sous pression, nous nous occupons de tout.',
        }),

        // ──────────────────────────────────────────
        // TRUST BADGES (Phone & Google Reviews)
        // ──────────────────────────────────────────
        phone: fields.text({
          label: 'Phone Number (displayed on site)',
          defaultValue: '(613) 314-3300',
        }),
        phoneLink: fields.text({
          label: 'Phone Number (for calling, no spaces)',
          defaultValue: '+16133143300',
        }),
        googleReviewCount: fields.integer({
          label: 'Google Review Count',
          defaultValue: 16,
        }),
        googleRating: fields.text({
          label: 'Google Rating (e.g. 5/5)',
          defaultValue: '5/5',
        }),

        // ──────────────────────────────────────────
        // STATS BAR
        // ──────────────────────────────────────────
        statsRatingEn: fields.text({ label: 'Stats: Rating label (English)', defaultValue: 'verified Google reviews' }),
        statsRatingFr: fields.text({ label: 'Stats: Rating label (French)', defaultValue: 'avis Google vérifiés' }),
        statsSatisfactionEn: fields.text({ label: 'Stats: Satisfaction label (English)', defaultValue: 'Satisfaction guaranteed' }),
        statsSatisfactionFr: fields.text({ label: 'Stats: Satisfaction label (French)', defaultValue: 'Satisfaction garantie' }),
        statsDaysEn: fields.text({ label: 'Stats: Days label (English)', defaultValue: 'Open every day of the week' }),
        statsDaysFr: fields.text({ label: 'Stats: Days label (French)', defaultValue: 'Ouvert chaque semaine' }),

        // ──────────────────────────────────────────
        // "WHY CHOOSE ALL STAR?" SECTION
        // ──────────────────────────────────────────
        teamImage: fields.image({
          label: '"Why Choose All Star?" — Team Photo',
          description: 'Photo displayed beside the "Why Choose All Star?" section',
          directory: 'public/images',
          publicPath: '/images/',
        }),

        // ──────────────────────────────────────────
        // "HOW IT WORKS" SECTION
        // ──────────────────────────────────────────
        beforeAfterImage: fields.image({
          label: '"How It Works" — Before & After Photo',
          description: 'Photo shown at the bottom of the "How It Works" section',
          directory: 'public/images',
          publicPath: '/images/',
        }),

        // ──────────────────────────────────────────
        // CTA SECTION (Bottom of page)
        // ──────────────────────────────────────────
        ctaImage: fields.image({
          label: 'CTA Background Photo',
          description: 'Background photo for the "Ready to Get Started?" section',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        ctaHeadlineEn: fields.text({ label: 'CTA Headline (English)', defaultValue: 'Ready to Get Started?' }),
        ctaHeadlineFr: fields.text({ label: 'CTA Headline (French)', defaultValue: 'Prêt à Commencer?' }),
        ctaSubtitleEn: fields.text({
          label: 'CTA Subtitle (English)',
          multiline: true,
          defaultValue: "Contact us today for a free quote. We're open 7 days a week!",
        }),
        ctaSubtitleFr: fields.text({
          label: 'CTA Subtitle (French)',
          multiline: true,
          defaultValue: "Contactez-nous dès aujourd'hui pour un devis gratuit. Nous sommes ouverts 7 jours par semaine!",
        }),

      },
    }),
  },
});
