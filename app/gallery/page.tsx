import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabaseServer } from "@/lib/supabase"

// Define types
type GalleryItem = {
  id: number
  title: string
  description: string
  image_url: string
  tags: string[]
}

async function getGalleryItems(): Promise<GalleryItem[]> {
  const { data: galleryItems, error } = await supabaseServer
    .from("gallery_items")
    .select(`
      id,
      title,
      description,
      image_url,
      gallery_item_tags(
        gallery_tags(name)
      )
    `)
    .order("id")

  if (error) {
    console.error("Error fetching gallery items:", error)
    return []
  }

  // Transform the data to match our GalleryItem type
  return galleryItems.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    image_url: item.image_url,
    tags: item.gallery_item_tags.map((tag: any) => tag.gallery_tags.name),
  }))
}

export default async function GalleryPage() {
  const galleryItems = await getGalleryItems()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-[#8B5E34] mb-4">Our Cake Gallery</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse through our collection of custom cakes and cupcakes. Get inspired for your next order or simply admire
          the artistry that goes into each creation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md"
          >
            <div className="aspect-square overflow-hidden">
              <Image
                src={item.image_url || "/placeholder.svg"}
                alt={item.title}
                width={400}
                height={400}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-[#8B5E34]">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{item.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-[#FFF8F0] px-2.5 py-0.5 text-xs font-medium text-[#8B5E34]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-[#8B5E34] mb-4">Ready to Create Your Own?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Inspired by what you see? Start designing your own custom cake or cupcakes today.
        </p>
        <Link href="/order/new">
          <Button className="bg-[#D4A373] hover:bg-[#C89364]">
            Start Your Order <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
