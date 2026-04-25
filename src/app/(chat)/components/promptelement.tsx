"use client";

import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/ui/button";
import { PromptInput, PromptInputActions, type PromptInputProps, PromptInputTextarea } from "@/ui/prompt-input";
import { Spinner } from "@/ui/spinner";
import { cn } from "@/utils/cn";

export default function PromptInputElement({
  isLoading,
  onSubmit,
  children,
}: Omit<PromptInputProps, "isLoading" | "onSubmit"> & { isLoading: boolean; onSubmit: (v: string) => void }) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit(input);
      setInput("");
    }
  };

  return (
    <div>
      <div className={cn("z-0 w-fit relative p-2 ml-3 -mb-10 transition-all", isLoading && "mb-0")}>{children}</div>
      <PromptInput
        value={input}
        onValueChange={setInput}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        className="w-full max-w-(--breakpoint-md) mt-auto z-10 bg-background relative"
      >
        <PromptInputTextarea placeholder="What's on your mind..." />

        <PromptInputActions className="flex items-center justify-end gap-2 pt-2">
          <Button
            variant="default"
            size="icon"
            className="h-8 w-8 rounded-full"
            disabled={isLoading}
            onClick={() => {
              if (input.trim()) {
                onSubmit(input);
                setInput("");
              }
            }}
          >
            {isLoading ? <Spinner className="size-5" /> : <ArrowUp className="size-5" />}
          </Button>
        </PromptInputActions>
      </PromptInput>
    </div>
  );
}
