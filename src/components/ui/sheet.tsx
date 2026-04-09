"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export function Sheet({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div 
        className="absolute inset-0 bg-background/50 backdrop-blur-sm" 
        onClick={onClose} 
      />
      <div
        className={`relative z-50 w-full max-w-lg transform border-l border-line bg-background p-6 shadow-2xl transition-transform duration-300 sm:p-8 overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-[-0.04em]">{title}</h2>
          <button onClick={onClose} className="rounded-full bg-accent-soft p-2 text-accent hover:bg-line transition-colors">
            <X className="size-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
