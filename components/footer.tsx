import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white py-6">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-[#8B5E34]">Sweet Creations</h3>
            <p className="text-sm text-gray-500">
              Handcrafted custom cakes and cupcakes for all your special occasions.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-500 hover:text-[#D4A373]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/order/new" className="text-sm text-gray-500 hover:text-[#D4A373]">
                  Order Now
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-sm text-gray-500 hover:text-[#D4A373]">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-500 hover:text-[#D4A373]">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-500">123 Bakery Lane</li>
              <li className="text-sm text-gray-500">Sweetville, CA 90210</li>
              <li className="text-sm text-gray-500">info@sweetcreations.com</li>
              <li className="text-sm text-gray-500">(555) 123-4567</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Follow Us</h3>
            <div className="flex space-x-3">
              <Link href="#" className="text-gray-500 hover:text-[#D4A373]">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#D4A373]">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#D4A373]">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Sweet Creations. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
