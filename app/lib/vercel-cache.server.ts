import { invalidateByTag } from "@vercel/functions";

export async function invalidateCacheTags(...tags: string[]) {
  if (!process.env.VERCEL) return; // no-op in local dev
  try {
    await invalidateByTag(tags);
  } catch (e) {
    console.error("Cache invalidation failed:", e);
  }
}
