import { ChatPanel } from "./components/ChatPanel";
import "./App.css";

function App() {
  return (
    <>
      <ChatPanel />
      <div style={{ marginLeft: "400px", padding: "20px" }}>
        <h1>Overheard Engine</h1>
        <p>
          This is where the iframe will eventually go. The chat panel floats on
          the left.
        </p>
        <p>
          Content area starts at 400px from the left to account for the floating
          chat panel.
        </p>
      </div>
    </>
  );
}

export default App;
