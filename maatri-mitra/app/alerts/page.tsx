"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Phone, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockAlerts } from "@/lib/mock-data"

export default function AlertsPage() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  const emergencyContacts = [
    { name: "Emergency Services", number: "102" },
    { name: "Local PHC", number: "+91-9876543200" },
    { name: "District Hospital", number: "+91-9876543201" },
    { name: "ASHA Supervisor", number: "+91-9876543202" },
  ]

  return (
    <div className="p-4 pb-20 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Emergency Alerts</h1>

      {/* Real-time Alerts */}
      <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <AlertTriangle className="text-red-600" size={20} />
            Real-time Alert Log
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-600" />
                  <span className="font-medium text-gray-800">{alert.name}</span>
                </div>
                <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={16} className="text-red-600" />
                <span className="text-red-700 font-medium">{alert.alert}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock size={14} />
                  <span>Triggered at {alert.time}</span>
                </div>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  <Phone size={14} className="mr-1" />
                  Call Now
                </Button>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <Phone className="text-green-600" size={20} />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {emergencyContacts.map((contact, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-800">{contact.name}</p>
                <p className="text-sm text-gray-600">{contact.number}</p>
              </div>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Phone size={14} className="mr-1" />
                Call
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
