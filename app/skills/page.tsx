"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/language-context";
import ScrollTextAnimation from "@/components/animations/scroll-text-animation";
import TiltCard from "@/components/animations/tilt-card";
import MagneticButton from "@/components/animations/magnetic-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Palette,
  Database,
  Layers,
  Terminal,
  Cpu,
  Globe,
  BookOpen,
  Lightbulb,
  Briefcase,
  Award,
  Zap,
  CheckCircle,
} from "lucide-react";

export default function SkillsPage() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  // Define skill categories with detailed information
  const skillCategories = [
    {
      id: "frontend",
      name: language === "fa" ? "فرانت اند" : "Front-end",
      icon: Code,
      description:
        language === "fa"
          ? "توسعه رابط کاربری با استفاده از فناوری‌های مدرن وب"
          : "User interface development using modern web technologies",
      skills: [
        { name: "React", level: 95, years: 4 },
        { name: "Next.js", level: 90, years: 3 },
        { name: "TypeScript", level: 85, years: 3 },
        { name: "JavaScript", level: 95, years: 5 },
        { name: "HTML5/CSS3", level: 90, years: 6 },
        { name: "Tailwind CSS", level: 95, years: 3 },
        { name: "Redux", level: 80, years: 3 },
        { name: "Vue.js", level: 75, years: 2 },
      ],
    },
    {
      id: "design",
      name: "UI/UX",
      icon: Palette,
      description:
        language === "fa"
          ? "طراحی تجربه کاربری جذاب و کاربرپسند"
          : "Designing engaging and user-friendly experiences",
      skills: [
        { name: "Figma", level: 90, years: 3 },
        { name: "Adobe XD", level: 85, years: 4 },
        { name: "Responsive Design", level: 95, years: 5 },
        { name: "Wireframing", level: 90, years: 4 },
        { name: "Prototyping", level: 85, years: 3 },
        { name: "User Research", level: 80, years: 2 },
        { name: "Accessibility", level: 85, years: 3 },
      ],
    },
    {
      id: "backend",
      name: language === "fa" ? "بک اند" : "Back-end",
      icon: Database,
      description:
        language === "fa"
          ? "توسعه سرور و پایگاه داده برای اپلیکیشن‌های وب"
          : "Server and database development for web applications",
      skills: [
        { name: "Node.js", level: 85, years: 3 },
        { name: "Express", level: 80, years: 3 },
        { name: "MongoDB", level: 75, years: 2 },
        { name: "PostgreSQL", level: 70, years: 2 },
        { name: "GraphQL", level: 75, years: 2 },
        { name: "REST APIs", level: 90, years: 4 },
        { name: "Firebase", level: 85, years: 3 },
      ],
    },
    {
      id: "tools",
      name: language === "fa" ? "ابزارها" : "Tools & DevOps",
      icon: Terminal,
      description:
        language === "fa"
          ? "ابزارها و فرآیندهای توسعه نرم‌افزار"
          : "Software development tools and processes",
      skills: [
        { name: "Git", level: 90, years: 5 },
        { name: "GitHub Actions", level: 80, years: 2 },
        { name: "Docker", level: 75, years: 2 },
        { name: "Webpack", level: 85, years: 3 },
        { name: "Vite", level: 90, years: 2 },
        { name: "Jest", level: 80, years: 3 },
        { name: "CI/CD", level: 75, years: 2 },
      ],
    },
    {
      id: "ai",
      name: language === "fa" ? "هوش مصنوعی" : "AI Integration",
      icon: Cpu,
      description:
        language === "fa"
          ? "یکپارچه‌سازی هوش مصنوعی در اپلیکیشن‌های وب"
          : "Integrating AI capabilities into web applications",
      skills: [
        { name: "OpenAI API", level: 85, years: 2 },
        { name: "TensorFlow.js", level: 70, years: 1 },
        { name: "Hugging Face", level: 75, years: 1 },
        { name: "ML Integration", level: 65, years: 1 },
        { name: "NLP", level: 70, years: 1 },
        { name: "Computer Vision", level: 60, years: 1 },
      ],
    },
  ];

  // Professional experience data
  const experiences = [
    {
      title:
        language === "fa"
          ? "توسعه دهنده ارشد فرانت اند"
          : "Senior Front-end Developer",
      company: "ABC Tech",
      period: language === "fa" ? "1401 - اکنون" : "2022 - Present",
      description:
        language === "fa"
          ? "توسعه و بهینه‌سازی اپلیکیشن‌های وب با استفاده از React و Next.js. پیاده‌سازی معماری مقیاس‌پذیر و بهبود عملکرد."
          : "Developing and optimizing web applications using React and Next.js. Implementing scalable architecture and improving performance.",
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "GraphQL",
        "Tailwind CSS",
      ],
    },
    {
      title:
        language === "fa" ? "توسعه دهنده فرانت اند" : "Front-end Developer",
      company: "XYZ Solutions",
      period: language === "fa" ? "1399 - 1401" : "2020 - 2022",
      description:
        language === "fa"
          ? "طراحی و پیاده‌سازی رابط کاربری برای استارتاپ‌های مختلف. همکاری با تیم طراحی برای ایجاد تجربه کاربری عالی."
          : "Designing and implementing user interfaces for various startups. Collaborating with the design team to create excellent user experiences.",
      technologies: ["React", "JavaScript", "SCSS", "Redux", "Figma"],
    },
    {
      title: language === "fa" ? "توسعه دهنده وب" : "Web Developer",
      company: "Web Innovators",
      period: language === "fa" ? "1397 - 1399" : "2018 - 2020",
      description:
        language === "fa"
          ? "توسعه وب‌سایت‌های واکنش‌گرا و بهینه‌سازی برای موتورهای جستجو. پیاده‌سازی قالب‌های طراحی شده."
          : "Developing responsive websites and optimizing for search engines. Implementing designed templates.",
      technologies: ["HTML", "CSS", "JavaScript", "WordPress", "PHP"],
    },
  ];

  // Education data
  const education = [
    {
      degree:
        language === "fa"
          ? "کارشناسی ارشد مهندسی نرم‌افزار"
          : "Master's in Software Engineering",
      institution:
        language === "fa" ? "دانشگاه شریف" : "Sharif University of Technology",
      period: language === "fa" ? "1399 - 1401" : "2020 - 2022",
      description:
        language === "fa"
          ? "تمرکز بر معماری نرم‌افزار و هوش مصنوعی. پایان‌نامه در زمینه بهینه‌سازی عملکرد اپلیکیشن‌های وب."
          : "Focus on software architecture and artificial intelligence. Thesis on web application performance optimization.",
    },
    {
      degree:
        language === "fa"
          ? "کارشناسی مهندسی کامپیوتر"
          : "Bachelor's in Computer Engineering",
      institution: language === "fa" ? "دانشگاه تهران" : "University of Tehran",
      period: language === "fa" ? "1395 - 1399" : "2016 - 2020",
      description:
        language === "fa"
          ? "آموزش اصول برنامه‌نویسی، ساختمان داده، الگوریتم‌ها و مهندسی نرم‌افزار."
          : "Studied programming principles, data structures, algorithms, and software engineering.",
    },
  ];

  // Certifications data
  const certifications = [
    {
      name: "React Developer Certification",
      issuer: "Meta",
      date: language === "fa" ? "1402" : "2023",
      credentialId: "CERT-1234-ABCD",
    },
    {
      name: "Advanced JavaScript",
      issuer: "Udemy",
      date: language === "fa" ? "1401" : "2022",
      credentialId: "UC-12345678",
    },
    {
      name: "UI/UX Design Fundamentals",
      issuer: "Google",
      date: language === "fa" ? "1400" : "2021",
      credentialId: "GGL-UX-78901",
    },
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: language === "fa" ? "1401" : "2022",
      credentialId: "AWS-DEV-56789",
    },
  ];

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Set up scroll-based color transitions
    const sections = document.querySelectorAll(".color-transition-section");

    sections.forEach((section, index) => {
      const nextSection = sections[index + 1];

      if (nextSection) {
        ScrollTrigger.create({
          trigger: section,
          start: "bottom bottom",
          end: "bottom top",
          onEnter: () => {
            gsap.to("body", {
              backgroundColor:
                window.getComputedStyle(nextSection).backgroundColor,
              duration: 0.8,
              ease: "power1.inOut",
            });
          },
          onEnterBack: () => {
            gsap.to("body", {
              backgroundColor: window.getComputedStyle(section).backgroundColor,
              duration: 0.8,
              ease: "power1.inOut",
            });
          },
        });
      }
    });

    // Animate skill bars
    const skillBars = document.querySelectorAll(".skill-progress");

    skillBars.forEach((bar) => {
      const value = bar.getAttribute("data-value");

      ScrollTrigger.create({
        trigger: bar,
        start: "top 90%",
        onEnter: () => {
          gsap.to(bar, {
            width: `${value}%`,
            duration: 1.5,
            ease: "power2.out",
          });
        },
      });
    });

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Hero Section with Interview */}
      <section className="color-transition-section py-20 md:py-28 bg-gradient-to-b from-purple-50 to-white dark:from-purple-950 dark:to-slate-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-start space-y-6 lg:w-1/2">
              <ScrollTextAnimation
                type="words"
                as="h1"
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
              >
                {language === "fa"
                  ? "مهارت‌ها و تخصص‌ها"
                  : "Skills & Expertise"}
              </ScrollTextAnimation>

              <ScrollTextAnimation
                type="slide-up"
                as="p"
                className="text-lg text-gray-600 dark:text-gray-300"
              >
                {language === "fa"
                  ? "با بیش از 5 سال تجربه در توسعه وب، مجموعه‌ای از مهارت‌های فنی و تخصص‌های حرفه‌ای را توسعه داده‌ام."
                  : "With over 5 years of experience in web development, I've developed a range of technical skills and professional expertise."}
              </ScrollTextAnimation>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {["React", "Next.js", "TypeScript", "UI/UX", "Node.js"].map(
                  (skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-sm py-1 px-3"
                    >
                      {skill}
                    </Badge>
                  )
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <MagneticButton as="div" strength={40}>
                  <Button asChild>
                    <Link href="/contact">
                      {language === "fa" ? "تماس با من" : "Contact Me"}
                    </Link>
                  </Button>
                </MagneticButton>
                <MagneticButton as="div" strength={40}>
                  <Button variant="outline" asChild>
                    <Link href="/resume.pdf" download>
                      {language === "fa" ? "دانلود رزومه" : "Download Resume"}
                    </Link>
                  </Button>
                </MagneticButton>
              </div>
            </div>

            <div className="lg:w-1/2">
              <TiltCard className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 md:p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold">
                      {language === "fa" ? "مصاحبه کوتاه" : "Quick Interview"}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium text-primary">
                        {language === "fa"
                          ? "چرا برنامه‌نویسی وب؟"
                          : "Why web development?"}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {language === "fa"
                          ? "من عاشق ترکیب خلاقیت و منطق در توسعه وب هستم. ساختن چیزی که هم زیبا باشد و هم کاربردی، برای من بسیار لذت‌بخش است."
                          : "I love the blend of creativity and logic in web development. Building something that's both beautiful and functional is incredibly satisfying to me."}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium text-primary">
                        {language === "fa"
                          ? "بزرگترین چالش حرفه‌ای شما چه بوده است؟"
                          : "What's been your biggest professional challenge?"}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {language === "fa"
                          ? "بهینه‌سازی یک اپلیکیشن بزرگ با مشکلات عملکردی جدی. با بازنویسی بخش‌های کلیدی و پیاده‌سازی تکنیک‌های پیشرفته، سرعت بارگذاری را 70% بهبود دادیم."
                          : "Optimizing a large application with serious performance issues. By rewriting key components and implementing advanced techniques, we improved load times by 70%."}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium text-primary">
                        {language === "fa"
                          ? "چه چیزی شما را متمایز می‌کند؟"
                          : "What sets you apart?"}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {language === "fa"
                          ? "توانایی من در پل زدن بین طراحی و توسعه. من هر دو جنبه را درک می‌کنم و می‌توانم راه‌حل‌هایی ارائه دهم که هم از نظر فنی قوی باشند و هم تجربه کاربری عالی داشته باشند."
                          : "My ability to bridge design and development. I understand both sides and can deliver solutions that are technically strong while providing excellent user experiences."}
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section
        ref={skillsRef}
        className="color-transition-section py-16 md:py-24 bg-white dark:bg-slate-900"
      >
        <div className="container px-4 md:px-6">
          <ScrollTextAnimation
            type="words"
            as="h2"
            className="text-3xl font-bold tracking-tighter md:text-4xl text-center mb-12"
          >
            {language === "fa" ? "مهارت‌های فنی" : "Technical Skills"}
          </ScrollTextAnimation>

          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
              {skillCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-2"
                >
                  <category.icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {skillCategories.map((category) => (
              <TabsContent
                key={category.id}
                value={category.id}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-1/3">
                    <TiltCard className="bg-card rounded-lg shadow p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <category.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">{category.name}</h3>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        {category.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.slice(0, 5).map((skill) => (
                          <Badge key={skill.name} variant="outline">
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </TiltCard>
                  </div>

                  <div className="md:w-2/3 space-y-6">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{skill.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {skill.years}{" "}
                              {language === "fa" ? "سال" : "years"}
                            </Badge>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="skill-progress h-full bg-primary rounded-full"
                            data-value={skill.level}
                            style={{ width: "0%" }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Experience Section */}
      <section className="color-transition-section py-16 md:py-24 bg-blue-50 dark:bg-blue-950">
        <div className="container px-4 md:px-6">
          <ScrollTextAnimation
            type="words"
            as="h2"
            className="text-3xl font-bold tracking-tighter md:text-4xl text-center mb-12"
          >
            {language === "fa" ? "تجربیات حرفه‌ای" : "Professional Experience"}
          </ScrollTextAnimation>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {experiences.map((exp, index) => (
              <TiltCard key={index} className="h-full">
                <Card className="h-full bg-white dark:bg-slate-800">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{exp.title}</CardTitle>
                        <CardDescription>{exp.company}</CardDescription>
                      </div>
                      <Badge variant="outline">{exp.period}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <Badge key={i} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="color-transition-section py-16 md:py-24 bg-green-50 dark:bg-green-950">
        <div className="container px-4 md:px-6">
          <ScrollTextAnimation
            type="words"
            as="h2"
            className="text-3xl font-bold tracking-tighter md:text-4xl text-center mb-12"
          >
            {language === "fa"
              ? "تحصیلات و گواهینامه‌ها"
              : "Education & Certifications"}
          </ScrollTextAnimation>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                {language === "fa" ? "تحصیلات" : "Education"}
              </h3>

              {education.map((edu, index) => (
                <TiltCard key={index}>
                  <Card className="bg-white dark:bg-slate-800">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{edu.degree}</CardTitle>
                          <CardDescription>{edu.institution}</CardDescription>
                        </div>
                        <Badge variant="outline">{edu.period}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500 dark:text-gray-400">
                        {edu.description}
                      </p>
                    </CardContent>
                  </Card>
                </TiltCard>
              ))}
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                {language === "fa" ? "گواهینامه‌ها" : "Certifications"}
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {certifications.map((cert, index) => (
                  <TiltCard key={index}>
                    <Card className="bg-white dark:bg-slate-800">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <CheckCircle className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{cert.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {cert.issuer} • {cert.date}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              ID: {cert.credentialId}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TiltCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Soft Skills */}
      <section className="color-transition-section py-16 md:py-24 bg-purple-50 dark:bg-purple-950">
        <div className="container px-4 md:px-6">
          <ScrollTextAnimation
            type="words"
            as="h2"
            className="text-3xl font-bold tracking-tighter md:text-4xl text-center mb-12"
          >
            {language === "fa" ? "مهارت‌های نرم" : "Soft Skills"}
          </ScrollTextAnimation>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Globe,
                title: language === "fa" ? "ارتباطات" : "Communication",
                description:
                  language === "fa"
                    ? "توانایی انتقال ایده‌های پیچیده به زبان ساده و همکاری مؤثر با تیم‌ها"
                    : "Ability to convey complex ideas in simple terms and collaborate effectively with teams",
              },
              {
                icon: Lightbulb,
                title: language === "fa" ? "حل مسئله" : "Problem Solving",
                description:
                  language === "fa"
                    ? "رویکرد تحلیلی برای شناسایی مشکلات و ارائه راه‌حل‌های خلاقانه"
                    : "Analytical approach to identifying issues and providing creative solutions",
              },
              {
                icon: Zap,
                title: language === "fa" ? "سازگاری" : "Adaptability",
                description:
                  language === "fa"
                    ? "انعطاف‌پذیری در محیط‌های در حال تغییر و یادگیری سریع فناوری‌های جدید"
                    : "Flexibility in changing environments and quick learning of new technologies",
              },
              {
                icon: Layers,
                title:
                  language === "fa" ? "مدیریت پروژه" : "Project Management",
                description:
                  language === "fa"
                    ? "برنامه‌ریزی، اولویت‌بندی و اجرای پروژه‌ها برای تحویل به موقع"
                    : "Planning, prioritizing, and executing projects for on-time delivery",
              },
            ].map((skill, index) => (
              <TiltCard key={index} className="h-full">
                <Card className="h-full bg-white dark:bg-slate-800">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <skill.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {skill.description}
                    </p>
                  </CardContent>
                </Card>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="color-transition-section py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container px-4 md:px-6 text-center">
          <ScrollTextAnimation
            type="words"
            as="h2"
            className="text-3xl font-bold tracking-tighter md:text-4xl mb-4"
          >
            {language === "fa"
              ? "آماده همکاری با شما هستم"
              : "Ready to Work Together"}
          </ScrollTextAnimation>

          <ScrollTextAnimation
            type="slide-up"
            as="p"
            className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 mb-8"
          >
            {language === "fa"
              ? "اگر به دنبال یک توسعه‌دهنده با تجربه برای پروژه بعدی خود هستید، من آماده کمک به شما هستم. بیایید با هم چیزی فوق‌العاده بسازیم."
              : "If you're looking for an experienced developer for your next project, I'm ready to help. Let's build something amazing together."}
          </ScrollTextAnimation>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton as="div" strength={50}>
              <Button size="lg" asChild>
                <Link href="/contact">
                  {language === "fa" ? "تماس با من" : "Contact Me"}
                </Link>
              </Button>
            </MagneticButton>

            <MagneticButton as="div" strength={50}>
              <Button size="lg" variant="outline" asChild>
                <Link href="/projects">
                  {language === "fa" ? "مشاهده پروژه‌ها" : "View Projects"}
                </Link>
              </Button>
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
