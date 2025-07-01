"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, Users, AlertTriangle, BookOpen } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/records", icon: FileText, label: "Records" },
    { href: "/asha", icon: Users, label: "ASHA" },
    { href: "/alerts", icon: AlertTriangle, label: "Alerts" },
    { href: "/tips", icon: BookOpen, label: "Tips" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-200 px-4 py-2 shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              pathname === href ? "text-pink-600 bg-pink-100" : "text-gray-600 hover:text-pink-600"
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
