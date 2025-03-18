// src/app/chat/page.tsx
"use client";
import React from "react";
import ChatInput from "@/components/ChatInput";
import ChatWindow from "@/components/ChatWindow";
import { ChatProvider } from "@/context/chat-context";
import Link from "next/link";


const ChatPage: React.FC = () => {
  return (
      <ChatProvider>
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
          {/* Header with title and link to settings */}
          <header className="p-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-700">
            <h1 className="text-xl font-bold">Chat</h1>
            <Link href="/settings" className="text-blue-500 hover:underline">
              Settings
            </Link>
          </header>

          {/* Chat window */}
          <div className="flex-1 overflow-hidden p-4">
            <ChatWindow />
          </div>

          {/* Chat input */}
          <div className="p-4 border-t border-gray-300 dark:border-gray-700">
            <ChatInput />
          </div>
        </div>
      </ChatProvider>
  );
};

export default ChatPage;
