import Image from "next/image"
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface Post {
  id: number
  username: string
  avatar: string
  image: string
  caption: string
  likes: number
  comments: number
  timeAgo: string
}

interface SocialFeedProps {
  posts: Post[]
}

export default function SocialFeed({ posts }: SocialFeedProps) {
  // Default fallback images
  const defaultAvatar = "/happy-golden-avatar.png"
  const defaultPostImage = "/park-playtime.png"

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-lg text-purple-800 px-1">Pawsome Feed</h2>
      {posts.map((post) => {
        // Use null instead of empty string
        const avatarSrc = post.avatar || null
        const postImageSrc = post.image || null

        return (
          <Card key={post.id} className="border-none shadow-sm overflow-hidden">
            <CardHeader className="p-3 pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border border-purple-200">
                    <AvatarImage src={avatarSrc && avatarSrc !== "" ? avatarSrc : defaultAvatar} alt={post.username} />
                    <AvatarFallback>{post.username[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{post.username}</p>
                    <p className="text-xs text-gray-500">{post.timeAgo}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 mt-3">
              <div className="relative aspect-square w-full bg-gray-100">
                <Image
                  src={postImageSrc && postImageSrc !== "" ? postImageSrc : defaultPostImage}
                  alt={`${post.username}'s post`}
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                />
              </div>
            </CardContent>
            <CardFooter className="p-3 flex flex-col items-start">
              <div className="flex items-center gap-4 mb-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Heart className="h-5 w-5 text-gray-700" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MessageCircle className="h-5 w-5 text-gray-700" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Share2 className="h-5 w-5 text-gray-700" />
                </Button>
              </div>
              <p className="text-sm font-medium">{post.likes} likes</p>
              <p className="text-sm">
                <span className="font-medium">{post.username}</span> {post.caption}
              </p>
              <p className="text-xs text-gray-500 mt-1">View all {post.comments} comments</p>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
