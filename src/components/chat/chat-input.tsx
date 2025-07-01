"use client";

import { useRef, useState } from "react";
import { HiPaperAirplane } from "react-icons/hi2";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function ChatInput({
  onSendMessage,
  isLoading,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  disabled = false,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
      // Reset height after sending
      if (containerRef.current && textareaRef.current) {
        containerRef.current.style.height = "56px";
        textareaRef.current.style.height = "32px";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    const textarea = textareaRef.current;
    const container = containerRef.current;

    if (textarea && container) {
      textarea.style.height = "32px";
      container.style.height = "56px";

      const scrollHeight = textarea.scrollHeight;
      const minHeight = 32;
      const maxHeight = 120;

      const newTextareaHeight = Math.min(
        Math.max(scrollHeight, minHeight),
        maxHeight
      );
      const newContainerHeight = newTextareaHeight + 24;

      textarea.style.height = newTextareaHeight + "px";
      container.style.height = newContainerHeight + "px";
    }
  };

  return (
    <div className="border-t border-border bg-card/50 backdrop-blur-sm p-4 sm:p-6">
      <form onSubmit={handleSubmit} className="max-w-chat mx-auto">
        <div
          ref={containerRef}
          className="relative flex min-h-[56px] border border-input rounded-xl bg-background focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all duration-200"
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
            disabled={isLoading}
            rows={1}
            className="flex-1 px-4 py-3 pr-20 sm:pr-16 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50 resize-none transition-all duration-200 overflow-hidden"
            style={{
              lineHeight: "1.5",
              height: "38px",
            }}
          />

          {/* Character count indicator */}
          <div className="absolute bottom-2 right-16 sm:right-16 text-xs text-muted-foreground hidden sm:block">
            {input.length}
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center group flex-shrink-0"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <HiPaperAirplane className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform duration-200" />
            )}
          </button>
        </div>

        {/* Quick actions */}
        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
          <div className="flex gap-4 min-w-0 flex-1">
            <span className="hidden sm:inline">
              Tip: Use Shift+Enter for new lines
            </span>
            <span className="sm:hidden">Tip: Shift+Enter for new lines</span>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                isLoading
                  ? "bg-warning/20 text-warning"
                  : "bg-success/20 text-success"
              }`}
            >
              {isLoading ? "Thinking..." : "Ready"}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
