import React, { useState, useEffect } from "react";
import {
  Terminal,
  useEventQueue,
  textLine,
  textWord,
  commandWord,
  commandLine,
} from "crt-terminal";

import "../../styles/Intro/TerminalScreen.css";
import background from "../../background.mp3";
import morsemp3 from "../../morse.mp3";

const calculateAge = (birthdate) => {
  var now = new Date();
  var birth = new Date(birthdate);

  var years = now.getFullYear() - birth.getFullYear();
  var months = now.getMonth() - birth.getMonth();
  var days = now.getDate() - birth.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  if (days < 0) {
    months--;
    var previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += previousMonth.getDate();
  }

  return {
    years: years,
    months: months,
    days: days,
  };
};

const birthdate = "2006-12-12"; // replace with the actual birthdate
const age = calculateAge(birthdate);

const introText = `Name: Sohan
${
  "Age: " +
  age.years +
  " Years, " +
  age.months +
  " Months, " +
  age.days +
  " Days"
}
Gender: Male
From: India
Likes: A lot of things
Dislikes: A lot of things

INTIALISING MAIN PORTFOLIO.
`;
const bannerText = `This experience reccomends headphones.`;
const bootupText = `Booting from floppy...
Loading S.O.H.A.N WEBSITE 1.0...
Starting Portfolio...

Greeny127 is testing extended memory...done.
C:\\>LH /L:0;1,45456 /S C:\\DOS\\BROWSER.EXE
C:\\>LH /L:0;2,31072 /S C:\\DOS\\CATS.COM
C:\\>LH /L:0;3,25088 /S C:\\DOS\\NOTAVIRUS.COM
C:\\>LH /L:0;4,20480 /S C:\\DOS\\AVIRUS /D:MSCD001
C:\\>SET BLASTER=A220 I5 D1 H5 P330 E620 T6
C:\\>SET SOUND=C:\SB16
C:\\>C:\\SB16\DIAGNOSE /S
C:\\>C:\\SB16\AWEUTIL /S
C:\\>C:\\SB16\MIXERSET /P /Q
C:\\>C:\\NC\NC.EXE

C:\>Loading the disk cache utility from developers memories.
C:\>Loading the mouse driver BRAIN.COM into high memory area to prevent crash of developer.
C:\>Loading the command line editing utility DOSKEY.COM into high memory area with 25088 bytes of memory.
C:\>(DEPRECATED - USE WiFi) Loading the CD-ROM driver MSCDEX.EXE into high memory area with 20480 bytes of memory and assigning the drive letter MSCD001.
C:\>Setting the environment variables for the sound card - (I worked hard on this :c)
C:\>Setting the environment variable SOUND to the directory C:\SB16 where the sound card drivers and utilities are located.


PLEASE WAIT.`;

function TerminalScreen({
  hasStarted,
  hasFocused,
  toggleLoaded,
  toggleFocused,
}) {
  const [textSpeed, settextSpeed] = useState(1);
  const [printing, setprinting] = useState(false);
  const [audio] = useState(new Audio(background));
  const [morse] = useState(new Audio(morsemp3));

  const eventQueue = useEventQueue();
  const { lock, print, loading, focus, clear } = eventQueue.handlers;

  // For the starting loading screen
  useEffect(() => {
    lock(true); // Lock typing after component is rendered
    loading(true);
    lock(false);

    audio.volume = 0.4;
    audio.play(); // Play song after render of console screen

    const timeout = setTimeout(() => {
      loading(false);

      print([
        commandLine({
          words: [
            commandWord({
              characters: "Press ANY KEY to start.",
              prompt: "> ",
            }),
          ],
        }),
      ]);
    }, 6500);

    toggleLoaded(true);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // For retaining focus on terminal
  useEffect(() => {
    focus();
    toggleFocused(true);
    console.log("hiii");
  }, [hasFocused]);

  // For the bootup sequence after loading
  useEffect(() => {
    if (hasStarted) {
      settextSpeed(5);
      print([
        textLine({
          words: [
            textWord({
              characters: bootupText,
            }),
          ],
        }),
      ]);

      loading(true);

      const timeout = setTimeout(() => {
        clear();
        morse.play();
        settextSpeed(1);

        print([
          textLine({
            words: [
              textWord({
                characters: introText,
              }),
            ],
          }),
        ]);
      }, 16000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [hasStarted]);

  return (
    <Terminal
      queue={eventQueue}
      printer={{ charactersPerTick: textSpeed }}
      loader={{
        slides: [
          "Loading",
          "Loading.",
          "Loading..",
          "Loading...",
          "Loading....",
        ],
      }}
      banner={[
        textLine({
          className: "bannerText",
          words: [textWord({ characters: bannerText })],
        }),
      ]}
      onCommand={(command) => {
        settextSpeed(5); // Reset typing speed

        print([
          textLine({
            words: [textWord({ characters: command })],
          }),
        ]);
      }}
    />
  );
}

export default TerminalScreen;
