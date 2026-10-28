/** Keep JSON-LD data intact while preventing a value from closing its script. */
export function serializeJsonLd(value: unknown): string {
  const serialized = JSON.stringify(value);
  if (serialized === undefined) throw new TypeError("JSON-LD must contain a serializable value");
  return serialized.replace(/</gu, "\\u003c");
}
