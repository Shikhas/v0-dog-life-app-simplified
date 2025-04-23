import Image from "next/image"
import PupsonaSection from "@/components/pupsona-section"
import AiVoiceover from "@/components/ai-voiceover"
import WeatherAlert from "@/components/weather-alert"
import SocialFeed from "@/components/social-feed"
import NotificationBell from "@/components/notification-bell"

export default function Home() {
  // Define all image paths with strict checks
  const pawLogoPath = "/purple-paw-impression.png"
  const goldenAvatarPath = "/golden-closeup.png"

  // Define posts with proper image paths
  const posts = [
    {
      id: 1,
      username: "max_the_retriever",
      avatar: "/happy-golden-avatar.png",
      image: "/park-playtime.png",
      caption: "Best day ever at the park! 🐾 #doglife #weekendvibes",
      likes: 128,
      comments: 24,
      timeAgo: "2 hours ago",
    },
    {
      id: 2,
      username: "bella_paws",
      avatar: "/happy-beagle-avatar.png",
      image: "/playful-beagle.png",
      caption: "New toy day is the best day! 🧸 #spoiled #dogtoys",
      likes: 95,
      comments: 12,
      timeAgo: "5 hours ago",
    },
    {
      id: 3,
      username: "cooper_the_pug",
      avatar: "/happy-pug-portrait.png",
      image: "/dog-sleeping.png",
      caption: "Monday mood... 😴 #naptime #puglife",
      likes: 203,
      comments: 31,
      timeAgo: "1 day ago",
    },
    {
      id: 4,
      username: "luna_husky",
      avatar: "/playful-husky-profile.png",
      image: "/dog-snow.png",
      caption: "Snow day is the best day! ❄️ #winterfun #husky",
      likes: 156,
      comments: 18,
      timeAgo: "3 hours ago",
    },
  ]

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src={pawLogoPath && pawLogoPath !== "" ? pawLogoPath : "/placeholder.svg"}
            alt="Dog Life"
            width={32}
            height={32}
            priority
          />
          <h1 className="font-bold text-xl text-purple-800">Dog Life</h1>
        </div>
        <NotificationBell />
      </div>

      {/* Main Content */}
      <div className="px-4 py-4 space-y-4">
        {/* Pupsona Section */}
        <PupsonaSection
          name="Buddy"
          avatar={goldenAvatarPath && goldenAvatarPath !== "" ? goldenAvatarPath : null}
          diaryEntry="Today I dreamed I caught that squirrel that's always taunting me from the oak tree. Victory was delicious! 🐿️"
          gender="male"
        />

        {/* AI Voiceover Feature */}
        <AiVoiceover />

        {/* Weather Alert */}
        <WeatherAlert
          condition="sunny"
          temperature={72}
          recommendation="Perfect weather for a long walk! Don't forget water and sun protection for your pup."
        />

        {/* Social Feed */}
        <SocialFeed
          posts={posts.map((post) => ({
            ...post,
            avatar: post.avatar && post.avatar !== "" ? post.avatar : null,
            image: post.image && post.image !== "" ? post.image : null,
          }))}
        />
      </div>
    </div>
  )
}
