import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Analytics } from "@vercel/analytics/react";

import appCss from "../styles.css?url";
import { themeBootstrapScript } from "@/lib/use-theme";
import { Toaster } from "@/components/ui/sonner";

const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://github.com/usmanagro7c-eng#person",
      name: "Muhammad Usman Aziz",
      alternateName: ["Usman Aziz", "Muhammad Usman"],
      jobTitle: "AI & Full-Stack Software Engineer",
      description:
        "AI and Full-Stack Software Engineer specializing in Generative AI, RAG, Frappe/ERPNext solutions, and offline-first mobile web architectures.",
      image: "/profile.jpeg",
      email: "mailto:usmanamjad495@gmail.com",
      telephone: "+923216692660",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Faisalabad",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "FAST National University of Computer and Emerging Sciences (FAST-NUCES)",
      },
      worksFor: {
        "@type": "Organization",
        name: "Agrovisions",
      },
      sameAs: [
        "https://www.linkedin.com/in/usmanamjad41/",
        "https://github.com/MaAn-41",
        "https://github.com/usmanagro7c-eng",
        "https://medium.com/@usmanamjad495",
      ],
      knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Generative AI",
        "Retrieval-Augmented Generation (RAG)",
        "LoRA / PEFT",
        "Frappe Framework",
        "ERPNext",
        "React",
        "TypeScript",
        "Python",
        "Offline-First Web Architecture",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://github.com/usmanagro7c-eng/Personal_Portfolio_Website#website",
      name: "Muhammad Usman Aziz Portfolio",
      description: "Official portfolio of Muhammad Usman Aziz — AI & Full-Stack Engineer.",
      author: {
        "@id": "https://github.com/usmanagro7c-eng#person",
      },
    },
  ],
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Muhammad Usman Aziz — AI & Full-Stack Engineer" },
      {
        name: "description",
        content:
          "Intelligent AI systems, enterprise ERPNext solutions and scalable web and mobile applications by Muhammad Usman Aziz.",
      },
      {
        name: "keywords",
        content:
          "Muhammad Usman Aziz, AI Engineer, Full-Stack Developer, ERPNext Specialist, Frappe Developer, FAST-NUCES, RAG, GenAI, Python, TypeScript, React, Pakistan",
      },
      { name: "author", content: "Muhammad Usman Aziz" },
      { name: "robots", content: "index, follow" },
      { property: "og:site_name", content: "Muhammad Usman Aziz Portfolio" },
      { property: "og:title", content: "Muhammad Usman Aziz — AI & Full-Stack Engineer" },
      {
        property: "og:description",
        content:
          "Production GenAI systems, custom ERPNext platforms, and offline-first web applications.",
      },
      { property: "og:image", content: "/profile.jpeg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/profile.jpeg" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/profile.jpeg", type: "image/jpeg" },
      { rel: "shortcut icon", href: "/profile.jpeg", type: "image/jpeg" },
      { rel: "apple-touch-icon", href: "/profile.jpeg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;650;700;750;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* Applies the stored theme and the `js` marker before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
        {/* Google Structured Data / JSON-LD for rich knowledge graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#home">
          Skip to main content
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster position="bottom-right" />
      <Analytics />
    </QueryClientProvider>
  );
}
