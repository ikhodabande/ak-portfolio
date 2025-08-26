'use client';

import { useEffect, useRef, forwardRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations'; // Assuming you've updated this file

gsap.registerPlugin(TextPlugin);

interface HeroSectionProps {
  className?: string;
}

export const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(
  ({ className = '' }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null); // Ref for GSAP context and cleanup
    const heroTitleRef = useRef<HTMLHeadingElement>(null);
    const heroDescRef = useRef<HTMLParagraphElement>(null);
    const heroInfo1Ref = useRef<HTMLDivElement>(null); // Ref for first info block
    const heroInfo2Ref = useRef<HTMLDivElement>(null); // Ref for second info block
    const heroSkillsRef = useRef<HTMLDivElement>(null); // Ref for skills block

    const { language } = useLanguage();
    const t = translations[language];

    useEffect(() => {
      // 1. Use gsap.context for automatic cleanup
      const ctx = gsap.context(() => {
        // Set the initial visibility of the title to 'hidden' to avoid content flash
        // before the animation replaces its content.
        gsap.set(heroTitleRef.current, { visibility: 'hidden' });
        gsap.set(
          [
            heroDescRef.current,
            heroInfo1Ref.current,
            heroInfo2Ref.current,
            heroSkillsRef.current,
          ],
          { opacity: 0, y: 30 }
        );

        const tl = gsap.timeline();

        // The name text for the typing animation (plain text with newline)
        const nameText = t.name.replace('<br />', '\n');

        tl.to(heroTitleRef.current, {
          // Make it visible right before the animation starts
          visibility: 'visible',
          duration: 2,
          text: nameText, // Use the plain text for the animation
          ease: 'none',
          onComplete: () => {
            // Once typing is done, inject the final styled HTML
            if (heroTitleRef.current) {
              heroTitleRef.current.innerHTML = t.nameStyled;
            }
          },
        }).to(
          // 2. Use refs instead of class selectors
          [
            heroDescRef.current,
            heroInfo1Ref.current,
            heroInfo2Ref.current,
            heroSkillsRef.current,
          ],
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
          },
          '-=1.5' // Overlap a bit more for a smoother transition
        );
      }, containerRef); // Scope the context to the main container

      // The return function from useEffect handles cleanup
      return () => ctx.revert();
    }, [language, t]); // Add 't' to the dependency array

    return (
      <header
        id="intro"
        ref={ref}
        className={`min-h-screen flex items-center ${className}`}
      >
        <div
          ref={containerRef}
          className="grid lg:grid-cols-5 relative z-10 gap-16 w-full"
        >
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground font-mono tracking-wider">
                {t.portfolio}
              </div>
              <h1
                ref={heroTitleRef}
                className="text-4xl md:text-6xl font-light tracking-tight lg:text-6xl md:min-h-[120px]"
              >
                {/* This initial content is crucial for SEO and no-JS fallback.
                  It will be briefly hidden then replaced by the animation. */}
                <div dangerouslySetInnerHTML={{ __html: t.nameStyled }} />
              </h1>
            </div>

            <div className="md:space-y-6 max-w-md">
              <p
                ref={heroDescRef}
                className="md:text-xl text-muted-foreground leading-relaxed"
              >
                {t.frontendDeveloper}
                <span className="text-foreground"> React</span>,
                <span className="text-foreground"> Next.js</span>, {t.and}
                <span className="text-foreground"> Vite.js</span>.
              </p>
              {/* 3. Assign refs to the elements */}
              <div
                ref={heroInfo1Ref}
                className="flex items-center gap-4 text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  {t.availableForWork}
                </div>
                <div>{t.location}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col justify-end space-y-8">
            <div ref={heroInfo2Ref} className="space-y-4">
              <div className="text-sm text-muted-foreground font-mono">
                {t.currently}
              </div>
              <div className="space-y-2">
                <div className="text-foreground">{t.jobTitle}</div>
                <div className="text-muted-foreground">{t.freelance}</div>
                <div className="text-xs text-muted-foreground">
                  {t.dateRange}
                </div>
              </div>
            </div>

            <div ref={heroSkillsRef} className="space-y-4">
              <div className="text-sm text-muted-foreground font-mono">
                {t.focus}
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'React',
                  'TypeScript',
                  'Next.js',
                  'Vite.js',
                  'Tailwind CSS',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
);

HeroSection.displayName = 'HeroSection';
