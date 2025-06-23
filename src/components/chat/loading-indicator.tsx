import { HiUser } from "react-icons/hi2";

export function LoadingIndicator() {
  return (
    <div className="flex justify-start mb-6 animate-fade-in">
      <div className="flex items-start gap-3 max-w-[80%]">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <HiUser className="w-4 h-4 text-white" />
        </div>
        <div className="p-4 rounded-2xl message-shadow bg-card text-card-foreground border border-border rounded-tl-md">
          <div className="text-xs font-medium mb-2 opacity-70 text-primary">
            Promptify AI Assistant
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
              <div
                className="w-1 h-1 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-1 h-1 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <span className="text-sm text-muted-foreground">
              AI is thinking...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
