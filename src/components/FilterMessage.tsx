import { useState, useEffect } from "react";
import styled from "styled-components";
import { useChatHistoryContext } from "../hooks/useChatHistoryContext";
import Chevron from "../icons/Chevron";
import type { ChatMessage } from "../types/chat";

interface FilterMessageProps {
  chatMessage: ChatMessage;
}

const FilterContainer = styled.div<{ isActive: boolean }>`
  display: flex;
  min-height: 48px;
  padding: 16px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  border-radius: 8px;
  border: ${(props) =>
    props.isActive ? "2px solid #0F9654" : "1px solid #e7f5ff"};
`;

const TopSection = styled.div`
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

const HeaderText = styled.div`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  text-align: left;
`;

const ShowFiltersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const ShowFiltersText = styled.div`
  color: #fff;
  text-align: left;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
`;

const ChevronContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  transform: ${(props) => (props.isOpen ? "scaleY(-1)" : "scaleY(1)")};
  transition: transform 0.2s ease;
`;

const ViewResultsButton = styled.div`
  color: #fff;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  cursor: pointer;
  text-decoration: underline;
`;

const PillsContainer = styled.div`
  width: 100%;
  margin-top: 8px;
  color: #fff;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
`;

const CurrentlyViewingBadge = styled.div`
  display: flex;
  padding: 3px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 99999px;
  background: #0a6a3c;
  color: #fff;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
`;

export const FilterMessage = ({ chatMessage }: FilterMessageProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { setCurrentIframeUrl, currentIframeUrl } = useChatHistoryContext();

  const isActive = chatMessage.redirectUrl === currentIframeUrl;

  useEffect(() => {
    if (isActive) {
      setIsFiltersOpen(true);
    }
  }, [isActive]);

  const handleViewResults = () => {
    if (chatMessage.redirectUrl) {
      setCurrentIframeUrl(chatMessage.redirectUrl);
    }
  };

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <FilterContainer isActive={isActive}>
      <TopSection>
        <LeftColumn>
          {chatMessage.header && <HeaderText>{chatMessage.header}</HeaderText>}
          <ShowFiltersContainer onClick={toggleFilters}>
            <ShowFiltersText>
              {isFiltersOpen ? "Hide filters" : "Show filters"}
            </ShowFiltersText>
            <ChevronContainer isOpen={isFiltersOpen}>
              <Chevron />
            </ChevronContainer>
          </ShowFiltersContainer>
        </LeftColumn>
        <RightColumn>
          {isActive ? (
            <CurrentlyViewingBadge>Currently Viewing</CurrentlyViewingBadge>
          ) : (
            <ViewResultsButton onClick={handleViewResults}>
              View Results
            </ViewResultsButton>
          )}
        </RightColumn>
      </TopSection>
      {isFiltersOpen && chatMessage.pills && (
        <PillsContainer>{chatMessage.pills.join(", ")}</PillsContainer>
      )}
    </FilterContainer>
  );
};
