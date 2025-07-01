"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trash2, Home, Users, Camera, BarChart3, Recycle, Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MainLayoutProps {
  children: React.ReactNode
  currentPage: string
}

const navigation = [
  { name: "Ward Bins", nameHi: "वार्ड बिन", href: "/", icon: Trash2 },
  { name: "Households", nameHi: "घर-घर", href: "/households", icon: Home },
  { name: "Sweepers", nameHi: "सफाईकर्मी", href: "/sweepers", icon: Users },
  { name: "AI Classifier", nameHi: "AI वर्गीकरण", href: "/classifier", icon: Camera },
  { name: "Analytics", nameHi: "विश्लेषण", href: "/analytics", icon: BarChart3 },
]

export default function MainLayout({ children, currentPage }: MainLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHindi, setIsHindi] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Floating Recycle Icon */}
      <motion.div
        className="fixed top-4 right-4 z-50 text-green-600"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <Recycle className="w-8 h-8" />
      </motion.div>

      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 p-2 rounded-full">
                <Recycle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-green-800">{isHindi ? "पर्यावरणबंधु" : "ParyavaranBandhu"}</h1>
                <p className="text-sm text-green-600">{isHindi ? "स्मार्ट कचरा प्रबंधन" : "Smart Waste Management"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsHindi(!isHindi)}
                className="hidden sm:flex items-center space-x-2"
              >
                <Globe className="w-4 h-4" />
                <span>{isHindi ? "English" : "हिंदी"}</span>
              </Button>

              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className={`bg-white shadow-md ${isMenuOpen ? "block" : "hidden"} md:block`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:space-x-8 py-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.href
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-green-100 text-green-800" : "text-gray-600 hover:text-green-800 hover:bg-green-50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{isHindi ? item.nameHi : item.name}</span>
                </motion.a>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">{children}</main>
    </div>
  )
}
