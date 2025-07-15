import { useContext } from "react";
import { ChatHistoryContext } from "../context/ChatHistoryContext";

export const useChatHistoryContext = () => {
  const context = useContext(ChatHistoryContext);
  if (!context) {
    throw new Error(
      "useChatHistoryContext must be used within ChatHistoryProvider"
    );
  }
  return context;
};
