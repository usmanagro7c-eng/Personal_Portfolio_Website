# Muhammad Usman Aziz — Engineering Portfolio

[![Built with TanStack Start](https://img.shields.io/badge/TanStack_Start-1.168-FF4154?style=flat-square&logo=react&logoColor=white)](https://tanstack.com/start)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.2-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel Analytics](https://img.shields.io/badge/Vercel_Analytics-Enabled-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/analytics)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

High-performance, single-page developer portfolio and interactive showcase for **Muhammad Usman Aziz** — AI & Full-Stack Software Engineer, Enterprise ERP Specialist, and FAST-NUCES Computer Science alumnus.

---

## ✨ Key Features

- **⚡ Modern SSR Architecture:** Built on TanStack Start (Nitro Vercel preset) with React 19 and Vite for sub-second page loads.
- **🎨 Global OKLCH Design System:** Full Dark & Light theme support with perceptual OKLCH color spaces, smooth transitions, and glowing micro-interactions.
- **🚀 24 Production & Open-Source Projects:** Direct showcase from [`usmanagro7c-eng`](https://github.com/usmanagro7c-eng) and [`MaAn-41`](https://github.com/MaAn-41) spanning AI/ML, Enterprise ERP, and Full-Stack Web/Mobile.
- **🌐 Live App Deployments:** Dedicated pulsing live badges and one-click direct links to active web applications ([Stockly](https://stocklyfinance.vercel.app/), [Shopify AI Assistant](https://shopify-chatbot-seven.vercel.app), [Medical AI RAG](https://rag-for-diagnostic-reasoning-for-clinical-notes-bspwfhgsmt8mkj.streamlit.app/), [Pseudocode Converter](https://sufyanspseudo-code-to-c-code.streamlit.app/), [TCS Result Portal](https://tcsresultcard.vercel.app)).
- **⌨️ `Cmd + K` Command Palette:** Instant keyboard-driven command center (`⌘K` / `Ctrl+K`) for quick navigation, project search, resume download, and theme toggle.
- **🔍 Real-Time Search & Tech Tags:** Multi-factor search bar and interactive technology pills (`#Python`, `#TypeScript`, `#RAG`, `#ERPNext`, `#React`, etc.).
- **⭐ Flagship Highlights:** Distinctive star badges and high-contrast glowing borders for high-impact production systems.
- **📊 Recruiter Analytics:** Integrated `@vercel/analytics` for privacy-first tracking of visitors, referral sources, and project engagements.
- **🔍 Rich Knowledge Graph SEO:** Embedded `schema.org/Person` JSON-LD structured data for Google Knowledge Panels and search engine indexing.
- **🛡️ Secure Contact Pipeline:** Client & server Zod schema validation stored in Supabase with insert-only public security policies.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Framework & SSR** | TanStack Start, React 19, Vite, Nitro (Vercel runtime) |
| **Styling & Theme** | Tailwind CSS v4, OKLCH Color Space, CSS Custom Properties |
| **State & Routing** | TanStack Router, TanStack Query, cmdk |
| **Icons & Animation** | Lucide React, Custom CSS Keyframes, CSS Scroll Timeline |
| **Database & Auth** | Supabase, Drizzle ORM, PostgreSQL |
| **Analytics & SEO** | Vercel Analytics, Google JSON-LD Structured Data, OpenGraph |
| **Package Manager** | [Bun](https://bun.sh) |

---

## 🚀 Development Setup

Clone the repository and install dependencies using **Bun**:

```sh
# Clone repo
git clone https://github.com/usmanagro7c-eng/Personal_Portfolio_Website.git
cd Personal_Portfolio_Website

# Install packages
bun install

# Start development server
bun run dev
```

The dev server runs locally at `http://localhost:8080`.

### Environment Variables

Copy the required Supabase environment keys into `.env`:

```sh
SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
SUPABASE_PUBLISHABLE_KEY="sb_publishable_..."
SUPABASE_PROJECT_ID="your-project-ref"

VITE_SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="sb_publishable_..."
VITE_SUPABASE_PROJECT_ID="your-project-ref"
```

---

## 📜 Available Scripts

| Command | Action |
| :--- | :--- |
| `bun run dev` | Start development server on port 8080 |
| `bun run build` | Compile client and SSR Nitro server bundles |
| `bun run preview` | Preview production build locally |
| `bun run test` | Run Vitest unit & routing tests |
| `bun run lint` | Run ESLint check |
| `bun run format` | Run Prettier formatter |

---

## 🌐 Deploy to Vercel

The project is preconfigured for zero-config Vercel deployments via the Nitro `vercel` preset in `vite.config.ts`. Simply import the Git repository into Vercel, supply your Supabase environment variables, and deploy.

---

## 📬 Contact & Connect

- **Email:** [usmanamjad495@gmail.com](mailto:usmanamjad495@gmail.com)
- **LinkedIn:** [Muhammad Usman Aziz](https://www.linkedin.com/in/usmanamjad41/)
- **GitHub (Engineering):** [usmanagro7c-eng](https://github.com/usmanagro7c-eng)
- **GitHub (Personal/AI):** [MaAn-41](https://github.com/MaAn-41)
- **Medium Articles:** [@usmanamjad495](https://medium.com/@usmanamjad495)

---

© 2026 Muhammad Usman Aziz. All rights reserved.
