"use client";

import { useChatSessions } from "@/hooks/use-chat-sessions";
import { useState } from "react";
import { HiPlus, HiXMark } from "react-icons/hi2";
import { ModelSelector } from "./model-selector";
import { ThemeToggle } from "./theme-toggle";

interface SidebarProps {
  onNewChat?: () => void;
  selectedModelId: string;
  onModelChange: (modelId: string) => void;
  open?: boolean; // Tambah
  onClose?: () => void; // Tambah
}

export function Sidebar({
  onNewChat,
  selectedModelId,
  onModelChange,
  open = false,
  onClose,
}: SidebarProps) {
  const {
    sessions,
    currentSessionId,
    createSession,
    deleteSession,
    switchToSession,
    clearAllSessions,
  } = useChatSessions();

  const [showClearModal, setShowClearModal] = useState(false);

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

  // Sidebar content
  const sidebarContent = (
    <div className="w-72 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border relative">
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
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-sidebar-foreground">
              Recent Chats ({sessions.length})
            </h3>
            {sessions.length > 0 && (
              <button
                onClick={() => setShowClearModal(true)}
                className="text-xs text-red-500 hover:underline focus:outline-none"
                title="Clear all chat history"
              >
                Clear All
              </button>
            )}
          </div>
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

      {/* Custom Clear All Modal */}
      {showClearModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/60"
          onClick={() => setShowClearModal(false)}
        >
          <div
            className="bg-popover rounded-lg shadow-lg p-6 w-96 border border-popover-border relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Exit Button */}
            <button
              type="button"
              className="absolute top-3 right-3 text-muted-foreground hover:text-primary hover:scale-110 transition-colors duration-300"
              onClick={() => setShowClearModal(false)}
              aria-label="Close modal"
            >
              <HiXMark className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-2 text-center text-primary">
              Clear All Chats History?
            </h2>
            <p className="text-sm text-muted-foreground mb-4 text-center">
              Are you sure you want to clear all chat history?{" "}
              <strong>This action cannot be undone!</strong>
            </p>
            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={() => setShowClearModal(false)}
                className="px-3 py-2 text-sm rounded-md min-w-24 bg-muted text-foreground hover:bg-muted/80 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  clearAllSessions();
                  setShowClearModal(false);
                }}
                className="px-3 py-2 text-sm rounded-md min-w-24 bg-destructive text-white hover:bg-destructive/80 transition duration-300"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Sidebar overlay for mobile */}
      <div
        className={`
          fixed inset-0 z-50 bg-black/40 transition-opacity duration-300
          ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
          lg:hidden
        `}
        onClick={onClose}
        aria-hidden={!open}
      >
        <div
          className={`
            absolute left-0 top-0 h-full transition-transform duration-300
            ${open ? "translate-x-0" : "-translate-x-full"}
            w-72
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {sidebarContent}
        </div>
      </div>
      {/* Sidebar static for desktop */}
      <div className="hidden lg:block h-screen">{sidebarContent}</div>
    </>
  );
}
