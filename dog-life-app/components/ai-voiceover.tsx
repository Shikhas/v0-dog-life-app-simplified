"use client"

import { useState, useRef, useEffect } from "react"
import { Upload, Play, Pause, Loader2, Volume2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import { generateDogThought } from "@/app/actions/generate-thought"
import { useToast } from "@/hooks/use-toast"

export default function AiVoiceover() {
  const [step, setStep] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAudioLoading, setIsAudioLoading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState("/happy-golden-pup.png") // Default image
  const [generatedThought, setGeneratedThought] = useState("")
  const [audioProgress, setAudioProgress] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const [dogGender, setDogGender] = useState("male") // Default to male
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [audioReady, setAudioReady] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { toast } = useToast()

  // Default dog image
  const defaultDogImage = "/happy-golden-retriever-puppy.png"

  // Clean up audio resources when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }

      // Clean up any object URLs to prevent memory leaks
      if (audioUrl && audioUrl.startsWith("blob:")) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  const setupAudioElement = (src: string) => {
    if (!src) {
      console.error("Empty audio source provided")
      toast({
        title: "Audio Error",
        description: "Invalid audio source. Please try again.",
        variant: "destructive",
      })
      return false
    }

    try {
      // Clean up previous audio if it exists
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
        audioRef.current.load()
      }

      // Create a new audio element
      audioRef.current = new Audio()

      // Set up event listeners before setting the source
      audioRef.current.onloadedmetadata = () => {
        if (audioRef.current) {
          setAudioDuration(audioRef.current.duration)
          setAudioReady(true)
        }
      }

      audioRef.current.onended = () => {
        setIsPlaying(false)
        setAudioProgress(0)
      }

      audioRef.current.ontimeupdate = () => {
        if (audioRef.current) {
          setAudioProgress((audioRef.current.currentTime / audioRef.current.duration) * 100)
        }
      }

      audioRef.current.onerror = (e) => {
        console.error("Audio error:", e)
        toast({
          title: "Audio Error",
          description: "There was a problem loading the audio. Please try again.",
          variant: "destructive",
        })
        setIsPlaying(false)
        setAudioReady(false)
      }

      // Set the source last
      audioRef.current.src = src
      audioRef.current.load()

      return true
    } catch (error) {
      console.error("Error setting up audio:", error)
      toast({
        title: "Audio Setup Error",
        description: "Could not set up audio playback. Please try again.",
        variant: "destructive",
      })
      return false
    }
  }

  const generateVoice = async (thought: string, gender: string) => {
    setIsAudioLoading(true)
    setAudioReady(false)

    try {
      // Instead of making an API call, use pre-recorded samples based on gender
      const voiceSamples = {
        male: ["/male-retriever-voice.mp3", "/male-pug-voice.mp3", "/dog-voice-sample.mp3"],
        female: ["/female-beagle-voice.mp3", "/female-husky-voice.mp3"],
      }

      // Select a random voice sample based on gender
      const samples = gender === "male" ? voiceSamples.male : voiceSamples.female
      const randomIndex = Math.floor(Math.random() * samples.length)
      const selectedVoice = samples[randomIndex]

      // Simulate API delay for realistic UX
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Set up audio with the selected sample
      if (selectedVoice) {
        const success = setupAudioElement(selectedVoice)

        if (success) {
          toast({
            title: "Voice Generated",
            description: "Your dog's voice has been successfully generated!",
          })
        }
      } else {
        // Fallback to default audio
        setupAudioElement("/dog-voice-sample.mp3")
      }
    } catch (error) {
      console.error("Error generating voice:", error)

      // Fall back to sample audio
      setupAudioElement("/dog-voice-sample.mp3")

      toast({
        title: "Voice Generation Failed",
        description: "Using sample audio instead. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsAudioLoading(false)
    }
  }

  const handleUpload = async () => {
    // Simulate upload
    setIsLoading(true)

    try {
      // Use a set of demo images to cycle through
      const demoImages = ["/happy-golden-pup.png", "/golden-closeup.png", "/playful-beagle.png"]

      const randomImageIndex = Math.floor(Math.random() * demoImages.length)
      const uploadedImageUrl = demoImages[randomImageIndex]
      setUploadedImage(uploadedImageUrl)

      // Randomly select gender for demo purposes
      const gender = Math.random() > 0.5 ? "male" : "female"
      setDogGender(gender)

      // Short delay for more realistic upload simulation
      await new Promise((resolve) => setTimeout(resolve, 600))

      setIsLoading(false)
      setStep(2)

      // Generate dog thought using our server action
      const thought = await generateDogThought(uploadedImageUrl, gender)
      setGeneratedThought(thought)
      setStep(3)

      // Generate voice for the thought
      await generateVoice(thought, gender)
    } catch (error) {
      console.error("Error in upload process:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
      // If we're past step 1, stay there but show error
      if (step > 1) {
        setIsAudioLoading(false)
      }
    }
  }

  const togglePlayback = () => {
    if (!audioRef.current || !audioReady) {
      toast({
        title: "Audio Not Ready",
        description: "Please wait for the audio to load before playing.",
      })
      return
    }

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        // Reset to beginning if ended
        if (audioRef.current.ended) {
          audioRef.current.currentTime = 0
        }

        // Use a promise to handle play() which returns a promise
        const playPromise = audioRef.current.play()

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
            })
            .catch((error) => {
              console.error("Error playing audio:", error)
              toast({
                title: "Playback Error",
                description: "There was a problem playing the audio. This may be due to browser autoplay restrictions.",
                variant: "destructive",
              })
              setIsPlaying(false)
            })
        }
      }
    } catch (error) {
      console.error("Error toggling playback:", error)
      toast({
        title: "Playback Error",
        description: "There was a problem with audio playback. Please try again.",
        variant: "destructive",
      })
      setIsPlaying(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Use null instead of empty string
  const dogImageSrc = uploadedImage || null

  return (
    <Card className="border-none shadow-sm bg-gradient-to-r from-blue-50 to-purple-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-center text-purple-800">AI Dog Voiceover</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {step === 1 && (
            <div className="text-center">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 bg-white">
                <div className="flex flex-col items-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload a photo of your dog</p>
                  <Button onClick={handleUpload} disabled={isLoading} className="bg-purple-600 hover:bg-purple-700">
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      "Upload Photo"
                    )}
                  </Button>
                </div>
              </div>
              <p className="text-xs text-gray-500">We'll generate a funny thought and voice for your pup!</p>
            </div>
          )}

          {step >= 2 && (
            <div className="w-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden">
                  {uploadedImage && (
                    <Image
                      src={uploadedImage && uploadedImage !== "" ? uploadedImage : "/placeholder.svg"}
                      alt="Dog"
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  )}
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 border border-gray-200">
                    {dogGender === "male" ? (
                      <span className="text-blue-500 text-sm">♂️</span>
                    ) : (
                      <span className="text-pink-500 text-sm">♀️</span>
                    )}
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                  {step === 2 ? (
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 mr-2 animate-spin text-purple-600" />
                      <p className="text-sm text-gray-600">Generating dog thoughts...</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-700">{generatedThought}</p>
                  )}
                </div>
              </div>

              {step === 3 && (
                <div className="flex flex-col items-center">
                  {isAudioLoading ? (
                    <div className="flex items-center gap-2 py-2">
                      <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                      <p className="text-sm text-gray-600">Generating voice...</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-full mb-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>
                            <Volume2 className="h-3 w-3 inline mr-1" />
                            {dogGender === "male" ? "Male" : "Female"} Dog Voice
                          </span>
                          <span>
                            {formatTime((audioProgress * audioDuration) / 100)} / {formatTime(audioDuration)}
                          </span>
                        </div>
                        <Progress value={audioProgress} className="h-1.5" />
                      </div>
                      <Button
                        onClick={togglePlayback}
                        variant="outline"
                        className={`rounded-full h-12 w-12 p-0 border-purple-300 ${isPlaying ? "bg-purple-100" : ""}`}
                        disabled={!audioReady}
                      >
                        {isPlaying ? (
                          <Pause className="h-6 w-6 text-purple-700" />
                        ) : (
                          <Play className="h-6 w-6 text-purple-700 ml-0.5" />
                        )}
                      </Button>
                      {!audioReady && <p className="text-xs text-gray-500 mt-2">Loading audio...</p>}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
