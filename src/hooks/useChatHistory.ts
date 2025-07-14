import { useState } from "react";
import { usePostMessage } from "../../mutations/usePostMessage";
import type { ChatMessage } from "../types/chat";
import type { ChatResponse } from "../api";

export const useChatHistory = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [currentIframeUrl, setCurrentIframeUrl] = useState<string>("");

  const mutation = usePostMessage();

  const transformApiResponseToChatMessage = (
    userMessage: string,
    apiResponse: ChatResponse
  ): ChatMessage => {
    return {
      id: Date.now().toString(),
      userMessage,
      timestamp: new Date(),
      header: apiResponse.header,
      response: apiResponse.response,
      redirectUrl: apiResponse.redirect_url,
      pills: apiResponse.pills,
      buttons: apiResponse.buttons?.map((button) => ({
        badge: {
          displayText: button.badge?.display_text,
        },
        action: {
          redirectUrl: button.action?.redirect_url,
          quickReplyText: button.action?.quick_reply_text,
        },
        displayText: button.display_text,
      })),
    };
  };

  const sendMessage = (message: string) => {
    mutation.mutate(message, {
      onSuccess: (apiResponse) => {
        const chatMessage = transformApiResponseToChatMessage(
          message,
          apiResponse
        );

        setChatHistory((prev) => [...prev, chatMessage]);

        if (apiResponse.redirect_url) {
          setCurrentIframeUrl(apiResponse.redirect_url);
        }
      },
    });
  };

  return {
    chatHistory,
    currentIframeUrl,
    sendMessage,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
