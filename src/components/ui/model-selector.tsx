"use client";

import { AVAILABLE_MODELS } from "@/lib/models";
import { useState } from "react";
import { HiChevronDown, HiCpuChip } from "react-icons/hi2";

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
            <div className="text-xs font-medium">{selectedModel?.name}</div>
            <div className="text-xxxs text-muted-foreground">
              {selectedModel?.isFree && "Free"} •{" "}
              {selectedModel?.provider.split("/")[0]}
            </div>
          </div>
        </div>
        <HiChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${
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
                className={`w-full p-3 text-left hover:bg-accent transition-colors ${
                  selectedModelId === model.id
                    ? "bg-accent/50 border-l-2 border-l-primary"
                    : ""
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-xs">{model.name}</span>
                    {model.isFree && (
                      <span className="px-1.5 bg-success/20 text-success text-xxxs rounded-full">
                        Free
                      </span>
                    )}
                  </div>
                  <div className="text-xxxs text-muted-foreground">
                    {model.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
