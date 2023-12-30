import { useState } from "react";
import TerminalScreen from "./components/Intro/TerminalScreen";
import ConfirmStart from "./components/Intro/ConfirmStart";

import "./styles/Intro/TerminalScreen.css";
import "./styles/App.css";

function App() {
  const [clicked, setclicked] = useState(false);

  const handleClicked = (action) => {
    setclicked(action);
  };

  return (
    <div className="App">
      {
        <div className="intro_fadeout">
          <ConfirmStart toggleClicked={handleClicked} clickedState={clicked} />
        </div>
      }
      {clicked ? (
        <div className="intro_terminal_screen">
          <TerminalScreen hasClicked={clicked} />
        </div>
      ) : null}
    </div>
  );
}

export default App;
