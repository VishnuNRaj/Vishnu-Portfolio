import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type IconLinkProps = {
  href: string;
  label: string;
  icon: LucideIcon;
  className?: string;
};

export function IconLink({
  href,
  label,
  icon: Icon,
  className,
}: IconLinkProps) {
  const external = href.startsWith("http") || href.startsWith("mailto:");

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-3 rounded-full border border-line-strong bg-card/90 px-4 py-2.5 text-sm text-foreground hover:-translate-y-0.5 hover:border-accent/60 hover:bg-card-strong hover:text-accent",
        className,
      )}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <Icon className="size-4" />
      <span>{label}</span>
    </Link>
  );
}
