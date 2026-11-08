/** Use the issuer's exact ISO expiration instant, including its timezone. */
export function getCertificationStatus(
  expiresAt: string,
  now = new Date(),
): 'active' | 'expired' {
  return now.getTime() < Date.parse(expiresAt) ? 'active' : 'expired';
}
