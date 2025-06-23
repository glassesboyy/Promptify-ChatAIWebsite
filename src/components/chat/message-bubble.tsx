"use client";

import { CopyButton } from "@/components/ui/copy-button";
import { parseReasoningResponse } from "@/lib/reasoning-parser";
import { formatTextWithBold, sanitizeHtml } from "@/lib/text-formatter";
import { Message } from "@/types/chat";
import { useEffect, useState } from "react";
import { HiCog6Tooth, HiEye, HiEyeSlash, HiUser } from "react-icons/hi2";

interface MessageBubbleProps {
  message: Message;
  modelId?: string;
}

export function MessageBubble({ message, modelId = "" }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const [mounted, setMounted] = useState(false);
  const [showReasoning, setShowReasoning] = useState(false);

  // Parse reasoning only for AI responses
  const parsedResponse = !isUser
    ? parseReasoningResponse(message.content, modelId)
    : { hasReasoning: false, answer: message.content };

  // Format the content
  const formattedAnswer = isUser
    ? parsedResponse.answer
    : sanitizeHtml(formatTextWithBold(parsedResponse.answer));

  const formattedReasoning = parsedResponse.reasoning
    ? sanitizeHtml(formatTextWithBold(parsedResponse.reasoning))
    : "";

  useEffect(() => {
    setMounted(true);

    // Add event listeners for copy buttons in code blocks
    if (!isUser && mounted) {
      const copyButtons = document.querySelectorAll(".copy-code-btn");

      const handleCopyCode = async (event: Event) => {
        const button = event.currentTarget as HTMLButtonElement;
        const encodedCode = button.getAttribute("data-code");
        if (encodedCode) {
          const code = decodeURIComponent(encodedCode);
          try {
            await navigator.clipboard.writeText(code);
            const originalContent = button.innerHTML;
            button.innerHTML = `
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="flex-shrink-0 text-green-400">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
              <span class="leading-none text-green-400">Copied!</span>
            `;
            button.classList.remove(
              "bg-gray-800",
              "hover:bg-gray-700",
              "text-gray-200",
              "border-gray-600"
            );
            button.classList.add(
              "bg-green-800",
              "text-green-200",
              "border-green-600"
            );

            setTimeout(() => {
              button.innerHTML = originalContent;
              button.classList.remove(
                "bg-green-800",
                "text-green-200",
                "border-green-600"
              );
              button.classList.add(
                "bg-gray-800",
                "hover:bg-gray-700",
                "text-gray-200",
                "border-gray-600"
              );
            }, 2000);
          } catch (err) {
            console.error("Failed to copy code: ", err);
          }
        }
      };

      copyButtons.forEach((button) => {
        button.addEventListener("click", handleCopyCode);
      });

      // Cleanup
      return () => {
        copyButtons.forEach((button) => {
          button.removeEventListener("click", handleCopyCode);
        });
      };
    }
  }, [isUser, mounted, formattedAnswer, formattedReasoning]);

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-6 animate-fade-in w-full`}
    >
      <div
        className={`flex items-start gap-3 w-full ${
          isUser
            ? "max-w-[85%] sm:max-w-[75%] lg:max-w-[65%]"
            : "max-w-[95%] sm-max-w-[85%] lg:max-w-[75%]"
        }`}
      >
        {!isUser && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <HiUser className="w-4 h-4 text-white" />
          </div>
        )}

        <div className={`flex-1 min-w-0 ${isUser ? "order-1" : ""}`}>
          {/* Show reasoning toggle for AI responses with reasoning */}
          {!isUser && parsedResponse.hasReasoning && (
            <div className="mb-2">
              <button
                onClick={() => setShowReasoning(!showReasoning)}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-info/10 hover:bg-info/20 text-info border border-info/30 rounded-lg transition-colors duration-200"
              >
                <HiCog6Tooth className="w-3 h-3" />
                {showReasoning ? (
                  <>
                    <HiEyeSlash className="w-3 h-3" />
                    Hide Reasoning
                  </>
                ) : (
                  <>
                    <HiEye className="w-3 h-3" />
                    Show Reasoning
                  </>
                )}
              </button>
            </div>
          )}

          {/* Reasoning section */}
          {!isUser && parsedResponse.hasReasoning && showReasoning && (
            <div className="mb-3 p-3 rounded-xl bg-info/5 border border-info/20">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-medium text-info flex items-center gap-1">
                  <HiCog6Tooth className="w-3 h-3" />
                  AI Reasoning Process
                </div>
                <CopyButton
                  text={parsedResponse.reasoning || ""}
                  className="opacity-60 hover:opacity-100 flex-shrink-0"
                />
              </div>
              <div
                className="text-sm text-muted-foreground formatted-content overflow-hidden"
                dangerouslySetInnerHTML={{ __html: formattedReasoning }}
              />
            </div>
          )}

          {/* Main answer */}
          <div
            className={`p-4 rounded-2xl message-shadow transition-all duration-200 break-words ${
              isUser
                ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-tr-md"
                : "bg-card text-card-foreground border border-border rounded-tl-md"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className={`text-lg font-bold ${isUser ? "" : "text-primary"}`}
              >
                {isUser ? "You" : "AI Assistant"}
              </div>
              {!isUser && (
                <CopyButton
                  text={parsedResponse.answer}
                  className="opacity-60 hover:opacity-100 flex-shrink-0"
                />
              )}
            </div>

            <div className="break-words leading-relaxed overflow-hidden">
              {isUser ? (
                <div className="whitespace-pre-wrap word-break">
                  {parsedResponse.answer}
                </div>
              ) : (
                <div
                  className="formatted-content overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: formattedAnswer }}
                />
              )}
            </div>
            <div className={`text-xs mt-3 opacity-60 text-right flex-shrink-0`}>
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>

        {isUser && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center order-2">
            <HiUser className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
    </div>
  );
}
