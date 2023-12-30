import React, { useState, useEffect } from "react";
import {
  Terminal,
  useEventQueue,
  textLine,
  textWord,
  commandWord,
  commandLine,
} from "crt-terminal";

import background from "../../background.mp3";

const bannerText = `This experience requires headphones.`;

function TerminalScreen({ hasClicked }) {
  const [textSpeed, settextSpeed] = useState(1);
  const [audio] = useState(new Audio(background));
  const [playing, setPlaying] = useState(false);

  const eventQueue = useEventQueue();
  const { lock, print, loading } = eventQueue.handlers;

  useEffect(() => {
    lock(true); // Lock typing after component is rendered
    loading(true);

    audio.volume = 0.35;
    audio.play();

    const timeout = setTimeout(() => {
      loading(false);

      print([
        commandLine({
          words: [
            commandWord({
              characters: "Press enter to start.",
              prompt: "> ",
            }),
          ],
        }),
      ]);
    }, 6500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    return () => {};
  }, []);

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
          "Loading.....",
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
