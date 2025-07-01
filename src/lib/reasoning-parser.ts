export interface ParsedResponse {
  hasReasoning: boolean;
  reasoning?: string;
  answer: string;
}

export function parseReasoningResponse(
  content: string,
  modelId: string
): ParsedResponse {
  // Reasoning separation only for Phi-4, which is now removed.
  // Always return as single answer.
  return {
    hasReasoning: false,
    answer: content,
  };
}
