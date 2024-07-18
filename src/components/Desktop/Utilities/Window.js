import React, { useEffect, useContext, useState } from "react";
import Draggable from 'react-draggable';
import "../../../styles/Desktop/Window.css";

/**
 * Window component that allows dragging and handles focus.
 *
 * @param {Object} props - The props object.
 * @return {JSX.Element} The rendered Window component.
 */

function Window({windowHandle, windowContent, tag, windowListHandler}) {
  return (
    // Wrap the window with Draggable to allow dragging
    <Draggable
      handle=".windowHandle"
      onMouseDown={() => {}}
    >
      <div
        // Set the class name based on props and focus state
        className={`Window`}
      >
        {/* Window handle */}
        <div className="windowHandle">
          {windowHandle}
          <button className="windowClose" onClick={() => {windowListHandler("remove", tag);}}>X</button>
        </div>
        {/* Window content */}
        {windowContent}
      </div>
    </Draggable>
  );
}

export default Window;
