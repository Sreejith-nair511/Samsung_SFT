"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { QrCode, Award, Filter, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MainLayout from "@/components/layout/main-layout"

const householdData = [
  {
    id: "QR001",
    colony: "Rampur Colony",
    colonyHi: "रामपुर कॉलोनी",
    wasteKg: 12.5,
    segregationScore: 95,
    status: "good",
    isTopPerformer: true,
  },
  {
    id: "QR002",
    colony: "Bharatnagar",
    colonyHi: "भारतनगर",
    wasteKg: 8.3,
    segregationScore: 78,
    status: "medium",
    isTopPerformer: false,
  },
  {
    id: "QR003",
    colony: "Chiklod Area",
    colonyHi: "चिकलोड क्षेत्र",
    wasteKg: 15.2,
    segregationScore: 45,
    status: "poor",
    isTopPerformer: false,
  },
  {
    id: "QR004",
    colony: "Gandhi Nagar",
    colonyHi: "गांधी नगर",
    wasteKg: 9.8,
    segregationScore: 88,
    status: "good",
    isTopPerformer: false,
  },
  {
    id: "QR005",
    colony: "Nehru Colony",
    colonyHi: "नेहरू कॉलोनी",
    wasteKg: 11.1,
    segregationScore: 92,
    status: "good",
    isTopPerformer: true,
  },
]

const getStatusInfo = (status: string, isHindi: boolean) => {
  const statusMap = {
    good: {
      en: "Good Segregation",
      hi: "अच्छा पृथक्करण",
      color: "bg-green-100 text-green-800",
      icon: "✓",
    },
    medium: {
      en: "Mixed Waste",
      hi: "मिश्रित कचरा",
      color: "bg-yellow-100 text-yellow-800",
      icon: "⚠",
    },
    poor: {
      en: "Unsorted",
      hi: "अवर्गीकृत",
      color: "bg-red-100 text-red-800",
      icon: "✗",
    },
  }
  return statusMap[status as keyof typeof statusMap]
}

export default function HouseholdsPage() {
  const [isHindi, setIsHindi] = useState(false)
  const [selectedColony, setSelectedColony] = useState("all")

  const filteredData =
    selectedColony === "all"
      ? householdData
      : householdData.filter((h) => h.colony.toLowerCase().includes(selectedColony.toLowerCase()))

  return (
    <MainLayout currentPage="/households">
      <div className="space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-2">{isHindi ? "घर-घर ट्रैकर" : "Household Tracker"}</h2>
          <p className="text-green-600">{isHindi ? "QR कोड आधारित कचरा निगरानी" : "QR Code-based Waste Monitoring"}</p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-4"
        >
          <Filter className="w-5 h-5 text-green-600" />
          <Select value={selectedColony} onValueChange={setSelectedColony}>
            <SelectTrigger className="w-48 rounded-lg">
              <SelectValue placeholder={isHindi ? "कॉलोनी चुनें" : "Select Colony"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{isHindi ? "सभी कॉलोनी" : "All Colonies"}</SelectItem>
              <SelectItem value="rampur">Rampur Colony</SelectItem>
              <SelectItem value="bharatnagar">Bharatnagar</SelectItem>
              <SelectItem value="chiklod">Chiklod Area</SelectItem>
              <SelectItem value="gandhi">Gandhi Nagar</SelectItem>
              <SelectItem value="nehru">Nehru Colony</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Households Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredData.map((household, index) => {
            const statusInfo = getStatusInfo(household.status, isHindi)
            return (
              <motion.div
                key={household.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <QrCode className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-green-800">{household.id}</CardTitle>
                          <p className="text-sm text-green-600">{isHindi ? household.colonyHi : household.colony}</p>
                        </div>
                      </div>
                      {household.isTopPerformer && (
                        <div className="flex items-center space-x-1 bg-yellow-100 px-2 py-1 rounded-full">
                          <Star className="w-4 h-4 text-yellow-600 fill-current" />
                          <span className="text-xs text-yellow-800">{isHindi ? "टॉप" : "Top"}</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Waste Contributed */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{isHindi ? "इस सप्ताह कचरा:" : "Waste this week:"}</span>
                      <span className="font-semibold text-green-800">{household.wasteKg} kg</span>
                    </div>

                    {/* Segregation Score */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>{isHindi ? "पृथक्करण स्कोर" : "Segregation Score"}</span>
                        <span className="font-semibold">{household.segregationScore}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${household.segregationScore}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                        />
                      </div>
                    </div>

                    {/* Status */}
                    <Badge className={statusInfo.color}>
                      <span className="mr-1">{statusInfo.icon}</span>
                      {isHindi ? statusInfo.hi : statusInfo.en}
                    </Badge>

                    {/* Action Button */}
                    {household.isTopPerformer && (
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg" size="sm">
                        <Award className="w-4 h-4 mr-2" />
                        {isHindi ? "पुरस्कार दें" : "Issue Reward"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </MainLayout>
  )
}
