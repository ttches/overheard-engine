import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useChatHistory } from "../hooks/useChatHistory";
import type { ChatMessage } from "../types/chat";

interface ChatHistoryContextType {
  chatHistory: ChatMessage[];
  currentIframeUrl: string;
  sendMessage: (message: string) => void;
  isLoading: boolean;
  error: Error | null;
}

const ChatHistoryContext = createContext<ChatHistoryContextType | undefined>(
  undefined
);

interface ChatHistoryProviderProps {
  children: ReactNode;
}

export const ChatHistoryProvider = ({ children }: ChatHistoryProviderProps) => {
  const value = useChatHistory();

  return (
    <ChatHistoryContext.Provider value={value}>
      {children}
    </ChatHistoryContext.Provider>
  );
};

export const useChatHistoryContext = () => {
  const context = useContext(ChatHistoryContext);
  if (!context) {
    throw new Error(
      "useChatHistoryContext must be used within ChatHistoryProvider"
    );
  }
  return context;
};
