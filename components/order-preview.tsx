import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type OrderPreviewProps = {
  orderData: any
  productTypes: any[]
  productSizes: any[]
  flavors: any[]
  frostings: any[]
  toppings: any[]
}

export default function OrderPreview({
  orderData,
  productTypes,
  productSizes,
  flavors,
  frostings,
  toppings,
}: OrderPreviewProps) {
  // Get display names for selected options
  const productType = productTypes.find((pt) => pt.slug === orderData.type)

  const size = productSizes.find((s) => s.slug === orderData.size && s.product_type_id === productType?.id)

  const flavor = flavors.find((f) => f.slug === orderData.flavor)
  const frosting = frostings.find((f) => f.slug === orderData.frosting)

  // Get display names for selected toppings
  const selectedToppings = toppings.filter((t) => orderData.toppings.includes(t.slug))

  // Get preview image based on product type
  const previewImage =
    orderData.type === "cake"
      ? "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop"
      : "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=400&auto=format&fit=crop"

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <div className="relative w-48 h-48 bg-[#FFF8F0] rounded-full flex items-center justify-center">
            <Image
              src={previewImage || "/placeholder.svg"}
              alt={productType?.name || "Product preview"}
              width={150}
              height={150}
              className="rounded-full object-cover"
            />
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-[#8B5E34]">
            {productType?.name || (orderData.type === "cake" ? "Custom Cake" : "Custom Cupcakes")}
          </h3>

          <div className="space-y-3 mt-4">
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">Size:</span>
              <span className="font-medium">{size?.name || "Not selected"}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">Flavor:</span>
              <span className="font-medium">{flavor?.name || "Not selected"}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">Frosting:</span>
              <span className="font-medium">{frosting?.name || "Not selected"}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">Toppings:</span>
              <span className="font-medium">
                {selectedToppings.length > 0 ? selectedToppings.map((t) => t.name).join(", ") : "None selected"}
              </span>
            </div>

            {orderData.message && (
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600">Message:</span>
                <span className="font-medium">{orderData.message}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">Quantity:</span>
              <span className="font-medium">{orderData.quantity}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Price per item:</span>
            <span className="font-semibold">${orderData.price.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Quantity:</span>
            <span className="font-semibold">x{orderData.quantity}</span>
          </div>

          <Separator />

          <div className="flex justify-between text-lg">
            <span className="font-bold">Total:</span>
            <span className="font-bold text-[#8B5E34]">${(orderData.price * orderData.quantity).toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
