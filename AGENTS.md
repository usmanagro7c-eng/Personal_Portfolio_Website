## Portfolio architecture
- The portfolio uses a single scrolling index with anchored sections because the brief explicitly requires smooth scrolling to contact.
- Keep portfolio facts and project links in the shared portfolio data module so filters and showcases use one source of truth.
- Validate contact enquiries with the shared Zod schema on both client and server; store through an insert-only public client with no public read access to protect visitor information.
- Keep all portfolio visual rules and semantic colors in the global design system, using the shared Button for interactions.
- The downloadable static resume is generated from user-supplied facts only; never invent credentials or repository links.
