import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LINKEDIN_URL } from "./content";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Books", href: "#books" },
  { label: "Workshops", href: "#workshops" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:flex md:justify-between">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary font-display text-sm font-bold text-primary-foreground">
            SG
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-semibold">Shweta Gupta</span>
            <span className="block truncate text-[0.7rem] text-muted-foreground">
              AI Agents Coach
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="btn-base btn-cyan">
            Connect on LinkedIn
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
          className="pill md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-background/95 px-5 py-4 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-3">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-base btn-cyan mt-2"
            >
              Connect on LinkedIn
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
