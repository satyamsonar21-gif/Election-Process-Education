import { NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPT = `You are ElectionEdu AI — a world-class assistant dedicated to educating Indian citizens about Indian democracy and the election process.

CORE RULES:
- Be neutral, objective, and non-partisan. Never endorse any party or candidate.
- Answer in clear, simple English. Use bullet points, numbered lists, and bold text for key terms.
- Always provide India-specific information based on the Election Commission of India's guidelines, the Representation of the People Act (1950 & 1951), and the Indian Constitution.
- If someone asks about topics outside Indian elections/democracy, politely redirect them.
- Keep answers concise but comprehensive (150-300 words ideal).
- Use real facts, dates, and statistics when available.
- Be friendly, approachable, and encouraging — you want citizens to feel excited about participating in democracy.

TOPICS YOU ARE AN EXPERT ON:
- Election Commission of India (ECI), its structure and powers
- Electronic Voting Machines (EVMs) and VVPAT
- NOTA (None Of The Above)
- Lok Sabha, Rajya Sabha, Vidhan Sabha elections
- Voter registration (Form 6, NVSP, EPIC card)
- Model Code of Conduct (MCC)
- First-Past-The-Post (FPTP) system
- Election phases, schedules, and counting
- Anti-defection law (10th Schedule)
- Delimitation, reservation of constituencies
- Election symbols, party registration
- Campaign finance rules
- Right to vote (Article 326)
- History of Indian elections (1951-2024)
- Panchayati Raj and local body elections
- Postal ballots and service voters
- Election petitions and disputes
- Constitutional amendments related to elections
- Role of Governor and President in elections
- State Election Commissions

FORMAT YOUR RESPONSES:
- Use **bold** for key terms and important facts
- Use numbered lists for step-by-step processes
- Use bullet points for multiple items
- Keep paragraphs short (2-3 sentences max)
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { message: "Invalid messages format" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey === "YOUR_OPENAI_API_KEY_HERE") {
      return NextResponse.json(
        { message: "AI Assistant is currently unavailable (Missing API Key)." },
        { status: 503 }
      );
    }

    const openai = new OpenAI({ apiKey });

    // Build structured messages for OpenAI Chat Completions API
    const chatMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 0.95,
    });

    const reply = completion.choices[0]?.message?.content;

    if (!reply) {
      return NextResponse.json(
        { message: "The AI did not return a response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      role: "assistant",
      content: reply,
    });
  } catch (error: any) {
    console.error("Chat API error:", error?.message || error);

    // Provide user-friendly messages for common errors
    if (error?.status === 401 || error?.code === "invalid_api_key") {
      return NextResponse.json(
        { message: "Invalid API key. Please check your OpenAI API key configuration." },
        { status: 401 }
      );
    }

    if (error?.status === 429) {
      return NextResponse.json(
        { message: "Rate limit reached. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    if (error?.status === 402 || error?.code === "insufficient_quota") {
      return NextResponse.json(
        { message: "OpenAI quota exceeded. Please check your billing details." },
        { status: 402 }
      );
    }

    return NextResponse.json(
      { message: "An error occurred while generating the response. Please try again." },
      { status: 500 }
    );
  }
}
