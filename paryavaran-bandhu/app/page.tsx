"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Send, Clock, Weight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import MainLayout from "@/components/layout/main-layout"

const binData = [
  {
    id: 1,
    wardNo: "W-01",
    colony: "Rampur Colony",
    colonyHi: "रामपुर कॉलोनी",
    fillLevel: 85,
    weight: 4.3,
    lastPickup: "2 hours ago",
    status: "critical",
  },
  {
    id: 2,
    wardNo: "W-02",
    colony: "Bharatnagar",
    colonyHi: "भारतनगर",
    fillLevel: 45,
    weight: 2.1,
    lastPickup: "6 hours ago",
    status: "medium",
  },
  {
    id: 3,
    wardNo: "W-03",
    colony: "Chiklod Area",
    colonyHi: "चिकलोड क्षेत्र",
    fillLevel: 20,
    weight: 1.2,
    lastPickup: "1 day ago",
    status: "good",
  },
  {
    id: 4,
    wardNo: "W-04",
    colony: "Gandhi Nagar",
    colonyHi: "गांधी नगर",
    fillLevel: 70,
    weight: 3.8,
    lastPickup: "4 hours ago",
    status: "medium",
  },
  {
    id: 5,
    wardNo: "W-05",
    colony: "Nehru Colony",
    colonyHi: "नेहरू कॉलोनी",
    fillLevel: 90,
    weight: 5.1,
    lastPickup: "30 minutes ago",
    status: "critical",
  },
  {
    id: 6,
    wardNo: "W-06",
    colony: "Subhash Nagar",
    colonyHi: "सुभाष नगर",
    fillLevel: 35,
    weight: 1.8,
    lastPickup: "8 hours ago",
    status: "good",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "critical":
      return "bg-red-500"
    case "medium":
      return "bg-orange-500"
    case "good":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusBadge = (status: string, isHindi: boolean) => {
  const statusMap = {
    critical: { en: "Critical", hi: "गंभीर", color: "bg-red-100 text-red-800" },
    medium: { en: "Medium", hi: "मध्यम", color: "bg-orange-100 text-orange-800" },
    good: { en: "Good", hi: "अच्छा", color: "bg-green-100 text-green-800" },
  }
  const statusInfo = statusMap[status as keyof typeof statusMap]
  return <Badge className={statusInfo.color}>{isHindi ? statusInfo.hi : statusInfo.en}</Badge>
}

export default function WardBinsPage() {
  const [isHindi, setIsHindi] = useState(false)

  return (
    <MainLayout currentPage="/">
      <div className="space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-2">
            {isHindi ? "वार्ड-वार बिन निगरानी" : "Ward-wise Bin Monitoring"}
          </h2>
          <p className="text-green-600">
            {isHindi ? "रामपुर नगर पंचायत - वास्तविक समय स्थिति" : "Rampur Nagar Panchayat - Real-time Status"}
          </p>
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <span>{isHindi ? "बिन स्थान मानचित्र" : "Bin Location Map"}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 rounded-lg p-8 text-center">
                <MapPin className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <p className="text-green-700">
                  {isHindi ? "रामपुर शहर का इंटरैक्टिव मानचित्र" : "Interactive Map of Rampur Town"}
                </p>
                <p className="text-sm text-green-600 mt-2">
                  {isHindi ? "(वास्तविक मानचित्र एकीकरण के लिए)" : "(For actual map integration)"}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bins Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {binData.map((bin, index) => (
            <motion.div
              key={bin.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-green-800">{bin.wardNo}</CardTitle>
                      <p className="text-sm text-green-600">{isHindi ? bin.colonyHi : bin.colony}</p>
                    </div>
                    {getStatusBadge(bin.status, isHindi)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Fill Level */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{isHindi ? "भरने का स्तर" : "Fill Level"}</span>
                      <span className="font-semibold">{bin.fillLevel}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div
                        className={`h-3 rounded-full ${getStatusColor(bin.status)}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${bin.fillLevel}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      />
                    </div>
                  </div>

                  {/* Weight */}
                  <div className="flex items-center space-x-2">
                    <Weight className="w-4 h-4 text-green-600" />
                    <span className="text-sm">
                      {isHindi ? "वजन:" : "Weight:"} <strong>{bin.weight} kg</strong>
                    </span>
                  </div>

                  {/* Last Pickup */}
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-sm">
                      {isHindi ? "अंतिम संग्रह:" : "Last pickup:"} {bin.lastPickup}
                    </span>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full bg-green-600 hover:bg-green-700 rounded-lg" size="sm">
                    <Send className="w-4 h-4 mr-2" />
                    {isHindi ? "सफाईकर्मी भेजें" : "Send Sweeper"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
