import type { ChatSession } from "@/types/chat";

const STORAGE_KEYS = {
  CHAT_SESSIONS: "promptify_chat_sessions",
  CURRENT_SESSION: "promptify_current_session",
} as const;

export class ChatStorage {
  // Get all chat sessions
  static getSessions(): ChatSession[] {
    if (typeof window === "undefined") return [];

    try {
      const sessions = localStorage.getItem(STORAGE_KEYS.CHAT_SESSIONS);
      const parsed = sessions ? JSON.parse(sessions) : [];

      // Convert date strings back to Date objects
      return parsed.map((session: any) => ({
        ...session,
        createdAt: new Date(session.createdAt),
        updatedAt: new Date(session.updatedAt),
        messages: session.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      }));
    } catch (error) {
      console.error("Error loading chat sessions:", error);
      return [];
    }
  }

  // Save chat session
  static saveSession(session: ChatSession): void {
    if (typeof window === "undefined") return;

    try {
      const sessions = this.getSessions();
      const existingIndex = sessions.findIndex((s) => s.id === session.id);

      // Ensure dates are properly set
      const sessionToSave = {
        ...session,
        createdAt:
          session.createdAt instanceof Date
            ? session.createdAt
            : new Date(session.createdAt),
        updatedAt: new Date(),
        messages: session.messages.map((msg) => ({
          ...msg,
          timestamp:
            msg.timestamp instanceof Date
              ? msg.timestamp
              : new Date(msg.timestamp),
        })),
      };

      if (existingIndex >= 0) {
        sessions[existingIndex] = sessionToSave;
      } else {
        sessions.unshift(sessionToSave); // Add to beginning
      }

      // Keep only last 50 sessions
      const limitedSessions = sessions.slice(0, 50);
      localStorage.setItem(
        STORAGE_KEYS.CHAT_SESSIONS,
        JSON.stringify(limitedSessions)
      );
    } catch (error) {
      console.error("Error saving chat session:", error);
    }
  }

  // Delete chat session
  static deleteSession(sessionId: string): void {
    if (typeof window === "undefined") return;

    try {
      const sessions = this.getSessions();
      const filteredSessions = sessions.filter((s) => s.id !== sessionId);
      localStorage.setItem(
        STORAGE_KEYS.CHAT_SESSIONS,
        JSON.stringify(filteredSessions)
      );
    } catch (error) {
      console.error("Error deleting chat session:", error);
    }
  }

  // Get current session ID
  static getCurrentSessionId(): string | null {
    if (typeof window === "undefined") return null;

    try {
      return localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
    } catch (error) {
      console.error("Error getting current session:", error);
      return null;
    }
  }

  // Set current session ID
  static setCurrentSessionId(sessionId: string): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, sessionId);
    } catch (error) {
      console.error("Error setting current session:", error);
    }
  }

  // Generate session title from first message
  static generateSessionTitle(firstMessage: string): string {
    const maxLength = 50;
    const cleaned = firstMessage.trim().replace(/\n/g, " ");
    return cleaned.length > maxLength
      ? cleaned.substring(0, maxLength) + "..."
      : cleaned;
  }

  // Clear all sessions
  static clearAllSessions(): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(STORAGE_KEYS.CHAT_SESSIONS);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
    } catch (error) {
      console.error("Error clearing sessions:", error);
    }
  }
}
