import { useState } from "react";
import TerminalScreen from "./components/Intro/TerminalScreen";
import ConfirmStart from "./components/Intro/ConfirmStart";
import Desktop from "./components/Desktop/Desktop";

import "./styles/App.css";

/**
 * Main App component that renders the initial UI and handles state changes.
 *
 * @returns {JSX.Element} The rendered App component.
 */

function App() {
  // State variables to track the application's state
  const [isStarted, setIsStarted] = useState(false); // Whether the app has started
  const [isFocused, setIsFocused] = useState(true); // Whether the app has focus
  const [isConfirmStartClicked, setIsConfirmStartClicked] = useState(false); // Whether the start confirmation screen has been clicked
  const [hasStarted, setHasStarted] = useState(false); // Whether the bootup sequence has started
  const [isFinalClicked, setIsFinalClicked] = useState(false); // Whether the final confirmation screen has been clicked

  /**
   * Updates the state of 'isConfirmStartClicked' based on the provided action.
   *
   * @param {boolean} action - The action to update the state with.
   */
  const handleConfirmStartClick = (action) => {
    setIsConfirmStartClicked(action);
    setHasStarted(true);
  };

  /**
   * Updates the state of 'isFocused' based on the provided action.
   *
   * @param {boolean} action - The action to update the state with.
   */
  const handleFocus = (action) => {
    setIsFocused(action);
  };

  const handleFinalClick = (action) => {
    setIsFinalClicked(action);
    setHasStarted(!action)
  };
  

  return (
    // Main container for the app
    <div
      className="App"
      // Event handlers for focus and keydown
      onClick={() => setIsFocused(false)}
      onKeyDown={() => setIsStarted(true)}
    >


      {/* Confirmation start screen */}
      {!isConfirmStartClicked && (
        <div className="intro_fadeout">
          <ConfirmStart
            toggleClicked={handleConfirmStartClick} // Handler for toggling the confirmation screen
            clickedState={isConfirmStartClicked} // State for whether the confirmation screen is clicked
            />
        </div>
      )}
      
      {/* Terminal screen */}
      {hasStarted && (
          <TerminalScreen
            hasStarted={isStarted} // State for whether the app has started
            hasFocused={isFocused} // State for whether the app has focus
            toggleFocused={handleFocus} // Handler for toggling the app's focus
            toggleClicked={handleFinalClick} // Handler for toggling the final confirmation screen
            clickedState={isFinalClicked} // State for whether the final confirmation screen is clicked
            />
      )}

      {isFinalClicked && <Desktop/> }
    </div>
  );
}

export default App;
