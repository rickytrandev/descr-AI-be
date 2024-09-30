import { NextRequest, NextResponse } from "next/server"
import { OpenAI } from "openai"
import dotenv from "dotenv"
import sharp from "sharp"

// Load environment variables from .env file
dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Function to validate Base64 string
function isValidBase64(base64: string): boolean {
  const base64Regex = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
  return base64Regex.test(base64);
}

// Function to compress image
async function compressImage(base64: string): Promise<string> {
  const buffer = Buffer.from(base64, 'base64'); // Convert Base64 to buffer (binary data)
  const compressedBuffer = await sharp(buffer)
    .resize({ width: 800 }) // Resize to a maximum width of 800px
    .jpeg({ quality: 80 }) // Compress to 80% quality
    .toBuffer(); // Convert back to buffer
  return compressedBuffer.toString('base64'); // Convert buffer back to Base64 string
}

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, title, brand, keywords } = await req.json()

    if (!imageBase64) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 })
    }
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const base64Data = imageBase64.split(',')[1] 

    if (!isValidBase64(base64Data)) {
      return NextResponse.json({error: "Invalid Base64 image format"}, {status: 400})
    }

    const compressedImageBase64 = await compressImage(base64Data)

    const prompt = `You are an AI content writer that utilizes images given and brand descriptions to create rich product descriptions and marketing content for e-commerce. The title of the product is "${title}", the brand is "${brand}", and the SEO keywords are "${keywords}". Please provide 3 different product descriptions for me to pick from. Please return the response as a JSON array where each element is an object containing a description of the product. Example format: [{ "title": "Title 1", "description": "Description 1" }, { "title": "Title 2", "description": "Description 2" }, { "title": "Title 3", "description": "Description 3" }].`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${compressedImageBase64}`,              },
            },
          ],
        },
      ],
    })

    let response = completion.choices?.[0]?.message?.content

    if (!response) {
      throw new Error("No response from OpenAI")
    }

    response = response.replace(/```json|```/g, "").trim()

    try {
      const jsonResponse = JSON.parse(response) // Validate JSON
      return NextResponse.json(jsonResponse)
    } catch (error) {
      console.error("Invalid JSON response:", response)
      throw new Error("Invalid JSON response")
    }
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      { error: `Error processing request: ${error}` },
      { status: 500 }
    )
  }
}
