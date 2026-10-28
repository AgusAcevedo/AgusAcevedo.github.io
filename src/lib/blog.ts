import fallbackArticles from "../data/blog-fallback.json" with { type: "json" };

export const DEVTO_PROFILE = "https://dev.to/agusacevedo";

const ARTICLES_ENDPOINT = "https://dev.to/api/articles?username=agusacevedo&per_page=3";
const MAX_RESPONSE_BYTES = 512 * 1024;
const IMAGE_HOSTS = new Set([
  "media.dev.to",
  "media2.dev.to",
  "dev-to-uploads.s3.amazonaws.com",
]);

export interface ArticleSummary {
  id: number;
  title: string;
  description: string;
  url: string;
  coverImage: string | null;
  publishedAt: string;
  tags: string[];
  readingTime: number | null;
}

/** Normalize control/whitespace characters and bound text from the public feed. */
function text(value: unknown, limit: number): string {
  return typeof value === "string"
    ? value.replace(/\p{Cc}/gu, " ").replace(/\s+/gu, " ").trim().slice(0, limit)
    : "";
}

/** Accept only bounded HTTPS URLs on explicit hosts, without credentials or ports. */
function allowedUrl(value: unknown, allowedHosts: ReadonlySet<string>): string | null {
  if (typeof value !== "string" || value.length > 2048) return null;
  try {
    const url = new URL(value);
    if (url.username.length !== 0 || url.password.length !== 0) return null;
    if (url.protocol !== "https:" || url.port !== "" || !allowedHosts.has(url.hostname)) {
      return null;
    }
    return url.href;
  } catch {
    return null;
  }
}

// Treat the API as untrusted input. Templates render these strings through Astro's
// normal HTML escaping; no API-provided HTML is inserted into the document.
/** Validate at most three complete article summaries from an untrusted payload. */
export function parseArticles(payload: unknown): ArticleSummary[] {
  if (!Array.isArray(payload)) return [];
  const articles: ArticleSummary[] = [];
  const seen = new Set<number>();
  const articleHosts = new Set(["dev.to", "www.dev.to"]);

  for (const item of payload.slice(0, 20)) {
    if (!item || typeof item !== "object") continue;
    const entry = item as Record<string, unknown>;
    const title = text(entry.title, 300);
    const url = allowedUrl(entry.url, articleHosts);
    const date = typeof entry.published_at === "string" ? new Date(entry.published_at) : null;
    if (typeof entry.id !== "number" || !Number.isSafeInteger(entry.id) || entry.id < 1 || seen.has(entry.id) || !title || !url || !date || !Number.isFinite(date.getTime())) {
      continue;
    }
    const tags = Array.isArray(entry.tag_list)
      ? entry.tag_list.slice(0, 3).map(tag => text(tag, 40)).filter(Boolean)
      : [];
    const readingTime = typeof entry.reading_time_minutes === "number"
      && Number.isSafeInteger(entry.reading_time_minutes)
      && Number(entry.reading_time_minutes) > 0
      && Number(entry.reading_time_minutes) <= 240
      ? Number(entry.reading_time_minutes)
      : null;

    articles.push({
      id: Number(entry.id),
      title,
      description: text(entry.description, 1000),
      url,
      coverImage: allowedUrl(entry.cover_image, IMAGE_HOSTS) ?? allowedUrl(entry.social_image, IMAGE_HOSTS),
      publishedAt: date.toISOString(),
      tags,
      readingTime,
    });
    seen.add(Number(entry.id));
    if (articles.length === 3) break;
  }
  return articles;
}

/** Fetch a bounded feed, preserving a validated snapshot on upstream failure. */
async function loadArticles(): Promise<ArticleSummary[]> {
  try {
    const response = await fetch(ARTICLES_ENDPOINT, {
      headers: { Accept: "application/vnd.forem.api-v1+json" },
      redirect: "error",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok || !response.headers.get("content-type")?.includes("json") || !response.body) {
      throw new Error("Unexpected article response");
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let size = 0;
    let body = "";
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > MAX_RESPONSE_BYTES) throw new Error("Article response exceeds size limit");
        body += decoder.decode(value, { stream: true });
      }
      body += decoder.decode();
    } finally {
      await reader.cancel();
    }
    const payload: unknown = JSON.parse(body);
    if (!Array.isArray(payload)) throw new Error("Unexpected article payload");
    const articles = parseArticles(payload);
    if (payload.length > 0 && articles.length === 0) throw new Error("Invalid article summaries");
    return articles;
  } catch {
    // Blog availability must not make the rest of this static portfolio fail.
    // A checked-in public snapshot passes the same validation as live responses.
    console.warn("Dev.to articles unavailable; rendering the validated article snapshot.");
    return parseArticles(fallbackArticles);
  }
}

// Both localized pages share one bounded API request per build.
let articlesPromise: Promise<ArticleSummary[]> | undefined;
/** Share the same request/result between the static Spanish and English pages. */
export function getArticles(): Promise<ArticleSummary[]> {
  articlesPromise ??= loadArticles();
  return articlesPromise;
}

