import test from 'node:test';
import assert from 'node:assert/strict';
import { parseArticles } from '../src/lib/blog.ts';

/** Build a valid API article and allow each test to override only its subject. */
const article = (changes = {}) => ({
  id: 1, title: 'A valid article', description: 'Plain text summary',
  url: 'https://dev.to/agusacevedo/example', published_at: '2026-10-28T12:00:00Z',
  tag_list: ['cloud'], reading_time_minutes: 3,
  cover_image: 'https://media2.dev.to/image.png', ...changes,
});

test('rejects dangerous, lookalike, credential, and non-HTTPS article URLs', () => {
  for (const url of [
    'javascript:alert(1)', // skipcq: JS-0087 Intentional malicious URL verifies parser rejection.
    'http://dev.to/a', 'https://dev.to.evil.example/a', 'https://u:p@dev.to/a', 'https://dev.to:444/a',
  ]) {
    assert.deepEqual(parseArticles([article({ url })]), [], url);
  }
});

test('bounds and validates summaries, dates, IDs, images, and tags', () => {
  const entries = parseArticles([
    article({ title: 'x'.repeat(500), tag_list: ['cloud', 5, 'linux', 'extra'], reading_time_minutes: -1, cover_image: 'https://evil.example/a.png' }),
    article(), article({ id: 2, published_at: 'invalid' }),
    article({ id: 3, url: 'https://dev.to/agusacevedo/third' }),
  ]);
  assert.equal(entries.length, 2);
  assert.equal(entries[0].title.length, 300);
  assert.deepEqual(entries[0].tags, ['cloud', 'linux']);
  assert.equal(entries[0].readingTime, null);
  assert.equal(entries[0].coverImage, null);
  assert.deepEqual(parseArticles({ articles: [article()] }), []);
  assert.equal(parseArticles(Array.from({ length: 10 }, (_, n) => article({ id: n + 1 }))).length, 3);
});

let testId = 0;
/** Import an isolated module instance with a mocked upstream response. */
function loadWith(t, fetcher) {
  t.mock.method(globalThis, 'fetch', fetcher);
  t.mock.method(console, 'warn', () => undefined);
  return import(`../src/lib/blog.ts?test=${testId++}`);
}

for (const [name, fetcher] of [
  ['network error', () => Promise.reject(new Error('offline'))],
  ['upstream error', () => Promise.resolve(new Response('unavailable', { status: 503 }))],
  ['malformed JSON', () => Promise.resolve(new Response('{', { headers: { 'content-type': 'application/json' } }))],
  ['oversized response', () => Promise.resolve(new Response('x'.repeat(512 * 1024 + 1), { headers: { 'content-type': 'application/json' } }))],
  ['unsafe payload', () => Promise.resolve(Response.json([article({ url: 'javascript:alert(1)' })]))], // skipcq: JS-0087 Intentional malicious payload verifies safe snapshot fallback.
]) {
  test(`uses the validated article snapshot on ${name}`, async t => {
    const { getArticles } = await loadWith(t, fetcher);
    const result = await getArticles();
    assert.equal(result.length, 3);
    assert.ok(result.every(a => a.url.startsWith('https://dev.to/')));
  });
}

test('both languages share one bounded request, and an empty feed stays empty', async t => {
  let requests = 0;
  const { getArticles } = await loadWith(t, (url, options) => {
    requests++;
    assert.equal(url, 'https://dev.to/api/articles?username=agusacevedo&per_page=3');
    assert.equal(options.redirect, 'error');
    assert.ok(options.signal instanceof AbortSignal);
    return Promise.resolve(Response.json([]));
  });
  const [es, en] = await Promise.all([getArticles(), getArticles()]);
  assert.deepEqual(es, []);
  assert.strictEqual(es, en);
  assert.equal(requests, 1);
});
