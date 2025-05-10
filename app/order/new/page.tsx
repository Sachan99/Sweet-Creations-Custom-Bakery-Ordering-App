"use client"

import { Suspense } from "react"
import OrderForm from "@/components/order-form"
import OrderFormSkeleton from "@/components/order-form-skeleton"

// Define product types
const productTypes = [
  { id: "cake", name: "Custom Cake" },
  { id: "cupcake", name: "Custom Cupcakes" },
]

export default function NewOrderPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-[#8B5E34] mb-8">Create Your Custom Order</h1>

      <Suspense fallback={<OrderFormSkeleton />}>
        <OrderForm />
      </Suspense>
    </div>
  )
}
