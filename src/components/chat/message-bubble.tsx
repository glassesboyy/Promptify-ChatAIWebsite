import { Message } from "@/types/chat";
import { HiUser } from "react-icons/hi2";

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
            <HiUser className="w-4 h-4 text-white" />
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
            <HiUser className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
    </div>
  );
}
