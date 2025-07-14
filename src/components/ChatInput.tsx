import styled from "styled-components";
import Send from "../icons/Send";
import Microphone from "../icons/Microphone";
import Paperclip from "../icons/Paperclip";

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
`;

export const ChatInput = () => {
  return (
    <ChatInputContainer>
      <TextInput type="text" placeholder="Type your message..." />
      <ButtonContainer>
        <IconButton>
          <Paperclip />
        </IconButton>
        <IconButton>
          <Microphone />
        </IconButton>
        <SendButton>
          <Send />
        </SendButton>
      </ButtonContainer>
    </ChatInputContainer>
  );
};
