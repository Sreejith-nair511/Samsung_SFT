"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Camera, Send, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import MainLayout from "@/components/layout/main-layout"

const wasteImages = [
  {
    id: 1,
    type: "Plastic",
    typeHi: "प्लास्टिक",
    confidence: 95,
    contamination: false,
    image: "/placeholder.svg?height=200&width=200",
    description: "Plastic bottle detected",
    descriptionHi: "प्लास्टिक की बोतल मिली",
  },
  {
    id: 2,
    type: "Paper",
    typeHi: "कागज",
    confidence: 88,
    contamination: true,
    image: "/placeholder.svg?height=200&width=200",
    description: "Paper with plastic contamination",
    descriptionHi: "प्लास्टिक से दूषित कागज",
  },
  {
    id: 3,
    type: "Glass",
    typeHi: "कांच",
    confidence: 92,
    contamination: false,
    image: "/placeholder.svg?height=200&width=200",
    description: "Clean glass bottle",
    descriptionHi: "साफ कांच की बोतल",
  },
  {
    id: 4,
    type: "Food Waste",
    typeHi: "खाद्य अपशिष्ट",
    confidence: 87,
    contamination: true,
    image: "/placeholder.svg?height=200&width=200",
    description: "Food waste in plastic bag",
    descriptionHi: "प्लास्टिक बैग में खाद्य अपशिष्ट",
  },
  {
    id: 5,
    type: "Metal",
    typeHi: "धातु",
    confidence: 94,
    contamination: false,
    image: "/placeholder.svg?height=200&width=200",
    description: "Aluminum can",
    descriptionHi: "एल्यूमिनियम कैन",
  },
  {
    id: 6,
    type: "E-Waste",
    typeHi: "ई-कचरा",
    confidence: 91,
    contamination: false,
    image: "/placeholder.svg?height=200&width=200",
    description: "Electronic component",
    descriptionHi: "इलेक्ट्रॉनिक घटक",
  },
]

const getTypeColor = (type: string) => {
  const colorMap: { [key: string]: string } = {
    Plastic: "bg-red-100 text-red-800",
    Paper: "bg-blue-100 text-blue-800",
    Glass: "bg-green-100 text-green-800",
    "Food Waste": "bg-orange-100 text-orange-800",
    Metal: "bg-gray-100 text-gray-800",
    "E-Waste": "bg-purple-100 text-purple-800",
  }
  return colorMap[type] || "bg-gray-100 text-gray-800"
}

export default function ClassifierPage() {
  const [isHindi, setIsHindi] = useState(false)

  return (
    <MainLayout currentPage="/classifier">
      <div className="space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-2">
            {isHindi ? "डंपयार्ड AI कचरा वर्गीकरण" : "Dumpyard AI Waste Classifier"}
          </h2>
          <p className="text-green-600">
            {isHindi ? "स्वचालित कचरा पहचान और वर्गीकरण" : "Automated Waste Detection & Classification"}
          </p>
        </motion.div>

        {/* Camera Feed Simulation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-green-600" />
                <span>{isHindi ? "लाइव कैमरा फीड" : "Live Camera Feed"}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 rounded-lg p-8 text-center">
                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 mb-2">{isHindi ? "डंपयार्ड कैमरा फीड" : "Dumpyard Camera Feed"}</p>
                <p className="text-sm text-gray-500">
                  {isHindi ? "(वास्तविक कैमरा एकीकरण के लिए)" : "(For actual camera integration)"}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Detection Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wasteImages.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge className={getTypeColor(item.type)}>{isHindi ? item.typeHi : item.type}</Badge>
                    {item.contamination ? (
                      <div className="flex items-center space-x-1 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-xs">{isHindi ? "दूषित" : "Contaminated"}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-xs">{isHindi ? "साफ" : "Clean"}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Image */}
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.type}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600">{isHindi ? item.descriptionHi : item.description}</p>

                  {/* Confidence */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{isHindi ? "विश्वास स्तर" : "Confidence"}</span>
                      <span className="font-semibold">{item.confidence}%</span>
                    </div>
                    <Progress value={item.confidence} className="h-2" />
                  </div>

                  {/* Action Button */}
                  <Button
                    className={`w-full rounded-lg ${
                      item.contamination ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                    }`}
                    size="sm"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isHindi ? (item.contamination ? "सही सेक्शन में भेजें" : "उचित सेक्शन में भेजें") : "Send to Proper Section"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle>{isHindi ? "आज के आंकड़े" : "Today's Statistics"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-800">247</div>
                  <div className="text-sm text-gray-600">{isHindi ? "कुल स्कैन" : "Total Scans"}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-800">89%</div>
                  <div className="text-sm text-gray-600">{isHindi ? "सटीकता" : "Accuracy"}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-800">23</div>
                  <div className="text-sm text-gray-600">{isHindi ? "दूषण मामले" : "Contamination Cases"}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-800">156</div>
                  <div className="text-sm text-gray-600">{isHindi ? "पुनर्निर्देशित" : "Redirected"}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  )
}
