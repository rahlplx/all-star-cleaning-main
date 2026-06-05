// Schema.org WebSite JSON-LD — enables Google Sitelinks Searchbox and AEO knowledge graph
export function getWebSiteSchema(locale: 'en' | 'fr') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://allstarcleaning.ca/#website',
    name: 'All Star Cleaning',
    url: 'https://allstarcleaning.ca',
    description: locale === 'fr'
      ? "Service de nettoyage extérieur de confiance à Ottawa. Devis gratuits."
      : "Ottawa's trusted exterior cleaning service. Free quotes.",
    publisher: { '@id': 'https://allstarcleaning.ca/#business' },
    inLanguage: ['en-CA', 'fr-CA'],
  };
}
