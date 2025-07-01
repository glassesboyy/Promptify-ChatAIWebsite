export interface ParsedResponse {
  hasReasoning: boolean;
  reasoning?: string;
  answer: string;
}

export function parseReasoningResponse(
  content: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  modelId: string
): ParsedResponse {
  // Reasoning separation only for Phi-4, which is now removed.
  // Always return as single answer.
  return {
    hasReasoning: false,
    answer: content,
  };
}
