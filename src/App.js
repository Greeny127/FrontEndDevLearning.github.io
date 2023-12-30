import { useState } from "react";
import TerminalScreen from "./components/Intro/TerminalScreen";
import ConfirmStart from "./components/Intro/ConfirmStart";

import "./styles/App.css";

function App() {
  const [clicked, setclicked] = useState(false);
  const [started, setstarted] = useState(false);
  const [focused, setfocused] = useState(true);

  const handleClicked = (action) => {
    setclicked(action);
  };

  const handleFocused = (action) => {
    setfocused(action);
  };

  return (
    <div
      className="App"
      onClick={() => {
        setfocused(false);
      }}
      onKeyDown={() => {
        setstarted(true);
      }}
    >
      {
        <div className="intro_fadeout">
          <ConfirmStart toggleClicked={handleClicked} clickedState={clicked} />
        </div>
      }
      {clicked ? (
        <div className="intro_terminal_screen">
          <TerminalScreen
            hasStarted={started}
            hasFocused={focused}
            toggleFocused={handleFocused}
          />
        </div>
      ) : null}
    </div>
  );
}

export default App;
