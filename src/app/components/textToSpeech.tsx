import React, { useState, useEffect, ChangeEvent } from "react";

interface TextToSpeechProps {
  text: string;
  volume: number;
  voice: SpeechSynthesisVoice | null;
  pitch: number;
  rate: number;
  btnSize: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text, volume, voice, pitch, rate, btnSize }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else if (utterance) {
      utterance.voice = voice;
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;
      synth.speak(utterance);
    }

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;
    synth.pause();
    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsPaused(false);
  };

  return (
    <div>
      <div className="flex flex-row justify-center gap-2 my-2">
        <button className={`btn flex-none ${btnSize}`} onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</button>
        <button className={`btn flex-none ${btnSize}`} onClick={handlePause}>Pause</button>
        <button className={`btn flex-none ${btnSize}`} onClick={handleStop}>Stop</button>
      </div>
    </div>
  );
};

export default TextToSpeech;