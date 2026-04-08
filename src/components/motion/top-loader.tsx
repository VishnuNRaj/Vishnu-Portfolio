"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function TopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const kickoff = window.requestAnimationFrame(() => {
      setVisible(true);
      setProgress(12);
    });

    const stepOne = window.setTimeout(() => setProgress(46), 80);
    const stepTwo = window.setTimeout(() => setProgress(78), 220);
    const finish = window.setTimeout(() => {
      setProgress(100);
      window.setTimeout(() => setVisible(false), 220);
    }, 420);

    return () => {
      window.cancelAnimationFrame(kickoff);
      window.clearTimeout(stepOne);
      window.clearTimeout(stepTwo);
      window.clearTimeout(finish);
    };
  }, [pathname, searchParams]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-1 overflow-hidden"
    >
      <div
        className="h-full origin-left rounded-full bg-[linear-gradient(90deg,#f08b57_0%,#f4d1a7_55%,#fff7eb_100%)] shadow-[0_0_24px_rgba(240,139,87,0.55)] transition-[transform,opacity] duration-500 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: `scaleX(${Math.max(progress, 0) / 100})`,
        }}
      />
    </div>
  );
}
