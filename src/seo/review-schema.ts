// Schema.org Review JSON-LD — All Star Cleaning — Astro v6
export interface ReviewData {
  author: string;
  rating: number;
  text: string;
  service: string;
  date: string;
}

export function getReviewSchema(reviews: ReviewData[], locale: 'en' | 'fr') {
  return reviews.map((review) => ({
    '@context': 'https://schema.org',
    '@type': 'Review' as const,
    author: {
      '@type': 'Person',
      name: review.author,
    },
    datePublished: review.date,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(review.rating),
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: review.text,
    itemReviewed: {
      '@type': 'LocalBusiness',
      // @id links this Review to the canonical LocalBusiness node in the knowledge graph
      '@id': 'https://allstarcleaning.ca/#business',
      name: 'All Star Cleaning Ottawa',
    },
  }));
}
