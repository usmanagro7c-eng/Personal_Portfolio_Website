# Portfolio Website

Single-page portfolio built with TanStack Start, React, TypeScript and Tailwind CSS. Contact enquiries are validated with a shared Zod schema on both client and server and stored through Supabase.

## Development

Install dependencies with [Bun](https://bun.sh):

```sh
bun install
bun run dev
```

The dev server listens on `http://localhost:8080`.

## Environment

Copy the required variables into `.env`:

```sh
SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
SUPABASE_PUBLISHABLE_KEY="sb_publishable_..."
SUPABASE_PROJECT_ID="your-project-ref"

VITE_SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="sb_publishable_..."
VITE_SUPABASE_PROJECT_ID="your-project-ref"
```

Add the same keys (plus `SUPABASE_SERVICE_ROLE_KEY` and `DATABASE_URL` for Drizzle migrations) to your Vercel project settings.

## Scripts

| Command | Action |
| --- | --- |
| `bun run dev` | Start the dev server |
| `bun run build` | Production build (Nitro, Vercel preset) |
| `bun run preview` | Preview the production build |
| `bun run test` | Run the Vitest suite |
| `bun run lint` | Run ESLint |
| `bun run format` | Format with Prettier |

## Database

```sh
bunx drizzle-kit generate
bunx drizzle-kit migrate
```

## Deploying to Vercel

`vite.config.ts` pins the Nitro preset to `vercel`, so `bun run build` emits a Vercel-compatible server bundle in `.vercel/output`.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
- Supabase
- Drizzle ORM
