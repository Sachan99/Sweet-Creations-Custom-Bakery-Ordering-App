import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { supabaseServer } from "@/lib/supabase"

// Define types
type TeamMember = {
  id: number
  name: string
  role: string
  bio: string
  image_url: string
  display_order: number
}

async function getTeamMembers(): Promise<TeamMember[]> {
  const { data: teamMembers, error } = await supabaseServer.from("team_members").select("*").order("display_order")

  if (error) {
    console.error("Error fetching team members:", error)
    return []
  }

  return teamMembers
}

export default async function AboutPage() {
  const teamMembers = await getTeamMembers()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#8B5E34] mb-8">About Sweet Creations</h1>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          <div>
            <h2 className="text-2xl font-semibold text-[#8B5E34] mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Sweet Creations began in 2010 as a small home bakery with a passion for creating delicious, beautiful
              custom cakes. What started as a hobby quickly grew into a beloved local business as word spread about our
              attention to detail and commitment to quality.
            </p>
            <p className="text-gray-600">
              Today, we're proud to serve our community with handcrafted cakes and cupcakes for all of life's special
              moments. From birthdays and weddings to graduations and baby showers, we believe every celebration
              deserves something sweet and special.
            </p>
          </div>
          <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop"
              alt="Bakery interior"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-center text-[#8B5E34] mb-8">Our Values</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <Card className="bg-[#FFF8F0] border-[#F9DCC4]">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-[#8B5E34] mb-2">Quality Ingredients</h3>
                <p className="text-gray-600">
                  We use only the finest, freshest ingredients in all our baked goods. No artificial flavors or
                  preservatives - just pure, delicious taste.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#FFF8F0] border-[#F9DCC4]">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-[#8B5E34] mb-2">Handcrafted Care</h3>
                <p className="text-gray-600">
                  Every cake and cupcake is made with love and attention to detail. We take pride in our craftsmanship
                  and artistic approach to baking.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#FFF8F0] border-[#F9DCC4]">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-[#8B5E34] mb-2">Customer Satisfaction</h3>
                <p className="text-gray-600">
                  Your satisfaction is our top priority. We work closely with you to ensure your custom creation exceeds
                  expectations and makes your event special.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-center text-[#8B5E34] mb-8">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image src={member.image_url || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-semibold text-[#8B5E34]">{member.name}</h3>
                <p className="text-[#D4A373] mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#FFF8F0] rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-semibold text-center text-[#8B5E34] mb-8">Visit Our Bakery</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-start mb-4">
                <MapPin className="h-5 w-5 text-[#D4A373] mt-0.5 mr-2" />
                <div>
                  <h3 className="font-semibold text-[#8B5E34]">Location</h3>
                  <p className="text-gray-600">
                    123 Bakery Lane
                    <br />
                    Sweetville, CA 90210
                  </p>
                </div>
              </div>
              <div className="flex items-start mb-4">
                <Clock className="h-5 w-5 text-[#D4A373] mt-0.5 mr-2" />
                <div>
                  <h3 className="font-semibold text-[#8B5E34]">Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9am - 6pm
                    <br />
                    Saturday: 10am - 4pm
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-[#D4A373] mt-0.5 mr-2" />
                <div>
                  <h3 className="font-semibold text-[#8B5E34]">Contact</h3>
                  <p className="text-gray-600">
                    Phone: (555) 123-4567
                    <br />
                    Email: info@sweetcreations.com
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&auto=format&fit=crop"
                alt="Map location"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#8B5E34] mb-4">Ready to Order?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Start creating your custom cake or cupcakes today. Our easy online ordering system makes it simple to design
            the perfect treat for your special occasion.
          </p>
          <Link href="/order/new">
            <Button className="bg-[#D4A373] hover:bg-[#C89364]">
              Start Your Order <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
