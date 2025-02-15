"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function PomodoroTimer() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [workDuration, setWorkDuration] = useState(25);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(workDuration * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const progress = 1 - time / (workDuration * 60);

  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-md p-6 w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Pomodoro Timer
      </h2>
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-muted-foreground"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <circle
            className="text-primary"
            strokeWidth="4"
            strokeDasharray={283}
            strokeDashoffset={283 * progress}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold">{formatTime(time)}</span>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mb-6">
        <Button variant="outline" size="icon" onClick={toggleTimer}>
          {isActive ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        <Button variant="outline" size="icon" onClick={resetTimer}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="work-duration" className="text-sm font-medium">
            Work Duration
          </label>
          <span className="text-sm font-medium">{workDuration} min</span>
        </div>
        <Slider
          id="work-duration"
          min={1}
          max={60}
          step={1}
          value={[workDuration]}
          onValueChange={(value) => {
            setWorkDuration(value[0]);
            if (!isActive) setTime(value[0] * 60);
          }}
        />
      </div>
    </div>
  );
}
