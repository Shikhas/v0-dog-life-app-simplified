"use client"

import type React from "react"

import { useState } from "react"
import { Search, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CommunityQAPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Default fallback images
  const defaultAvatar = "/happy-golden-avatar.png"
  const defaultAiAvatar = "/abstract-ai-network.png"

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
      category: "behavior",
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
      category: "training",
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
      category: "behavior",
    },
    {
      id: 4,
      user: "Sam & Luna",
      avatar: "/playful-husky-profile.png",
      breed: "Husky",
      age: "4 years",
      question: "How much exercise does my Husky need daily?",
      aiResponse:
        "Huskies are high-energy dogs that typically need 1-2 hours of exercise daily. This should include walks, runs, and mental stimulation activities. Without adequate exercise, Huskies may develop destructive behaviors. Consider activities like hiking, swimming, or dog sports to keep them engaged.",
      replies: 6,
      category: "health",
    },
    {
      id: 5,
      user: "Alex & Cooper",
      avatar: "/happy-golden-avatar.png",
      breed: "Labrador",
      age: "1 year",
      question: "What's the best puppy food for a growing Labrador?",
      aiResponse:
        "Look for high-quality puppy food specifically formulated for large breeds. These contain the right balance of nutrients, calcium, and phosphorus for proper bone development. Avoid foods with fillers like corn and wheat. Feed them 3-4 times daily until 6 months, then twice daily. Always consult your vet for specific recommendations.",
      replies: 10,
      category: "health",
    },
    {
      id: 6,
      user: "Jordan & Daisy",
      avatar: "/happy-beagle-avatar.png",
      breed: "Border Collie",
      age: "3 years",
      question: "How can I teach my Border Collie to stop herding children?",
      aiResponse:
        "Border Collies have strong herding instincts. Redirect this behavior by teaching an incompatible behavior like 'place' or 'settle.' Ensure your dog gets plenty of mental and physical exercise. Use positive reinforcement to reward calm behavior around children. Consider working with a professional trainer who specializes in herding breeds.",
      replies: 9,
      category: "training",
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would search or submit the question
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="p-4 pb-16">
      <div className="flex items-center gap-2 mb-4">
        <Link href="/ask-ai">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="font-bold text-2xl text-purple-800">Community Q&A</h1>
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search community questions..."
            className="pl-10 pr-4 py-6 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      <Tabs defaultValue="all" className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
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
                          <AvatarImage src={defaultAiAvatar || null} alt="AI" />
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
        </TabsContent>

        {["behavior", "training", "health"].map((category) => (
          <TabsContent key={category} value={category} className="mt-4">
            <div className="space-y-6">
              {communityQuestions
                .filter((item) => item.category === category)
                .map((item) => {
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
                              <AvatarImage src={defaultAiAvatar || null} alt="AI" />
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
          </TabsContent>
        ))}
      </Tabs>

      <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">Ask a Question</Button>
    </div>
  )
}
