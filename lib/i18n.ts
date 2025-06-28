export const languages = {
  en: "English",
  fa: "فارسی",
} as const

export type Language = keyof typeof languages

export const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact",
    dashboard: "Dashboard",
    hireMe: "Hire Me",

    // Hero Section
    heroTitle: "Front-End Developer",
    heroDescription:
      "I create beautiful, responsive, and user-friendly web applications using modern technologies. Passionate about clean code and exceptional user experiences.",
    viewMyWork: "View My Work",
    getInTouch: "Get In Touch",
    availableForFreelance: "Available for freelance",
    remote: "Remote / Worldwide",

    // Skills
    skillsTitle: "Skills & Expertise",
    skillsDescription:
      "I specialize in modern front-end technologies and frameworks to build scalable web applications.",
    frontendDevelopment: "Frontend Development",
    frontendDesc: "React, Vue, Angular, TypeScript",
    uiuxDesign: "UI/UX Design",
    uiuxDesc: "Figma, Adobe XD, Responsive Design",
    mobileDevelopment: "Mobile Development",
    mobileDesc: "React Native, Progressive Web Apps",
    performance: "Performance",
    performanceDesc: "Optimization, SEO, Accessibility",

    // Projects
    featuredProjects: "Featured Projects",
    featuredProjectsDesc: "Here are some of my recent projects that showcase my skills and creativity.",
    viewAllProjects: "View All Projects",
    liveDemo: "Live Demo",
    code: "Code",

    // Blog
    latestBlogPosts: "Latest Blog Posts",
    blogDescription: "I share my knowledge and experiences in web development through articles and tutorials.",
    readAllPosts: "Read All Posts",
    readMore: "Read More",

    // CTA
    ctaTitle: "Ready to work together?",
    ctaDescription: "Let's create something amazing together. I'm always excited to work on new projects.",
    startProject: "Start a Project",
    learnMore: "Learn More About Me",

    // Footer
    footerDescription: "Front-end developer passionate about creating beautiful and functional web experiences.",
    quickLinks: "Quick Links",
    services: "Services",
    contactInfo: "Contact Info",
    webDevelopment: "Web Development",
    consulting: "Consulting",
    mobileApps: "Mobile Apps",

    // About Page
    aboutTitle: "About Me",
    aboutDescription:
      "Passionate front-end developer with 5+ years of experience creating beautiful, functional, and user-friendly web applications.",
    myStory: "My Story",
    skillsTechnologies: "Skills & Technologies",
    workExperience: "Work Experience",
    education: "Education",
    certifications: "Certifications",
    downloadCV: "Download CV",
    yearsExperience: "5+ Years Experience",
    projectsCompleted: "50+ Projects Completed",

    // Contact
    contactTitle: "Get In Touch",
    contactDescription:
      "Ready to start your next project? Let's discuss how we can work together to bring your ideas to life.",
    contactInformation: "Contact Information",
    contactInfoDesc: "Feel free to reach out through any of these channels",
    email: "Email",
    phone: "Phone",
    location: "Location",
    responseTime: "Response Time",
    within24Hours: "Within 24 hours",
    followMe: "Follow Me",
    followMeDesc: "Connect with me on social media",
    sendMessage: "Send Me a Message",
    sendMessageDesc: "Fill out the form below and I'll get back to you as soon as possible",
    fullName: "Full Name",
    emailAddress: "Email Address",
    subject: "Subject",
    projectType: "Project Type",
    budgetRange: "Budget Range",
    message: "Message",
    sendMessageBtn: "Send Message",

    // Dashboard
    dashboardTitle: "Dashboard",
    dashboardDesc: "Manage your portfolio content and track performance",
    overview: "Overview",
    totalProjects: "Total Projects",
    blogPosts: "Blog Posts",
    totalViews: "Total Views",
    messages: "Messages",
    analytics: "Analytics",

    // Theme
    lightMode: "Light Mode",
    darkMode: "Dark Mode",

    // Common
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    publish: "Publish",
    draft: "Draft",
    featured: "Featured",

    // Projects Data
    visitoriTitle: "Visitori PWA",
    visitoriDesc:
      "A comprehensive visitor management system built as a Progressive Web App with real-time notifications and offline capabilities.",
    storeTitle: "Store PWA",
    storeDesc:
      "Modern e-commerce Progressive Web App with advanced features like offline browsing, push notifications, and seamless checkout.",
    dashboardAppTitle: "Admin Dashboard",
    dashboardAppDesc:
      "Comprehensive admin dashboard with analytics, user management, and real-time data visualization.",
    portfolioTitle: "Portfolio Website",
    portfolioDesc:
      "Personal portfolio website with blog functionality, project showcase, and contact management system.",

    // Company
    companyName: "Webcom Company",
    position: "Senior Frontend Developer",
  },
  fa: {
    // Navigation
    home: "خانه",
    about: "درباره من",
    projects: "پروژه‌ها",
    blog: "بلاگ",
    contact: "تماس",
    dashboard: "داشبورد",
    hireMe: "استخدام من",

    // Hero Section
    heroTitle: "توسعه‌دهنده فرانت‌اند",
    heroDescription:
      "من وب اپلیکیشن‌های زیبا، ریسپانسیو و کاربرپسند با استفاده از تکنولوژی‌های مدرن ایجاد می‌کنم. علاقه‌مند به کد تمیز و تجربه کاربری استثنایی.",
    viewMyWork: "مشاهده کارهای من",
    getInTouch: "تماس بگیرید",
    availableForFreelance: "آماده برای فریلنس",
    remote: "دورکاری / سراسر جهان",

    // Skills
    skillsTitle: "مهارت‌ها و تخصص‌ها",
    skillsDescription: "من در تکنولوژی‌ها و فریمورک‌های مدرن فرانت‌اند برای ساخت وب اپلیکیشن‌های مقیاس‌پذیر تخصص دارم.",
    frontendDevelopment: "توسعه فرانت‌اند",
    frontendDesc: "React, Vue, Angular, TypeScript",
    uiuxDesign: "طراحی UI/UX",
    uiuxDesc: "Figma, Adobe XD, طراحی ریسپانسیو",
    mobileDevelopment: "توسعه موبایل",
    mobileDesc: "React Native, Progressive Web Apps",
    performance: "کارایی",
    performanceDesc: "بهینه‌سازی، SEO، دسترسی‌پذیری",

    // Projects
    featuredProjects: "پروژه‌های ویژه",
    featuredProjectsDesc: "در اینجا برخی از پروژه‌های اخیر من که مهارت‌ها و خلاقیت من را نشان می‌دهد.",
    viewAllProjects: "مشاهده همه پروژه‌ها",
    liveDemo: "نمایش زنده",
    code: "کد",

    // Blog
    latestBlogPosts: "آخرین پست‌های بلاگ",
    blogDescription: "من دانش و تجربیات خود در توسعه وب را از طریق مقالات و آموزش‌ها به اشتراک می‌گذارم.",
    readAllPosts: "خواندن همه پست‌ها",
    readMore: "ادامه مطلب",

    // CTA
    ctaTitle: "آماده همکاری هستید؟",
    ctaDescription: "بیایید با هم چیز شگفت‌انگیزی بسازیم. من همیشه برای کار روی پروژه‌های جدید هیجان‌زده‌ام.",
    startProject: "شروع پروژه",
    learnMore: "بیشتر درباره من بدانید",

    // Footer
    footerDescription: "توسعه‌دهنده فرانت‌اند علاقه‌مند به ایجاد تجربیات وب زیبا و کاربردی.",
    quickLinks: "لینک‌های سریع",
    services: "خدمات",
    contactInfo: "اطلاعات تماس",
    webDevelopment: "توسعه وب",
    consulting: "مشاوره",
    mobileApps: "اپلیکیشن‌های موبایل",

    // About Page
    aboutTitle: "درباره من",
    aboutDescription:
      "توسعه‌دهنده فرانت‌اند پرشور با بیش از ۵ سال تجربه در ایجاد وب اپلیکیشن‌های زیبا، کاربردی و کاربرپسند.",
    myStory: "داستان من",
    skillsTechnologies: "مهارت‌ها و تکنولوژی‌ها",
    workExperience: "تجربه کاری",
    education: "تحصیلات",
    certifications: "گواهینامه‌ها",
    downloadCV: "دانلود رزومه",
    yearsExperience: "بیش از ۵ سال تجربه",
    projectsCompleted: "بیش از ۵۰ پروژه تکمیل شده",

    // Contact
    contactTitle: "تماس بگیرید",
    contactDescription: "آماده شروع پروژه بعدی خود هستید؟ بیایید درباره نحوه همکاری برای تحقق ایده‌هایتان صحبت کنیم.",
    contactInformation: "اطلاعات تماس",
    contactInfoDesc: "از طریق هر یک از این کانال‌ها با من تماس بگیرید",
    email: "ایمیل",
    phone: "تلفن",
    location: "موقعیت",
    responseTime: "زمان پاسخ",
    within24Hours: "ظرف ۲۴ ساعت",
    followMe: "من را دنبال کنید",
    followMeDesc: "در شبکه‌های اجتماعی با من ارتباط برقرار کنید",
    sendMessage: "پیام بفرستید",
    sendMessageDesc: "فرم زیر را پر کنید و در اسرع وقت با شما تماس خواهم گرفت",
    fullName: "نام کامل",
    emailAddress: "آدرس ایمیل",
    subject: "موضوع",
    projectType: "نوع پروژه",
    budgetRange: "محدوده بودجه",
    message: "پیام",
    sendMessageBtn: "ارسال پیام",

    // Dashboard
    dashboardTitle: "داشبورد",
    dashboardDesc: "محتوای پورتفولیو خود را مدیریت کنید و عملکرد را پیگیری کنید",
    overview: "نمای کلی",
    totalProjects: "کل پروژه‌ها",
    blogPosts: "پست‌های بلاگ",
    totalViews: "کل بازدیدها",
    messages: "پیام‌ها",
    analytics: "آنالیتیکس",

    // Theme
    lightMode: "حالت روشن",
    darkMode: "حالت تاریک",

    // Common
    loading: "در حال بارگذاری...",
    save: "ذخیره",
    cancel: "لغو",
    delete: "حذف",
    edit: "ویرایش",
    view: "مشاهده",
    publish: "انتشار",
    draft: "پیش‌نویس",
    featured: "ویژه",

    // Projects Data
    visitoriTitle: "PWA ویزیتوری",
    visitoriDesc:
      "سیستم جامع مدیریت بازدیدکنندگان ساخته شده به عنوان Progressive Web App با اعلان‌های بلادرنگ و قابلیت‌های آفلاین.",
    storeTitle: "PWA فروشگاه",
    storeDesc:
      "Progressive Web App مدرن تجارت الکترونیک با ویژگی‌های پیشرفته مانند مرور آفلاین، اعلان‌های push و پرداخت یکپارچه.",
    dashboardAppTitle: "داشبورد مدیریت",
    dashboardAppDesc: "داشبورد مدیریت جامع با آنالیتیکس، مدیریت کاربر و تجسم داده‌های بلادرنگ.",
    portfolioTitle: "وب‌سایت پورتفولیو",
    portfolioDesc: "وب‌سایت پورتفولیو شخصی با قابلیت بلاگ، نمایش پروژه و سیستم مدیریت تماس.",

    // Company
    companyName: "شرکت وب‌کام",
    position: "توسعه‌دهنده ارشد فرانت‌اند",
  },
} as const

export function getTranslation(lang: Language, key: keyof typeof translations.en): string {
  return translations[lang][key] || translations.en[key]
}
