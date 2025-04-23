"use server"

export async function generateDogThought(imageUrl: string, gender: string): Promise<string> {
  try {
    // In a real implementation, this would call an AI service like OpenAI
    // For now, we'll return a predefined thought based on gender

    const maleThoughts = [
      "Why do humans get so excited when I bring back the same ball they just threw away? I'll play along because they seem to enjoy it so much!",
      "I wonder if my human knows I'm actually protecting them from that suspicious mailman who keeps coming to our house.",
      "I've trained my humans perfectly - they think they're in charge, but one puppy-eye look and they give me treats!",
      "Sometimes I pretend not to understand commands just to see the funny faces my human makes when explaining it again.",
      "I don't always bark at nothing. Sometimes I'm warning my humans about invisible threats only I can sense.",
      "The vacuum cleaner is clearly our household's apex predator. I'm just trying to save everyone by barking at it.",
      "My human thinks I'm excited about walks, but really I'm just conducting my daily neighborhood security patrol.",
      "If I spin in circles fast enough before lying down, I'm pretty sure I can alter the space-time continuum.",
      "I think my human doesn't realize I'm actually letting THEM win at tug-of-war. It boosts their confidence.",
      "I've figured out that if I tilt my head just right, I get extra treats. It's a calculated move.",
      "The cat isn't my enemy. We have an agreement - they get the high places, I patrol the floors.",
      "My bed is comfortable, but somehow my human's bed is mysteriously more comfortable. Science can't explain it.",
    ]

    const femaleThoughts = [
      "I've calculated exactly how many tail wags it takes to get an extra treat. The answer is 7, with eye contact.",
      "I don't actually chase my tail because I think I'll catch it. I do it because it makes my humans laugh, and I love that sound.",
      "The vacuum isn't scary because of the noise. It's because it's stealing all the crumbs I was saving for later!",
      "I've memorized the sound of the treat bag opening from three rooms away. My hearing is selective like that.",
      "My human thinks I don't understand what 'bath time' means, but I'm just giving them the joy of a fun chase.",
      "I'm not digging holes in the yard, I'm installing an advanced underground cooling system for summer.",
      "When I tilt my head, humans think it's cute, but I'm actually trying to understand why they talk so much yet say so little.",
      "The cat isn't my enemy. We have an agreement - they handle high places, I handle ground security.",
      "My squeaky toy collection isn't just toys - it's my treasure hoard, and I am the dragon guarding it.",
      "I pretend not to know where the treats are hidden, but I've created a mental map of every food location in this house.",
      "Sometimes I stare at the wall just to make my humans wonder what I'm seeing. Nothing - I just enjoy the confusion.",
      "I'm not sleeping when my humans talk about me - I'm gathering intelligence for future treat negotiations.",
    ]

    // Randomly select a thought based on gender
    const thoughts = gender === "male" ? maleThoughts : femaleThoughts
    const randomIndex = Math.floor(Math.random() * thoughts.length)

    // Simulate API delay for more realistic experience
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return thoughts[randomIndex]
  } catch (error) {
    console.error("Error generating dog thought:", error)
    return "I wonder what my human is thinking right now... probably about treats!"
  }
}
