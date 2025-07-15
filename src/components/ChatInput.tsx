import { useState } from "react";
import styled from "styled-components";
import Send from "../icons/Send";
import Microphone from "../icons/Microphone";
import Paperclip from "../icons/Paperclip";
import { useChatHistoryContext } from "../hooks/useChatHistoryContext";

const ChatInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 87px;
  padding: 16px;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid #8496ae;
  background: #fff;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  gap: 8px;
  margin-top: auto;
`;

const TextInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  color: #64748b;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  flex: 1;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: #106bc7;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 40px;
  height: 40px;
  transition: background-color 0.2s ease;

  &:hover {
    background: #0d5aa7;
  }
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 32px;
  height: 32px;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f5f5f5;
  }
`;

export const ChatInput = () => {
  const [inputValue, setInputValue] = useState("");
  const { sendMessage } = useChatHistoryContext();

  const handleSendMessage = () => {
    const trimmedMessage = inputValue.trim();
    if (trimmedMessage) {
      sendMessage(trimmedMessage);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <ChatInputContainer>
      <TextInput
        type="text"
        placeholder="Type your message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <ButtonContainer>
        <IconButton>
          <Paperclip />
        </IconButton>
        <IconButton>
          <Microphone />
        </IconButton>
        <SendButton onClick={handleSendMessage}>
          <Send />
        </SendButton>
      </ButtonContainer>
    </ChatInputContainer>
  );
};
