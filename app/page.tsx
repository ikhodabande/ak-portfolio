"use client";

import Link from "next/link";
import { Github, Mail, Linkedin, ArrowDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProjectCard from "@/components/project-card";
import SkillsSection from "@/components/skills-section";
import { useLanguage } from "@/context/language-context";
import MotionCard from "@/components/animations/motion-card";
import Globe from "@/components/animations/globe";
import { motion } from "framer-motion";
import ParallaxSection from "@/components/animations/parallax-section";
import ParallaxImage from "@/components/animations/parallax-image";
import ParallaxLayers from "@/components/animations/parallax-layers";
import StaggerReveal from "@/components/animations/stagger-reveal";
import ScrollZoom from "@/components/animations/scroll-zoom";
import HorizontalScroll from "@/components/animations/horizontal-scroll";
import ScrollProgress from "@/components/animations/scroll-progress";
import TiltCard from "@/components/animations/tilt-card";
import MagneticButton from "@/components/animations/magnetic-button";
import ScrollTextAnimation from "@/components/animations/scroll-text-animation";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Featured projects - these would come from your database in the real implementation
const featuredProjects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce platform built with Next.js and Tailwind CSS",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    githubUrl: "https://github.com/username/project1",
    liveUrl: "https://project1.com",
  },
  {
    id: "2",
    title: "AI Content Generator",
    description: "An AI-powered content generator using OpenAI's GPT models",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "Node.js", "OpenAI", "Express"],
    githubUrl: "https://github.com/username/project2",
    liveUrl: "https://project2.com",
  },
  {
    id: "3",
    title: "Dashboard UI Kit",
    description: "A comprehensive dashboard UI kit with reusable components",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "Tailwind CSS", "Figma", "TypeScript"],
    githubUrl: "https://github.com/username/project3",
    liveUrl: "https://project3.com",
  },
];

// Latest blog posts - these would come from your database in the real implementation
const latestPosts = [
  {
    id: "1",
    title: "Modern Front-end Architecture Patterns",
    excerpt:
      "Exploring the latest architecture patterns in front-end development",
    date: "2023-12-15",
    slug: "modern-frontend-architecture",
  },
  {
    id: "2",
    title: "Integrating AI in Web Applications",
    excerpt: "How to leverage AI capabilities in your web applications",
    date: "2023-11-28",
    slug: "ai-in-web-applications",
  },
  {
    id: "3",
    title: "Optimizing React Performance",
    excerpt: "Tips and tricks to improve your React application's performance",
    date: "2023-11-10",
    slug: "optimizing-react-performance",
  },
];

