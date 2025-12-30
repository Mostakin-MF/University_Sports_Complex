"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { HiMenu, HiX } from "react-icons/hi"
import { Button } from "../ui/Button"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Facilities", href: "/facilities" },
  { name: "Tournaments", href: "/tournaments" },
  { name: "About", href: "/about" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
               {/* Placeholder Logo */}
               <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  S
               </div>
               <span className="text-xl font-bold tracking-tight text-foreground">
                 SportComplex
               </span>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-4 ml-4">
                 <Link href="/login">
                    <Button variant="ghost" size="sm">Log In</Button>
                 </Link>
                 <Link href="/register">
                    <Button size="sm">Sign Up</Button>
                 </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">Open menu</span>
              {isOpen ? (
                <HiX className="h-6 w-6" aria-hidden="true" />
              ) : (
                <HiMenu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 text-base font-medium rounded-md",
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2">
                 <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">Log In</Button>
                 </Link>
                 <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Sign Up</Button>
                 </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
