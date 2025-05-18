import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Download } from "lucide-react"
import SkillsSection from "@/components/skills-section"

export const metadata: Metadata = {
  title: "درباره من",
  description: "درباره امیرمحمد خدابنده، طراح و توسعه دهنده فرانت اند",
}

export default function AboutPage() {
  return (
    <div className="container px-4 md:px-6 py-12 md:py-16">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">درباره من</h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            بیشتر با امیرمحمد خدابنده آشنا شوید
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-1 flex justify-center">
          <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] overflow-hidden rounded-full border-4 border-white dark:border-slate-800 shadow-xl">
            <img
              src="/placeholder.svg?height=320&width=320"
              alt="Amirmohammad Khodabande"
              className="object-cover"
              width={320}
              height={320}
            />
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">سلام، من امیرمحمد خدابنده هستم</h2>
            <div className="space-y-4 text-gray-500 dark:text-gray-400">
              <p>
                من یک توسعه دهنده فرانت اند با بیش از چندین سال تجربه در طراحی و ساخت وب‌سایت‌های مدرن و کاربرپسند هستم.
                تخصص من در React، Next.js و طراحی رابط کاربری است.
              </p>
              <p>
                من به ساخت محصولاتی که تجربه کاربری عالی ارائه می‌دهند علاقه‌مند هستم و همیشه به دنبال یادگیری فناوری‌های
                جدید و بهبود مهارت‌های خود هستم.
              </p>
              <p>
                در طول سال‌های فعالیت حرفه‌ای خود، با شرکت‌ها و استارتاپ‌های مختلفی همکاری کرده‌ام و پروژه‌های متنوعی را از
                مرحله ایده تا محصول نهایی توسعه داده‌ام.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/contact">تماس با من</Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="/resume.pdf" download>
                <Download className="h-4 w-4 mr-2" />
                دانلود رزومه
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">تحصیلات و تجربیات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">تحصیلات</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">کارشناسی مهندسی کامپیوتر</h4>
                    <p className="text-sm text-muted-foreground">دانشگاه تهران، 1395-1399</p>
                  </div>
                  <div>
                    <h4 className="font-medium">کارشناسی ارشد مهندسی نرم افزار</h4>
                    <p className="text-sm text-muted-foreground">دانشگاه شریف، 1399-1401</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">تجربیات کاری</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">توسعه دهنده ارشد فرانت اند</h4>
                    <p className="text-sm text-muted-foreground">شرکت ABC، 1401-اکنون</p>
                    <p className="text-sm mt-1">توسعه و بهبود اپلیکیشن‌های وب با استفاده از React و Next.js</p>
                  </div>
                  <div>
                    <h4 className="font-medium">توسعه دهنده فرانت اند</h4>
                    <p className="text-sm text-muted-foreground">استارتاپ XYZ، 1399-1401</p>
                    <p className="text-sm mt-1">طراحی و پیاده‌سازی رابط کاربری وب‌سایت‌ها و اپلیکیشن‌های موبایل</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <SkillsSection />

        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">گواهینامه ها</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium">React Developer Certification</h3>
                <p className="text-sm text-muted-foreground">Meta, 2023</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium">Advanced JavaScript</h3>
                <p className="text-sm text-muted-foreground">Udemy, 2022</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium">UI/UX Design Fundamentals</h3>
                <p className="text-sm text-muted-foreground">Google, 2021</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
