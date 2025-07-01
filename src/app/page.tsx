"use client";

import { ChatContainer } from "@/components/chat/chat-container";
import { Sidebar } from "@/components/ui/sidebar";
import { getDefaultModel } from "@/lib/models";
import { useState } from "react";

export default function Home() {
  const [selectedModelId, setSelectedModelId] = useState(getDefaultModel().id);
  const [refreshKey, setRefreshKey] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNewChat = () => {
    // Force re-render to show new chat
    setRefreshKey((prev) => prev + 1);
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModelId(modelId);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar overlay for mobile */}
      <Sidebar
        onNewChat={handleNewChat}
        selectedModelId={selectedModelId}
        onModelChange={handleModelChange}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 overflow-hidden">
        <ChatContainer
          key={refreshKey}
          selectedModelId={selectedModelId}
          onNewChat={handleNewChat}
          onOpenSidebar={() => setSidebarOpen(true)}
        />
      </div>
    </div>
  );
}
