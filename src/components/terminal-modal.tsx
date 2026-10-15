import { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  Check,
  ChevronRight,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  HelpCircle,
  Linkedin,
  Mail,
  Maximize2,
  Minimize2,
  Phone,
  RefreshCw,
  Sparkles,
  Terminal as TerminalIcon,
  User,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { projects, socials, education, globalWorkSignals } from "@/lib/portfolio-data";

interface TerminalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

const AVAILABLE_COMMANDS = [
  { cmd: "help", desc: "List all available interactive terminal commands" },
  { cmd: "about", desc: "Display executive summary and engineering background" },
  { cmd: "skills", desc: "Inspect core technical stack and architectural specializations" },
  { cmd: "projects", desc: "Show flagship production & open-source projects" },
  { cmd: "experience", desc: "Print career milestones & Agrovisions production impact" },
  { cmd: "education", desc: "Show FAST-NUCES academic credentials & FYP" },
  { cmd: "cat resume", desc: "Download or inspect static developer resume" },
  { cmd: "contact", desc: "Show direct channels (Email, LinkedIn, Phone, GitHub)" },
  { cmd: "time", desc: "Check current Pakistan Standard Time (PKT) & overlap" },
  { cmd: "clear", desc: "Clear terminal history buffer" },
];

export function TerminalModal({ open, onOpenChange }: TerminalModalProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [commandIndex, setCommandIndex] = useState<number>(-1);
  const [enteredCommands, setEnteredCommands] = useState<string[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input automatically when terminal dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  // Scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    setEnteredCommands((prev) => [...prev, trimmed]);
    setCommandIndex(-1);

    const lower = trimmed.toLowerCase();
    const parts = lower.split(" ").filter(Boolean);
    const mainCmd = parts[0];
    const subCmd = parts.slice(1).join(" ");

    let output: React.ReactNode = null;

    if (lower === "clear" || lower === "cls") {
      setHistory([]);
      setInputVal("");
      return;
    }

    if (mainCmd === "help") {
      output = (
        <div className="space-y-2 py-1">
          <p className="text-muted-foreground text-xs">
            Antigravity Shell v2.4 (x86_64-pc-linux-gnu). Type commands or click any chip below:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs">
            {AVAILABLE_COMMANDS.map((item) => (
              <div
                key={item.cmd}
                onClick={() => handleCommand(item.cmd)}
                className="cursor-pointer flex items-baseline gap-2 p-1.5 rounded hover:bg-primary/10 hover:text-primary transition-colors border border-border/40"
              >
                <span className="text-primary font-bold">{item.cmd}</span>
                <span className="text-muted-foreground text-2xs truncate">— {item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (mainCmd === "about" || mainCmd === "whoami") {
      output = (
        <div className="space-y-2 text-xs leading-relaxed py-1">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <User className="h-4 w-4" />
            <span>Muhammad Usman Aziz — AI &amp; Enterprise Software Engineer</span>
          </div>
          <p className="text-foreground/90">
            FAST-NUCES graduate based in Faisalabad, Pakistan. Specializing in{" "}
            <span className="text-primary font-medium">Production GenAI Systems</span> (RAG, LoRA, ChromaDB),{" "}
            <span className="text-primary font-medium">Frappe / ERPNext</span> customizations, and{" "}
            <span className="text-primary font-medium">Offline-First Architectures</span>.
          </p>
          <div className="bg-card/60 p-2.5 rounded border border-border/60 text-2xs font-mono space-y-1">
            <div>📍 Location: Faisalabad, PK (UTC+5)</div>
            <div>💼 Availability: Full-Time Remote / B2B Contract (W-8BEN) / Relocation</div>
            <div>⚡ Core Strengths: System Architecture, Clean APIs, 0% Data-Loss Migrations</div>
          </div>
        </div>
      );
    } else if (mainCmd === "skills" || mainCmd === "stack") {
      output = (
        <div className="space-y-2.5 py-1 text-xs">
          <div>
            <span className="text-primary font-mono font-semibold">⚡ Languages &amp; Core:</span>
            <p className="text-muted-foreground mt-0.5">Python, TypeScript, JavaScript, SQL, C++, HTML5/CSS3</p>
          </div>
          <div>
            <span className="text-primary font-mono font-semibold">🤖 Artificial Intelligence:</span>
            <p className="text-muted-foreground mt-0.5">
              PyTorch, MediaPipe, Hugging Face Transformers, RAG (Retrieval-Augmented Generation), ChromaDB, LoRA Fine-Tuning, Bi-LSTM
            </p>
          </div>
          <div>
            <span className="text-primary font-mono font-semibold">🏢 Enterprise &amp; Backend:</span>
            <p className="text-muted-foreground mt-0.5">
              Frappe Framework, ERPNext customization, PostgreSQL, MariaDB, Docker, REST APIs, Cryptographic HMAC-SHA256
            </p>
          </div>
          <div>
            <span className="text-primary font-mono font-semibold">🌐 Modern Web &amp; Mobile:</span>
            <p className="text-muted-foreground mt-0.5">
              React 19, TanStack Start / Router, Next.js, Vite, Tailwind CSS, Capacitor, Dexie.js (IndexedDB offline-first)
            </p>
          </div>
        </div>
      );
    } else if (mainCmd === "projects") {
      output = (
        <div className="space-y-3 py-1">
          <p className="text-xs text-muted-foreground">Top flagship engineering projects from repository:</p>
          <div className="space-y-2">
            {projects.slice(0, 4).map((p, idx) => (
              <div key={idx} className="p-2.5 rounded border border-border/60 bg-card/40 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-primary" /> {p.title}
                  </span>
                  <span className="text-2xs font-mono text-primary px-1.5 py-0.5 rounded bg-primary/10">
                    {p.category}
                  </span>
                </div>
                <p className="text-muted-foreground text-2xs">{p.subtitle}</p>
                <div className="text-2xs font-mono text-emerald-500 flex items-center gap-1">
                  <span>Impact:</span> {p.impact}
                </div>
                <div className="flex items-center gap-3 pt-1 text-2xs">
                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      <Github className="h-3 w-3" /> GitHub Repo
                    </a>
                  )}
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (mainCmd === "experience" || mainCmd === "work") {
      output = (
        <div className="space-y-3 py-1 text-xs">
          <div className="p-2.5 rounded border border-border/60 bg-card/40 space-y-1">
            <div className="flex items-center justify-between font-semibold">
              <span className="text-primary">Agrovisions — Software Engineer</span>
              <span className="text-2xs font-mono text-muted-foreground">Oct 2025 — Present</span>
            </div>
            <p className="text-muted-foreground text-2xs">Faisalabad, Pakistan · Enterprise Logistics</p>
            <ul className="list-disc list-inside space-y-1 text-2xs text-foreground/90 pt-1">
              <li>Engineered custom ERPNext invoicing, reducing manual document turnaround by 40%.</li>
              <li>Generated tamper-proof HMAC cryptographic QR codes across 500+ shipments.</li>
              <li>Automated QuickBooks-to-Frappe ETL migration maintaining 100% data fidelity.</li>
            </ul>
          </div>
          <div className="p-2.5 rounded border border-border/60 bg-card/40 space-y-1">
            <div className="flex items-center justify-between font-semibold">
              <span className="text-primary">The Century Academy — STEM &amp; CS Instructor</span>
              <span className="text-2xs font-mono text-muted-foreground">Aug 2019 — Present</span>
            </div>
            <p className="text-muted-foreground text-2xs">7+ Years · Mentored 150+ students in CS &amp; Python (95%+ pass rate)</p>
          </div>
        </div>
      );
    } else if (mainCmd === "education" || mainCmd === "edu") {
      output = (
        <div className="p-3 rounded border border-border/60 bg-card/40 space-y-2 text-xs">
          <div className="flex items-center justify-between font-semibold">
            <span className="text-primary flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4" /> {education.institution}
            </span>
            <span className="text-2xs font-mono text-muted-foreground">{education.period}</span>
          </div>
          <p className="text-foreground font-medium">{education.degree}</p>
          <p className="text-2xs text-muted-foreground">{education.campus}</p>
          <div className="bg-primary/5 border border-primary/20 p-2 rounded text-2xs text-foreground/90 mt-2">
            <strong>Distinction FYP (Deaf-ED):</strong> Real-time Pakistani Sign Language recognition achieving 90%+ accuracy via MediaPipe &amp; Bi-LSTM.
          </div>
        </div>
      );
    } else if (mainCmd === "cat" && subCmd === "resume") {
      output = (
        <div className="space-y-2 py-1 text-xs">
          <p className="text-emerald-500 font-mono">✓ Static resume file located at /public/Muhammad-Usman-Aziz-Resume.pdf</p>
          <div className="flex items-center gap-2 pt-1">
            <a
              href="/Muhammad-Usman-Aziz-Resume.pdf"
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground font-medium text-xs hover:bg-primary/90 transition-colors"
            >
              <Download className="h-3.5 w-3.5" /> Download PDF Resume
            </a>
            <a
              href="/Muhammad-Usman-Aziz-Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-foreground font-medium text-xs hover:bg-accent transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Open in New Tab
            </a>
          </div>
        </div>
      );
    } else if (mainCmd === "contact" || mainCmd === "email") {
      output = (
        <div className="space-y-2 py-1 text-xs">
          <p className="text-muted-foreground">Direct connection channels:</p>
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-primary" />
              <a href={`mailto:${socials.email}`} className="text-foreground hover:underline">
                {socials.email}
              </a>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(socials.email);
                  toast.success("Email copied!");
                }}
                className="text-2xs text-primary hover:underline px-1 py-0.5 rounded bg-primary/10 ml-2"
              >
                Copy
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="h-3.5 w-3.5 text-primary" />
              <a href={socials.linkedin} target="_blank" rel="noreferrer" className="text-foreground hover:underline">
                {socials.linkedin}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Github className="h-3.5 w-3.5 text-primary" />
              <a href={socials.github} target="_blank" rel="noreferrer" className="text-foreground hover:underline">
                {socials.github}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-primary" />
              <span className="text-foreground">+92 309 6660447</span>
            </div>
          </div>
        </div>
      );
    } else if (mainCmd === "time" || mainCmd === "date") {
      const now = new Date();
      const pkt = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Karachi",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }).format(now);

      output = (
        <div className="space-y-1 py-1 text-xs font-mono">
          <p className="text-foreground">Current Time in Faisalabad (PKT): <strong className="text-primary">{pkt}</strong></p>
          <p className="text-muted-foreground text-2xs">{globalWorkSignals.timezoneOverlap}</p>
        </div>
      );
    } else if (mainCmd === "sudo" || mainCmd === "rm" || mainCmd === "cat") {
      output = (
        <p className="text-amber-500 font-mono text-xs">
          Permission denied: Portfolio is locked in guest sandbox mode.
        </p>
      );
    } else {
      output = (
        <p className="text-rose-500 font-mono text-xs">
          command not found: <span className="underline">{trimmed}</span>. Type <strong className="text-primary cursor-pointer" onClick={() => handleCommand("help")}>&apos;help&apos;</strong> to see available commands.
        </p>
      );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: trimmed,
        output,
      },
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (enteredCommands.length === 0) return;
      const nextIdx = commandIndex === -1 ? enteredCommands.length - 1 : Math.max(0, commandIndex - 1);
      setCommandIndex(nextIdx);
      setInputVal(enteredCommands[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandIndex === -1) return;
      if (commandIndex < enteredCommands.length - 1) {
        const nextIdx = commandIndex + 1;
        setCommandIndex(nextIdx);
        setInputVal(enteredCommands[nextIdx]);
      } else {
        setCommandIndex(-1);
        setInputVal("");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`terminal-modal-content bg-[#0c0e14] text-[#d6deeb] border-[#1e2433] p-0 overflow-hidden shadow-2xl transition-all duration-200 w-[96vw] max-w-2xl ${
          isMaximized ? "w-[98vw] max-w-[98vw] h-[92vh]" : "max-h-[85vh] h-[540px] sm:h-[580px]"
        }`}
      >
        <DialogTitle className="sr-only">Interactive Developer Terminal</DialogTitle>
        <DialogDescription className="sr-only">
          Antigravity developer CLI to query Muhammad Usman Aziz skills, experience, and projects.
        </DialogDescription>

        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#141824] border-b border-[#23293d] select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span
                onClick={() => onOpenChange(false)}
                className="w-3 h-3 rounded-full bg-[#ef4444] cursor-pointer hover:opacity-80 transition-opacity"
                title="Close terminal"
              />
              <span
                onClick={() => setHistory([])}
                className="w-3 h-3 rounded-full bg-[#eab308] cursor-pointer hover:opacity-80 transition-opacity"
                title="Clear terminal"
              />
              <span
                onClick={() => setIsMaximized(!isMaximized)}
                className="w-3 h-3 rounded-full bg-[#22c55e] cursor-pointer hover:opacity-80 transition-opacity"
                title="Maximize / Restore"
              />
            </div>
            <div className="flex items-center gap-2 ml-3 text-xs font-mono text-[#8b9bb4]">
              <TerminalIcon className="h-3.5 w-3.5 text-primary" />
              <span>usman@antigravity:~$</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#62728f]">
            <span>bash 5.2</span>
            <button
              type="button"
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 hover:text-foreground transition-colors"
              title={isMaximized ? "Restore window" : "Maximize window"}
            >
              {isMaximized ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="p-1 hover:text-foreground transition-colors"
              title="Close"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal History and Interactive Prompt */}
        <div
          className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-3"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Welcome ASCII / Header banner */}
          <div className="space-y-1 text-[#8b9bb4] border-b border-[#1f2638] pb-3">
            <p className="text-primary font-bold">
              ╭─ Muhammad Usman Aziz — Portfolio Terminal Shell v2.4
            </p>
            <p className="text-2xs text-[#718096]">
              ├─ Full-Stack &amp; AI Engineer · FAST-NUCES CS · Agrovisions ERP
            </p>
            <p className="text-2xs text-[#718096]">
              ╰─ Type <strong className="text-primary cursor-pointer" onClick={() => handleCommand("help")}>&apos;help&apos;</strong> for commands, or try <strong className="text-primary cursor-pointer" onClick={() => handleCommand("about")}>&apos;about&apos;</strong>, <strong className="text-primary cursor-pointer" onClick={() => handleCommand("projects")}>&apos;projects&apos;</strong>, <strong className="text-primary cursor-pointer" onClick={() => handleCommand("cat resume")}>&apos;cat resume&apos;</strong>.
            </p>
          </div>

          {/* Executed History */}
          {history.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <span className="text-emerald-400">guest@portfolio:~$</span>
                <span className="text-[#e2e8f0]">{item.command}</span>
              </div>
              <div className="text-[#cbd5e1] pl-2 border-l border-[#273248]">{item.output}</div>
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-emerald-400 font-semibold select-none">guest@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-[#f1f5f9] font-mono text-xs focus:ring-0 placeholder:text-[#4a5568]"
              placeholder="Type command ('help', 'projects', 'cat resume')..."
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Quick action pill footer */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-[#10141f] border-t border-[#1e2433] overflow-x-auto select-none">
          <span className="text-2xs font-mono text-[#64748b] mr-1 hidden sm:inline">Suggestions:</span>
          {["help", "about", "skills", "projects", "cat resume", "contact", "clear"].map((cmd) => (
            <button
              type="button"
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="text-2xs font-mono px-2 py-0.5 rounded bg-[#1c2336] text-[#93c5fd] hover:bg-primary/20 hover:text-primary transition-colors border border-[#2e3852]"
            >
              {cmd}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
