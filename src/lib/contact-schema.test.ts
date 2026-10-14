import { describe, expect, it } from 'vitest';
import { contactSchema } from './contact-schema';
const valid = { name: 'Alex', email: 'alex@example.com', subject: 'Engineering opportunity', message: 'I would like to discuss a new AI project.' };
describe('Contact enquiry validation', () => {
  it('accepts and trims a valid enquiry', () => expect(contactSchema.parse({ ...valid, name: ' Alex ' }).name).toBe('Alex'));
  it('rejects an invalid email', () => expect(contactSchema.safeParse({ ...valid, email: 'invalid' }).success).toBe(false));
  it('rejects a missing name', () => expect(contactSchema.safeParse({ ...valid, name: ' ' }).success).toBe(false));
  it('rejects an empty subject', () => expect(contactSchema.safeParse({ ...valid, subject: '' }).success).toBe(false));
  it('rejects short and oversized messages', () => {
    expect(contactSchema.safeParse({ ...valid, message: 'short' }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, message: 'x'.repeat(5001) }).success).toBe(false);
  });
  it('rejects a filled spam trap', () => expect(contactSchema.safeParse({ ...valid, website: 'spam' }).success).toBe(false));
});