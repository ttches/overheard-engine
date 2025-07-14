import { useState } from "react";
import { usePostMessage } from "../../mutations/usePostMessage";
import type { ChatMessage } from "../types/chat";
import type { ChatResponse } from "../api";

const initialMessages: ChatMessage[] = [
  // {
  //   message:
  //     "Welcome to Overheard Engine! Start a conversation to control the content.",
  //   isUser: false,
  // },
  // {
  //   message: "Hello! This is a sample user message.",
  //   isUser: true,
  // },
];

export const useChatHistory = () => {
  const [chatHistory, setChatHistory] =
    useState<ChatMessage[]>(initialMessages);
  const [currentIframeUrl, setCurrentIframeUrl] = useState<string>("");

  const mutation = usePostMessage();

  const sendMessage = (message: string) => {
    const userMessage: ChatMessage = {
      message,
      isUser: true,
    };
    setChatHistory((prev) => [...prev, userMessage]);

    mutation.mutate(message, {
      onSuccess: (apiResponse) => {
        const botMessage: ChatMessage = {
          message: apiResponse.response || "",
          isUser: false,
          header: apiResponse.header,
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

        setChatHistory((prev) => [...prev, botMessage]);

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
