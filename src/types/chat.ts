export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
  provider: string;
  apiKey: string;
  isFree: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  modelId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  modelId?: string;
}

export interface ChatCompletionResponse {
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
}
