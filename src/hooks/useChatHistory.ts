import { useState } from "react";
import { nanoid } from "nanoid";
import { usePostMessage } from "../../mutations/usePostMessage";
import type { ChatMessage } from "../types/chat";

export const useChatHistory = () => {
  const [chatHistory, setChatHistory_unsafe] = useState<ChatMessage[]>([]);
  const [currentIframeUrl, setCurrentIframeUrl] = useState<string>("");

  const setChatHistory = (newMessage: ChatMessage) => {
    const messageWithId = {
      ...newMessage,
      id: newMessage.id || nanoid(),
    };
    setChatHistory_unsafe((prev) => [...prev, messageWithId]);
  };

  const mutation = usePostMessage();

  const sendMessage = (message: string) => {
    const userMessage: ChatMessage = {
      message,
      isUser: true,
    };
    setChatHistory(userMessage);

    mutation.mutate(message, {
      onSuccess: (apiResponse) => {
        apiResponse.forEach((responseMessage) => {
          const botMessage: ChatMessage = {
            message: responseMessage.response || "",
            isUser: false,
            header: responseMessage.header,
            redirectUrl: responseMessage.redirect_url,
            pills: responseMessage.pills,
            buttons: responseMessage.buttons?.map((button) => ({
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

          setChatHistory(botMessage);

          if (responseMessage.redirect_url) {
            setCurrentIframeUrl(responseMessage.redirect_url);
          }
        });
      },
    });
  };

  return {
    chatHistory,
    currentIframeUrl,
    setCurrentIframeUrl,
    sendMessage,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
