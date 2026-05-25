export type GenerationImageItem = { id: string; url: string };

const toUrl = (item: unknown): string | null => {
  if (typeof item === 'string' && item.length > 0) return item;
  if (item && typeof item === 'object') {
    const o = item as Record<string, unknown>;
    const url =
      o.url ?? o.image_url ?? o.image ?? o.src ?? o.output_url ?? null;
    if (typeof url === 'string' && url.length > 0) return url;
  }
  return null;
};

/** Normalize logo/avatar/t2i poll payloads into displayable image URLs. */
export const extractImageUrlsFromPayload = (payload: unknown): string[] => {
  if (!payload) return [];
  if (Array.isArray(payload)) {
    return payload.map(toUrl).filter((u): u is string => Boolean(u));
  }
  if (typeof payload !== 'object') return [];

  const p = payload as Record<string, unknown>;
  const candidates = [p.urls, p.images, p.data, p.results, p.outputs];
  for (const c of candidates) {
    const urls = extractImageUrlsFromPayload(c);
    if (urls.length > 0) return urls;
  }
  return [];
};

export const toGenerationImageItems = (
  results: unknown
): GenerationImageItem[] =>
  extractImageUrlsFromPayload(results).map((url, i) => ({
    id: `${i}-${url}`,
    url,
  }));
