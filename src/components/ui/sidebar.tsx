"use client";

import { useChatSessions } from "@/hooks/use-chat-sessions";
import { HiPlus, HiXMark } from "react-icons/hi2";
import { ModelSelector } from "./model-selector";
import { ThemeToggle } from "./theme-toggle";

interface SidebarProps {
  onNewChat?: () => void;
  selectedModelId: string;
  onModelChange: (modelId: string) => void;
}

export function Sidebar({
  onNewChat,
  selectedModelId,
  onModelChange,
}: SidebarProps) {
  const {
    sessions,
    currentSessionId,
    createSession,
    deleteSession,
    switchToSession,
  } = useChatSessions();

  const handleNewChat = () => {
    createSession(selectedModelId);
    onNewChat?.();
  };

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteSession(sessionId);
  };

  const handleSwitchSession = (sessionId: string) => {
    switchToSession(sessionId);
    // Optionally trigger a refresh or navigation
    onNewChat?.();
  };

  const formatTimestamp = (date: Date | string) => {
    const now = new Date();
    const sessionDate = date instanceof Date ? date : new Date(date);
    const diffMs = now.getTime() - sessionDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return sessionDate.toLocaleDateString();
  };

  return (
    <div className="w-72 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold text-primary">Promptify</h1>
          <ThemeToggle />
        </div>
        <button
          onClick={handleNewChat}
          className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 group mb-4"
        >
          <HiPlus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
          New Chat
        </button>

        {/* Model Selector */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-sidebar-foreground">
            AI Model
          </label>
          <ModelSelector
            selectedModelId={selectedModelId}
            onModelChange={onModelChange}
          />
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-medium text-sidebar-foreground mb-3">
            Recent Chats ({sessions.length})
          </h3>
          <div className="space-y-2">
            {sessions.length === 0 ? (
              <div className="text-xs text-muted-foreground text-center py-4">
                No chat history yet.
                <br />
                Start a new conversation!
              </div>
            ) : (
              sessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => handleSwitchSession(session.id)}
                  className={`group p-3 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer ${
                    currentSessionId === session.id
                      ? "bg-sidebar-accent border border-primary/20"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-sidebar-foreground group-hover:text-sidebar-accent-foreground truncate">
                        {session.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-muted-foreground">
                          {formatTimestamp(session.updatedAt)}
                        </p>
                        <span className="text-xs text-muted-foreground">•</span>
                        <p className="text-xs text-muted-foreground">
                          {session.messages.length} messages
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDeleteSession(session.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-sidebar-border rounded transition-all"
                    >
                      <HiXMark className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-muted-foreground text-center">
          <p>Powered by OpenRouter API</p>
          <p className="mt-1">
            Made with ♡ by <strong>Glassesboyy</strong>
          </p>
          <p className="mt-1">© 2025 Promptify</p>
        </div>
      </div>
    </div>
  );
}
