import type { AIModel } from "@/types/chat";

export const AVAILABLE_MODELS: AIModel[] = [
  {
    id: "deepseek-chat-v3",
    name: "DeepSeek Chat V3",
    description:
      "Advanced conversational AI model with excellent reasoning capabilities",
    provider: "deepseek/deepseek-chat-v3-0324:free",
    apiKey: process.env.DEEPSEEK_CHAT_V3_API_KEY || "",
    isFree: true,
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    description:
      "Latest reasoning model with enhanced problem-solving abilities",
    provider: "deepseek/deepseek-r1-0528:free",
    apiKey: process.env.DEEPSEEK_R1_API_KEY || "",
    isFree: true,
  },
  {
    id: "qwen3-235b-a22b",
    name: "Qwen3 235B A22B",
    description:
      "Large-scale language model with exceptional performance and understanding",
    provider: "qwen/qwen3-235b-a22b:free",
    apiKey: process.env.QWEN3_API_KEY || "",
    isFree: true,
  },
];

export function getModelById(modelId: string): AIModel | undefined {
  return AVAILABLE_MODELS.find((model) => model.id === modelId);
}

export function getDefaultModel(): AIModel {
  return AVAILABLE_MODELS[0];
}
