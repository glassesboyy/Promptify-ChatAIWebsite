import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ChatContainer } from "@/components/chat/chat-container";

export default function Home() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Theme toggle in top right */}
      <div className="fixed top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <ChatContainer />
    </div>
  );
}
