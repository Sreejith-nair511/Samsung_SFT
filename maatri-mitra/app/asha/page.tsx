"use client"

import { useState } from "react"
import { Phone, MessageSquare, MapPin, Plus, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockWomen } from "@/lib/mock-data"

export default function AshaPage() {
  const [selectedRegion, setSelectedRegion] = useState("all")

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  const filteredWomen =
    selectedRegion === "all"
      ? mockWomen
      : mockWomen.filter((woman) => woman.village.toLowerCase().includes(selectedRegion.toLowerCase()))

  return (
    <div className="p-4 pb-20 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">ASHA Dashboard</h1>
        <Button className="bg-pink-600 hover:bg-pink-700">
          <Plus size={16} className="mr-2" />
          Add Woman
        </Button>
      </div>

      {/* Region Filter */}
      <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Filter size={20} className="text-gray-600" />
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="bihar">Bihar</SelectItem>
                <SelectItem value="odisha">Odisha</SelectItem>
                <SelectItem value="rajasthan">Rajasthan</SelectItem>
                <SelectItem value="rampur">Rampur</SelectItem>
                <SelectItem value="chikmagalur">Chikmagalur</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Women List */}
      <div className="space-y-4">
        {filteredWomen.map((woman) => (
          <Card key={woman.id} className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-gray-800">{woman.name}</CardTitle>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin size={14} />
                    {woman.village}
                  </p>
                </div>
                <Badge className={getRiskColor(woman.riskLevel)}>{woman.riskLevel.toUpperCase()}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600">Last Checkup:</span>
                <span className="text-sm font-medium">{woman.lastCheckup}</span>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                  <Phone size={16} className="mr-1" />
                  Call
                </Button>
                <Button size="sm" variant="outline" className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50">
                  <MessageSquare size={16} className="mr-1" />
                  SMS
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  Log Visit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredWomen.length === 0 && (
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No women found in selected region</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
