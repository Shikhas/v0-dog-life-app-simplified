"use client"

import type React from "react"

import { useState } from "react"
import { Search, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function AskAiPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Default fallback images
  const defaultAvatar = "/happy-golden-avatar.png"
  const defaultAiAvatar = "/abstract-ai-network.png"

  const popularQuestions = [
    "How to stop my puppy from chewing furniture?",
    "What human foods are safe for dogs?",
    "How often should I bathe my dog?",
  ]

  const communityQuestions = [
    {
      id: 1,
      user: "Jessica & Rufus",
      avatar: "/happy-golden-avatar.png",
      breed: "Golden Retriever",
      age: "3 years",
      question: "My dog gets anxious during thunderstorms. Any tips to help calm him down?",
      aiResponse:
        "Try creating a safe space with familiar toys and sounds. ThunderShirts can help, as well as playing white noise to mask the storm sounds. Consult your vet about anxiety-reducing supplements if the problem persists.",
      replies: 12,
    },
    {
      id: 2,
      user: "Mike & Bella",
      avatar: "/playful-husky-profile.png",
      breed: "Pomeranian",
      age: "5 years",
      question: "How do I get my dog to stop pulling on the leash during walks?",
      aiResponse:
        "Consistent training is key. Stop walking when pulling occurs, and only continue when the leash is slack. Reward good walking behavior with treats. Front-clip harnesses can help reduce pulling while you work on training.",
      replies: 8,
    },
    {
      id: 3,
      user: "Taylor & Max",
      avatar: "/happy-beagle-avatar.png",
      breed: "Beagle",
      age: "2 years",
      question: "What's the best way to introduce my dog to a new baby?",
      aiResponse:
        "Start by introducing your dog to baby scents and sounds before the arrival. When the baby comes home, allow your dog to sniff items with the baby's scent. Always supervise interactions and reward calm behavior around the baby. Maintain your dog's routine as much as possible to reduce stress.",
      replies: 15,
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would search or submit the question
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="p-4 pb-16">
      <h1 className="font-bold text-2xl text-purple-800 mb-4">Ask AI</h1>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Ask about dog behavior, health, or training..."
            className="pl-10 pr-4 py-6 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      <section className="mb-8">
        <h2 className="font-bold text-lg mb-3">Popular Questions</h2>
        <div className="space-y-2">
          {popularQuestions.map((question, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start text-left h-auto py-3 px-4 bg-gray-50 hover:bg-gray-100 font-normal text-gray-800"
              onClick={() => setSearchQuery(question)}
            >
              {question}
            </Button>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-lg">Community Q&A</h2>
          <Link href="/ask-ai/community" className="text-purple-600 text-sm flex items-center">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="space-y-6">
          {communityQuestions.map((item) => {
            // Ensure we never pass empty strings to src attributes
            const avatarSrc = item.avatar || defaultAvatar

            return (
              <Card key={item.id} className="border-none shadow-sm overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={avatarSrc || defaultAvatar} alt={item.user} />
                      <AvatarFallback>{item.user[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{item.user}</p>
                      <p className="text-xs text-gray-500">
                        {item.breed} • {item.age}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm font-medium mb-3">{item.question}</p>

                  <div className="bg-blue-50 rounded-lg p-3 mb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-6 w-6 bg-blue-100">
                        <AvatarImage src={defaultAiAvatar || defaultAvatar} alt="AI" />
                        <AvatarFallback className="text-xs text-blue-600">AI</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium text-blue-700">AI Response</span>
                    </div>
                    <p className="text-sm text-gray-700">{item.aiResponse}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{item.replies} community replies</span>
                    <Button variant="link" size="sm" className="text-purple-600 p-0 h-auto">
                      See answers
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">Ask a Question</Button>
      </section>
    </div>
  )
}