export default function Home() {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Create a timeline for the hero section
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Add parallax effect to the hero section
    heroTl.to(
      heroRef.current,
      {
        backgroundPositionY: "50%",
        ease: "none",
      },
      0
    );

    // Animate the scroll indicator
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      opacity: 0.5,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power1.inOut",
    });

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen no-scrollbar ">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 overflow-hidden no-scrollbar relative"
        style={{ backgroundSize: "120% auto", backgroundPosition: "center 0%" }}
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-start space-y-6 lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <ScrollTextAnimation
                  type="words"
                  as="h1"
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
                >
                  {t("hero.title")}
                </ScrollTextAnimation>
                <ScrollTextAnimation
                  type="words"
                  delay={0.3}
                  as="p"
                  className="mx-auto lg:mx-0 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
                >
                  {t("hero.subtitle")}
                </ScrollTextAnimation>
                <ScrollTextAnimation
                  type="fade"
                  delay={0.6}
                  as="p"
                  className="mx-auto lg:mx-0 max-w-[700px] text-gray-500 md:text-lg dark:text-gray-400 mt-4"
                >
                  {t("hero.description")}
                </ScrollTextAnimation>
              </motion.div>
              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <MagneticButton as="div" strength={40}>
                  <Button asChild>
                    <Link href="/projects">{t("hero.viewProjects")}</Link>
                  </Button>
                </MagneticButton>
                <MagneticButton as="div" strength={40}>
                  <Button variant="outline" asChild>
                    <Link href="/contact">{t("hero.contact")}</Link>
                  </Button>
                </MagneticButton>
              </motion.div>
              <motion.div
                className="flex space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <MagneticButton as="div" strength={30} radius={100}>
                  <Link
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="icon">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </Link>
                </MagneticButton>
                <MagneticButton as="div" strength={30} radius={100}>
                  <Link
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="icon">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </Link>
                </MagneticButton>
                <MagneticButton as="div" strength={30} radius={100}>
                  <Link href="mailto:your.email@example.com">
                    <Button variant="ghost" size="icon">
                      <Mail className="h-5 w-5" />
                      <span className="sr-only">Email</span>
                    </Button>
                  </Link>
                </MagneticButton>
              </motion.div>
            </div>
            <div className="lg:w-1/2">
              <Globe />
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            ref={scrollIndicatorRef}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <span className="text-sm text-muted-foreground mb-2">
              {language === "fa" ? "اسکرول کنید" : "Scroll Down"}
            </span>
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* About Section with Parallax */}
      <ParallaxSection className="py-12 md:py-16 bg-white dark:bg-slate-900 min-h-[80vh] flex items-center">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <ScrollTextAnimation
              type="slide-up"
              as="h2"
              className="text-3xl font-bold tracking-tighter md:text-4xl"
            >
              {t("about.title")}
            </ScrollTextAnimation>
            <ScrollTextAnimation
              type="slide-up"
              delay={0.1}
              as="p"
              className="text-gray-500 dark:text-gray-400"
            >
              {t("about.description1")}
            </ScrollTextAnimation>
            <ScrollTextAnimation
              type="slide-up"
              delay={0.2}
              as="p"
              className="text-gray-500 dark:text-gray-400"
            >
              {t("about.description2")}
            </ScrollTextAnimation>
          </div>
          {/* <ScrollZoom className="flex justify-center"> */}
            {/* <TiltCard tiltMaxAngleX={10} tiltMaxAngleY={10} glareOpacity={0.2}> */}
              <motion.div
                className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] overflow-hidden rounded-full border-4 border-white dark:border-slate-800 shadow-xl"
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/placeholder.svg?height=320&width=320"
                  alt="Amirmohammad Khodabande"
                  className="object-cover"
                  width={320}
                  height={320}
                />
              </motion.div>
            {/* </TiltCard> */}
          {/* </ScrollZoom> */}
        </div>
      </ParallaxSection>

      {/* Multi-layer Parallax Background */}
      <ParallaxLayers
        className="py-20 md:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-slate-900 min-h-[60vh] flex items-center"
        layers={[
          {
            content: (
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-blue-500"></div>
                <div className="absolute top-40 right-20 w-60 h-60 rounded-full bg-purple-500"></div>
                <div className="absolute bottom-20 left-1/3 w-40 h-40 rounded-full bg-green-500"></div>
              </div>
            ),
            speed: 0.2,
          },
          {
            content: (
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-yellow-500"></div>
                <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-red-500"></div>
                <div className="absolute bottom-1/4 left-2/3 w-24 h-24 rounded-full bg-indigo-500"></div>
              </div>
            ),
            speed: 0.4,
          },
          {
            content: (
              <div className="relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                  <ScrollTextAnimation
                    type="words"
                    as="h2"
                    className="text-3xl md:text-4xl font-bold mb-6"
                  >
                    {language === "fa" ? "مهارت های برجسته" : "Core Expertise"}
                  </ScrollTextAnimation>
                  <ScrollTextAnimation
                    type="slide-up"
                    as="p"
                    className="text-lg text-gray-600 dark:text-gray-300 mb-10"
                  >
                    {language === "fa"
                      ? "با استفاده از تکنولوژی‌های مدرن و روش‌های پیشرفته، راه‌حل‌های خلاقانه برای چالش‌های پیچیده ارائه می‌دهم."
                      : "Using modern technologies and advanced methodologies, I deliver creative solutions for complex challenges."}
                  </ScrollTextAnimation>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StaggerReveal>
                      <TiltCard
                        tiltMaxAngleX={5}
                        tiltMaxAngleY={5}
                        glareOpacity={0.1}
                      >
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                          <h3 className="text-xl font-bold mb-3">
                            {language === "fa"
                              ? "توسعه فرانت‌اند"
                              : "Front-end Development"}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400">
                            {language === "fa"
                              ? "ساخت رابط‌های کاربری مدرن و واکنش‌گرا با React و Next.js"
                              : "Building modern and responsive user interfaces with React and Next.js"}
                          </p>
                        </div>
                      </TiltCard>
                      <TiltCard
                        tiltMaxAngleX={5}
                        tiltMaxAngleY={5}
                        glareOpacity={0.1}
                      >
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                          <h3 className="text-xl font-bold mb-3">
                            {language === "fa" ? "طراحی UI/UX" : "UI/UX Design"}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400">
                            {language === "fa"
                              ? "طراحی تجربه‌های کاربری جذاب و کاربرپسند"
                              : "Designing engaging and user-friendly experiences"}
                          </p>
                        </div>
                      </TiltCard>
                      <TiltCard
                        tiltMaxAngleX={5}
                        tiltMaxAngleY={5}
                        glareOpacity={0.1}
                      >
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                          <h3 className="text-xl font-bold mb-3">
                            {language === "fa"
                              ? "بهینه‌سازی عملکرد"
                              : "Performance Optimization"}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400">
                            {language === "fa"
                              ? "بهبود سرعت و کارایی وب‌سایت‌ها برای تجربه کاربری بهتر"
                              : "Improving website speed and efficiency for better user experience"}
                          </p>
                        </div>
                      </TiltCard>
                    </StaggerReveal>
                  </div>
                </div>
              </div>
            ),
            speed: 0,
          },
        ]}
      />

      {/* Skills Section */}
      <SkillsSection />

      {/* Horizontal Scrolling Projects Section */}
      <section className="bg-slate-50 dark:bg-slate-800 py-12">
        <div className="container px-4 md:px-6 mb-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <ScrollTextAnimation
                type="words"
                as="h2"
                className="text-3xl font-bold tracking-tighter md:text-4xl"
              >
                {t("projects.title")}
              </ScrollTextAnimation>
              <ScrollTextAnimation
                type="slide-up"
                as="p"
                className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
              >
                {t("projects.subtitle")}
              </ScrollTextAnimation>
            </div>
          </div>
        </div>

        <HorizontalScroll className="h-[600px] mb-8">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="min-w-[350px] md:min-w-[400px] p-4"
            >
              <MotionCard delay={index * 0.1} className="h-full">
                <ProjectCard project={project} />
              </MotionCard>
            </div>
          ))}
        </HorizontalScroll>

        <div className="container px-4 md:px-6">
          <div className="flex justify-center">
            <MagneticButton as="div" strength={40}>
              <Button asChild>
                <Link href="/projects">{t("projects.viewAll")}</Link>
              </Button>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Parallax Image Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-6">
                <ScrollTextAnimation
                  type="words"
                  as="h2"
                  className="text-3xl font-bold tracking-tighter md:text-4xl"
                >
                  {language === "fa"
                    ? "طراحی خلاقانه، توسعه حرفه‌ای"
                    : "Creative Design, Professional Development"}
                </ScrollTextAnimation>
                <ScrollTextAnimation
                  type="slide-up"
                  as="p"
                  className="text-gray-500 dark:text-gray-400"
                >
                  {language === "fa"
                    ? "با ترکیب طراحی خلاقانه و توسعه حرفه‌ای، وب‌سایت‌هایی می‌سازم که نه تنها زیبا هستند، بلکه عملکرد بالایی نیز دارند."
                    : "Combining creative design and professional development, I build websites that are not only beautiful but also high-performing."}
                </ScrollTextAnimation>
                <ScrollTextAnimation
                  type="slide-up"
                  delay={0.1}
                  as="ul"
                  className="space-y-2"
                >
                  {[
                    language === "fa"
                      ? "طراحی واکنش‌گرا برای تمام دستگاه‌ها"
                      : "Responsive design for all devices",
                    language === "fa"
                      ? "انیمیشن‌های روان و جذاب"
                      : "Smooth and engaging animations",
                    language === "fa"
                      ? "بهینه‌سازی SEO برای رتبه‌بندی بهتر"
                      : "SEO optimization for better ranking",
                    language === "fa"
                      ? "کدنویسی تمیز و قابل نگهداری"
                      : "Clean and maintainable code architecture",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ScrollTextAnimation>
                <MagneticButton as="div" strength={40}>
                  <Button asChild className="mt-4">
                    <Link href="/about">
                      {language === "fa" ? "بیشتر درباره من" : "More About Me"}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </MagneticButton>
              </div>
            </div>
            <div className="order-1 lg:order-2 h-[400px] md:h-[500px]">
              <TiltCard
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                glareOpacity={0.2}
                scale={1.02}
              >
                <ParallaxImage
                  src="/placeholder.svg?height=600&width=800"
                  alt="Creative Design"
                  width={800}
                  height={600}
                  className="w-full h-full rounded-lg shadow-xl"
                  speed={0.5}
                  scale={1.3}
                />
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-12 md:py-16 bg-white dark:bg-slate-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <ScrollTextAnimation
                type="words"
                as="h2"
                className="text-3xl font-bold tracking-tighter md:text-4xl"
              >
                {t("blog.title")}
              </ScrollTextAnimation>
              <ScrollTextAnimation
                type="slide-up"
                as="p"
                className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
              >
                {t("blog.subtitle")}
              </ScrollTextAnimation>
            </div>
          </div>
          <div className="grid gap-6 mt-8">
            {latestPosts.map((post, index) => (
              <MotionCard key={post.id} delay={index * 0.1}>
                <TiltCard
                  tiltMaxAngleX={3}
                  tiltMaxAngleY={3}
                  glareOpacity={0.1}
                >
                  <Card className="bg-transparent">
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <ScrollTextAnimation
                          type="words"
                          as="h3"
                          className="text-2xl font-bold"
                        >
                          {post.title}
                        </ScrollTextAnimation>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(post.date).toLocaleDateString(
                            language === "fa" ? "fa-IR" : "en-US"
                          )}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                          {post.excerpt}
                        </p>
                        <MagneticButton as="div" strength={20}>
                          <Button variant="link" className="p-0" asChild>
                            <Link href={`/blog/${post.slug}`}>
                              {t("blog.readMore")}
                            </Link>
                          </Button>
                        </MagneticButton>
                      </div>
                    </CardContent>
                  </Card>
                </TiltCard>
              </MotionCard>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <MagneticButton as="div" strength={40}>
              <Button asChild>
                <Link href="/blog">{t("blog.viewAll")}</Link>
              </Button>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16 bg-slate-50 dark:bg-slate-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <ScrollTextAnimation
                type="words"
                as="h2"
                className="text-3xl font-bold tracking-tighter md:text-4xl"
              >
                {t("contact.title")}
              </ScrollTextAnimation>
              <ScrollTextAnimation
                type="slide-up"
                as="p"
                className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
              >
                {t("contact.subtitle")}
              </ScrollTextAnimation>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <MagneticButton as="div" strength={50}>
                <Button className="w-full" asChild>
                  <Link href="/contact">{t("contact.sendMessage")}</Link>
                </Button>
              </MagneticButton>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("contact.email")} your.email@example.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
