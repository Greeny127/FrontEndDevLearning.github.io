import React from "react";
import TaskbarIcon from "./TaskbarItem";
import startmenu from "../../../Icons/Programs/start-menu.ico"
import "../../../styles/Desktop/Taskbar.css";

function Taskbar(props) {
  return (
    <div className="taskbar-comp">
      <TaskbarIcon imageIcon={startmenu} startIcon={true} tag="startmenu" />
      {props.children}
    </div>
  );
}

export default Taskbar;
