import type { Service } from '@/types';
import windowCleaning from '@/content/services/window-cleaning.json';
import gutterCleaning from '@/content/services/gutter-cleaning.json';
import pressureWashing from '@/content/services/pressure-washing.json';
import sidingCleaning from '@/content/services/siding-cleaning.json';
import snowRemoval from '@/content/services/snow-removal.json';

// `as unknown as Service` is intentional: Keystatic emits plain JSON (no class methods,
// optional fields may be absent). The double cast avoids false-positive TS errors.
export const services: Service[] = [
  windowCleaning as unknown as Service,
  gutterCleaning as unknown as Service,
  pressureWashing as unknown as Service,
  sidingCleaning as unknown as Service,
  snowRemoval as unknown as Service,
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug || s.frSlug === slug);
}
