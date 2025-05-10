"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cart } = useCart()

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#8B5E34]">Sweet Creations</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          <Link href="/order/new" className="text-sm font-medium hover:underline underline-offset-4">
            Order Now
          </Link>
          <Link href="/gallery" className="text-sm font-medium hover:underline underline-offset-4">
            Gallery
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
            About Us
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D4A373] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <div className="container flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#8B5E34]">Sweet Creations</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="container grid gap-6 px-4 py-6">
            <Link
              href="/"
              className="text-lg font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/order/new"
              className="text-lg font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Order Now
            </Link>
            <Link
              href="/gallery"
              className="text-lg font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="/about"
              className="text-lg font-medium hover:underline underline-offset-4"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
