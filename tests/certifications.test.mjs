import test from 'node:test';
import assert from 'node:assert/strict';
import { getCertificationStatus } from '../src/lib/certifications.ts';

const expiresAt = '2029-09-04T00:00:00.000Z';

test('certification is active until the last millisecond before its expiration instant', () => {
  assert.equal(getCertificationStatus(expiresAt, new Date('2026-11-07T12:00:00Z')), 'active');
  assert.equal(getCertificationStatus(expiresAt, new Date('2029-09-03T23:59:59.999Z')), 'active');
});

test('certification becomes expired at its exact expiration instant and remains expired', () => {
  assert.equal(getCertificationStatus(expiresAt, new Date('2029-09-04T00:00:00.000Z')), 'expired');
  assert.equal(getCertificationStatus(expiresAt, new Date('2029-09-04T00:00:00.001Z')), 'expired');
  assert.equal(getCertificationStatus(expiresAt, new Date('2030-01-01T12:00:00Z')), 'expired');
});

test('equivalent instants with different timezone offsets have the same status', () => {
  assert.equal(getCertificationStatus(expiresAt, new Date('2029-09-03T21:00:00-03:00')), 'expired');
  assert.equal(getCertificationStatus(expiresAt, new Date('2029-09-04T09:00:00+09:00')), 'expired');
  assert.equal(getCertificationStatus(expiresAt, new Date('2029-09-04T08:59:59.999+09:00')), 'active');
  assert.equal(getCertificationStatus('2029-09-03T21:00:00-03:00', new Date('2029-09-04T09:00:00+09:00')), 'expired');
});
