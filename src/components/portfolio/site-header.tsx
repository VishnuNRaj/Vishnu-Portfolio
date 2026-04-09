"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
};

type SiteHeaderProps = {
  brand: string;
  navItems: NavItem[];
  ctaHref: string;
  ctaLabel: string;
};

type ThemeMode = "dark" | "light";

function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    const stored = window.localStorage.getItem("portfolio-theme");
    return stored === "light" || stored === "dark" ? stored : "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong bg-card/85 text-foreground hover:-translate-y-0.5 hover:border-accent/60 hover:bg-card-strong hover:text-accent"
    >
      {theme === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  );
}

export function SiteHeader({
  brand,
  navItems,
  ctaHref,
  ctaLabel,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8">
          <Link
            href="/"
            className="font-display text-sm font-extrabold tracking-[0.3em] uppercase"
          >
            {brand}
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href={ctaHref}>
              <Button className="hidden sm:inline-flex">{ctaLabel}</Button>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong bg-card/85 text-foreground md:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[60] bg-[#020611]/50 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
      />
      <aside
        className={cn(
          "fixed right-0 top-0 z-[61] flex h-full w-[min(24rem,88vw)] flex-col border-l border-line-strong bg-background/95 px-6 py-6 shadow-[0_24px_90px_rgba(2,6,23,0.55)] backdrop-blur-2xl transition-transform duration-300 md:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <p className="font-display text-sm font-extrabold tracking-[0.3em] uppercase">
            Menu
          </p>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong bg-card/80 text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="mt-8 flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-[1.25rem] border border-line-strong bg-card/80 px-4 py-4 font-display text-lg font-bold tracking-[-0.03em] text-foreground hover:border-accent/60 hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="mt-auto space-y-4">
          <Link href={ctaHref} onClick={() => setOpen(false)} className="block">
            <Button className={cn("w-full justify-center")}>{ctaLabel}</Button>
          </Link>
        </div>
      </aside>
    </>
  );
}
