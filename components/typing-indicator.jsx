"use client";

import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
        <Bot className="h-5 w-5 text-blue-600" />
      </div>
      <div className="rounded-lg py-3 px-4 bg-gray-100">
        <div className="flex space-x-2">
          <div
            className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"
            style={{ animationDelay: "200ms" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"
            style={{ animationDelay: "400ms" }}
          />
        </div>
      </div>
    </div>
  );
}
