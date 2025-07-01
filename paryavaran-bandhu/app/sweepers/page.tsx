"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Clock, Phone, AlertTriangle, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MainLayout from "@/components/layout/main-layout"

const sweeperData = [
  {
    id: 1,
    binId: "W-01",
    colony: "Rampur Colony",
    colonyHi: "रामपुर कॉलोनी",
    status: "pending",
    eta: "15 mins",
    contact: "+91 98765-43210",
    sweeperName: "राम कुमार",
    priority: "high",
  },
  {
    id: 2,
    binId: "W-03",
    colony: "Chiklod Area",
    colonyHi: "चिकलोड क्षेत्र",
    status: "cleared",
    eta: "Completed",
    contact: "+91 98765-43211",
    sweeperName: "सुरेश यादव",
    priority: "medium",
  },
  {
    id: 3,
    binId: "W-05",
    colony: "Nehru Colony",
    colonyHi: "नेहरू कॉलोनी",
    status: "pending",
    eta: "30 mins",
    contact: "+91 98765-43212",
    sweeperName: "मोहन सिंह",
    priority: "high",
  },
  {
    id: 4,
    binId: "W-02",
    colony: "Bharatnagar",
    colonyHi: "भारतनगर",
    status: "cleared",
    eta: "Completed",
    contact: "+91 98765-43213",
    sweeperName: "विकास शर्मा",
    priority: "low",
  },
]

const feedbackOptions = [
  { en: "Bin Locked", hi: "बिन बंद है" },
  { en: "Not Accessible", hi: "पहुंच नहीं" },
  { en: "Overflowing", hi: "भरा हुआ" },
  { en: "Damaged Bin", hi: "टूटा बिन" },
]

const getStatusInfo = (status: string, isHindi: boolean) => {
  const statusMap = {
    pending: {
      en: "Pending",
      hi: "लंबित",
      color: "bg-orange-100 text-orange-800",
      icon: Clock,
    },
    cleared: {
      en: "Cleared",
      hi: "साफ किया",
      color: "bg-green-100 text-green-800",
      icon: CheckCircle,
    },
  }
  return statusMap[status as keyof typeof statusMap]
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "border-l-red-500"
    case "medium":
      return "border-l-orange-500"
    case "low":
      return "border-l-green-500"
    default:
      return "border-l-gray-500"
  }
}

export default function SweepersPage() {
  const [isHindi, setIsHindi] = useState(false)
  const [activeTab, setActiveTab] = useState("daily")

  return (
    <MainLayout currentPage="/sweepers">
      <div className="space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-2">
            {isHindi ? "सफाईकर्मी डैशबोर्ड" : "Sweeper Dashboard"}
          </h2>
          <p className="text-green-600">{isHindi ? "कार्य असाइनमेंट और ट्रैकिंग" : "Task Assignment & Tracking"}</p>
        </motion.div>

        {/* Schedule Toggle */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="daily" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{isHindi ? "दैनिक" : "Daily"}</span>
              </TabsTrigger>
              <TabsTrigger value="weekly" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{isHindi ? "साप्ताहिक" : "Weekly"}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {sweeperData.map((task, index) => {
                  const statusInfo = getStatusInfo(task.status, isHindi)
                  const StatusIcon = statusInfo.icon

                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Card
                        className={`rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 ${getPriorityColor(task.priority)}`}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg text-green-800">
                                {isHindi ? "बिन" : "Bin"} {task.binId}
                              </CardTitle>
                              <p className="text-sm text-green-600">{isHindi ? task.colonyHi : task.colony}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {isHindi ? "सफाईकर्मी:" : "Sweeper:"} {task.sweeperName}
                              </p>
                            </div>
                            <Badge className={statusInfo.color}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {isHindi ? statusInfo.hi : statusInfo.en}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* ETA */}
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{isHindi ? "अनुमानित समय:" : "ETA:"}</span>
                            <span className="font-semibold text-green-800">{task.eta}</span>
                          </div>

                          {/* Contact */}
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-green-600" />
                            <span className="text-sm">{task.contact}</span>
                          </div>

                          {/* Action Buttons */}
                          <div className="space-y-2">
                            {task.status === "pending" ? (
                              <Button className="w-full bg-green-600 hover:bg-green-700 rounded-lg" size="sm">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                {isHindi ? "एकत्रित के रूप में चिह्नित करें" : "Mark as Collected"}
                              </Button>
                            ) : (
                              <Button variant="outline" className="w-full rounded-lg" size="sm" disabled>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                {isHindi ? "पूर्ण" : "Completed"}
                              </Button>
                            )}

                            <Button variant="outline" className="w-full rounded-lg" size="sm">
                              <AlertTriangle className="w-4 h-4 mr-2" />
                              {isHindi ? "फीडबैक दें" : "Add Feedback"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="weekly" className="mt-6">
              <Card className="rounded-xl shadow-lg">
                <CardContent className="p-8 text-center">
                  <Calendar className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    {isHindi ? "साप्ताहिक शेड्यूल" : "Weekly Schedule"}
                  </h3>
                  <p className="text-green-600">
                    {isHindi ? "साप्ताहिक कार्य योजना यहाँ दिखाई जाएगी" : "Weekly task planning will be displayed here"}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Feedback Options */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <span>{isHindi ? "सामान्य फीडबैक विकल्प" : "Common Feedback Options"}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {feedbackOptions.map((option, index) => (
                  <Button key={index} variant="outline" size="sm" className="rounded-lg text-xs">
                    {isHindi ? option.hi : option.en}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  )
}
