import { Cloud, Sun, CloudRain, Wind } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface WeatherAlertProps {
  condition: "sunny" | "cloudy" | "rainy" | "windy"
  temperature: number
  recommendation: string
}

export default function WeatherAlert({ condition, temperature, recommendation }: WeatherAlertProps) {
  const getWeatherIcon = () => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      case "windy":
        return <Wind className="h-8 w-8 text-teal-500" />
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />
    }
  }

  const getBackgroundColor = () => {
    switch (condition) {
      case "sunny":
        return "from-yellow-50 to-orange-50"
      case "cloudy":
        return "from-gray-50 to-blue-50"
      case "rainy":
        return "from-blue-50 to-indigo-50"
      case "windy":
        return "from-teal-50 to-green-50"
      default:
        return "from-yellow-50 to-orange-50"
    }
  }

  return (
    <Card className={`border-none shadow-sm bg-gradient-to-r ${getBackgroundColor()}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getWeatherIcon()}
            <div>
              <h3 className="font-medium text-gray-800">Walk Weather</h3>
              <p className="text-sm text-gray-600">
                {condition.charAt(0).toUpperCase() + condition.slice(1)}, {temperature}°F
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 max-w-[60%]">
            <p className="text-xs text-gray-700">{recommendation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
