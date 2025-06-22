"use client";

import { useState } from "react";
import { HiClipboard, HiCheck } from "react-icons/hi2";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md transition-colors duration-200 ${className}`}
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      {copied ? (
        <>
          <HiCheck className="w-3 h-3" />
          Copied!
        </>
      ) : (
        <>
          <HiClipboard className="w-3 h-3" />
          Copy
        </>
      )}
    </button>
  );
}
