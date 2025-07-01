export const mockUser = {
  name: "Sunita Devi",
  expectedDelivery: "2024-03-15",
  village: "Rampur, Bihar",
  language: "Hindi",
}

export const mockVitalStats = {
  bloodPressure: { systolic: 140, diastolic: 90, status: "high" },
  temperature: 98.6,
  fetalMovement: 5,
  riskLevel: "orange", // green, orange, red
}

export const mockHealthRecords = [
  {
    date: "2024-01-15",
    week: 32,
    weight: 65,
    bp: "120/80",
    babyMovement: 8,
    notes: "Normal checkup",
  },
  {
    date: "2024-01-08",
    week: 31,
    weight: 64,
    bp: "125/85",
    babyMovement: 7,
    notes: "Slight BP increase",
  },
  {
    date: "2024-01-01",
    week: 30,
    weight: 63,
    bp: "118/78",
    babyMovement: 9,
    notes: "All normal",
  },
]

export const mockWomen = [
  {
    id: 1,
    name: "Sunita Devi",
    village: "Rampur",
    riskLevel: "high",
    lastCheckup: "2024-01-15",
    phone: "+91-9876543210",
  },
  {
    id: 2,
    name: "Asha Bai",
    village: "Chikmagalur",
    riskLevel: "medium",
    lastCheckup: "2024-01-14",
    phone: "+91-9876543211",
  },
  {
    id: 3,
    name: "Kamala Devi",
    village: "Rampur",
    riskLevel: "low",
    lastCheckup: "2024-01-13",
    phone: "+91-9876543212",
  },
]

export const mockAlerts = [
  {
    id: 1,
    name: "Sunita Devi",
    alert: "Severe BP",
    time: "3:40 PM",
    severity: "high",
  },
  {
    id: 2,
    name: "Asha Bai",
    alert: "Fetal movement drop",
    time: "2:10 PM",
    severity: "medium",
  },
]

export const mockTips = [
  {
    title: "Importance of iron tablets",
    content: "Iron tablets prevent anemia and ensure healthy baby development",
    audio: "/audio/iron-tips.mp3",
  },
  {
    title: "Warning signs during pregnancy",
    content: "Watch for severe headaches, blurred vision, and reduced baby movement",
    audio: "/audio/warning-signs.mp3",
  },
  {
    title: "What to pack for hospital",
    content: "Keep ready: ID cards, medicines, clean clothes, and baby essentials",
    audio: "/audio/hospital-pack.mp3",
  },
]
