"use client";

import { useState } from "react";
import { AVAILABLE_MODELS } from "@/lib/models";
import type { AIModel } from "@/types/chat";
import { HiChevronDown, HiCpuChip, HiCheckCircle } from "react-icons/hi2";

interface ModelSelectorProps {
  selectedModelId: string;
  onModelChange: (modelId: string) => void;
}

export function ModelSelector({
  selectedModelId,
  onModelChange,
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedModel = AVAILABLE_MODELS.find(
    (model) => model.id === selectedModelId
  );

  const handleModelSelect = (modelId: string) => {
    onModelChange(modelId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-accent-foreground rounded-lg transition-colors border border-sidebar-border"
      >
        <div className="flex items-center gap-2">
          <HiCpuChip className="w-4 h-4" />
          <div className="text-left">
            <div className="text-sm font-medium">{selectedModel?.name}</div>
            <div className="text-xs text-muted-foreground">
              {selectedModel?.isFree && "Free"} •{" "}
              {selectedModel?.provider.split("/")[0]}
            </div>
          </div>
        </div>
        <HiChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-20 overflow-hidden">
            {AVAILABLE_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => handleModelSelect(model.id)}
                className="w-full p-3 text-left hover:bg-accent transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{model.name}</span>
                    {model.isFree && (
                      <span className="px-2 py-0.5 bg-success/20 text-success text-xs rounded-full">
                        Free
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {model.description}
                  </div>
                </div>
                {selectedModelId === model.id && (
                  <HiCheckCircle className="w-4 h-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
