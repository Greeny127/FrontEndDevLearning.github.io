import React from "react";

import "../../styles/Intro/ConfirmScreen.css";

function ConfirmStart({ toggleClicked, clickedState }) {
  return (
    <div
      className={clickedState ? "fadeinDiv_true" : "fadeinDiv"}
      onClick={() => {
        clickedState = true;
        toggleClicked(true);
      }}
    >
      <h1 className={clickedState ? "startingMessage_hide" : "startingMessage"}>
        Click Anywhere
      </h1>
    </div>
  );
}

export default ConfirmStart;
