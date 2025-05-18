import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "تماس با من",
  description: "راه های ارتباطی با امیرمحمد خدابنده",
}

export default function ContactPage() {
  return (
    <div className="container px-4 md:px-6 py-12 md:py-16">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">تماس با من</h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            برای همکاری یا سوالات خود با من در تماس باشید
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>فرم تماس</CardTitle>
            <CardDescription>پیام خود را از طریق فرم زیر ارسال کنید</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">نام و نام خانوادگی</Label>
                  <Input id="name" placeholder="نام و نام خانوادگی خود را وارد کنید" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">ایمیل</Label>
                  <Input id="email" type="email" placeholder="ایمیل خود را وارد کنید" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">موضوع</Label>
                <Input id="subject" placeholder="موضوع پیام خود را وارد کنید" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">پیام</Label>
                <Textarea id="message" placeholder="پیام خود را وارد کنید" className="min-h-[150px]" required />
              </div>
              <Button type="submit" className="w-full">
                ارسال پیام
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات تماس</CardTitle>
              <CardDescription>از طریق راه های زیر نیز می توانید با من در ارتباط باشید</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <Mail className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <h3 className="font-medium">ایمیل</h3>
                  <p className="text-sm text-muted-foreground">
                    <a href="mailto:your.email@example.com" className="hover:underline">
                      your.email@example.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <Phone className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <h3 className="font-medium">تلفن</h3>
                  <p className="text-sm text-muted-foreground">
                    <a href="tel:+989123456789" className="hover:underline">
                      +98 912 345 6789
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <MapPin className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <h3 className="font-medium">آدرس</h3>
                  <p className="text-sm text-muted-foreground">تهران، ایران</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ساعات کاری</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>شنبه تا چهارشنبه</span>
                  <span>9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>پنجشنبه</span>
                  <span>9:00 - 13:00</span>
                </div>
                <div className="flex justify-between">
                  <span>جمعه</span>
                  <span>تعطیل</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
