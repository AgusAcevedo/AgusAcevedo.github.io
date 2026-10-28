import test from 'node:test';
import assert from 'node:assert/strict';
import { serializeJsonLd } from '../src/lib/seo.ts';

test('JSON-LD cannot close its script and preserves the original structured values', () => {
  const profile = {
    '@type': 'Person',
    name: '</script><script>alert("injected")</script>',
    description: 'Ingeniería & automatización <cloud>',
    literalEscape: '\\u003c',
  };
  const serialized = serializeJsonLd(profile);
  assert.equal(serialized.includes('<'), false);
  assert.equal(serialized.includes('</script>'), false);
  assert.deepEqual(JSON.parse(serialized), profile);
});
