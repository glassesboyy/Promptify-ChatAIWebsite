"use client";

import { useChatSessions } from "@/hooks/use-chat-sessions";
import { getModelById } from "@/lib/models";
import { ChatMessage, Message } from "@/types/chat";
import { useEffect, useMemo, useRef, useState } from "react";
import { HiBars3, HiChatBubbleBottomCenter, HiTrash } from "react-icons/hi2";
import { ChatInput } from "./chat-input";
import { LoadingIndicator } from "./loading-indicator";
import { MessageBubble } from "./message-bubble";

interface ChatContainerProps {
  selectedModelId: string;
  onNewChat?: () => void;
  onOpenSidebar?: () => void; // Tambah prop baru
}

export function ChatContainer({
  selectedModelId,
  onNewChat,
  onOpenSidebar,
}: ChatContainerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    currentSessionId,
    isLoaded,
    createSession,
    addMessageToSession,
    getCurrentSession,
  } = useChatSessions();

  const selectedModel = getModelById(selectedModelId);
  const currentSession = getCurrentSession();
  const messages = useMemo(
    () => currentSession?.messages || [],
    [currentSession]
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Create initial session if none exists
  useEffect(() => {
    if (isLoaded && !currentSessionId) {
      createSession(selectedModelId);
    }
  }, [isLoaded, currentSessionId, selectedModelId, createSession]);

  const sendMessage = async (content: string) => {
    // Ensure we have a current session
    let sessionId = currentSessionId;
    if (!sessionId) {
      const newSession = createSession(selectedModelId);
      sessionId = newSession.id;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    addMessageToSession(sessionId, userMessage);
    setIsLoading(true);

    try {
      const chatMessages: ChatMessage[] = [...messages, userMessage].map(
        (msg) => ({
          role: msg.role,
          content: msg.content,
        })
      );

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: chatMessages,
          modelId: selectedModelId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      };

      addMessageToSession(sessionId, aiMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      addMessageToSession(sessionId, errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (currentSessionId) {
      // Create new session instead of clearing current one
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const newSession = createSession(selectedModelId);
      onNewChat?.();
    }
  };

  // Template prompts for quick start
  const quickPrompts = {
    ideas: "Can you give me some creative ideas for a new project?",
    code: "I need help debugging this code or learning best practices. Can you assist?",
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/30 backdrop-blur-sm px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between max-w-chat mx-auto">
          {/* Hamburger button for mobile */}
          <button
            className="mr-3 lg:hidden bg-primary text-primary-foreground rounded-lg p-2 shadow-lg"
            onClick={onOpenSidebar}
            aria-label="Open sidebar"
            type="button"
          >
            <HiBars3 className="w-6 h-6" />
          </button>
          <div className="min-w-0 flex-1 space-y-1">
            <h1 className="text-lg sm:text-xl font-bold text-primary truncate">
              Smart AI Chat via OpenRouter API
            </h1>
            <p className="text-xs text-muted-foreground truncate">
              Currently AI Model:{" "}
              <span className="font-medium">{selectedModel?.name}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={clearChat}
              className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-destructive hover:bg-destructive/80 text-destructive-foreground rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <HiTrash className="w-4 h-4" />
              <span className="hidden sm:inline">Clear Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="max-w-chat mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
          {messages.length === 0 && (
            <div className="text-center py-12 sm:py-16 animate-fade-in">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <HiChatBubbleBottomCenter className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-xl sm:text-3xl font-bold text-primary mb-3">
                Welcome to Promptify!
              </h2>
              <p className="text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base px-4">
                Start a conversation with our AI assistant. Ask questions, get
                help with coding, or just chat about anything!
              </p>

              {/* Quick start suggestions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto px-4">
                <div
                  className="p-4 border border-border rounded-xl bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => sendMessage(quickPrompts.ideas)}
                >
                  <h3 className="font-medium mb-2">💡 Get Ideas</h3>
                  <p className="text-sm text-muted-foreground">
                    Brainstorm creative solutions and innovative concepts
                  </p>
                </div>
                <div
                  className="p-4 border border-border rounded-xl bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => sendMessage(quickPrompts.code)}
                >
                  <h3 className="font-medium mb-2">🔧 Code Help</h3>
                  <p className="text-sm text-muted-foreground">
                    Debug issues and learn programming best practices
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                modelId={selectedModelId}
              />
            ))}
          </div>

          {isLoading && <LoadingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
}
