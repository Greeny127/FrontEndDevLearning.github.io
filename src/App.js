import { useState } from "react";
import TerminalScreen from "./components/Intro/TerminalScreen";
import ConfirmStart from "./components/Intro/ConfirmStart";

import "./styles/App.css";

function App() {
  const [clicked, setclicked] = useState(false);
  const [started, setstarted] = useState(false);
  const [loaded, setloaded] = useState(false);
  const [focused, setfocused] = useState(true);

  const handleClicked = (action) => {
    setclicked(action);
  };

  const handleFocused = (action) => {
    setfocused(action);
  };

  const handleLoaded = (action) => {
    setloaded(action);
  };

  return (
    <div
      className="App"
      onClick={() => {
        setfocused(false);
      }}
      onKeyDown={() => {
        if (loaded) {
          setstarted(true);
        }
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
            toggleLoaded={handleLoaded}
            toggleFocused={handleFocused}
          />
        </div>
      ) : null}
    </div>
  );
}

export default App;
