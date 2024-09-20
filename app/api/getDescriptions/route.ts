import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Log the API key
// console.log('OpenAI API Key:', process.env.OPENAI_API_KEY);
// console.log('hello there')

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function POST(request:Request) {
  try {
    const {image, }
  }
  
}


