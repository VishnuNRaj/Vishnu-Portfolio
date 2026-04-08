"use client";

import { useEffect, useRef } from "react";

type ScrollSceneProps = {
  children: React.ReactNode;
};

export function ScrollScene({ children }: ScrollSceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let teardown = () => {};

    void (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: 52, filter: "blur(10px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-scale-in]").forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0, scale: 0.9, y: 64, rotateX: 8, filter: "blur(8px)" },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              rotateX: 0,
              filter: "blur(0px)",
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 92%",
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger-group]").forEach((group) => {
          const children = group.querySelectorAll<HTMLElement>("[data-stagger-item]");

          gsap.fromTo(
            children,
            { opacity: 0, y: 30, filter: "blur(6px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.8,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: group,
                start: "top 90%",
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-line-grow]").forEach((line) => {
          gsap.fromTo(
            line,
            { scaleY: 0, transformOrigin: "top center" },
            {
              scaleY: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: line,
                start: "top 86%",
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-shine]").forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0, xPercent: -20 },
            {
              opacity: 1,
              xPercent: 0,
              duration: 1.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: element,
                start: "top 84%",
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-project-card]").forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0.5, y: 24, rotateX: 6 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.9,
              delay: index * 0.05,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "left 86%",
                horizontal: true,
                scroller: "[data-project-rail]",
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
          const speed = Number(element.dataset.parallax ?? "-12");

          gsap.to(element, {
            yPercent: speed,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        });

        gsap.to("[data-orbit]", {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-float]").forEach((element, index) => {
          gsap.to(element, {
            y: index % 2 === 0 ? -18 : 18,
            x: index % 2 === 0 ? 10 : -10,
            duration: 4 + index,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });

        ScrollTrigger.refresh();
      }, root);

      teardown = () => context.revert();
    })();

    return () => teardown();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
