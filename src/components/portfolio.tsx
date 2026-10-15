import { useEffect, useState, type CSSProperties } from "react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  Clock,
  Code2,
  Copy,
  Cpu,
  Database,
  Download,
  ExternalLink,
  FileText,
  Github,
  Globe,
  GraduationCap,
  Hand,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  PlayCircle,
  Search,
  Smartphone,
  Sparkles,
  Terminal,
  TrendingUp,
  Users,
  Waves,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { AnimatedCount } from "@/components/animated-count";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandPalette } from "@/components/command-palette";
import { TerminalModal } from "@/components/terminal-modal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  blogs,
  categories,
  education,
  globalWorkSignals,
  popularTechTags,
  projects,
  skillGroups,
  socials,
  testimonials,
  type Project,
} from "@/lib/portfolio-data";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import orbit from "@/assets/intelligence-orbit.jpg";

const nav = ["About", "Experience", "Skills", "Projects", "Blogs", "Contact"];
const skillIcons = [BrainCircuit, Code2, Terminal, Smartphone, Database];

/** Stagger helper for [data-reveal] children. */
const revealDelay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

function ProjectCover({ kind, label }: { kind: string; label: string }) {
  return (
    <div className={`project-cover cover-${kind}`} aria-hidden="true">
      {kind === "sign" ? (
        <>
          <div className="sign-mark">
            <Hand className="hand-icon" />
            <Waves className="wave-line" />
            <Hand className="hand-icon" />
          </div>
          <div className="cover-title">
            Deaf<span>—</span>ED
          </div>
        </>
      ) : kind === "stock" ? (
        <div className="stock-window">
          <div className="stock-window-title">
            <span>▧ stockly</span>
            <TrendingUp />
          </div>
          <div className="mini-stats">
            <span>
              Total sales<strong>128,450</strong>
            </span>
            <span>
              Net profit<strong>24,800</strong>
            </span>
            <span>
              Products<strong>248</strong>
            </span>
          </div>
          <div className="mini-chart">
            {Array.from({ length: 12 }, (_, i) => (
              <i key={i} style={{ animationDelay: `${i * 45}ms` }} />
            ))}
          </div>
        </div>
      ) : kind === "erp" ? (
        <>
          <div className="migration-flow">
            <div className="migration-node">
              <Database />
            </div>
            <ArrowRight />
            <div className="migration-node">
              <Layers3 />
            </div>
          </div>
          <div className="cover-title">
            Data. <span>Connected.</span>
          </div>
        </>
      ) : (
        <>
          <BrainCircuit className="ai-mark" />
          <div className="cover-title">
            Intelligence<span>_</span>
          </div>
        </>
      )}
      <span className="cover-label">{label}</span>
    </div>
  );
}

function LiveClockWidget() {
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeStr(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(now),
      );
      setDateStr(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Karachi",
          weekday: "short",
          month: "short",
          day: "numeric",
        }).format(now),
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bento-clock">
      <div className="bento-clock-time">{timeStr || "11:15:00 AM"}</div>
      <div className="bento-clock-meta">
        <span>{dateStr || "Today"}</span>
        <span className="bento-dot-sep">·</span>
        <span>PKT (UTC+5)</span>
      </div>
    </div>
  );
}

