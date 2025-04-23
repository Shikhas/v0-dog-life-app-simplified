"use client"

import { useState } from "react"
import { Search, MapPin, Star, MessageSquare, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Review {
  id: number
  userName: string
  userAvatar: string
  rating: number
  comment: string
  date: string
}

interface ServiceProvider {
  id: number
  name: string
  type: string
  image: string
  rating: number
  reviewCount: number
  distance: string
  summary: string
  tags: string[]
  aiReviewSummary?: string
  reviews?: Review[]
  badges?: string[]
}

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [expandedService, setExpandedService] = useState<number | null>(null)

  // Default placeholder image
  const defaultServiceImage = "/assistance-dog-park.png"

  const serviceProviders: ServiceProvider[] = [
    {
      id: 1,
      name: "Pawsome Grooming",
      type: "Groomer",
      image: "/happy-groomed-poodle.png",
      rating: 4.8,
      reviewCount: 124,
      distance: "1.2 miles",
      summary:
        "Professional grooming services with gentle handling and organic products. Specializes in all breeds and coat types.",
      tags: ["Nail Trimming", "Bath", "Haircut"],
      aiReviewSummary:
        "Customers consistently praise the gentle handling of pets and use of organic products. Many highlight the staff's ability to work with anxious dogs and the cleanliness of the facility.",
      badges: ["Top Rated", "Gentle Care"],
      reviews: [
        {
          id: 101,
          userName: "Sarah M.",
          userAvatar: "/diverse-woman-avatars.png",
          rating: 5,
          comment: "My nervous poodle actually enjoys going here now! They're so patient and gentle with him.",
          date: "2 weeks ago",
        },
        {
          id: 102,
          userName: "Mike T.",
          userAvatar: "/diverse-man-portrait.png",
          rating: 4.5,
          comment: "Great job with my golden's thick coat. Love that they use all-natural products.",
          date: "1 month ago",
        },
      ],
    },
    {
      id: 2,
      name: "Happy Tails Veterinary",
      type: "Vet",
      image: "/welcoming-vet-clinic.png",
      rating: 4.9,
      reviewCount: 208,
      distance: "2.5 miles",
      summary:
        "Full-service veterinary clinic with emergency care available. Compassionate staff and modern facilities.",
      tags: ["Emergency", "Vaccinations", "Surgery"],
      aiReviewSummary:
        "Reviewers frequently mention the clinic's quick response in emergencies and the caring, knowledgeable staff. The modern equipment and clear communication about treatment options are also highly appreciated.",
      badges: ["Top Rated", "Emergency Care"],
      reviews: [
        {
          id: 201,
          userName: "Jessica L.",
          userAvatar: "/happy-golden-avatar.png",
          rating: 5,
          comment:
            "Dr. Wilson saved my dog's life during an emergency. Forever grateful for their quick action and expertise.",
          date: "3 weeks ago",
        },
        {
          id: 202,
          userName: "David R.",
          userAvatar: "/diverse-man-portrait.png",
          rating: 5,
          comment: "They take time to explain everything and never rush through appointments. Best vet we've ever had.",
          date: "2 months ago",
        },
      ],
    },
    {
      id: 3,
      name: "Bark Park Daycare",
      type: "Daycare",
      image: "/playful-pup-paradise.png",
      rating: 4.7,
      reviewCount: 95,
      distance: "3.1 miles",
      summary:
        "Supervised play in indoor and outdoor areas. Webcam access for owners to check on their pets throughout the day.",
      tags: ["Supervised Play", "Training", "Socialization"],
    },
    {
      id: 4,
      name: "Fetch & Go Walkers",
      type: "Walker",
      image: "/urban-dog-walk.png",
      rating: 4.6,
      reviewCount: 76,
      distance: "0.8 miles",
      summary:
        "Reliable dog walking service with GPS tracking and photo updates. Individual and group walks available.",
      tags: ["GPS Tracking", "Insured", "Flexible Schedule"],
    },
    {
      id: 5,
      name: "Canine Academy",
      type: "Trainer",
      image: "/patient-pupil-practice.png",
      rating: 4.9,
      reviewCount: 152,
      distance: "4.2 miles",
      summary:
        "Positive reinforcement training for all ages and behavior issues. Group classes and private sessions available.",
      tags: ["Behavior", "Obedience", "Puppy Classes"],
    },
  ]

  const filterTypes = [
    { id: "all", label: "All" },
    { id: "Vet", label: "Vets" },
    { id: "Groomer", label: "Groomers" },
    { id: "Daycare", label: "Daycare" },
    { id: "Walker", label: "Walkers" },
    { id: "Trainer", label: "Trainers" },
  ]

  const filteredProviders = serviceProviders.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFilter = activeFilter === "all" || provider.type === activeFilter

    return matchesSearch && matchesFilter
  })

  const toggleExpanded = (id: number) => {
    if (expandedService === id) {
      setExpandedService(null)
    } else {
      setExpandedService(id)
    }
  }

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl text-purple-800 mb-4">Dog Services</h1>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search for services..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {filterTypes.map((filter) => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            className={`rounded-full text-xs px-3 py-1 h-8 ${activeFilter === filter.id ? "bg-purple-600" : ""}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredProviders.map((provider) => {
          // Use null instead of empty string
          const imageSrc = provider.image || null
          const isExpanded = expandedService === provider.id
          const defaultUserAvatar = "/happy-golden-avatar.png"

          return (
            <Card key={provider.id} className="border-none shadow-sm overflow-hidden">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div className="h-20 w-20 rounded-lg overflow-hidden">
                    <img
                      src={imageSrc || defaultServiceImage || null}
                      alt={provider.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-purple-800">{provider.name}</h3>
                          {provider.badges &&
                            provider.badges.map((badge, index) => (
                              <Badge key={index} className="bg-yellow-500 text-white text-xs flex items-center gap-1">
                                <Award className="h-3 w-3" />
                                {badge}
                              </Badge>
                            ))}
                        </div>
                        <Badge variant="outline" className="mt-1 text-xs w-fit">
                          {provider.type}
                        </Badge>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium ml-1">{provider.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({provider.reviewCount})</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" /> {provider.distance}
                    </p>

                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{provider.summary}</p>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {provider.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {(provider.aiReviewSummary || provider.reviews) && (
                      <Button
                        variant="link"
                        onClick={() => toggleExpanded(provider.id)}
                        className="text-purple-600 p-0 h-auto mt-2 text-sm"
                      >
                        {isExpanded ? "Show less" : "Read reviews"}
                      </Button>
                    )}

                    {isExpanded && provider.aiReviewSummary && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        {provider.aiReviewSummary && (
                          <div className="mb-3 bg-blue-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <Avatar className="h-6 w-6 bg-blue-100">
                                <AvatarImage
                                  src="/abstract-ai-network.png"
                                  alt="AI"
                                  onError={(e) => (e.currentTarget.src = "")}
                                />
                                <AvatarFallback className="text-xs text-blue-600">AI</AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-medium text-blue-700">AI Review Summary</span>
                            </div>
                            <p className="text-sm text-gray-700">{provider.aiReviewSummary}</p>
                          </div>
                        )}

                        {provider.reviews && provider.reviews.length > 0 && (
                          <>
                            <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                              <MessageSquare className="h-4 w-4 text-gray-500" />
                              Community Reviews
                            </h4>

                            {provider.reviews.map((review) => (
                              <div
                                key={review.id}
                                className="mb-3 border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage
                                        src={review.userAvatar ? review.userAvatar : defaultUserAvatar}
                                        alt={review.userName}
                                      />
                                      <AvatarFallback>{review.userName[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium">{review.userName}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                    <span className="text-xs ml-1">{review.rating}</span>
                                    <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
