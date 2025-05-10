import { Suspense } from "react"
import AdminDashboard from "@/components/admin-dashboard"
import AdminDashboardSkeleton from "@/components/admin-dashboard-skeleton"

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#8B5E34] mb-8">Admin Dashboard</h1>

      <Suspense fallback={<AdminDashboardSkeleton />}>
        <AdminDashboard />
      </Suspense>
    </div>
  )
}
