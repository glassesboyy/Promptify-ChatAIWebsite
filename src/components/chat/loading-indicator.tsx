export function LoadingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[70%] p-4 rounded-lg bg-secondary text-secondary-foreground">
        <div className="text-sm font-medium mb-1">AI Assistant</div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-current rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-current rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
