import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  const apiKey = process.env.GEMINI_API_KEY; // Store your key in .env.local
  const geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey;

  const geminiRes = await fetch(geminiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    }),
  });

  if (!geminiRes.ok) {
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }

  const data = await geminiRes.json();
  // Extract the generated text (adjust as per Gemini's response structure)
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No content generated.';

  return NextResponse.json({ text });
}
