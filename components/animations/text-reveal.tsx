"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

interface TextRevealProps {
  children: string;
  delay?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export default function TextReveal({
  children,
  delay = 0,
  className = "",
  as: Component = "div",
}: TextRevealProps) {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(SplitText);
    }

    const element = textRef.current;
    if (!element) return;

    // Create a new SplitText instance
    const splitText = new SplitText(element, { type: "words, words" });
    const words = splitText.words;

    gsap.set(words, { y: 40, opacity: 0 });

    gsap.to(words, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.02,
      delay,
      ease: "power4.out",
    });

    return () => {
      // Revert the split text
      if (splitText) {
        splitText.revert();
      }
    };
  }, [children, delay]);

  return (
    <Component ref={textRef} className={className}>
      {children}
    </Component>
  );
}
