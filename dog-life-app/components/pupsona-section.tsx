import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface PupsonaProps {
  name: string
  avatar: string
  diaryEntry: string
  gender: string
}

export default function PupsonaSection({ name, avatar, diaryEntry, gender }: PupsonaProps) {
  // Default fallback image
  const defaultAvatar = "/golden-closeup.png"

  // Use ternary operator to handle empty strings
  const imageSource = avatar || defaultAvatar

  return (
    <Card className="border-none shadow-sm bg-gradient-to-r from-purple-50 to-blue-50">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-purple-300">
              <Image
                src={imageSource && imageSource !== "" ? imageSource : "/placeholder.svg"}
                alt={name}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 border border-gray-200">
              {gender === "male" ? (
                <span className="text-blue-500 text-lg">♂️</span>
              ) : (
                <span className="text-pink-500 text-lg">♀️</span>
              )}
            </div>
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-lg text-purple-800">{name}</h2>
            <div className="bg-white rounded-lg p-2 mt-1 shadow-sm border border-gray-100">
              <p className="text-sm italic text-gray-700">
                <span className="font-medium text-purple-600">Dream Diary: </span>
                {diaryEntry}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
