"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { v4 as uuidv4 } from "uuid"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import OrderPreview from "@/components/order-preview"
import { getSupabaseBrowser } from "@/lib/supabase"

// Define types
type ProductType = {
  id: number
  name: string
  slug: string
  description: string
}

type ProductSize = {
  id: number
  product_type_id: number
  name: string
  slug: string
  description: string
  serves_min: number
  serves_max: number
  price: number
}

type Flavor = {
  id: number
  name: string
  slug: string
  description: string
}

type Frosting = {
  id: number
  name: string
  slug: string
  description: string
}

type Topping = {
  id: number
  name: string
  slug: string
  description: string
  price: number
}

type FlavorPairing = {
  id: number
  flavor_id: number
  frosting_id: number
}

export default function OrderForm() {
  const router = useRouter()
  const { addToCart } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [productTypes, setProductTypes] = useState<ProductType[]>([])
  const [productSizes, setProductSizes] = useState<ProductSize[]>([])
  const [flavors, setFlavors] = useState<Flavor[]>([])
  const [frostings, setFrostings] = useState<Frosting[]>([])
  const [toppings, setToppings] = useState<Topping[]>([])
  const [flavorPairings, setFlavorPairings] = useState<FlavorPairing[]>([])
  const [loading, setLoading] = useState(true)

  const [orderData, setOrderData] = useState({
    id: uuidv4(),
    type: "cake" as "cake" | "cupcake",
    name: "Custom Cake",
    size: "",
    flavor: "",
    frosting: "",
    toppings: [] as string[],
    message: "",
    imageUrl: "",
    price: 0,
    quantity: 1,
  })

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const supabase = getSupabaseBrowser()

      // Fetch product types
      const { data: productTypesData } = await supabase.from("product_types").select("*")

      if (productTypesData && productTypesData.length > 0) {
        setProductTypes(productTypesData)
        setOrderData((prev) => ({
          ...prev,
          type: productTypesData[0].slug as "cake" | "cupcake",
          name: productTypesData[0].name,
        }))
      }

      // Fetch product sizes
      const { data: productSizesData } = await supabase.from("product_sizes").select("*")

      if (productSizesData) {
        setProductSizes(productSizesData)
      }

      // Fetch flavors
      const { data: flavorsData } = await supabase.from("flavors").select("*")

      if (flavorsData) {
        setFlavors(flavorsData)
      }

      // Fetch frostings
      const { data: frostingsData } = await supabase.from("frostings").select("*")

      if (frostingsData) {
        setFrostings(frostingsData)
      }

      // Fetch toppings
      const { data: toppingsData } = await supabase.from("toppings").select("*")

      if (toppingsData) {
        setToppings(toppingsData)
      }

      // Fetch flavor pairings
      const { data: flavorPairingsData } = await supabase.from("flavor_pairings").select("*")

      if (flavorPairingsData) {
        setFlavorPairings(flavorPairingsData)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  const handleTypeChange = (type: "cake" | "cupcake") => {
    setOrderData({
      ...orderData,
      type,
      name: productTypes.find((pt) => pt.slug === type)?.name || (type === "cake" ? "Custom Cake" : "Custom Cupcakes"),
      // Reset size when changing type
      size: "",
      // Recalculate price
      price: 0,
    })
  }

  const handleInputChange = (field: string, value: string | string[] | number) => {
    const updatedData = {
      ...orderData,
      [field]: value,
    }

    // Recalculate price whenever relevant fields change
    if (["type", "size", "toppings"].includes(field)) {
      updatedData.price = calculatePrice(updatedData)
    }

    setOrderData(updatedData)
  }

  const calculatePrice = (data: typeof orderData) => {
    let basePrice = 0

    // Base price by size
    if (data.size) {
      const selectedSize = productSizes.find(
        (size) =>
          size.slug === data.size && size.product_type_id === productTypes.find((pt) => pt.slug === data.type)?.id,
      )

      if (selectedSize) {
        basePrice = selectedSize.price
      }
    }

    // Add price for toppings
    let toppingsPrice = 0
    if (data.toppings.length > 0) {
      data.toppings.forEach((toppingSlug) => {
        const topping = toppings.find((t) => t.slug === toppingSlug)
        if (topping) {
          toppingsPrice += topping.price
        }
      })
    }

    return basePrice + toppingsPrice
  }

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleAddToCart = () => {
    addToCart(orderData)
    router.push("/cart")
  }

  // Get suggested frostings based on selected flavor
  const suggestedFrostings = orderData.flavor
    ? flavorPairings
        .filter((fp) => fp.flavor_id === flavors.find((f) => f.slug === orderData.flavor)?.id)
        .map((fp) => frostings.find((f) => f.id === fp.frosting_id)?.slug || "")
    : []

  // Filter sizes based on selected product type
  const filteredSizes = productSizes.filter(
    (size) => size.product_type_id === productTypes.find((pt) => pt.slug === orderData.type)?.id,
  )

  if (loading) {
    return <div>Loading product options...</div>
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Tabs defaultValue="cake" className="mb-8">
          <TabsList className="grid grid-cols-2">
            {productTypes.map((type) => (
              <TabsTrigger
                key={type.id}
                value={type.slug}
                onClick={() => handleTypeChange(type.slug as "cake" | "cupcake")}
              >
                {type.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {productTypes.map((type) => (
            <TabsContent key={type.id} value={type.slug}>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <Image
                      src={
                        type.slug === "cake"
                          ? "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop"
                          : "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=400&auto=format&fit=crop"
                      }
                      alt={type.name}
                      width={200}
                      height={200}
                      className="rounded-lg"
                    />
                  </div>
                  <p className="text-center text-gray-600">{type.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Step 1: Size Selection */}
        {currentStep === 1 && (
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Step 1: Choose Your Size</h2>
              <RadioGroup value={orderData.size} onValueChange={(value) => handleInputChange("size", value)}>
                {filteredSizes.map((size) => (
                  <div
                    key={size.id}
                    className="flex items-center space-x-2 border p-3 rounded-md mb-2 hover:bg-[#FFF8F0] cursor-pointer"
                  >
                    <RadioGroupItem value={size.slug} id={`size-${size.slug}`} />
                    <Label htmlFor={`size-${size.slug}`} className="flex justify-between w-full cursor-pointer">
                      <span>
                        {size.name}{" "}
                        {size.serves_min && size.serves_max ? `(serves ${size.serves_min}-${size.serves_max})` : ""}
                      </span>
                      <span className="font-semibold">${size.price.toFixed(2)}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Flavor Selection */}
        {currentStep === 2 && (
          <Card>
            <CardContent className="space-y-6 pt-6">
              <h2 className="text-xl font-semibold">Step 2: Choose Your Flavors</h2>

              <div>
                <Label className="text-base mb-2 block">Cake Flavor</Label>
                <RadioGroup value={orderData.flavor} onValueChange={(value) => handleInputChange("flavor", value)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {flavors.map((flavor) => (
                      <div
                        key={flavor.id}
                        className="flex items-center space-x-2 border p-3 rounded-md hover:bg-[#FFF8F0] cursor-pointer"
                      >
                        <RadioGroupItem value={flavor.slug} id={`flavor-${flavor.slug}`} />
                        <Label htmlFor={`flavor-${flavor.slug}`} className="cursor-pointer">
                          {flavor.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-base">Frosting</Label>
                  {suggestedFrostings.length > 0 && (
                    <span className="text-xs text-[#8B5E34]">
                      Suggested for {flavors.find((f) => f.slug === orderData.flavor)?.name}
                    </span>
                  )}
                </div>
                <RadioGroup value={orderData.frosting} onValueChange={(value) => handleInputChange("frosting", value)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {frostings.map((frosting) => (
                      <div
                        key={frosting.id}
                        className={`flex items-center space-x-2 border p-3 rounded-md hover:bg-[#FFF8F0] cursor-pointer ${
                          suggestedFrostings.includes(frosting.slug) ? "border-[#D4A373] bg-[#FFF8F0]/50" : ""
                        }`}
                      >
                        <RadioGroupItem value={frosting.slug} id={`frosting-${frosting.slug}`} />
                        <Label htmlFor={`frosting-${frosting.slug}`} className="cursor-pointer">
                          {frosting.name}
                          {suggestedFrostings.includes(frosting.slug) && (
                            <span className="ml-2 text-xs text-[#8B5E34]">(Recommended)</span>
                          )}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Toppings */}
        {currentStep === 3 && (
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Step 3: Choose Your Toppings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {toppings.map((topping) => (
                  <div
                    key={topping.id}
                    className="flex items-center space-x-2 border p-3 rounded-md hover:bg-[#FFF8F0]"
                  >
                    <Checkbox
                      id={`topping-${topping.slug}`}
                      checked={orderData.toppings.includes(topping.slug)}
                      onCheckedChange={(checked) => {
                        const updatedToppings = checked
                          ? [...orderData.toppings, topping.slug]
                          : orderData.toppings.filter((slug) => slug !== topping.slug)
                        handleInputChange("toppings", updatedToppings)
                      }}
                    />
                    <Label htmlFor={`topping-${topping.slug}`} className="flex justify-between w-full cursor-pointer">
                      <span>{topping.name}</span>
                      <span className="text-sm text-gray-600">+${topping.price.toFixed(2)}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Finishing Details */}
        {currentStep === 4 && (
          <Card>
            <CardContent className="space-y-4 pt-6">
              <h2 className="text-xl font-semibold">Step 4: Finishing Details</h2>

              <div className="space-y-2">
                <Label htmlFor="message">Message on Cake (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Happy Birthday, Congratulations, etc."
                  value={orderData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="resize-none"
                />
                <p className="text-xs text-gray-500">
                  Maximum 30 characters. Additional charges may apply for complex designs.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Design Inspiration (Optional)</Label>
                <Input
                  id="image"
                  type="url"
                  placeholder="Paste a URL to an image for reference"
                  value={orderData.imageUrl}
                  onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Provide a link to an image that shows the design you'd like us to recreate.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max="10"
                  value={orderData.quantity}
                  onChange={(e) => handleInputChange("quantity", Number.parseInt(e.target.value))}
                  className="w-24"
                />
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handlePrevStep}>
              Previous
            </Button>
          )}
          {currentStep < 4 ? (
            <Button
              className="ml-auto bg-[#D4A373] hover:bg-[#C89364]"
              onClick={handleNextStep}
              disabled={
                (currentStep === 1 && !orderData.size) ||
                (currentStep === 2 && (!orderData.flavor || !orderData.frosting))
              }
            >
              Next
            </Button>
          ) : (
            <Button className="ml-auto bg-[#D4A373] hover:bg-[#C89364]" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>

      <OrderPreview
        orderData={orderData}
        productTypes={productTypes}
        productSizes={productSizes}
        flavors={flavors}
        frostings={frostings}
        toppings={toppings}
      />
    </div>
  )
}
