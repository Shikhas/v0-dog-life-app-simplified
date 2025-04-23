"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Brain, Heart, Compass, PawPrintIcon as Paw } from "lucide-react"

export default function BottomNavigation() {
  const pathname = usePathname()

  const tabs = [
    {
      name: "Home",
      href: "/",
      icon: <Paw className="h-6 w-6" />,
    },
    {
      name: "Ask AI",
      href: "/ask-ai",
      icon: <Brain className="h-6 w-6" />,
    },
    {
      name: "Health",
      href: "/health",
      icon: <Heart className="h-6 w-6" />,
    },
    {
      name: "Services",
      href: "/services",
      icon: <Compass className="h-6 w-6" />,
    },
    {
      name: "Match",
      href: "/match",
      icon: <Paw className="h-6 w-6 rotate-45" />,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto bg-white border-t border-gray-200 shadow-lg rounded-t-xl">
        <div className="flex justify-between">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`flex flex-col items-center justify-center flex-1 py-2 ${
                  isActive ? "text-purple-600" : "text-gray-500 hover:text-purple-500"
                }`}
              >
                {tab.icon}
                <span className="text-xs mt-1">{tab.name}</span>
                {isActive && <span className="absolute bottom-0 h-1 w-8 bg-purple-600 rounded-t-full" />}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
