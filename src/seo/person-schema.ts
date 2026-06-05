// Schema.org Person JSON-LD — All Star Cleaning — Astro v6
// NOTE: Only use this if the real founder's name is known.
// Passing a business name as Person.name is invalid Schema.org and hurts SEO.
// This function is intentionally NOT called from any page until a real name is available.
export function getFounderSchema(locale: 'en' | 'fr') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'All Star Cleaning Owner',
    jobTitle: locale === 'fr' ? 'Fondateur et Propriétaire' : 'Founder & Owner',
    description: locale === 'fr'
      ? "Fondateur d'All Star Cleaning, offrant des services de nettoyage extérieur de confiance à Ottawa."
      : 'Founder of All Star Cleaning, providing trusted exterior cleaning services in Ottawa.',
    worksFor: { '@id': 'https://allstarcleaning.ca/#business' },
  };
}
