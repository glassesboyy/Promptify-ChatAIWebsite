# Promptify - Multi Model AI Chat App via OpenRouter API

Promptify is a modern, full-stack AI chat application built with Next.js, React, and Tailwind CSS. It leverages the [OpenRouter API](https://openrouter.ai) to provide access to multiple state-of-the-art AI models for conversational and coding assistance.

## Features

- **Multi-model AI chat**: Switch between top AI models (DeepSeek, Qwen3, etc.)
- **Chat session management**: Save, switch, and delete chat histories
- **Rich message formatting**: Supports markdown, code blocks, and inline code
- **Theme toggle**: Light and dark mode support
- **Quick prompts**: Start conversations with suggested prompts
- **Clipboard utilities**: Copy code and responses easily
- **Responsive UI**: Optimized for desktop and mobile

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI SDK](https://github.com/openai/openai-node)
- [OpenRouter API](https://openrouter.ai)
- [TypeScript](https://www.typescriptlang.org/)
- [React Icons](https://react-icons.github.io/react-icons/)

## Getting Started

### Prerequisites

- Node.js v18+ and npm

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/chat-ai.git
   cd chat-ai
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**

   - Copy `.env.example` to `.env.local` and fill in your API keys:
     ```bash
     cp .env.example .env.local
     ```
   - Obtain API keys for each model from [OpenRouter](https://openrouter.ai/keys).

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Environment Variables

Set these in your `.env.local` file:

- `NEXT_PUBLIC_SITE_URL` - Your site URL (e.g., http://localhost:3000)
- `NEXT_PUBLIC_SITE_NAME` - Site name (e.g., Promptify Chat AI)
- `DEEPSEEK_CHAT_V3_API_KEY` - API key for DeepSeek Chat V3
- `DEEPSEEK_R1_API_KEY` - API key for DeepSeek R1
- `QWEN3_API_KEY` - API key for Qwen3

See `.env.example` for details.

## Project Structure

```
src/
  app/                # Next.js app directory (pages, layout, styles)
  components/         # React UI components (chat, UI, etc.)
  hooks/              # Custom React hooks
  lib/                # Utility libraries (API, formatting, storage, etc.)
  types/              # TypeScript type definitions
public/               # Static assets
```

## Usage

- **Start a new chat:** Click "New Chat" in the sidebar.
- **Switch AI models:** Use the model selector dropdown.
- **View reasoning:** For supported models, toggle "Show Reasoning" on AI responses.
- **Copy code:** Use the copy button on code blocks or responses.
- **Clear chat/history:** Use the "Clear Chat" or "Clear All" buttons.

## Customization

- **Add new AI models:** Edit `src/lib/models.ts` and update `.env.local` with new API keys.
- **Change UI theme/colors:** Edit `tailwind.config.js` and `globals.css`.

## Contact

For questions or support, please contact [suryazulfikar22@gmail.com].
