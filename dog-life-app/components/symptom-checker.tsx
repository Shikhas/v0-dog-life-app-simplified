"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Camera, X, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

interface AnalysisResult {
  condition: string
  confidence: number
  severity: "low" | "medium" | "high"
  recommendation: string
  requiresVet: boolean
}

export default function SymptomChecker() {
  const [step, setStep] = useState<"upload" | "analyzing" | "results">("upload")
  const [mediaType, setMediaType] = useState<"photo" | "video" | null>(null)
  const [mediaPreview, setMediaPreview] = useState<string | null>(null)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if file is an image or video
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image or video file.",
        variant: "destructive",
      })
      return
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      })
      return
    }

    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      const result = e.target?.result as string
      if (result) {
        setMediaPreview(result)
        setMediaType(file.type.startsWith("image/") ? "photo" : "video")
      }
    }
    fileReader.readAsDataURL(file)
  }

  const triggerFileInput = (type: "photo" | "video") => {
    setMediaType(type)
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === "photo" ? "image/*" : "video/*"
      fileInputRef.current.click()
    }
  }

  const resetUpload = () => {
    setMediaPreview(null)
    setMediaType(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const analyzeSymptoms = () => {
    setStep("analyzing")

    // Simulate analysis delay
    setTimeout(() => {
      // Mock analysis results based on media type
      const mockResults: AnalysisResult[] = [
        {
          condition: "Skin Irritation",
          confidence: 87,
          severity: "medium",
          recommendation: "Apply pet-safe moisturizer and monitor for 48 hours. Prevent licking of affected area.",
          requiresVet: false,
        },
        {
          condition: "Possible Allergic Reaction",
          confidence: 64,
          severity: "medium",
          recommendation: "Check for recent changes in diet or environment. Monitor for worsening symptoms.",
          requiresVet: true,
        },
        {
          condition: "Mild Dermatitis",
          confidence: 42,
          severity: "low",
          recommendation: "Keep area clean and dry. Consider hypoallergenic diet if symptoms persist.",
          requiresVet: false,
        },
      ]

      setAnalysisResults(mockResults)
      setStep("results")
    }, 3000)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-green-600 bg-green-50"
      case "medium":
        return "text-amber-600 bg-amber-50"
      case "high":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  // Function to render the media preview based on type
  const renderMediaPreview = () => {
    if (!mediaPreview) {
      return null
    }

    if (mediaType === "photo") {
      return <Image src={mediaPreview || "/placeholder.svg"} alt="Symptom preview" fill className="object-contain" />
    } else if (mediaType === "video" && mediaPreview) {
      return (
        <video controls className="w-full h-full object-contain">
          <source src={mediaPreview} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )
    }

    return null
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-purple-600" />
          Symptom Checker
        </CardTitle>
      </CardHeader>
      <CardContent>
        {step === "upload" && (
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,video/*"
            />

            {!mediaPreview ? (
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Button
                  onClick={() => triggerFileInput("photo")}
                  variant="outline"
                  className="h-auto py-6 flex flex-col items-center gap-2"
                >
                  <Camera className="h-8 w-8 text-purple-600" />
                  <span className="text-sm font-medium">Upload Photo</span>
                  <span className="text-xs text-gray-500">JPG, PNG, etc.</span>
                </Button>
                <Button
                  onClick={() => triggerFileInput("video")}
                  variant="outline"
                  className="h-auto py-6 flex flex-col items-center gap-2"
                >
                  <Upload className="h-8 w-8 text-purple-600" />
                  <span className="text-sm font-medium">Upload Video</span>
                  <span className="text-xs text-gray-500">MP4, MOV, etc.</span>
                </Button>
              </div>
            ) : (
              <div className="mb-4 relative">
                <div className="relative aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
                  {renderMediaPreview()}
                </div>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                  onClick={resetUpload}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Upload a clear photo or short video of your dog's symptoms. Our AI will analyze the media and provide
                potential health insights.
              </p>
              <div className="flex justify-between gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    resetUpload()
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                  disabled={!mediaPreview}
                  onClick={analyzeSymptoms}
                >
                  Analyze Symptoms
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === "analyzing" && (
          <div className="py-8 flex flex-col items-center">
            <Loader2 className="h-12 w-12 text-purple-600 animate-spin mb-4" />
            <h3 className="text-lg font-medium mb-2">Analyzing Symptoms</h3>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Our AI is examining the image for potential health issues. This may take a moment...
            </p>
            <Progress value={45} className="w-full max-w-xs h-2" />
          </div>
        )}

        {step === "results" && mediaPreview && (
          <div>
            <div className="mb-4 relative">
              <div className="relative aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
                {renderMediaPreview()}
              </div>
            </div>

            <h3 className="font-medium mb-3">Analysis Results</h3>
            <div className="space-y-3 mb-4">
              {analysisResults.map((result, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3 bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{result.condition}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(result.severity)}`}>
                      {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)} Severity
                    </span>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Confidence</span>
                      <span className="font-medium">{result.confidence}%</span>
                    </div>
                    <Progress value={result.confidence} className="h-1.5" />
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{result.recommendation}</p>
                  <div className="flex items-center gap-1 text-sm">
                    {result.requiresVet ? (
                      <div className="flex items-center text-amber-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span>Veterinary care recommended</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        <span>Home monitoring appropriate</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-800">
                <strong>Important:</strong> This analysis is not a substitute for professional veterinary advice. When
                in doubt, always consult with your veterinarian.
              </p>
            </div>

            <div className="flex justify-between gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep("upload")}>
                Check Another Symptom
              </Button>
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700">Find Nearby Vets</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
