"use client";

import { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { ChatContainer } from "@/components/chat/chat-container";

export default function Home() {
  const handleNewChat = () => {
    // This will be handled by the ChatContainer component
    window.location.reload();
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar onNewChat={handleNewChat} />
      <div className="flex-1 overflow-hidden">
        <ChatContainer />
      </div>
    </div>
  );
}
