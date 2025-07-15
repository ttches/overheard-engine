import styled from "styled-components";
import { useChatHistoryContext } from "../hooks/useChatHistoryContext";
import type { ChatMessage } from "../types/chat";

interface LinkButtonProps {
  chatMessage: ChatMessage;
  button: NonNullable<ChatMessage["buttons"]>[0];
}

const LinkButtonContainer = styled.div<{ isActive: boolean }>`
  display: flex;
  min-height: 48px;
  padding: 8px 16px;
  margin: 0;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  border-radius: 8px;
  border: ${(props) =>
    props.isActive ? "2px solid #0F9654" : "1px solid #e7f5ff"};
  cursor: pointer;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 6px;
`;

const RightColumn = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const ButtonText = styled.div`
  color: #fff;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
`;

const Badge = styled.div<{ isActive: boolean }>`
  display: flex;
  padding: 3px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 99999px;
  border: 2px solid ${(props) => (props.isActive ? "#0F9654" : "#BECBDA")};
  background: ${(props) => (props.isActive ? "#0a6a3c" : "#FFF")};
  color: ${(props) => (props.isActive ? "#FFF" : "#475569")};
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  cursor: pointer;
`;

export const LinkButton = ({ chatMessage, button }: LinkButtonProps) => {
  const { setCurrentIframeUrl, currentIframeUrl } = useChatHistoryContext();

  const isActive = button.action?.redirectUrl === currentIframeUrl;

  const handleClick = () => {
    if (button.action?.redirectUrl) {
      setCurrentIframeUrl(button.action.redirectUrl);
    }
  };

  return (
    <LinkButtonContainer isActive={isActive} onClick={handleClick}>
      <ContentSection>
        <LeftColumn>
          <ButtonText>{button.displayText}</ButtonText>
        </LeftColumn>
        <RightColumn>
          <Badge isActive={isActive}>
            {button.badge?.displayText} available
          </Badge>
        </RightColumn>
      </ContentSection>
    </LinkButtonContainer>
  );
};
