'use client';

import { useEffect, forwardRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';

gsap.registerPlugin(ScrollTrigger);

interface ConnectSectionProps {
  className?: string;
}

export const ConnectSection = forwardRef<HTMLElement, ConnectSectionProps>(
  ({ className = '' }, ref) => {
    const { language, isRTL } = useLanguage();
    const t = translations[language];

    useEffect(() => {
      gsap.fromTo(
        '.connect-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#connect',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, []);

    return (
      <section id="connect" ref={ref} className={`py-32 ${className}`}>
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="connect-content space-y-8">
            <h2 className="text-4xl font-light">{t.letsConnect}</h2>

            <div className="space-y-6">
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t.connectDescription}
              </p>

              <div className="space-y-4">
                <Link
                  href="mailto:amimhmdkh@gmail.com"
                  className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                >
                  <span className="text-lg">amimhmdkh@gmail.com</span>
                  <svg
                    className={`w-5 h-5 transform group-hover:${
                      isRTL ? '-translate-x-1' : 'translate-x-1'
                    } transition-transform duration-300 ${
                      isRTL ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="connect-content space-y-8">
            <div className="text-sm text-muted-foreground font-mono">
              {t.elsewhere}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {t.socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.link || '#'}
                  className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                >
                  <div className="space-y-2">
                    <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                      {social.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {social.handle}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

ConnectSection.displayName = 'ConnectSection';
