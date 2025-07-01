"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, SkipForward, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockTips } from "@/lib/mock-data"

export default function TipsPage() {
  const [currentTip, setCurrentTip] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)

  useEffect(() => {
    if (autoRotate) {
      const interval = setInterval(() => {
        setCurrentTip((prev) => (prev + 1) % mockTips.length)
      }, 10000) // 10 seconds

      return () => clearInterval(interval)
    }
  }, [autoRotate])

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % mockTips.length)
  }

  const toggleAudio = () => {
    setIsPlaying(!isPlaying)
    // In a real app, this would control audio playback
  }

  return (
    <div className="p-4 pb-20 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Health Tips</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAutoRotate(!autoRotate)}
          className={autoRotate ? "bg-pink-100 text-pink-700" : ""}
        >
          Auto-rotate {autoRotate ? "ON" : "OFF"}
        </Button>
      </div>

      {/* Current Tip Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTip}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-6 shadow-lg border-0 bg-gradient-to-br from-pink-100 to-blue-100 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">{mockTips[currentTip].title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6 leading-relaxed">{mockTips[currentTip].content}</p>

              {/* Audio Controls */}
              <div className="flex items-center gap-3 mb-4">
                <Button
                  onClick={toggleAudio}
                  className={`flex-1 h-12 ${isPlaying ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                >
                  {isPlaying ? <Pause size={20} className="mr-2" /> : <Play size={20} className="mr-2" />}
                  {isPlaying ? "Pause Audio" : "Play Audio"}
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12 border-2 border-blue-300">
                  <Volume2 size={20} className="text-blue-600" />
                </Button>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {currentTip + 1} of {mockTips.length}
                </span>
                <Button
                  onClick={nextTip}
                  variant="outline"
                  className="border-2 border-pink-300 text-pink-700 hover:bg-pink-50"
                >
                  <SkipForward size={16} className="mr-2" />
                  Next Tip
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* All Tips List */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-gray-800">All Health Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockTips.map((tip, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentTip(index)}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                index === currentTip
                  ? "bg-gradient-to-r from-pink-100 to-blue-100 border-2 border-pink-300"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 mb-1">{tip.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{tip.content}</p>
                </div>
                <Button size="sm" variant="ghost" className="ml-2">
                  <Play size={16} />
                </Button>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
