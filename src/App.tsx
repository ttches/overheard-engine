import { AppProviders } from "./providers/AppProviders";
import { ChatPanel } from "./components/ChatPanel";
import { IframeContainer } from "./components/IframeContainer";
import "./App.css";

function App() {
  return (
    <AppProviders>
      <ChatPanel />
      <IframeContainer />
    </AppProviders>
  );
}

export default App;
