import React, { useState, useEffect } from "react";
import {
  Terminal,
  useEventQueue,
  textLine,
  textWord,
  commandWord,
  commandLine,
  anchorWord,
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
Loading WEBSITE 1.0.1...

Greeny127 is testing extended memory...done.
C:\\>LH /L:0;1,45456 /S C:\\DOS\\BROWSER.EXE
C:\\>LH /L:0;2,31072 /S C:\\DOS\\CATS.COM
C:\\>LH /L:0;3,25088 /S C:\\DOS\\NOTAVIRUS.COM
C:\\>LH /L:0;4,20480 /S C:\\DOS\\AVIRUS.COM
C:\\>SET BLASTER=A220 I5 D1 H5 P330 E620 T6
C:\\>SET SOUND=C:\\SB16
C:\\>C:\\SB16\\DIAGNOSE /S
C:\\>C:\\SB16\\AWEUTIL /S
C:\\>C:\\SB16\\MIXERSET /P /Q
C:\\>C:\\NC\\NC.EXE

Loading sanity path for developer.
Loading developer memories - 2056kb.
Creating file containing deviceid and hash.
Loading the CD-ROM driver MSCDEX.EXE with "Hunter X Hunter" into high memory area with 20480 bytes of memory. (DEPRECATED)
Setting the environment variables for the program - (I worked hard on this :c)
Setting authentication to allow access.

PLEASE WAIT`;

function TerminalScreen({ hasStarted, hasFocused, toggleFocused }) {
  const [textSpeed, settextSpeed] = useState(1);
  const [authenticated, setauthenticated] = useState(false);
  const [audio] = useState(new Audio(background));
  const [morse] = useState(new Audio(morsemp3));

  const eventQueue = useEventQueue();
  const { lock, print, loading, focus, clear } = eventQueue.handlers;

  // For retaining focus on terminal
  useEffect(() => {
    focus();
    toggleFocused(true);
  }, [hasFocused]);

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
              characters: "Press ANY KEY to load program.",
              prompt: "> ",
            }),
          ],
        }),
      ]);
    }, 6500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // For the bootup sequence after loading + flag for second sequence
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

      // After boot up sequence, add flag to start next sequence
      loading(true);

      const timeout = setTimeout(() => {
        loading(false);

        print([
          commandLine({
            words: [
              commandWord({
                characters: "Authentication setup done.",
                prompt: "> ",
              }),
            ],
          }),
        ]);

        print([
          textLine({
            words: [
              anchorWord({
                characters: "Click To Authenticate",
                onClick: () => {
                  setauthenticated(true);
                },
              }),
            ],
          }),
        ]);
      }, 14000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [hasStarted]);

  // Intro sequence 2
  useEffect(() => {
    if (authenticated) {
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

      loading(true);

      const timeout = setTimeout(() => {
        loading(false);
        print([
          commandLine({
            words: [
              commandWord({
                characters: "INITIALISED PROGRAM.",
                prompt: "> ",
              }),
            ],
          }),
        ]);

        print([
          textLine({
            words: [
              anchorWord({
                characters: "Click To start program.",
                onClick: () => {},
              }),
            ],
          }),
        ]);
      }, 6000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [authenticated]);

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
