import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { text, gender } = await request.json()

    // Return a mock response pointing to demo audio files
    return NextResponse.json({
      message: "This endpoint is now in demo mode. Using pre-recorded samples instead.",
      sampleUrl: gender === "male" ? "/male-retriever-voice.mp3" : "/female-beagle-voice.mp3",
    })

    /* Original implementation kept for reference
    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    // Check if API key exists
    const apiKey = process.env.ELEVENLABS_API_KEY
    if (!apiKey || apiKey === "your_elevenlabs_api_key_here") {
      console.warn("ElevenLabs API key is missing or using placeholder value")
      return NextResponse.json({ error: "API key not configured", type: "api_key_missing" }, { status: 401 })
    }

    // Select voice based on gender
    // Male voices: "Thomas" (deeper) or "Antoni" (playful)
    // Female voices: "Rachel" (warm) or "Elli" (friendly)
    const voiceId = gender === "male" ? "pNInz6obpgDQGcFmaJgB" : "MF3mGyEYCl7XYWbV9V6O" // Antoni or Elli

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.35, // Slightly more expressive
          use_speaker_boost: true,
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("ElevenLabs API error:", errorData)

      // Check for specific error types
      if (
        response.status === 401 ||
        response.status === 403 ||
        (errorData.detail && errorData.detail.status === "invalid_api_key")
      ) {
        return NextResponse.json(
          {
            error: "Invalid API key",
            type: "invalid_api_key",
            details: "Please check your ElevenLabs API key configuration.",
          },
          { status: 401 },
        )
      }

      return NextResponse.json(
        {
          error: "Failed to generate speech",
          details: errorData,
        },
        { status: response.status },
      )
    }

    // Get the audio data as an ArrayBuffer
    const audioData = await response.arrayBuffer()

    // Return the audio data with the appropriate content type
    return new NextResponse(audioData, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    })
    */
  } catch (error) {
    console.error("Error generating speech:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
