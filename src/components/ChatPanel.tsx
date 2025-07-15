import { useEffect, useRef } from "react";
import styled from "styled-components";
import { ChatInput } from "./ChatInput";
import { InitialPrompt } from "./InitialPrompt";
import { FilterMessage } from "./FilterMessage";
import { useChatHistoryContext } from "../hooks/useChatHistoryContext";

const ChatPanelContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 400px;
  background-color: #106bc7;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ChatInputWrapper = styled.div``;

const Message = styled.div<{ isUser: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  width: 100%;
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  max-width: ${(props) => (props.isUser ? "300px" : "100%")};
  display: flex;
  flex-direction: column;
  padding: ${(props) => (props.isUser ? "16px" : "16px 0")};
  justify-content: center;
  align-items: ${(props) => (props.isUser ? "center" : "flex-start")};
  border-radius: ${(props) => (props.isUser ? "8px" : "0px")};
  background-color: ${(props) => (props.isUser ? "#0D375E" : "transparent")};
  color: #fff;
  text-align: left;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
`;

const MessageHeader = styled.div`
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 0;
`;

const MessageText = styled.div`
  color: #fff;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 12px 0;
`;

const Spinner = styled.div`
  width: 28px;
  height: 28px;
  margin-left: 16px;
  border: 3px solid transparent;
  border-top: 3px solid #4fc3f7;
  border-right: 3px solid #4fc3f7;
  border-bottom: 3px solid #4fc3f7;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ChatPanel = () => {
  const { chatHistory, isLoading } = useChatHistoryContext();
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatHistory.length]);

  return (
    <ChatPanelContainer>
      <ChatMessages ref={chatMessagesRef}>
        {chatHistory.map((chatMessage) => (
          <Message key={chatMessage.id} isUser={chatMessage.isUser}>
            {chatMessage.pills ? (
              <FilterMessage chatMessage={chatMessage} />
            ) : (
              <MessageBubble isUser={chatMessage.isUser}>
                {chatMessage.header && (
                  <MessageHeader>{chatMessage.header}</MessageHeader>
                )}
                <MessageText>{chatMessage.message}</MessageText>
              </MessageBubble>
            )}
          </Message>
        ))}
        {isLoading && (
          <LoadingContainer>
            <Spinner />
          </LoadingContainer>
        )}
      </ChatMessages>

      {chatHistory.length === 0 && <InitialPrompt />}

      <ChatInputWrapper>
        <ChatInput />
      </ChatInputWrapper>
    </ChatPanelContainer>
  );
};
