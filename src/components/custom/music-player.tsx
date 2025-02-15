"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("loadedmetadata", () =>
        setDuration(audio.duration)
      );
      audio.addEventListener("timeupdate", () =>
        setCurrentTime(audio.currentTime)
      );
    }
    return () => {
      if (audio) {
        audio.removeEventListener("loadedmetadata", () =>
          setDuration(audio.duration)
        );
        audio.removeEventListener("timeupdate", () =>
          setCurrentTime(audio.currentTime)
        );
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-md p-4 w-full max-w-xs">
      <audio ref={audioRef} src="/path-to-your-lofi-music.mp3" loop />
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Now Playing</h2>
        <div className="flex items-center space-x-2">
          <Volume2 size={18} />
          <Slider
            id="volume"
            min={0}
            max={100}
            step={1}
            value={[volume]}
            onValueChange={handleVolumeChange}
            className="w-20"
          />
        </div>
      </div>
      <div className="text-sm font-medium mb-2">Lofi Beats</div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs">{formatTime(currentTime)}</span>
        <Slider
          min={0}
          max={duration}
          step={1}
          value={[currentTime]}
          onValueChange={handleSeek}
          className="w-32 mx-2"
        />
        <span className="text-xs">{formatTime(duration)}</span>
      </div>
      <div className="flex justify-center space-x-4">
        <Button variant="ghost" size="icon">
          <SkipBack size={20} />
        </Button>
        <Button variant="default" size="icon" onClick={togglePlay}>
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </Button>
        <Button variant="ghost" size="icon">
          <SkipForward size={20} />
        </Button>
      </div>
    </div>
  );
}
