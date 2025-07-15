import { useState } from "react";
import { nanoid } from "nanoid";
import { usePostMessage } from "../../mutations/usePostMessage";
import type { ChatMessage } from "../types/chat";
import type { ChatResponse } from "../api";

const initialMessages: ChatMessage[] = [
  {
    id: "test-filter-message",
    message: "",
    isUser: false,
    header: "12 Jeep Rubicons",
    pills: ["Jeep", "Rubicon", "4-door", "manual transmission"],
    redirectUrl:
      "https://www.carvana.com/cars/filters?cvnaid=eyJmaWx0ZXJzIjp7Im1ha2VzIjpbeyJuYW1lIjoiSmVlcCIsInBhcmVudE1vZGVscyI6W3sibmFtZSI6IldyYW5nbGVyIiwidHJpbXMiOlsiUnViaWNvbiJdfV19XX19",
  },
];

export const useChatHistory = () => {
  const [chatHistory, setChatHistory_unsafe] =
    useState<ChatMessage[]>(initialMessages);
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

        setChatHistory(botMessage);

        if (apiResponse.redirect_url) {
          setCurrentIframeUrl(apiResponse.redirect_url);
        }
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
