import { Message } from "@/types/chat";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-6 animate-fade-in`}
    >
      <div className="flex items-start gap-3 max-w-[80%]">
        {!isUser && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}

        <div
          className={`p-4 rounded-2xl message-shadow transition-all duration-200 ${
            isUser
              ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-br-md"
              : "bg-card text-card-foreground border border-border rounded-bl-md"
          }`}
        >
          <div
            className={`text-xs font-medium mb-2 opacity-70 ${
              isUser ? "" : "text-primary"
            }`}
          >
            {isUser ? "You" : "AI Assistant"}
          </div>
          <div className="whitespace-pre-wrap break-words leading-relaxed">
            {message.content}
          </div>
          <div className={`text-xs mt-3 opacity-60 text-right`}>
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        {isUser && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
