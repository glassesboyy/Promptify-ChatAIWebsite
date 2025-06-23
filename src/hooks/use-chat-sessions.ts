import { ChatStorage } from "@/lib/storage";
import type { ChatSession, Message } from "@/types/chat";
import { useCallback, useEffect, useState } from "react";

export function useChatSessions() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load sessions from localStorage on mount
  useEffect(() => {
    const loadedSessions = ChatStorage.getSessions();
    const currentId = ChatStorage.getCurrentSessionId();

    setSessions(loadedSessions);
    setCurrentSessionId(currentId);
    setIsLoaded(true);
  }, []);

  // Create new session
  const createSession = useCallback((modelId: string): ChatSession => {
    const newSession: ChatSession = {
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: "New Chat",
      messages: [],
      modelId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    ChatStorage.saveSession(newSession);
    ChatStorage.setCurrentSessionId(newSession.id);

    setSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);

    return newSession;
  }, []);

  // Update session
  const updateSession = useCallback(
    (sessionId: string, updates: Partial<ChatSession>) => {
      setSessions((prev) => {
        const updated = prev.map((session) =>
          session.id === sessionId
            ? {
                ...session,
                ...updates,
                updatedAt: new Date(),
                // Ensure createdAt remains a Date object
                createdAt:
                  session.createdAt instanceof Date
                    ? session.createdAt
                    : new Date(session.createdAt),
              }
            : session
        );

        // Save to localStorage
        const updatedSession = updated.find((s) => s.id === sessionId);
        if (updatedSession) {
          ChatStorage.saveSession(updatedSession);
        }

        return updated;
      });
    },
    []
  );

  // Add message to session
  const addMessageToSession = useCallback(
    (sessionId: string, message: Message) => {
      setSessions((prev) => {
        const updated = prev.map((session) => {
          if (session.id === sessionId) {
            const newMessage = {
              ...message,
              timestamp:
                message.timestamp instanceof Date
                  ? message.timestamp
                  : new Date(message.timestamp),
            };

            const newMessages = [...session.messages, newMessage];
            const updatedSession = {
              ...session,
              messages: newMessages,
              updatedAt: new Date(),
              // Update title if this is the first user message
              title:
                session.messages.length === 0 && message.role === "user"
                  ? ChatStorage.generateSessionTitle(message.content)
                  : session.title,
            };

            ChatStorage.saveSession(updatedSession);
            return updatedSession;
          }
          return session;
        });

        return updated;
      });
    },
    []
  );

  // Delete session
  const deleteSession = useCallback(
    (sessionId: string) => {
      ChatStorage.deleteSession(sessionId);
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));

      // If deleting current session, clear current session ID
      if (currentSessionId === sessionId) {
        ChatStorage.setCurrentSessionId("");
        setCurrentSessionId(null);
      }
    },
    [currentSessionId]
  );

  // Switch to session
  const switchToSession = useCallback((sessionId: string) => {
    ChatStorage.setCurrentSessionId(sessionId);
    setCurrentSessionId(sessionId);
  }, []);

  // Get current session
  const getCurrentSession = useCallback((): ChatSession | null => {
    if (!currentSessionId) return null;
    return sessions.find((s) => s.id === currentSessionId) || null;
  }, [sessions, currentSessionId]);

  // Clear all sessions
  const clearAllSessions = useCallback(() => {
    ChatStorage.clearAllSessions();
    setSessions([]);
    setCurrentSessionId(null);
  }, []);

  return {
    sessions,
    currentSessionId,
    isLoaded,
    createSession,
    updateSession,
    addMessageToSession,
    deleteSession,
    switchToSession,
    getCurrentSession,
    clearAllSessions,
  };
}
