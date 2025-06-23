"use client";

import { useState } from "react";
import {
  HiChatBubbleLeft,
  HiCog6Tooth,
  HiPlus,
  HiStar,
  HiXMark,
} from "react-icons/hi2";
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
  const [chatHistory] = useState([
    { id: 1, title: "Chat about React", timestamp: "2 hours ago" },
    { id: 2, title: "API Integration Help", timestamp: "Yesterday" },
    { id: 3, title: "Database Design", timestamp: "2 days ago" },
  ]);

  return (
    <div className="w-72 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold text-primary">Promptify</h1>
          <ThemeToggle />
        </div>
        <button
          onClick={onNewChat}
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

      {/* Navigation */}
      <div className="p-4 border-b border-sidebar-border">
        <nav className="space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <HiChatBubbleLeft className="w-4 h-4" />
            All Chats
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <HiStar className="w-4 h-4" />
            Favorites
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <HiCog6Tooth className="w-4 h-4" />
            Settings
          </a>
        </nav>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-medium text-sidebar-foreground mb-3">
            Recent Chats
          </h3>
          <div className="space-y-2">
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                className="group p-3 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-sidebar-foreground group-hover:text-sidebar-accent-foreground truncate">
                      {chat.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {chat.timestamp}
                    </p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-sidebar-border rounded transition-all">
                    <HiXMark className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
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
