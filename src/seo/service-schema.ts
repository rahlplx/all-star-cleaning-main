// Schema.org Service JSON-LD — All Star Cleaning — Astro v6
import type { Service } from '@/types';

export function getServiceSchema(service: Service, locale: 'en' | 'fr', url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: locale === 'fr' ? service.frName : service.name,
    description: locale === 'fr' ? service.frDescription : service.description,
    url,
    provider: { '@id': 'https://allstarcleaning.ca/#business' },
    areaServed: {
      '@type': 'City',
      name: 'Ottawa',
    },
    serviceType: locale === 'fr' ? service.frName : service.name,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'fr' ? service.frName : service.name,
      itemListElement: (locale === 'fr' ? service.frFeatures : service.features).map((feature) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: feature,
        },
      })),
    },
  };
}
