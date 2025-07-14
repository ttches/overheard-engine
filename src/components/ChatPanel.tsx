import styled from "styled-components";
import { ChatInput } from "./ChatInput";
import { useChatHistoryContext } from "../context/ChatHistoryContext";

const ChatPanelContainer = styled.div`
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  width: 400px;
  background-color: #106bc7;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ChatInputWrapper = styled.div`
  padding: 16px;
`;

const Message = styled.div<{ isUser: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  width: 100%;
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  max-width: ${(props) => (props.isUser ? "300px" : "100%")};
  display: flex;
  padding: 16px;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => (props.isUser ? "8px" : "0px")};
  background-color: ${(props) => (props.isUser ? "#0D375E" : "transparent")};
  color: #fff;
  text-align: left;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
`;

export const ChatPanel = () => {
  const { chatHistory } = useChatHistoryContext();

  return (
    <ChatPanelContainer>
      <ChatMessages>
        {chatHistory.map((chatMessage, index) => (
          <Message key={index} isUser={chatMessage.isUser}>
            <MessageBubble isUser={chatMessage.isUser}>
              {chatMessage.message}
            </MessageBubble>
          </Message>
        ))}
      </ChatMessages>

      <ChatInputWrapper>
        <ChatInput />
      </ChatInputWrapper>
    </ChatPanelContainer>
  );
};
