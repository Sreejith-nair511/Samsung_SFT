"use client"

import { useState } from "react"
import { Download, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockHealthRecords } from "@/lib/mock-data"

export default function RecordsPage() {
  const [activeTab, setActiveTab] = useState("weight")

  return (
    <div className="p-4 pb-20 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Health Records</h1>
        <Button className="bg-pink-600 hover:bg-pink-700">
          <Download size={16} className="mr-2" />
          PDF Report
        </Button>
      </div>

      {/* Timeline */}
      <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-gray-800">Weekly Checkups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockHealthRecords.map((record, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-3 bg-gradient-to-r from-pink-50 to-blue-50 rounded-lg"
              >
                <div className="w-3 h-3 bg-pink-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-800">Week {record.week}</span>
                    <span className="text-sm text-gray-600">{record.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{record.notes}</p>
                  <div className="flex gap-4 mt-2 text-xs text-gray-500">
                    <span>Weight: {record.weight}kg</span>
                    <span>BP: {record.bp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="bp">BP</TabsTrigger>
          <TabsTrigger value="movement">Movement</TabsTrigger>
          <TabsTrigger value="scans">Scans</TabsTrigger>
        </TabsList>

        <TabsContent value="weight">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp size={20} className="text-pink-600" />
                Weight Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockHealthRecords.map((record, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                    <span className="text-gray-700">Week {record.week}</span>
                    <span className="font-bold text-pink-600">{record.weight} kg</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bp">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-600" />
                Blood Pressure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockHealthRecords.map((record, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">Week {record.week}</span>
                    <span className="font-bold text-blue-600">{record.bp} mmHg</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movement">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp size={20} className="text-purple-600" />
                Baby Movement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockHealthRecords.map((record, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-gray-700">Week {record.week}</span>
                    <span className="font-bold text-purple-600">{record.babyMovement}/hr</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scans">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle>Ultrasound Scans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <p>No scans uploaded yet</p>
                <Button className="mt-4 bg-pink-600 hover:bg-pink-700">Upload Scan</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
