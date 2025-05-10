"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingBag, Trash } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function CartPage() {
  const router = useRouter()
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart()
  const [deliveryMethod, setDeliveryMethod] = useState("pickup")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [specialInstructions, setSpecialInstructions] = useState("")

  const handleCheckout = () => {
    // In a real app, we would process the order here
    // For now, we'll just simulate a successful checkout
    clearCart()
    router.push("/checkout/success?orderId=ORD" + Math.floor(100000 + Math.random() * 900000))
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <ShoppingBag className="h-16 w-16 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-[#8B5E34] mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link href="/order/new">
            <Button className="bg-[#D4A373] hover:bg-[#C89364]">Start Ordering</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#8B5E34] mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4 pb-4 border-b">
                  <div className="w-24 h-24 bg-[#FFF8F0] rounded-md flex-shrink-0 flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=80&width=80"
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      {item.type === "cake" ? `${item.size.replace("inch", '" Round')} - ` : `${item.size} Cupcakes - `}
                      {item.flavor} with {item.frosting} frosting
                    </p>
                    {item.toppings.length > 0 && (
                      <p className="text-sm text-gray-600">Toppings: {item.toppings.join(", ")}</p>
                    )}
                    {item.message && <p className="text-sm text-gray-600">Message: "{item.message}"</p>}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/order/new")}>
                Add More Items
              </Button>
              <Button variant="ghost" onClick={clearCart}>
                Clear Cart
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Delivery Method</Label>
                <RadioGroup
                  value={deliveryMethod}
                  onValueChange={setDeliveryMethod}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup">Store Pickup (Free)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery">Local Delivery ($10.00)</Label>
                  </div>
                </RadioGroup>
              </div>

              {deliveryMethod === "delivery" && (
                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your full address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="date">Pickup/Delivery Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  min={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                />
                <p className="text-xs text-gray-500">Please allow at least 48 hours for custom orders.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                <Textarea
                  id="instructions"
                  placeholder="Any special requests or notes for your order"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{deliveryMethod === "delivery" ? "$10.00" : "Free"}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-[#8B5E34]">
                  ${(totalPrice + (deliveryMethod === "delivery" ? 10 : 0)).toFixed(2)}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-[#D4A373] hover:bg-[#C89364]"
                onClick={handleCheckout}
                disabled={!deliveryDate || (deliveryMethod === "delivery" && !deliveryAddress)}
              >
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
