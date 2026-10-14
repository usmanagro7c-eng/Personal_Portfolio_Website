import { useEffect, useState } from "react";
import {
  BrainCircuit,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Home,
  Laptop,
  Linkedin,
  Mail,
  Moon,
  Sparkles,
  Sun,
  User,
} from "lucide-react";
import { toast } from "sonner";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { projects, socials } from "@/lib/portfolio-data";
import { useTheme } from "@/lib/use-theme";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  const runCommand = (command: () => void) => {
    onOpenChange(false);
    command();
  };

  const scrollTo = (id: string) => {
    runCommand(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    });
  };

  const copyEmail = () => {
    runCommand(async () => {
      try {
        await navigator.clipboard.writeText(socials.email);
        toast.success("Email copied to clipboard!");
      } catch {
        toast.error("Failed to copy email.");
      }
    });
  };

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search projects..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Flagship Projects">
          {featuredProjects.map((project) => (
            <CommandItem
              key={project.title}
              onSelect={() => {
                if (project.live) {
                  runCommand(() => window.open(project.live, "_blank"));
                } else if (project.repo) {
                  runCommand(() => window.open(project.repo, "_blank"));
                } else {
                  scrollTo("projects");
                }
              }}
            >
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              <span>{project.title}</span>
              <span className="ml-auto text-xs opacity-60">
                {project.live ? "Live App ↗" : "Repo ↗"}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => scrollTo("home")}>
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollTo("projects")}>
            <Laptop className="mr-2 h-4 w-4" />
            <span>Projects (24 total)</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollTo("about")}>
            <User className="mr-2 h-4 w-4" />
            <span>About Usman</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollTo("experience")}>
            <GraduationCap className="mr-2 h-4 w-4" />
            <span>Experience &amp; Mentorship</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollTo("skills")}>
            <Code2 className="mr-2 h-4 w-4" />
            <span>Skills &amp; Toolkit</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollTo("blogs")}>
            <BrainCircuit className="mr-2 h-4 w-4" />
            <span>Technical Insights &amp; Blogs</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollTo("contact")}>
            <Mail className="mr-2 h-4 w-4" />
            <span>Contact &amp; Hire</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick Actions">
          <CommandItem
            onSelect={() =>
              runCommand(() =>
                window.open("/Muhammad-Usman-Aziz-Resume.pdf", "_blank")
              )
            }
          >
            <Download className="mr-2 h-4 w-4 text-primary" />
            <span>Download Resume (PDF)</span>
          </CommandItem>
          <CommandItem onSelect={copyEmail}>
            <Copy className="mr-2 h-4 w-4" />
            <span>Copy Email Address</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() =>
                setTheme(theme === "dark" ? "light" : "dark")
              )
            }
          >
            {theme === "dark" ? (
              <Sun className="mr-2 h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="mr-2 h-4 w-4 text-cyan-400" />
            )}
            <span>Toggle {theme === "dark" ? "Light" : "Dark"} Mode</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => window.open(socials.github, "_blank"))
            }
          >
            <Github className="mr-2 h-4 w-4" />
            <span>View Personal GitHub</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => window.open(socials.engineering, "_blank"))
            }
          >
            <Code2 className="mr-2 h-4 w-4" />
            <span>View Engineering GitHub</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => window.open(socials.linkedin, "_blank"))
            }
          >
            <Linkedin className="mr-2 h-4 w-4" />
            <span>View LinkedIn Profile</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
