import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Cake, ShoppingBag, Star, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabaseServer } from "@/lib/supabase"

// Define types
type FeaturedGalleryItem = {
  id: number
  title: string
  image_url: string
}

async function getFeaturedGalleryItems(): Promise<FeaturedGalleryItem[]> {
  const { data: galleryItems, error } = await supabaseServer
    .from("gallery_items")
    .select("id, title, image_url")
    .eq("featured", true)
    .limit(1)

  if (error) {
    console.error("Error fetching featured gallery items:", error)
    return []
  }

  return galleryItems
}

export default async function Home() {
  const featuredItems = await getFeaturedGalleryItems()
  const featuredImage = featuredItems.length > 0 ? featuredItems[0].image_url : "/placeholder.svg?height=550&width=550"

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 bg-[#FFF8F0]">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#8B5E34]">
                  Custom Cakes & Cupcakes Made Just For You
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl">
                  Design your perfect cake or cupcakes with our easy-to-use ordering system. From flavors to
                  decorations, you're in control.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/order/new">
                  <Button className="bg-[#D4A373] hover:bg-[#C89364] text-white">
                    Start Your Order <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/gallery">
                  <Button variant="outline" className="border-[#D4A373] text-[#D4A373]">
                    View Our Gallery
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative lg:ml-auto">
              <Image
                src={featuredImage || "/placeholder.svg"}
                alt="Beautifully decorated custom cake"
                width={550}
                height={550}
                className="mx-auto aspect-square rounded-xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-[#8B5E34]">How It Works</h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed">
                Creating your perfect custom bakery order is simple with our easy-to-follow process.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center space-y-2 border border-[#F9DCC4] p-6 rounded-lg bg-[#FFF8F0]">
              <div className="p-3 rounded-full bg-[#F9DCC4]">
                <Cake className="h-6 w-6 text-[#8B5E34]" />
              </div>
              <h3 className="text-xl font-bold text-[#8B5E34]">Customize</h3>
              <p className="text-center text-gray-600">
                Choose your cake type, size, flavors, and decorations through our step-by-step form.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border border-[#F9DCC4] p-6 rounded-lg bg-[#FFF8F0]">
              <div className="p-3 rounded-full bg-[#F9DCC4]">
                <ShoppingBag className="h-6 w-6 text-[#8B5E34]" />
              </div>
              <h3 className="text-xl font-bold text-[#8B5E34]">Order</h3>
              <p className="text-center text-gray-600">
                Review your selections, add to cart, and complete your purchase securely online.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border border-[#F9DCC4] p-6 rounded-lg bg-[#FFF8F0]">
              <div className="p-3 rounded-full bg-[#F9DCC4]">
                <Truck className="h-6 w-6 text-[#8B5E34]" />
              </div>
              <h3 className="text-xl font-bold text-[#8B5E34]">Enjoy</h3>
              <p className="text-center text-gray-600">
                Pick up your freshly baked creation or have it delivered to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 bg-[#FFF8F0]">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-[#8B5E34]">What Our Customers Say</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col p-6 bg-white rounded-lg shadow-sm">
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className={`h-4 w-4 ${j < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The custom birthday cake exceeded all expectations! Not only was it beautiful, but it tasted amazing
                  too. The ordering process was so easy!"
                </p>
                <div className="mt-auto">
                  <p className="font-medium text-[#8B5E34]">Sarah T.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-[#D4A373]">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white">
                Ready to Create Your Perfect Treat?
              </h2>
              <p className="max-w-[600px] text-white/90 md:text-xl/relaxed mx-auto">
                Start designing your custom cake or cupcakes today and make your next celebration unforgettable.
              </p>
            </div>
            <Link href="/order/new">
              <Button className="bg-white text-[#D4A373] hover:bg-white/90">
                Start Your Order <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
