import { createContext } from "react";
import type { ReactNode } from "react";
import { useChatHistory } from "../hooks/useChatHistory";
import type { ChatMessage } from "../types/chat";

interface ChatHistoryContextType {
  chatHistory: ChatMessage[];
  currentIframeUrl: string;
  setCurrentIframeUrl: (url: string) => void;
  sendMessage: (message: string) => void;
  isLoading: boolean;
  error: Error | null;
}

export const ChatHistoryContext = createContext<
  ChatHistoryContextType | undefined
>(undefined);

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
