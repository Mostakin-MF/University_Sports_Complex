"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
// Utilizing react-icons as Lucide is not verified
import { HiHome, HiCalendar, HiUserGroup, HiCog, HiLogout, HiTicket } from "react-icons/hi"

const sidebarLinks = [
  { name: "Overview", href: "/dashboard", icon: HiHome },
  { name: "Bookings", href: "/dashboard/bookings", icon: HiTicket },
  { name: "Tournaments", href: "/dashboard/tournaments", icon: HiUserGroup },
  { name: "Schedule", href: "/dashboard/schedule", icon: HiCalendar },
  { name: "Settings", href: "/dashboard/settings", icon: HiCog },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card text-card-foreground">
      <div className="flex h-16 items-center px-6 border-b">
         {/* Logo or Brand */}
         <Link href="/" className="flex items-center gap-2 font-bold text-lg">
             <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  S
             </div>
             <span>SportComplex</span>
         </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground"
              )}
            >
              <link.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground"
                )}
                aria-hidden="true"
              />
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t p-4">
        <button
          className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <HiLogout className="mr-3 h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
