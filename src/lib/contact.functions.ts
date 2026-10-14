import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { contactSchema, type ContactInput } from './contact-schema';

export const submitEnquiry = createServerFn({ method: 'POST' })
  .validator((input: ContactInput) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const url = process.env['SUPABASE_URL'];
    const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
    if (!url || !key) throw new Error('Contact service is temporarily unavailable. Please email me directly.');
    const client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
        headers.set('apikey', key);
        return fetch(input, { ...init, headers });
      } },
    });
    const { website: _trap, ...enquiry } = data;
    const { error } = await client.from('portfolio_enquiries').insert(enquiry);
    if (error) throw new Error('Your message could not be saved. Please try again or email me directly.');
    return { success: true };
  });