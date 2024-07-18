// create a react component with the same name as the file
import React from "react";
import { useState, useEffect, useContext, createContext } from "react";

import Taskbar from "./Utilities/Taskbar";
import Window from "./Utilities/Window";

import TaskbarItem from "./Utilities/TaskbarItem";
import DesktopIcon from "./Utilities/DesktopIcon";
import DesktopArea from "./Utilities/DesktopArea";

import recyclebin from "../../Icons/RecycleBin/recycle-bin-empty.ico";
import folder from "../../Icons/Folder/folder.ico";
import internet from "../../Icons/Programs/internet.ico";
import notepad from "../../Icons/Programs/notepad.ico";
import "../../styles/Desktop/Desktop.css"

/**
 * Desktop component that renders the desktop UI.
 *
 * @returns {JSX.Element} The rendered Desktop component.
 */


export const WindowFocusList = createContext();

function Desktop() {
    // State variables to track the desktop's various windows
    const [windowList, setwindowList] = useState([]);
    
    const handleWindowList = (mode, tag, handle, content) => {
        // Add a new window to the list
        if (mode === "add") {
            setwindowList([...windowList, <Window key={tag} windowHandle={handle} windowContent={content} tag={tag} windowListHandler={handleWindowList}/>]);
        }
        // Remove the window with the given tag from the list
        else if (mode === "remove") {
            console.log(tag);
            setwindowList(windowList.filter((window) => window.props["tag"] !== tag));
        }
    };


    // Render the desktop UI\
    return (
        <div className="desktop">
            {/* Window components */}
            {windowList}

            <WindowFocusList.Provider value={windowList}>
            {/* Desktop icon component */}
            <DesktopArea>
                <DesktopIcon iconPath={recyclebin} tag="recycle_bin" windowListHandler={handleWindowList} title="Recycle Bin" content="recycle bin placeholder" />
                <DesktopIcon iconPath={folder} tag="system_folder" windowListHandler={handleWindowList} title="System Folder" content="system folder placeholder" />
                <DesktopIcon iconPath={internet} tag="internet" windowListHandler={handleWindowList} title="Internet Surfer" content="internet placeholder" />
                <DesktopIcon iconPath={notepad} tag="notepad" windowListHandler={handleWindowList} title="Notepad" content="notepad placeholder" />
            </DesktopArea>

            {/* Taskbar component */}
            <Taskbar className="taskBar">
                <TaskbarItem imageIcon={internet} tag="internet" windowListHandler={handleWindowList} title="Internet Surfer" content="internet placeholder"/>
                <TaskbarItem imageIcon={notepad} tag="notepad" windowListHandler={handleWindowList} title="Notepad" content="notepad placeholder"/>
            </Taskbar>
            </WindowFocusList.Provider>
        </div>
    );
}

export default Desktop;