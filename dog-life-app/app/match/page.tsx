"use client"

import { useState } from "react"
import { Calendar, MapPin, Heart, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

interface DogProfile {
  id: number
  name: string
  breed: string
  age: string
  gender: "male" | "female"
  image: string
  distance: string
  compatibility: number
  personality: string[]
  interests: string[]
  owner: string
  ownerImage: string
}

interface DogEvent {
  id: number
  title: string
  date: string
  time: string
  location: string
  attendees: number
  image: string
  tags: string[]
}

export default function MatchPage() {
  const [activeTab, setActiveTab] = useState("playdates")

  // Default fallback images
  const defaultDogImage = "/happy-golden-retriever-puppy.png"
  const defaultOwnerImage = "/happy-golden-avatar.png"
  const defaultEventImage = "/park-playtime.png"

  const dogProfiles: DogProfile[] = [
    {
      id: 1,
      name: "Max",
      breed: "Golden Retriever",
      age: "3 years",
      gender: "male",
      image: "/happy-golden-hour-retriever.png",
      distance: "0.8 miles",
      compatibility: 92,
      personality: ["Friendly", "Energetic", "Playful"],
      interests: ["Fetch", "Swimming", "Running"],
      owner: "Sarah",
      ownerImage: "/diverse-woman-avatars.png",
    },
    {
      id: 2,
      name: "Luna",
      breed: "Border Collie",
      age: "2 years",
      gender: "female",
      image: "/alert-border-collie.png",
      distance: "1.2 miles",
      compatibility: 87,
      personality: ["Smart", "Athletic", "Focused"],
      interests: ["Agility", "Frisbee", "Hiking"],
      owner: "Mike",
      ownerImage: "/diverse-man-portrait.png",
    },
    {
      id: 3,
      name: "Charlie",
      breed: "Labrador",
      age: "4 years",
      gender: "male",
      image: "/happy-labrador-field.png",
      distance: "2.5 miles",
      compatibility: 78,
      personality: ["Calm", "Gentle", "Social"],
      interests: ["Walks", "Toys", "Treats"],
      owner: "Jessica",
      ownerImage: "/happy-golden-avatar.png",
    },
  ]

  const dogEvents: DogEvent[] = [
    {
      id: 1,
      title: "Bark in the Park",
      date: "Aug 15, 2023",
      time: "10:00 AM - 1:00 PM",
      location: "Central Park Dog Run",
      attendees: 24,
      image: "/park-playtime.png",
      tags: ["Off-leash", "Social", "All Sizes"],
    },
    {
      id: 2,
      title: "Puppy Playgroup",
      date: "Aug 18, 2023",
      time: "4:00 PM - 5:30 PM",
      location: "Happy Tails Training Center",
      attendees: 12,
      image: "/playful-beagle.png",
      tags: ["Puppies Only", "Supervised", "Training"],
    },
    {
      id: 3,
      title: "Doggy Splash Day",
      date: "Aug 25, 2023",
      time: "11:00 AM - 3:00 PM",
      location: "Riverside Community Pool",
      attendees: 35,
      image: "/dog-snow.png",
      tags: ["Swimming", "Water Play", "Large Area"],
    },
  ]

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl text-purple-800 mb-4">Match & Events</h1>

      <Tabs defaultValue="playdates" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="playdates">Playdates</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="playdates" className="mt-0">
          <div className="space-y-4">
            {dogProfiles.map((profile) => {
              // Ensure we never pass empty strings to src attributes
              const dogImageSrc = profile.image || defaultDogImage
              const ownerImageSrc = profile.ownerImage || defaultOwnerImage

              return (
                <Card key={profile.id} className="border-none shadow-sm overflow-hidden">
                  <div className="relative aspect-square w-full">
                    <Image src={dogImageSrc || defaultDogImage} alt={profile.name} fill className="object-cover" />
                    <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                      <Badge className="bg-purple-600 hover:bg-purple-700 text-white">
                        {profile.compatibility}% Match
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-purple-800">{profile.name}</h3>
                        <p className="text-sm text-gray-600">
                          {profile.breed}, {profile.age}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          profile.gender === "male" ? "text-blue-600 border-blue-300" : "text-pink-600 border-pink-300"
                        }
                      >
                        {profile.gender === "male" ? "♂️ Male" : "♀️ Female"}
                      </Badge>
                    </div>

                    <p className="text-xs text-gray-500 flex items-center mb-2">
                      <MapPin className="h-3 w-3 mr-1" /> {profile.distance}
                    </p>

                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Compatibility</span>
                        <span className="font-medium">{profile.compatibility}%</span>
                      </div>
                      <Progress value={profile.compatibility} className="h-2" />
                    </div>

                    <div className="space-y-2 mb-3">
                      <div>
                        <p className="text-xs font-medium text-gray-700">Personality</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {profile.personality.map((trait, index) => (
                            <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-700">Interests</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {profile.interests.map((interest, index) => (
                            <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full overflow-hidden">
                          <Image
                            src={ownerImageSrc || defaultOwnerImage}
                            alt={profile.owner}
                            width={24}
                            height={24}
                            className="object-cover"
                          />
                        </div>
                        <p className="text-xs text-gray-600">
                          Owner: <span className="font-medium">{profile.owner}</span>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="icon" variant="outline" className="h-10 w-10 rounded-full border-gray-300">
                          <X className="h-5 w-5 text-gray-500" />
                        </Button>
                        <Button size="icon" className="h-10 w-10 rounded-full bg-purple-600 hover:bg-purple-700">
                          <Heart className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="events" className="mt-0">
          <div className="space-y-4">
            {dogEvents.map((event) => {
              // Ensure we never pass empty strings to src attributes
              const eventImageSrc = event.image || defaultEventImage

              return (
                <Card key={event.id} className="border-none shadow-sm overflow-hidden">
                  <div className="relative h-40 w-full">
                    <Image src={eventImageSrc || defaultEventImage} alt={event.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-bold text-lg text-white">{event.title}</h3>
                      <div className="flex items-center text-white/90 text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>
                          {event.date} • {event.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">{event.location}</p>
                          <p className="text-xs text-gray-500">{event.attendees} dogs attending</p>
                        </div>
                      </div>
                      <Button className="bg-purple-600 hover:bg-purple-700">Join</Button>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {event.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            <Button className="w-full bg-purple-600 hover:bg-purple-700">Create New Event</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
