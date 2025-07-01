"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Trophy, Star, TrendingUp, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import MainLayout from "@/components/layout/main-layout"

const weeklyWasteData = [
  { week: "Week 1", waste: 245 },
  { week: "Week 2", waste: 289 },
  { week: "Week 3", waste: 267 },
  { week: "Week 4", waste: 312 },
]

const wardComparisonData = [
  { ward: "W-01", waste: 45, cleanliness: 78 },
  { ward: "W-02", waste: 38, cleanliness: 85 },
  { ward: "W-03", waste: 52, cleanliness: 72 },
  { ward: "W-04", waste: 41, cleanliness: 88 },
  { ward: "W-05", waste: 48, cleanliness: 75 },
  { ward: "W-06", waste: 35, cleanliness: 92 },
]

const wasteTypeData = [
  { name: "Plastic", value: 35, color: "#ef4444" },
  { name: "Paper", value: 25, color: "#3b82f6" },
  { name: "Food Waste", value: 20, color: "#f97316" },
  { name: "Glass", value: 12, color: "#22c55e" },
  { name: "Metal", value: 8, color: "#6b7280" },
]

const complaintsData = [
  {
    id: 1,
    complaint: "Bin overflowing in Rampur Colony",
    complaintHi: "रामपुर कॉलोनी में बिन भरा हुआ",
    status: "resolved",
    time: "2 hours ago",
  },
  {
    id: 2,
    complaint: "Missed pickup in Gandhi Nagar",
    complaintHi: "गांधी नगर में संग्रह छूट गया",
    status: "pending",
    time: "4 hours ago",
  },
  {
    id: 3,
    complaint: "Damaged bin in Nehru Colony",
    complaintHi: "नेहरू कॉलोनी में टूटा बिन",
    status: "in-progress",
    time: "6 hours ago",
  },
]

const topHouseholds = [
  { id: "QR001", colony: "Rampur Colony", colonyHi: "रामपुर कॉलोनी", score: 95, stars: 5 },
  { id: "QR005", colony: "Nehru Colony", colonyHi: "नेहरू कॉलोनी", score: 92, stars: 5 },
  { id: "QR004", colony: "Gandhi Nagar", colonyHi: "गांधी नगर", score: 88, stars: 4 },
  { id: "QR007", colony: "Subhash Nagar", colonyHi: "सुभाष नगर", score: 85, stars: 4 },
  { id: "QR003", colony: "Bharatnagar", colonyHi: "भारतनगर", score: 82, stars: 4 },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "resolved":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-red-100 text-red-800"
    case "in-progress":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusText = (status: string, isHindi: boolean) => {
  const statusMap = {
    resolved: { en: "Resolved", hi: "हल हो गया" },
    pending: { en: "Pending", hi: "लंबित" },
    "in-progress": { en: "In Progress", hi: "प्रगति में" },
  }
  return statusMap[status as keyof typeof statusMap]?.[isHindi ? "hi" : "en"] || status
}

export default function AnalyticsPage() {
  const [isHindi, setIsHindi] = useState(false)

  return (
    <MainLayout currentPage="/analytics">
      <div className="space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-2">
            {isHindi ? "विश्लेषण डैशबोर्ड" : "Analytics Dashboard"}
          </h2>
          <p className="text-green-600">{isHindi ? "अधिकारियों के लिए डेटा अंतर्दृष्टि" : "Data Insights for Officers"}</p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              title: isHindi ? "कुल कचरा/सप्ताह" : "Total Waste/Week",
              value: "1,113 kg",
              change: "+12%",
              icon: TrendingUp,
              color: "text-green-600",
            },
            {
              title: isHindi ? "सक्रिय बिन" : "Active Bins",
              value: "24",
              change: "100%",
              icon: Trophy,
              color: "text-blue-600",
            },
            {
              title: isHindi ? "शिकायतें" : "Complaints",
              value: "3",
              change: "-25%",
              icon: AlertCircle,
              color: "text-orange-600",
            },
            {
              title: isHindi ? "औसत स्कोर" : "Avg Score",
              value: "84/100",
              change: "+8%",
              icon: Star,
              color: "text-yellow-600",
            },
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="rounded-xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      <p className={`text-sm ${metric.color}`}>{metric.change}</p>
                    </div>
                    <metric.icon className={`w-8 h-8 ${metric.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Waste Trend */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card className="rounded-xl shadow-lg">
              <CardHeader>
                <CardTitle>{isHindi ? "साप्ताहिक कचरा रुझान" : "Weekly Waste Trend"}</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    waste: {
                      label: isHindi ? "कचरा (kg)" : "Waste (kg)",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyWasteData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="waste"
                        stroke="var(--color-waste)"
                        strokeWidth={3}
                        dot={{ fill: "var(--color-waste)", strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Ward Comparison */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <Card className="rounded-xl shadow-lg">
              <CardHeader>
                <CardTitle>{isHindi ? "वार्ड-वार तुलना" : "Ward-wise Comparison"}</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    waste: {
                      label: isHindi ? "कचरा (kg)" : "Waste (kg)",
                      color: "hsl(var(--chart-1))",
                    },
                    cleanliness: {
                      label: isHindi ? "स्वच्छता स्कोर" : "Cleanliness Score",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={wardComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="ward" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="waste" fill="var(--color-waste)" radius={4} />
                      <Bar dataKey="cleanliness" fill="var(--color-cleanliness)" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cleanest Area */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card className="rounded-xl shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <span>{isHindi ? "महीने का सबसे साफ क्षेत्र" : "Cleanest Area of Month"}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="bg-yellow-100 p-6 rounded-lg mb-4">
                    <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
                    <h3 className="text-xl font-bold text-yellow-800">{isHindi ? "सुभाष नगर" : "Subhash Nagar"}</h3>
                    <p className="text-yellow-700">Ward W-06</p>
                    <div className="flex justify-center items-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-yellow-600 mt-2">92% {isHindi ? "स्वच्छता स्कोर" : "Cleanliness Score"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Complaints Log */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <Card className="rounded-xl shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span>{isHindi ? "शिकायत लॉग" : "Complaints Log"}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {complaintsData.map((complaint, index) => (
                    <div key={complaint.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {isHindi ? complaint.complaintHi : complaint.complaint}
                        </p>
                        <p className="text-xs text-gray-500">{complaint.time}</p>
                      </div>
                      <Badge className={getStatusColor(complaint.status)}>
                        {getStatusText(complaint.status, isHindi)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Households Leaderboard */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Card className="rounded-xl shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span>{isHindi ? "टॉप घर लीडरबोर्ड" : "Top Households Leaderboard"}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topHouseholds.map((household, index) => (
                    <div key={household.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            index === 0
                              ? "bg-yellow-500"
                              : index === 1
                                ? "bg-gray-400"
                                : index === 2
                                  ? "bg-orange-500"
                                  : "bg-green-500"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{household.id}</p>
                          <p className="text-xs text-gray-500">{isHindi ? household.colonyHi : household.colony}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-green-800">{household.score}</span>
                        <div className="flex">
                          {[...Array(household.stars)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Waste Type Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <Card className="rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle>{isHindi ? "कचरा प्रकार वितरण" : "Waste Type Distribution"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={wasteTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {wasteTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {wasteTypeData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  )
}
