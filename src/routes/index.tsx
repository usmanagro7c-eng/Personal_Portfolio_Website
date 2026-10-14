import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from '@/components/portfolio';

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: 'Muhammad Usman Aziz — AI & Full-Stack Software Engineer' },
    { name: 'description', content: 'Explore Muhammad Usman Aziz’s work in Generative AI, ERPNext, and scalable web and mobile applications. FAST-NUCES alumnus, enterprise engineer and STEM mentor.' },
    { property: 'og:title', content: 'Muhammad Usman Aziz — AI, ERP & Full-Stack Engineering' },
    { property: 'og:description', content: 'Intelligent systems. Enterprise impact. Explore projects, experience and opportunities to collaborate with Muhammad Usman Aziz.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Portfolio,
});
