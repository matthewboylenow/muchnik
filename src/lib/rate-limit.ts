const store = new Map<string, number[]>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamps] of store) {
    const filtered = timestamps.filter((t) => now - t < 15 * 60 * 1000);
    if (filtered.length === 0) {
      store.delete(key);
    } else {
      store.set(key, filtered);
    }
  }
}, 5 * 60 * 1000);

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): { success: boolean; remaining: number } {
  const now = Date.now();
  const timestamps = store.get(key) ?? [];
  const windowStart = now - windowMs;
  const recent = timestamps.filter((t) => t > windowStart);

  if (recent.length >= limit) {
    store.set(key, recent);
    return { success: false, remaining: 0 };
  }

  recent.push(now);
  store.set(key, recent);
  return { success: true, remaining: limit - recent.length };
}
