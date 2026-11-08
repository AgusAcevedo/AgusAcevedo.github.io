export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuedOn: string;
  expiresAt: string;
  image: string;
  verificationUrl: string;
}

// Dates, exact expiration instant, and image verified against Credly's public metadata.
export const certifications: Certification[] = [
  {
    id: 'google-cloud-associate-cloud-engineer',
    title: 'Associate Cloud Engineer Certification',
    issuer: 'Google Cloud',
    issuedOn: '2026-09-04',
    expiresAt: '2029-09-04T00:00:00.000Z',
    image: '/certifications/google-cloud-associate-cloud-engineer.png',
    verificationUrl: 'https://www.credly.com/badges/8a67eb1e-099c-4708-a6ad-1c51245e0d53',
  },
];
