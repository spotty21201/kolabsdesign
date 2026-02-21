export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function ensureSlug(input: string, fallback: string): string {
  const candidate = slugify(input);
  if (candidate) return candidate;
  return `${slugify(fallback)}-${Date.now()}`;
}
