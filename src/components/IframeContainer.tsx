import styled from "styled-components";
import { useChatHistoryContext } from "../hooks/useChatHistoryContext";

const IframeWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: calc(100% - 40px);
  height: 100vh;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

export const IframeContainer = () => {
  const { currentIframeUrl } = useChatHistoryContext();

  const url = currentIframeUrl || "https://www.carvana.com/cars";

  return (
    <IframeWrapper>
      <StyledIframe src={url} title="Dynamic Content" />
    </IframeWrapper>
  );
};
