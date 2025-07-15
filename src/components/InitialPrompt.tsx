import styled from "styled-components";
import Sparkles from "../icons/Sparkles";
import { useChatHistoryContext } from "../hooks/useChatHistoryContext";

const InitialPromptContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 24px;
`;

const WelcomeText = styled.div`
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 16px;
  width: 260px;
  align-self: center;
`;

const SuggestionButton = styled.button`
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 12px;
  background: #228be6;
  color: #fff;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
`;

export const InitialPrompt = () => {
  const { sendMessage } = useChatHistoryContext();

  return (
    <InitialPromptContainer>
      <WelcomeText>How can we help you find you the perfect car?</WelcomeText>
      <SuggestionButton
        onClick={() => sendMessage("Show me Silver Honda Civics")}
      >
        <Sparkles />
        Show me Silver Honda Civics
      </SuggestionButton>
      <SuggestionButton
        onClick={() => sendMessage("I need a car for commuting under $30,000")}
      >
        <Sparkles />I need a car for commuting under $30,000
      </SuggestionButton>
      <SuggestionButton
        onClick={() => sendMessage("Help me find sporty cars under $40,000")}
      >
        <Sparkles />
        Help me find sporty cars under $40,000
      </SuggestionButton>
    </InitialPromptContainer>
  );
};
