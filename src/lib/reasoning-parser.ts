export interface ParsedResponse {
  hasReasoning: boolean;
  reasoning?: string;
  answer: string;
}

export function parseReasoningResponse(
  content: string,
  modelId: string
): ParsedResponse {
  // Only process reasoning for Phi-4 model
  if (!modelId.includes("phi-4")) {
    return {
      hasReasoning: false,
      answer: content,
    };
  }

  // Look for patterns that indicate reasoning vs final answer
  const reasoningPatterns = [
    /^([\s\S]*?)((?:Berikut adalah|Here is|The answer is|Final answer:|Jawaban:)[\s\S]*?)$/,
    /^([\s\S]*?)((?:^|\n)(?:Jadi|So|Therefore|Kesimpulannya|In conclusion)[\s\S]*?)$/,
  ];

  // Try to detect if content has reasoning structure
  for (const pattern of reasoningPatterns) {
    const match = content.match(pattern);
    if (match && match[1] && match[2]) {
      const reasoning = match[1].trim();
      const answer = match[2].trim();

      // Only separate if reasoning is substantial (more than 100 characters)
      if (reasoning.length > 100) {
        return {
          hasReasoning: true,
          reasoning: reasoning,
          answer: answer,
        };
      }
    }
  }

  // Fallback: Try to detect reasoning by looking for thinking patterns
  const thinkingIndicators = [
    "User states:",
    "I need to",
    "Let me think",
    "Plan:",
    "I determine",
    "I must",
    "I'll produce",
    "Now I",
    "Wait, but",
    "Better outline",
    "I produce",
  ];

  const lines = content.split("\n");
  let reasoningEndIndex = -1;
  let hasThinkingPattern = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check if line contains thinking indicators
    if (thinkingIndicators.some((indicator) => line.includes(indicator))) {
      hasThinkingPattern = true;
    }

    // Look for transition to actual answer
    if (
      hasThinkingPattern &&
      (line.startsWith("Berikut adalah") ||
        line.startsWith("Here is") ||
        line.includes("Peran Teknologi untuk Generasi Muda") ||
        line.match(/^[A-Z][^.]*:$/)) // Title pattern
    ) {
      reasoningEndIndex = i;
      break;
    }
  }

  if (reasoningEndIndex > 0 && hasThinkingPattern) {
    const reasoning = lines.slice(0, reasoningEndIndex).join("\n").trim();
    const answer = lines.slice(reasoningEndIndex).join("\n").trim();

    if (reasoning.length > 50 && answer.length > 50) {
      return {
        hasReasoning: true,
        reasoning: reasoning,
        answer: answer,
      };
    }
  }

  // If no clear separation found, return as single answer
  return {
    hasReasoning: false,
    answer: content,
  };
}
