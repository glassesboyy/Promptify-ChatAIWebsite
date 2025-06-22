"use client";

import { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { ChatContainer } from "@/components/chat/chat-container";
import { getDefaultModel } from "@/lib/models";

export default function Home() {
  const [selectedModelId, setSelectedModelId] = useState(getDefaultModel().id);

  const handleNewChat = () => {
    // This will be handled by the ChatContainer component
    window.location.reload();
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModelId(modelId);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        onNewChat={handleNewChat}
        selectedModelId={selectedModelId}
        onModelChange={handleModelChange}
      />
      <div className="flex-1 overflow-hidden">
        <ChatContainer selectedModelId={selectedModelId} />
      </div>
    </div>
  );
}