export function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [category, setCategory] = useState<string>("All projects");
  const [expanded, setExpanded] = useState(false);
  const [skillIndex, setSkillIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState("All Tech");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    nav.forEach((item) => {
      const element = document.getElementById(item.toLowerCase());
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0);
      setShowTop(window.scrollY > window.innerHeight * 0.9);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Terminal shortcut: Backtick ` or Ctrl+`
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Do not trigger if typing in an input or textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }
      if (e.key === "`" || (e.ctrlKey && e.key === "`")) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // High-performance spotlight cursor tracking for cards
  useEffect(() => {
    // Only track on fine pointer (desktop / mouse) to conserve mobile CPU
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    let rafId = 0;
    const onMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const cards = document.querySelectorAll<HTMLElement>(".spotlight-card");
        const clientX = e.clientX;
        const clientY = e.clientY;

        for (let i = 0; i < cards.length; i++) {
          const card = cards[i];
          const rect = card.getBoundingClientRect();
          // Only update if cursor is within 140px proximity to card to minimize paint overhead
          if (
            clientX >= rect.left - 140 &&
            clientX <= rect.right + 140 &&
            clientY >= rect.top - 140 &&
            clientY <= rect.bottom + 140
          ) {
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
          }
        }
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  useScrollReveal([category, expanded, skillIndex, searchQuery, selectedTech]);

  const filtered = projects.filter((p) => {
    const matchesCategory = category === "All projects" || p.category === category;
    const matchesTech =
      !selectedTech ||
      selectedTech === "All Tech" ||
      p.tech.some((t) => t.toLowerCase() === selectedTech.toLowerCase());
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tech.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesTech && matchesSearch;
  });

  const isFiltering =
    searchQuery.trim().length > 0 || (Boolean(selectedTech) && selectedTech !== "All Tech");
  const visible =
    expanded || category !== "All projects" || isFiltering ? filtered : filtered.slice(0, 6);
  const currentSkills = skillGroups[skillIndex];
  const SkillIcon = skillIcons[skillIndex] ?? Code2;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(socials.email);
      setCopied(true);
      toast.success("Email copied to clipboard");
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Could not copy. Please select the email address instead.");
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <div className="scroll-progress" style={{ scale: `${progress} 1` }} aria-hidden="true" />

      <header className="site-nav">
        <div className="site-container nav-inner">
          <a href="#home" className="brand" aria-label="Muhammad Usman Aziz home">
            MUA<span>.</span>
          </a>
          <nav className="nav-links" aria-label="Main navigation">
            {nav.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={active === item.toLowerCase() ? "active" : ""}
                aria-current={active === item.toLowerCase() ? "true" : undefined}
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <Button
              variant="outline"
              size="sm"
              className="command-trigger"
              onClick={() => setCmdOpen(true)}
              aria-label="Open command palette"
              title="Search and commands (Ctrl+K)"
            >
              <Search className="h-3.5 w-3.5 text-primary" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="command-kbd">⌘K</kbd>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="command-trigger"
              onClick={() => setTerminalOpen(true)}
              aria-label="Open developer terminal"
              title="Interactive CLI / Terminal (`)"
            >
              <Terminal className="h-3.5 w-3.5 text-emerald-500" />
              <span className="hidden sm:inline">CLI</span>
              <kbd className="command-kbd">~</kbd>
            </Button>
            <Button asChild variant="ghost" className="resume-button">
              <a href="/Muhammad-Usman-Aziz-Resume.pdf" target="_blank" rel="noreferrer">
                <Download />
                Download resume
              </a>
            </Button>
            <ThemeToggle />
            <Button asChild className="talk-button">
              <a href="#contact">
                Let&rsquo;s talk <ArrowUpRight />
              </a>
            </Button>
            <Button
              className="mobile-menu-button"
              variant="ghost"
              size="icon"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
            <button
              type="button"
              className="mobile-search-btn"
              onClick={() => {
                setMenuOpen(false);
                setCmdOpen(true);
              }}
            >
              <Search className="h-4 w-4 mr-2 text-primary" /> Quick Command (⌘K)
            </button>
            <button
              type="button"
              className="mobile-search-btn"
              onClick={() => {
                setMenuOpen(false);
                setTerminalOpen(true);
              }}
            >
              <Terminal className="h-4 w-4 mr-2 text-emerald-500" /> Developer Terminal (CLI)
            </button>
            {nav.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                {item}
              </a>
            ))}
            <a href="/Muhammad-Usman-Aziz-Resume.pdf" target="_blank" rel="noreferrer">
              Download resume ↗
            </a>
          </nav>
        )}
      </header>

      <main id="home">
        <section className="hero site-container">
          <img
            className="hero-art"
            src={orbit}
            alt="Interwoven luminous cyan threads forming an intricate computational sculpture"
            width={1200}
            height={1200}
            fetchPriority="high"
          />
          <div className="hero-art-mask" />
          <div className="hero-content">
            <div className="availability" data-reveal style={revealDelay(40)}>
              <span className="status-dot" />
              Available for innovative projects &amp; engineering roles
            </div>
            <p className="hero-name" data-reveal style={revealDelay(100)}>
              Hello, I&rsquo;m <strong>Muhammad Usman Aziz</strong>
            </p>
            <h1 data-reveal style={revealDelay(160)}>
              Architecting intelligent
              <br />
              systems at the intersection
              <br />
              of <span className="accent-text">AI, ERP &amp; modern web.</span>
            </h1>
            <p className="hero-intro" data-reveal style={revealDelay(220)}>
              AI &amp; Full-Stack Software Engineer. Enterprise ERP specialist.
              <br />I turn complex challenges into intelligent, scalable solutions—from production
              GenAI to systems that power real businesses.
            </p>
            <div className="hero-actions" data-reveal style={revealDelay(280)}>
              <Button asChild className="hero-cta">
                <a href="#projects">
                  Explore my work <ArrowUpRight />
                </a>
              </Button>
              <Button asChild variant="outline" className="hero-cta">
                <a href="#contact">
                  Let&rsquo;s build together <ArrowRight />
                </a>
              </Button>
              <Button
                variant="outline"
                className="hero-cta hero-video-cta"
                onClick={() => setVideoOpen(true)}
              >
                <PlayCircle className="h-4 w-4 text-primary" />
                Watch 60s Tech Overview
              </Button>
              <div className="hero-socials">
                <a href={`mailto:${socials.email}`} aria-label="Email Usman" title="Email">
                  <Mail />
                </a>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <Linkedin />
                </a>
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Personal GitHub"
                  title="Personal GitHub"
                >
                  <Github />
                </a>
              </div>
            </div>
            <div className="location" data-reveal style={revealDelay(340)}>
              <MapPin />
              Faisalabad, Pakistan <span className="divider">/</span> Open to remote &amp; global
              opportunities
            </div>
            <div className="global-signals" data-reveal style={revealDelay(380)}>
              <div className="signal-pill" title={globalWorkSignals.timezoneOverlap}>
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span>US (EST/PST) &amp; EU/GMT Overlap</span>
              </div>
              <div className="signal-pill" title={globalWorkSignals.contractStatus}>
                <Globe className="h-3.5 w-3.5 text-success" />
                <span>Remote · B2B / W-8BEN · Relocation</span>
              </div>
              <div className="signal-pill" title={globalWorkSignals.responseTime}>
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                <span>&lt; 12h Async Turnaround</span>
              </div>
            </div>
          </div>
          <div className="orb-caption">
            ENGINEERING INTELLIGENCE <span>01 / ∞</span>
          </div>
        </section>

        <div className="site-container stats" data-reveal>
          <div className="stat">
            <div className="stat-value">
              <AnimatedCount value={1} />
              <span>+</span>
              <small className="text-sm font-normal">year</small>
            </div>
            <p className="stat-label">Enterprise ERP &amp; software engineering</p>
          </div>
          <div className="stat">
            <div className="stat-value">
              <AnimatedCount value={7} />
              <span>+</span>
              <small className="text-sm font-normal">years</small>
            </div>
            <p className="stat-label">CS &amp; STEM mentorship · 150+ students</p>
          </div>
          <div className="stat">
            <div className="stat-value">
              <AnimatedCount value={20} />
              <span>+</span>
            </div>
            <p className="stat-label">Production &amp; open-source projects</p>
          </div>
          <div className="stat">
            <div className="stat-value stat-school">
              FAST-NUCES<span>↗</span>
            </div>
            <p className="stat-label">BS Computer Science alumnus</p>
          </div>
        </div>

        <section id="projects" className="section site-container" data-reveal>
          <div className="section-top">
            <div>
              <div className="eyebrow">Selected work</div>
              <h2 className="section-heading">Built to solve. Designed to scale.</h2>
              <p className="section-subtitle">
                A selection of projects where engineering meets real-world impact.
              </p>
            </div>
            <a className="text-action" href={socials.engineering} target="_blank" rel="noreferrer">
              Explore engineering GitHub <ArrowUpRight />
            </a>
          </div>
          <div className="filters" role="group" aria-label="Project category">
            {categories.map((c) => (
              <Button
                key={c}
                variant="ghost"
                className="filter"
                data-active={category === c}
                aria-pressed={category === c}
                onClick={() => {
                  setCategory(c);
                  setExpanded(false);
                }}
              >
                {c}
                {c === "All projects" && <span className="opacity-50">{projects.length}</span>}
              </Button>
            ))}
          </div>

          <div className="project-search-container">
            <div className="project-search-input-wrap">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search 24 projects by name, description, or stack (e.g. Python, RAG, ERP, Vercel)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="project-search-input"
                aria-label="Search projects"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="search-clear-btn"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="tech-filter-pills" role="group" aria-label="Filter by technology">
              {popularTechTags.map((tech) => (
                <button
                  type="button"
                  key={tech}
                  className={`tech-pill ${selectedTech === tech ? "active" : ""}`}
                  onClick={() => setSelectedTech(selectedTech === tech ? "All Tech" : tech)}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {visible.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-xl border border-dashed border-border my-6">
              <Search className="h-8 w-8 mx-auto text-muted-foreground opacity-50 mb-3" />
              <p className="text-foreground font-medium">No projects found</p>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                No projects matched &ldquo;{searchQuery}&rdquo; in category &ldquo;{category}&rdquo;.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCategory("All projects");
                  setSearchQuery("");
                  setSelectedTech("All Tech");
                }}
              >
                Reset all filters
              </Button>
            </div>
          ) : (
            <div className="project-grid">
              {visible.map((project, index) => (
                <article
                  className={`project-card spotlight-card ${project.featured ? "featured-card" : ""}`}
                  key={project.title}
                  data-reveal
                  style={revealDelay(Math.min(index, 5) * 70)}
                >
                  <ProjectCover kind={project.kind} label={project.label} />
                  <div className="project-info">
                    <div className="project-category-row">
                      <div className="flex items-center gap-2">
                        <span className="project-category">{project.category}</span>
                        {project.featured && (
                          <span className="featured-star-badge" title="Flagship Engineering Project">
                            <Sparkles className="h-2.5 w-2.5" /> Flagship
                          </span>
                        )}
                      </div>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="project-live-badge"
                          title={`Open ${project.title} live application`}
                          aria-label={`Open ${project.title} live application`}
                        >
                          <span className="live-dot" /> Live App ↗
                        </a>
                      )}
                    </div>
                  <div className="project-title-row">
                    <h3>{project.title}</h3>
                    <div className="project-actions">
                      {project.caseStudy && (
                        <button
                          type="button"
                          onClick={() => setSelectedCaseStudy(project)}
                          className="project-action-link case-study-action-btn"
                          title="Read In-Depth Architecture Case Study"
                          aria-label={`Read ${project.title} Case Study`}
                        >
                          <BookOpen className="h-3.5 w-3.5" />
                          <span className="case-study-btn-text">Case Study</span>
                        </button>
                      )}
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`View ${project.title} GitHub repository`}
                          title="View GitHub Repository"
                          className="project-action-link"
                        >
                          <Github />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open ${project.title} live demo`}
                          title="Open Live Application"
                          className="project-action-link live-action-link"
                        >
                          <ExternalLink />
                        </a>
                      )}
                      {!project.repo && !project.live && (
                        <a
                          href={
                            project.category === "Enterprise / ERP"
                              ? socials.engineering
                              : socials.github
                          }
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Explore ${project.title} author's GitHub`}
                          title="Explore author’s GitHub"
                          className="project-action-link"
                        >
                          <ArrowUpRight />
                        </a>
                      )}
                    </div>
                  </div>
                  <p>{project.description}</p>
                  <div className="tech-badges">
                    {project.tech.map((t) => (
                      <span className="tech-badge" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="project-impact">
                    <CheckCircle2 />
                    {project.impact}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        {category === "All projects" && (
            <div className="projects-more">
              <Button variant="outline" onClick={() => setExpanded(!expanded)}>
                {expanded ? "Show fewer projects" : `View all ${projects.length} projects`}
                {expanded ? <ArrowUp /> : <ArrowDown />}
              </Button>
            </div>
          )}
        </section>

        <section id="about" className="section site-container" data-reveal>
          <div className="section-top">
            <div>
              <div className="eyebrow">Executive Overview</div>
              <h2 className="section-heading">Engineering depth. Real-world execution.</h2>
              <p className="section-subtitle">
                An interactive high-resolution look into my technical foundation, production experience, and engineering philosophies.
              </p>
            </div>
          </div>

          <div className="bento-grid">
            {/* Card 1: Identity & Executive Bio (Spans 2 cols) */}
            <div className="bento-card spotlight-card bento-card-profile" data-reveal style={revealDelay(40)}>
              <div className="bento-profile-inner">
                <div className="bento-avatar-wrap">
                  <img
                    src="/profile.jpeg"
                    alt="Muhammad Usman Aziz"
                    className="bento-avatar-img"
                    width={140}
                    height={140}
                    loading="lazy"
                  />
                  <div className="bento-avatar-status" title="Online & Available for Engineering Roles">
                    <span className="bento-avatar-pulse" />
                  </div>
                </div>
                <div className="bento-profile-text">
                  <div className="bento-profile-badge">
                    <Sparkles className="h-3 w-3 text-primary" />
                    <span>AI &amp; Enterprise Software Engineer</span>
                  </div>
                  <h3 className="bento-profile-name">Muhammad Usman Aziz</h3>
                  <p className="bento-profile-bio">
                    FAST-NUCES Computer Science alumnus specializing in <strong>production GenAI systems</strong>, <strong>custom ERPNext platforms</strong>, and <strong>offline-first applications</strong>. I turn complex architectural challenges into scalable, tamper-proof systems that power real business operations.
                  </p>
                  <div className="bento-tags-row">
                    <span className="bento-pill">Python</span>
                    <span className="bento-pill">TypeScript</span>
                    <span className="bento-pill">React 19</span>
                    <span className="bento-pill">Frappe / ERPNext</span>
                    <span className="bento-pill">RAG &amp; LoRA</span>
                    <span className="bento-pill">Dexie (IndexedDB)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Live Timezone & Remote Availability Widget (Spans 1 col) */}
            <div className="bento-card spotlight-card bento-card-clock" data-reveal style={revealDelay(80)}>
              <div className="bento-card-header">
                <span className="bento-card-eyebrow">
                  <Clock className="h-3.5 w-3.5 text-primary" /> LIVE TIMEZONE
                </span>
                <span className="bento-live-badge">
                  <span className="live-dot" /> LIVE
                </span>
              </div>
              <LiveClockWidget />
              <div className="bento-clock-footer">
                <div className="bento-status-line">
                  <span className="bento-green-indicator" />
                  <span>Faisalabad · Open to Remote &amp; Global</span>
                </div>
                <p className="bento-tz-note">
                  Flexible working hours overlapping with <strong>US (EST/PST)</strong> &amp; <strong>EU (GMT)</strong>.
                </p>
              </div>
            </div>

            {/* Card 3: Active Radar / Current Focus (Spans 1 col) */}
            <div className="bento-card spotlight-card bento-card-radar" data-reveal style={revealDelay(120)}>
              <div className="bento-card-header">
                <span className="bento-card-eyebrow">
                  <Cpu className="h-3.5 w-3.5 text-primary" /> ACTIVE RADAR
                </span>
                <span className="bento-radar-badge">SHIPPING</span>
              </div>
              <h4 className="bento-card-title">What I&rsquo;m currently exploring &amp; engineering</h4>
              <ul className="bento-radar-list">
                <li>
                  <strong>Agentic AI &amp; Tool Scaffolding:</strong> Autonomous workflow agents with strict schema-validated tool calling.
                </li>
                <li>
                  <strong>Offline-First Resilience:</strong> Zero-latency optimistic client caching with IndexedDB &amp; SQLite edge sync.
                </li>
                <li>
                  <strong>Cryptographic Ledgers:</strong> HMAC-SHA256 commercial verification inside Frappe.
                </li>
              </ul>
            </div>

            {/* Card 4: Academic Foundation - FAST-NUCES (Spans 1 col) */}
            <div className="bento-card spotlight-card bento-card-edu" data-reveal style={revealDelay(160)}>
              <div className="bento-card-header">
                <span className="bento-card-eyebrow">
                  <GraduationCap className="h-3.5 w-3.5 text-primary" /> ALMA MATER
                </span>
                <span className="bento-pill-accent">BS CS</span>
              </div>
              <h4 className="bento-card-title">FAST National University (FAST-NUCES)</h4>
              <p className="bento-edu-meta">Faisalabad Campus · Computer Science Alumnus</p>
              <div className="bento-edu-highlight">
                <div className="bento-edu-badge">Distinction FYP</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <strong>Deaf-ED:</strong> Real-time Pakistani Sign Language recognition achieving 90%+ accuracy via MediaPipe &amp; Bi-LSTM.
                </p>
              </div>
              <div className="bento-edu-courses">
                <span>Distributed Systems</span>
                <span>Machine Learning</span>
                <span>Advanced DSA</span>
                <span>OS</span>
              </div>
            </div>

            {/* Card 5: Mentorship & Community Leadership (Spans 1 col) */}
            <div className="bento-card spotlight-card bento-card-mentor" data-reveal style={revealDelay(200)}>
              <div className="bento-card-header">
                <span className="bento-card-eyebrow">
                  <Users className="h-3.5 w-3.5 text-success" /> MENTORSHIP
                </span>
                <span className="bento-pill-accent">7+ YEARS</span>
              </div>
              <h4 className="bento-card-title">The Century Academy</h4>
              <p className="bento-edu-meta">Lead STEM &amp; Computer Science Instructor</p>
              <div className="bento-stat-highlight">
                <div className="bento-stat-num">150+</div>
                <div className="bento-stat-sub">Students mentored in CS &amp; Python with a 95%+ board pass rate.</div>
              </div>
              <p className="bento-quote">
                &ldquo;Explaining complex architectural ideas simply is the ultimate proof of engineering depth.&rdquo;
              </p>
            </div>

            {/* Card 6: Enterprise Production Impact at Agrovisions (Spans 3 cols full width) */}
            <div className="bento-card spotlight-card bento-card-enterprise" data-reveal style={revealDelay(240)}>
              <div className="bento-enterprise-header">
                <div>
                  <div className="bento-card-header">
                    <span className="bento-card-eyebrow">
                      <BriefcaseBusiness className="h-3.5 w-3.5 text-primary" /> ENTERPRISE PRODUCTION
                    </span>
                    <span className="bento-live-badge">AGROVISIONS · OCT 2025 — PRESENT</span>
                  </div>
                  <h4 className="bento-card-title text-lg">
                    Full-Stack Software Engineer &amp; ERPNext Specialist
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                    Spearheading core enterprise software customization, mission-critical financial ETL migrations, and cryptographic verification workflows for high-volume agricultural logistics.
                  </p>
                </div>
                <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
                  <a href="#experience">
                    View Full Experience <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </a>
                </Button>
              </div>

              <div className="bento-kpi-grid">
                <div className="bento-kpi-card">
                  <span className="bento-kpi-value">40%</span>
                  <span className="bento-kpi-label">Sales &amp; Document Speedup</span>
                  <p className="bento-kpi-desc">Automated invoicing and warehouse repacking flows inside Frappe.</p>
                </div>
                <div className="bento-kpi-card">
                  <span className="bento-kpi-value">500+</span>
                  <span className="bento-kpi-label">Shipments Secured</span>
                  <p className="bento-kpi-desc">HMAC-SHA256 encrypted QR authentication eliminating physical paperwork tampering.</p>
                </div>
                <div className="bento-kpi-card">
                  <span className="bento-kpi-value">100%</span>
                  <span className="bento-kpi-label">Data Migration Fidelity</span>
                  <p className="bento-kpi-desc">Migrated 5+ years of QuickBooks Desktop records into ERPNext with zero data loss.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="section site-container" data-reveal>
          <div className="eyebrow">The journey</div>
          <h2 className="section-heading">Experience that makes a difference.</h2>
          <div className="timeline">
            <div className="timeline-item" data-reveal>
              <div className="timeline-date">Oct 2025 — Present</div>
              <div className="timeline-content">
                <h3>Agrovisions</h3>
                <p className="timeline-role">Software Engineer</p>
                <ul>
                  <li>
                    Developed and customized enterprise ERPNext solutions, reducing manual sales and
                    invoicing time by 40%.
                  </li>
                  <li>
                    Engineered tamper-proof cryptographic QR verification for 500+ commercial
                    documents.
                  </li>
                  <li>
                    Spearheaded automated ETL pipelines migrating 5+ years of QuickBooks Desktop
                    records with 100% data fidelity.
                  </li>
                </ul>
              </div>
            </div>
            <div className="timeline-item" data-reveal style={revealDelay(80)}>
              <div className="timeline-date">Aug 2019 — Present</div>
              <div className="timeline-content">
                <h3>The Century Academy</h3>
                <p className="timeline-role">Computer Science &amp; STEM Instructor</p>
                <ul>
                  <li>
                    7+ years mentoring 150+ students in Computer Science, Mathematics and Python.
                  </li>
                  <li>
                    Helped students achieve a 95%+ board pass rate through hands-on instruction and
                    personalized mentorship.
                  </li>
                </ul>
              </div>
            </div>
            <div className="timeline-item" data-reveal style={revealDelay(160)}>
              <div className="timeline-date">Jul 2024 — Sep 2024</div>
              <div className="timeline-content">
                <h3>Early foundations</h3>
                <p className="timeline-role">
                  AI, Data Analysis &amp; Machine Learning Internships
                </p>
                <ul>
                  <li>CodeAlpha — AI Intern</li>
                  <li>Oasis Infobyte — Data Analyst Intern</li>
                  <li>GrowIntern — Machine Learning Intern</li>
                </ul>
              </div>
            </div>
            <div className="timeline-item" data-reveal style={revealDelay(240)}>
              <div className="timeline-date">BS Computer Science</div>
              <div className="timeline-content">
                <h3>FAST National University (FAST-NUCES)</h3>
                <p className="timeline-role">Computer Science Alumnus · Faisalabad</p>
                <ul>
                  <li>
                    Rigorous curriculum covering Data Structures, Machine Learning, Operating Systems &amp; Distributed Systems.
                  </li>
                  <li>
                    Final-Year Project: Deaf-ED — Real-time PSL sign language recognition with 90%+ accuracy.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section site-container" data-reveal>
          <div className="eyebrow">My toolkit</div>
          <h2 className="section-heading">The right tools. The right solutions.</h2>
          <p className="section-subtitle">
            A versatile stack spanning intelligent systems, enterprise software and modern
            experiences.
          </p>
          <div className="skills-layout">
            <div className="skill-tabs" role="tablist" aria-label="Technology categories">
              {skillGroups.map((group, i) => {
                const Icon = skillIcons[i] ?? Code2;
                return (
                  <Button
                    key={group.name}
                    variant="ghost"
                    className="skill-tab"
                    role="tab"
                    id={`skill-tab-${i}`}
                    aria-selected={skillIndex === i}
                    aria-controls="skills-panel"
                    tabIndex={skillIndex === i ? 0 : -1}
                    data-active={skillIndex === i}
                    onClick={() => setSkillIndex(i)}
                  >
                    <Icon />
                    {group.name}
                  </Button>
                );
              })}
            </div>
            <div
              id="skills-panel"
              className="skill-grid"
              role="tabpanel"
              aria-labelledby={`skill-tab-${skillIndex}`}
            >
              {currentSkills?.skills.map((skill, i) => (
                <div
                  className="skill"
                  key={skill}
                  data-reveal
                  style={revealDelay(Math.min(i, 6) * 45)}
                >
                  <SkillIcon />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="section site-container" data-reveal>
          <div className="eyebrow">Recommendations &amp; Trust</div>
          <h2 className="section-heading">What collaborators say.</h2>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card spotlight-card" key={i} data-reveal style={revealDelay(i * 100)}>
                <div className="quote-mark">&ldquo;</div>
                <p className="testimonial-quote">{t.quote}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.author.charAt(0)}</div>
                  <div>
                    <strong>{t.author}</strong>
                    <span>
                      {t.role} · {t.organization}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="blogs" className="section site-container" data-reveal>
          <div className="section-top">
            <div>
              <div className="eyebrow">Thoughts &amp; insights</div>
              <h2 className="section-heading">Engineering, beyond the code.</h2>
              <p className="section-subtitle">
                Sharing practical architecture lessons, GenAI deep-dives, and enterprise engineering workflows.
              </p>
            </div>
            <a className="text-action" href={socials.medium} target="_blank" rel="noreferrer">
              View all on Medium <ArrowUpRight />
            </a>
          </div>
          <div className="blogs-grid">
            {blogs.map((blog, i) => (
              <a
                key={blog.title}
                href={blog.url}
                target="_blank"
                rel="noreferrer"
                className="blog-card spotlight-card"
                data-reveal
                style={revealDelay(i * 80)}
              >
                <div className="blog-meta">
                  <span className="blog-tag">{blog.tag}</span>
                  <span className="blog-time">{blog.readTime}</span>
                </div>
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
                <span className="blog-read-link">
                  Read on Medium <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section id="contact" className="section site-container" data-reveal>
          <div className="contact-layout">
            <div>
              <div className="eyebrow">Let&rsquo;s connect</div>
              <h2 className="section-heading contact-heading">
                Have a challenge?
                <br />
                <span>Let&rsquo;s engineer a solution.</span>
              </h2>
              <p className="contact-copy">
                An ambitious product, an enterprise challenge, or the next chapter in a great
                engineering team—I&rsquo;d love to hear about it.
              </p>
              <div className="contact-email">
                <a href={`mailto:${socials.email}`}>{socials.email}</a>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Copy email to clipboard"
                  title="Copy email"
                  onClick={copyEmail}
                >
                  {copied ? <Check /> : <Copy />}
                </Button>
              </div>
              <a className="contact-meta" href="tel:+923216692660">
                <Phone />
                (+92) 321 6692660
              </a>
              <p className="contact-meta">
                <MapPin />
                Faisalabad, Punjab, Pakistan
              </p>
              <div className="contact-socials">
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Personal GitHub"
                  title="Personal GitHub"
                >
                  <Github />
                </a>
                <a
                  href={socials.engineering}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Engineering GitHub"
                  title="Engineering GitHub"
                >
                  <Code2 />
                </a>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <Linkedin />
                </a>
                <a href={`mailto:${socials.email}`} aria-label="Email" title="Email">
                  <Mail />
                </a>
                <a href="tel:+923216692660" aria-label="Phone" title="Phone">
                  <Phone />
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-container footer-inner">
          <a className="brand footer-brand" href="#home">
            MUA<span>.</span>
          </a>
          <p>© 2026 Muhammad Usman Aziz. All rights reserved.</p>
          <p>
            Built with passion <span className="footer-dot">&amp;</span> precision.
          </p>
        </div>
      </footer>

      <Button
        variant="ghost"
        size="icon"
        className="back-to-top"
        data-visible={showTop}
        aria-label="Back to top"
        title="Back to top"
        tabIndex={showTop ? 0 : -1}
        onClick={scrollToTop}
      >
        <ArrowUp />
      </Button>

      <CommandPalette
        open={cmdOpen}
        onOpenChange={setCmdOpen}
        onOpenTerminal={() => setTerminalOpen(true)}
      />
      <TerminalModal open={terminalOpen} onOpenChange={setTerminalOpen} />

      {/* Flagship Engineering Case Study Dialog */}
      <Dialog
        open={Boolean(selectedCaseStudy)}
        onOpenChange={(open) => !open && setSelectedCaseStudy(null)}
      >
        <DialogContent className="case-study-dialog max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedCaseStudy?.caseStudy && (
            <div className="space-y-6">
              <DialogHeader className="text-left space-y-2">
                <div className="flex items-center gap-2">
                  <span className="case-study-badge">{selectedCaseStudy.category}</span>
                  <span className="text-xs font-mono text-primary uppercase tracking-wider">
                    Engineering Case Study
                  </span>
                </div>
                <DialogTitle className="text-2xl font-bold tracking-tight text-foreground">
                  {selectedCaseStudy.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  {selectedCaseStudy.subtitle}
                </DialogDescription>
              </DialogHeader>

              {/* Metrics highlight grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
                {selectedCaseStudy.caseStudy.metrics.map((m) => (
                  <div key={m.label} className="case-metric-box">
                    <span className="case-metric-value">{m.value}</span>
                    <span className="case-metric-label">{m.label}</span>
                  </div>
                ))}
              </div>

              {/* Structured deep dive sections */}
              <div className="space-y-4 text-sm leading-relaxed">
                <div className="case-section-card">
                  <h4 className="case-section-title">
                    <span className="case-num">01</span> The Engineering Challenge
                  </h4>
                  <p className="text-muted-foreground">{selectedCaseStudy.caseStudy.challenge}</p>
                </div>

                <div className="case-section-card">
                  <h4 className="case-section-title">
                    <span className="case-num">02</span> Architecture &amp; Technical Decisions
                  </h4>
                  <p className="text-muted-foreground">{selectedCaseStudy.caseStudy.architecture}</p>
                </div>

                <div className="case-section-card">
                  <h4 className="case-section-title">
                    <span className="case-num">03</span> Technical Obstacles Solved
                  </h4>
                  <p className="text-muted-foreground">{selectedCaseStudy.caseStudy.obstacles}</p>
                </div>

                <div className="case-section-card">
                  <h4 className="case-section-title">
                    <span className="case-num">04</span> Quantifiable Business &amp; Technical Outcome
                  </h4>
                  <p className="text-muted-foreground">{selectedCaseStudy.caseStudy.outcome}</p>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-2 border-t border-border">
                <span className="text-xs font-mono text-muted-foreground block mb-2">
                  PRODUCTION STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCaseStudy.tech.map((t) => (
                    <span key={t} className="tech-badge">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  {selectedCaseStudy.repo && (
                    <Button asChild size="sm" variant="outline">
                      <a href={selectedCaseStudy.repo} target="_blank" rel="noreferrer">
                        <Github className="h-4 w-4 mr-2" /> Inspect Code
                      </a>
                    </Button>
                  )}
                  {selectedCaseStudy.live && (
                    <Button asChild size="sm">
                      <a href={selectedCaseStudy.live} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" /> Open Live Application
                      </a>
                    </Button>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedCaseStudy(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 60-Second Tech Overview Modal */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
          <DialogHeader className="text-left space-y-1">
            <div className="flex items-center gap-2">
              <span className="case-study-badge">Executive Elevator Pitch</span>
              <span className="text-xs font-mono text-primary uppercase tracking-wider">
                60s Overview
              </span>
            </div>
            <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
              Muhammad Usman Aziz — Tech Brief
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Fast-track overview for international engineering leaders and technical recruiters.
            </DialogDescription>
          </DialogHeader>

          {/* Video Mockup / Interactive Presentation Screen */}
          <div className="video-player-mockup">
            <div className="video-badge-pill">
              <span className="live-dot" /> 60-Second Architecture Overview
            </div>
            <div className="video-center-art">
              <PlayCircle className="h-14 w-14 text-primary opacity-90 transition-transform hover:scale-110 cursor-pointer" />
            </div>
            <div className="video-controls-bar">
              <span className="font-mono text-2xs text-foreground/80">00:00 / 01:00</span>
              <div className="video-scrubber">
                <div className="video-scrubber-fill" />
              </div>
              <span className="font-mono text-2xs text-primary font-semibold">1080p HD</span>
            </div>
          </div>

          {/* Transcript / Silicon Valley Pitch */}
          <div className="pitch-transcript space-y-3 text-sm leading-relaxed border border-border p-4 rounded-xl bg-card">
            <p className="font-medium text-foreground">
              &ldquo;I architect intelligent systems at the intersection of Generative AI, enterprise ERPNext, and resilient offline-first mobile applications.&rdquo;
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2">
              <div className="pitch-point">
                <strong>🤖 Production GenAI:</strong> RAG with ChromaDB, parameter-efficient fine-tuning (LoRA), and clinical note reasoning.
              </div>
              <div className="pitch-point">
                <strong>🏢 Enterprise ERP:</strong> Frappe/ERPNext developer at Agrovisions; 100% data fidelity ETL migrations &amp; HMAC QR verification.
              </div>
              <div className="pitch-point">
                <strong>⚡ Offline-First Systems:</strong> Sub-15ms local queries with Dexie (IndexedDB), React 19, TanStack Start &amp; Capacitor.
              </div>
              <div className="pitch-point">
                <strong>🌍 Global Readiness:</strong> FAST-NUCES CS graduate; fluent English; overlapping US/EU working hours.
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              <Button asChild size="sm">
                <a href="#contact" onClick={() => setVideoOpen(false)}>
                  Book / Contact Directly <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a href="/Muhammad-Usman-Aziz-Resume.pdf" target="_blank" rel="noreferrer">
                  <Download className="h-3.5 w-3.5 mr-1" /> Resume (PDF)
                </a>
              </Button>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setVideoOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
