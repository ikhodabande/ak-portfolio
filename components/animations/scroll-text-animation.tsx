"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

type AnimationType =
  | "words"
  | "words"
  | "lines"
  | "fade"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right";

interface ScrollTextAnimationProps {
  children: ReactNode;
  type?: AnimationType;
  stagger?: number;
  duration?: number;
  delay?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  start?: string;
  markers?: boolean;
  once?: boolean;
}

export default function ScrollTextAnimation({
  children,
  type = "words",
  stagger = 0.02,
  duration = 0.8,
  delay = 0,
  className = "",
  as: Component = "div",
  start = "top 85%",
  markers = false,
  once = true,
}: ScrollTextAnimationProps) {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Register GSAP plugins
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger, SplitText);
    }

    const element = textRef.current;
    if (!element) return;

    let animation: gsap.core.Timeline | null = null;
    let splitText: SplitText | null = null;

    // Create the animation based on the type
    const createAnimation = () => {
      if (!element) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start,
          markers,
          toggleActions: once ? "play none none none" : "play none none reset",
        },
      });

      // Set initial state based on animation type
      switch (type) {
        case "words":
        case "words":
        case "lines":
          // Split text for character, word, or line animations
          splitText = new SplitText(element, {
            type:
              type === "words" ? "words" : type === "words" ? "words" : "lines",
          });

          gsap.set(splitText[type], { y: 30, opacity: 0 });

          tl.to(splitText[type], {
            y: 0,
            opacity: 1,
            duration,
            stagger,
            ease: "power3.out",
            delay,
          });
          break;

        case "fade":
          gsap.set(element, { opacity: 0 });
          tl.to(element, {
            opacity: 1,
            duration,
            delay,
            ease: "power2.out",
          });
          break;

        case "slide-up":
          gsap.set(element, { y: 50, opacity: 0 });
          tl.to(element, {
            y: 0,
            opacity: 1,
            duration,
            delay,
            ease: "power2.out",
          });
          break;

        case "slide-down":
          gsap.set(element, { y: -50, opacity: 0 });
          tl.to(element, {
            y: 0,
            opacity: 1,
            duration,
            delay,
            ease: "power2.out",
          });
          break;

        case "slide-left":
          gsap.set(element, { x: 50, opacity: 0 });
          tl.to(element, {
            x: 0,
            opacity: 1,
            duration,
            delay,
            ease: "power2.out",
          });
          break;

        case "slide-right":
          gsap.set(element, { x: -50, opacity: 0 });
          tl.to(element, {
            x: 0,
            opacity: 1,
            duration,
            delay,
            ease: "power2.out",
          });
          break;
      }

      return tl;
    };

    // Create the animation after a short delay to ensure the DOM is ready
    const timeout = setTimeout(() => {
      animation = createAnimation() || null;
    }, 100);

    return () => {
      clearTimeout(timeout);

      // Clean up
      if (animation) {
        animation.kill();
      }

      if (splitText) {
        splitText.revert();
      }

      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [type, stagger, duration, delay, start, markers, once, children]);

  return (
    <Component ref={textRef} className={className}>
      {children}
    </Component>
  );
}
