import React, { useState, useContext, useEffect } from "react";
import { WindowFocusList } from "../Desktop";

function TaskbarItem({ imageIcon, startIcon, tag, title, content, windowListHandler }) {
  const [hasClicked, sethasClicked] = useState(false);
  const windowList = useContext(WindowFocusList);

  useEffect(() => {
    console.log(windowList.filter((window) => window.props.tag === tag))
    if (tag){
      if (windowList.filter((window) => window.props.tag === tag)[0]) {
        sethasClicked(state => true);
      }
      else{
        sethasClicked(state => false);
      }

    }  
  }, [windowList]);

  const hasClickedHandler = () => {
    if (hasClicked) {
      // Remove the window with the given tag from the list
      // windowFocusListHandler("remove", tag);
      windowListHandler("remove", tag);
      sethasClicked(false);
    } else {
      // Add a new window to the list
      // windowFocusListHandler("add", tag);
      windowListHandler("add", tag, title, content);
      sethasClicked(true);
    }
  };

  return (
    <div
      className={
        startIcon
          ? "taskbarIconNotClicked"
          : hasClicked
          ? "taskbarIconClicked"
          : "taskbarIconNotClicked"
      }
      onMouseDown={() => {
        if (tag !== "startmenu"){

          hasClickedHandler();
        }
      }}
    >
      <img src={imageIcon} className={"taskbarIconImage"} />
    </div>
  );
}

export default TaskbarItem;
