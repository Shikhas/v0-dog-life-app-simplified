"use client"

import { useState } from "react"
import { Calendar, Activity, Weight, Clipboard, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChartContainer } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import SymptomChecker from "@/components/symptom-checker"

export default function HealthPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showSymptomChecker, setShowSymptomChecker] = useState(false)

  const weightData = [
    { month: "Jan", weight: 65 },
    { month: "Feb", weight: 67 },
    { month: "Mar", weight: 68 },
    { month: "Apr", weight: 67 },
    { month: "May", weight: 66 },
    { month: "Jun", weight: 65 },
    { month: "Jul", weight: 64 },
  ]

  const behaviorData = [
    { month: "Jan", energy: 7, anxiety: 3 },
    { month: "Feb", energy: 6, anxiety: 4 },
    { month: "Mar", energy: 8, anxiety: 2 },
    { month: "Apr", energy: 7, anxiety: 2 },
    { month: "May", energy: 9, anxiety: 1 },
    { month: "Jun", energy: 8, anxiety: 2 },
    { month: "Jul", energy: 7, anxiety: 3 },
  ]

  const vetVisits = [
    {
      id: 1,
      date: "July 15, 2023",
      reason: "Annual Checkup",
      notes: "All vitals normal. Recommended dental cleaning in 6 months.",
    },
    {
      id: 2,
      date: "March 3, 2023",
      reason: "Vaccinations",
      notes: "Rabies and DHPP boosters administered. No adverse reactions.",
    },
    {
      id: 3,
      date: "December 10, 2022",
      reason: "Ear Infection",
      notes: "Prescribed antibiotics for 10 days. Follow-up showed complete recovery.",
    },
  ]

  const vaccinations = [
    {
      id: 1,
      name: "Rabies",
      date: "March 3, 2023",
      dueDate: "March 3, 2024",
      status: "Up to date",
    },
    {
      id: 2,
      name: "DHPP",
      date: "March 3, 2023",
      dueDate: "March 3, 2024",
      status: "Up to date",
    },
    {
      id: 3,
      name: "Bordetella",
      date: "October 15, 2022",
      dueDate: "October 15, 2023",
      status: "Due soon",
    },
    {
      id: 4,
      name: "Leptospirosis",
      date: "March 3, 2023",
      dueDate: "March 3, 2024",
      status: "Up to date",
    },
  ]

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl text-purple-800">Health Tracker</h1>
        <Button
          onClick={() => setShowSymptomChecker(!showSymptomChecker)}
          className="bg-purple-600 hover:bg-purple-700 flex items-center gap-1"
        >
          <AlertCircle className="h-4 w-4" />
          Symptom Checker
        </Button>
      </div>

      {showSymptomChecker && (
        <div className="mb-4">
          <SymptomChecker />
        </div>
      )}

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vet">Vet Visits</TabsTrigger>
          <TabsTrigger value="vaccines">Vaccines</TabsTrigger>
          <TabsTrigger value="weight">Weight</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <div className="space-y-4">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-600" />
                  Health Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-600">Weight</p>
                    <p className="text-xl font-bold text-green-700">64 lbs</p>
                    <p className="text-xs text-green-600">Healthy range</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-600">Next Vaccine</p>
                    <p className="text-xl font-bold text-blue-700">Oct 15</p>
                    <p className="text-xs text-blue-600">Bordetella</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-600">Last Vet Visit</p>
                    <p className="text-xl font-bold text-purple-700">Jul 15</p>
                    <p className="text-xs text-purple-600">Annual Checkup</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-600">Energy Level</p>
                    <p className="text-xl font-bold text-orange-700">High</p>
                    <p className="text-xs text-orange-600">Active & Playful</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Weight className="h-5 w-5 text-purple-600" />
                  Weight Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ChartContainer
                    config={{
                      weight: {
                        label: "Weight (lbs)",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weightData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[60, 70]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="weight" stroke="var(--color-weight)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clipboard className="h-5 w-5 text-purple-600" />
                  Behavior Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ChartContainer
                    config={{
                      energy: {
                        label: "Energy Level",
                        color: "hsl(var(--chart-1))",
                      },
                      anxiety: {
                        label: "Anxiety Level",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={behaviorData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="energy" stroke="var(--color-energy)" strokeWidth={2} />
                        <Line type="monotone" dataKey="anxiety" stroke="var(--color-anxiety)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vet" className="mt-0">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Vet Visit History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vetVisits.map((visit) => (
                  <div key={visit.id} className="border border-gray-200 rounded-lg p-3 bg-white">
                    <div className="flex justify-between items-start">
                      <p className="font-medium">{visit.reason}</p>
                      <span className="text-xs text-gray-500">{visit.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{visit.notes}</p>
                  </div>
                ))}
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Add New Vet Visit</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vaccines" className="mt-0">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-600" />
                Vaccination Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vaccinations.map((vaccine) => (
                  <div key={vaccine.id} className="border border-gray-200 rounded-lg p-3 bg-white">
                    <div className="flex justify-between items-start">
                      <p className="font-medium">{vaccine.name}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          vaccine.status === "Up to date"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {vaccine.status}
                      </span>
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <p>Last: {vaccine.date}</p>
                      <p>Due: {vaccine.dueDate}</p>
                    </div>
                  </div>
                ))}
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Add New Vaccination</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weight" className="mt-0">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Weight className="h-5 w-5 text-purple-600" />
                Weight History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-60 mb-4">
                <ChartContainer
                  config={{
                    weight: {
                      label: "Weight (lbs)",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weightData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[60, 70]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="weight" stroke="var(--color-weight)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="font-medium">Current Weight</span>
                  <span className="text-purple-700 font-bold">64 lbs</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="font-medium">Target Range</span>
                  <span className="text-green-700">60-70 lbs</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="font-medium">6-Month Change</span>
                  <span className="text-blue-700">-1 lb</span>
                </div>
              </div>

              <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">Add New Weight Entry</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
