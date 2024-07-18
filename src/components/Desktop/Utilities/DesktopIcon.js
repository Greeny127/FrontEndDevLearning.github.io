import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { WindowFocusList } from "../Desktop";

function DesktopIcon({iconPath, tag, title, content, windowListHandler}) {
    const [hasClicked, sethasClicked] = useState(false);
    const windowList = useContext(WindowFocusList);

    useEffect(() => {
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
    <div onDoubleClick={() => {
        hasClickedHandler();
      }} className='desktopIconDiv'> 
        <img src={iconPath} className='desktopIconImage'/>
        <h3>{title}</h3>
    </div>
    )
}

export default DesktopIcon