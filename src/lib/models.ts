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
    id: "phi-4-reasoning-plus",
    name: "Microsoft Phi-4 Reasoning Plus",
    description:
      "Microsoft's advanced reasoning model with enhanced logical thinking",
    provider: "microsoft/phi-4-reasoning-plus:free",
    apiKey: process.env.PHI_4_API_KEY || "",
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
  {
    id: "llama-3.3-8b-instruct",
    name: "Llama 3.3 8B Instruct",
    description:
      "Meta's instruction-tuned model with excellent following capabilities",
    provider: "meta-llama/llama-3.3-8b-instruct:free",
    apiKey: process.env.LLAMA_3_3_API_KEY || "",
    isFree: true,
  },
];

export function getModelById(modelId: string): AIModel | undefined {
  return AVAILABLE_MODELS.find((model) => model.id === modelId);
}

export function getDefaultModel(): AIModel {
  return AVAILABLE_MODELS[0];
}
