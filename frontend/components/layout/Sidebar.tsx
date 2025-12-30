"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
// Utilizing react-icons as Lucide is not verified
import { useAuth } from "@/context/AuthContext"
// Utilizing react-icons as Lucide is not verified
import { HiHome, HiCalendar, HiUserGroup, HiCog, HiLogout, HiTicket, HiChartBar, HiPlus } from "react-icons/hi"

const commonLinks = [
  { name: "Overview", href: "/dashboard", icon: HiHome, roles: ["STUDENT", "STAFF", "ADMIN"] },
  { name: "Bookings", href: "/dashboard/bookings", icon: HiTicket, roles: ["STUDENT", "ADMIN"] },
  { name: "Tournaments", href: "/dashboard/tournaments", icon: HiUserGroup, roles: ["STUDENT", "ADMIN"] },
  { name: "Settings", href: "/dashboard/settings", icon: HiCog, roles: ["STUDENT", "STAFF", "ADMIN"] },
]

const studentLinks = [
  { name: "My Activity", href: "/dashboard/student", icon: HiChartBar, roles: ["STUDENT"] },
]

const staffLinks = [
  { name: "Manage Slots", href: "/dashboard/staff", icon: HiPlus, roles: ["STAFF"] },
  { name: "Maintenance", href: "/dashboard/staff/maintenance", icon: HiCog, roles: ["STAFF"] },
]

const adminLinks = [
  { name: "Admin Panel", href: "/dashboard/admin", icon: HiChartBar, roles: ["ADMIN"] },
  { name: "User Management", href: "/dashboard/admin/users", icon: HiUserGroup, roles: ["ADMIN"] },
]

const allLinks = [...commonLinks, ...studentLinks, ...staffLinks, ...adminLinks]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const filteredLinks = allLinks.filter(link => 
    user && link.roles.includes(user.role)
  )

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
          {filteredLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative flex items-center rounded-r-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-primary rounded-r-full" />
                )}
                <link.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                  aria-hidden="true"
                />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t p-4">
        <button
          onClick={logout}
          className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <HiLogout className="mr-3 h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
