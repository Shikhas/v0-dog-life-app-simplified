"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export default function AskQuestionPage() {
  const [question, setQuestion] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [aiResponse, setAiResponse] = useState<string | null>(null)

  // Default AI avatar
  const defaultAiAvatar = "/abstract-ai-network.png"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    setIsSubmitting(true)

    // Simulate API call to get AI response
    setTimeout(() => {
      // Example responses based on keywords
      let response = "Thank you for your question. "

      if (question.toLowerCase().includes("puppy")) {
        response +=
          "Puppies require special attention during their first year. Make sure to provide proper socialization, training, and veterinary care. Establish a routine for feeding, potty breaks, and playtime to help them adjust."
      } else if (question.toLowerCase().includes("food") || question.toLowerCase().includes("eat")) {
        response +=
          "A balanced diet is crucial for your dog's health. High-quality commercial dog foods that meet AAFCO standards are generally recommended. Always consult with your veterinarian about specific dietary needs based on your dog's age, breed, size, and health conditions."
      } else if (question.toLowerCase().includes("train")) {
        response +=
          "Positive reinforcement training is highly effective for dogs. Use treats, praise, and play as rewards for desired behaviors. Consistency is key - ensure all family members use the same commands and rules. Short, frequent training sessions work better than long ones."
      } else {
        response +=
          "Dogs thrive on routine, exercise, proper nutrition, and regular veterinary care. Each dog is unique, so it's important to understand your specific dog's needs based on their breed, age, and personality. If you have specific concerns, please provide more details."
      }

      setAiResponse(response)
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center gap-2 mb-4">
        <Link href="/ask-ai">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="font-bold text-2xl text-purple-800">Ask a Question</h1>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <Textarea
          placeholder="What would you like to know about dog care, training, or health?"
          className="min-h-[120px] mb-4"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700"
          disabled={!question.trim() || isSubmitting}
        >
          {isSubmitting ? "Getting answer..." : "Ask AI"}
        </Button>
      </form>

      {aiResponse && (
        <div className="mt-6">
          <h2 className="font-bold text-lg mb-3">AI Response</h2>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Avatar className="h-8 w-8 bg-blue-100">
                <AvatarImage src={defaultAiAvatar || null} alt="AI" />
                <AvatarFallback className="text-sm text-blue-600">AI</AvatarFallback>
              </Avatar>
              <span className="font-medium text-blue-700">Dog Life AI</span>
            </div>
            <p className="text-sm text-gray-700">{aiResponse}</p>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-sm mb-2">Was this helpful?</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Yes, thanks!
              </Button>
              <Button variant="outline" size="sm">
                Not really
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-sm mb-2">Ask a follow-up question</h3>
            <div className="flex gap-2">
              <Textarea placeholder="Type your follow-up question..." className="min-h-[80px]" />
              <Button size="icon" className="h-10 w-10 self-end bg-purple-600 hover:bg-purple-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
