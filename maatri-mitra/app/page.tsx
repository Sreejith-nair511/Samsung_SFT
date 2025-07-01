"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mic, MapPin, Globe, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockUser, mockVitalStats } from "@/lib/mock-data"

export default function HomePage() {
  const [language, setLanguage] = useState("Hindi")

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "orange":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  const getBPStatus = (systolic: number, diastolic: number) => {
    if (systolic >= 140 || diastolic >= 90) return "high"
    if (systolic >= 130 || diastolic >= 80) return "elevated"
    return "normal"
  }

  return (
    <div className="p-4 pb-20 max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">नमस्ते, {mockUser.name}</h1>
          <p className="text-gray-600">Expected: {new Date(mockUser.expectedDelivery).toLocaleDateString()}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLanguage(language === "Hindi" ? "English" : "Hindi")}
          className="flex items-center gap-2"
        >
          <Globe size={16} />
          {language}
        </Button>
      </div>

      {/* Health Alert */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-700">
              <span className="text-xl">⚠️</span>
              <p className="font-medium">High Blood Pressure Detected. Visit PHC immediately.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Vital Stats */}
      <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-gray-800">Vital Statistics</span>
            <Badge className={getRiskColor(mockVitalStats.riskLevel)}>
              {mockVitalStats.riskLevel.toUpperCase()} RISK
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg">
              <span className="font-medium text-gray-700">Blood Pressure</span>
              <span
                className={`font-bold ${getBPStatus(mockVitalStats.bloodPressure.systolic, mockVitalStats.bloodPressure.diastolic) === "high" ? "text-red-600" : "text-green-600"}`}
              >
                {mockVitalStats.bloodPressure.systolic}/{mockVitalStats.bloodPressure.diastolic} mmHg
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <span className="font-medium text-gray-700">Body Temperature</span>
              <span className="font-bold text-blue-600">{mockVitalStats.temperature}°F</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
              <span className="font-medium text-gray-700">Fetal Movement</span>
              <span className="font-bold text-purple-600">{mockVitalStats.fetalMovement}/hr</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-4">
        <Button className="w-full h-14 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-xl shadow-lg">
          <Mic className="mr-2" size={20} />
          Ask your health assistant
        </Button>

        <Button
          variant="outline"
          className="w-full h-14 border-2 border-blue-300 text-blue-700 hover:bg-blue-50 rounded-xl shadow-lg"
        >
          <MapPin className="mr-2" size={20} />
          Nearest Hospital - {mockUser.village}
        </Button>

        <Button
          variant="outline"
          className="w-full h-14 border-2 border-green-300 text-green-700 hover:bg-green-50 rounded-xl shadow-lg"
        >
          <Phone className="mr-2" size={20} />
          Emergency Contact: 102
        </Button>
      </div>
    </div>
  )
}
