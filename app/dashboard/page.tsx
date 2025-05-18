import type { Metadata } from "next"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard/dashboard-layout"

export const metadata: Metadata = {
  title: "داشبورد",
  description: "مدیریت پروژه ها و مقالات",
}

// This is a placeholder for authentication check
// In a real application, you would use a proper auth solution
const isAuthenticated = () => {
  // Check if user is authenticated
  return true // For demo purposes
}

export default function DashboardPage() {
  // Redirect to login if not authenticated
  if (!isAuthenticated()) {
    redirect("/login")
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">داشبورد</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">پروژه ها</h2>
            <p className="text-3xl font-bold">12</p>
            <p className="text-muted-foreground mt-2">3 پروژه در ماه گذشته</p>
          </div>

          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">مقالات</h2>
            <p className="text-3xl font-bold">24</p>
            <p className="text-muted-foreground mt-2">5 مقاله در ماه گذشته</p>
          </div>

          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">بازدیدها</h2>
            <p className="text-3xl font-bold">1,234</p>
            <p className="text-muted-foreground mt-2">↑ 12% نسبت به ماه قبل</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">پروژه های اخیر</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <h3 className="font-medium">پروژه {i}</h3>
                    <p className="text-sm text-muted-foreground">
                      آخرین بروزرسانی: {new Date().toLocaleDateString("fa-IR")}
                    </p>
                  </div>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <button className="text-sm text-blue-500 hover:underline">ویرایش</button>
                    <button className="text-sm text-red-500 hover:underline">حذف</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">مقالات اخیر</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <h3 className="font-medium">مقاله {i}</h3>
                    <p className="text-sm text-muted-foreground">منتشر شده: {new Date().toLocaleDateString("fa-IR")}</p>
                  </div>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <button className="text-sm text-blue-500 hover:underline">ویرایش</button>
                    <button className="text-sm text-red-500 hover:underline">حذف</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
