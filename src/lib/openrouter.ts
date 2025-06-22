import type { ChatMessage } from "@/types/chat";
import { getModelById, getDefaultModel } from "./models";
import OpenAI from "openai";

export async function sendMessage(
  messages: ChatMessage[],
  modelId?: string
): Promise<string> {
  try {
    const selectedModel = modelId ? getModelById(modelId) : getDefaultModel();

    if (!selectedModel) {
      throw new Error("Invalid model selected");
    }

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: selectedModel.apiKey,
      defaultHeaders: {
        "HTTP-Referer":
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": process.env.NEXT_PUBLIC_SITE_NAME || "Promptify Chat AI",
      },
    });

    const completion = await openai.chat.completions.create({
      model: selectedModel.provider,
      messages:
        messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
    });

    return (
      completion.choices[0]?.message?.content ||
      "Sorry, I couldn't generate a response."
    );
  } catch (error) {
    console.error("OpenRouter API Error:", error);
    throw new Error("Failed to get response from AI. Please try again.");
  }
}
