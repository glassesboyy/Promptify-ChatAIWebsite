import { NextRequest, NextResponse } from "next/server";
import { sendMessage } from "@/lib/openrouter";
import type { ChatMessage } from "@/types/chat";

export async function POST(request: NextRequest) {
  try {
    const { messages }: { messages: ChatMessage[] } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const response = await sendMessage(messages);

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
