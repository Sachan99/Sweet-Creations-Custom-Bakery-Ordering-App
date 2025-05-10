"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId") || "ORD123456"

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <Card className="border-[#D4A373]">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-[#8B5E34]">Order Confirmed!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Thank you for your order. We've received your custom bakery request and will start working on it right
              away.
            </p>
            <div className="bg-[#FFF8F0] p-4 rounded-md">
              <p className="text-sm text-gray-600">Order Number</p>
              <p className="text-xl font-bold text-[#8B5E34]">{orderId}</p>
            </div>
            <p className="text-sm text-gray-600">
              You will receive a confirmation email shortly with your order details.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Link href="/" className="w-full">
              <Button className="w-full bg-[#D4A373] hover:bg-[#C89364]">Return to Home</Button>
            </Link>
            <Link href="/order/new" className="w-full">
              <Button variant="outline" className="w-full">
                Place Another Order
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
