import { NextRequest, NextResponse } from "next/server"
import { OpenAI } from "openai"
import dotenv from "dotenv"

// Load environment variables from .env file
dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {

    const { imageBase64, title, brand, keywords } = await req.json()

    if (!imageBase64) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 })
    }
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }


    const prompt = `You are an AI content writer that utilizes images and brand descriptions to create rich product descriptions and marketing content for e-commerce. Here is an image in base64 format: ${imageBase64}. The title of the product is "${title}", the brand is "${brand}", and the SEO keywords are "${keywords}". Please provide 3 different product descriptions for me to pick from. Please return the response as a JSON array where each element is an object containing a description of the product. Example format: [{ "title": "Title 1", "description": "Description 1" }, { "title": "Title 2", "description": "Description 2" }, { "title": "Title 3", "description": "Description 3" }].`

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
                url: imageBase64,
              },
            },
          ],
        },
      ],
    });

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
