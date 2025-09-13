"use client";

import { useState, useEffect, useMemo } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_WORK_MINUTES = 25;
const DEFAULT_BREAK_MINUTES = 5;

export function PomodoroTimer() {
  const [workMinutes, setWorkMinutes] = useState(DEFAULT_WORK_MINUTES);
  const [breakMinutes, setBreakMinutes] = useState(DEFAULT_BREAK_MINUTES);

  const [mode, setMode] = useState<"work" | "break">("work");
  const [timeRemaining, setTimeRemaining] = useState(workMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedWork = localStorage.getItem("focusflow-work-duration");
      const storedBreak = localStorage.getItem("focusflow-break-duration");
      const newWorkMinutes = storedWork ? parseInt(storedWork, 10) : DEFAULT_WORK_MINUTES;
      const newBreakMinutes = storedBreak ? parseInt(storedBreak, 10) : DEFAULT_BREAK_MINUTES;
      
      setWorkMinutes(newWorkMinutes);
      setBreakMinutes(newBreakMinutes);

      if (!isActive) {
          setTimeRemaining(mode === 'work' ? newWorkMinutes * 60 : newBreakMinutes * 60);
      }
    } catch (error) {
      console.error("Failed to load timer settings:", error);
    }
  }, [isActive, mode]);

  const totalDuration = useMemo(() => (mode === "work" ? workMinutes : breakMinutes) * 60, [mode, workMinutes, breakMinutes]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsActive(false);
      const newMode = mode === "work" ? "break" : "work";
      setMode(newMode);
      setTimeRemaining((newMode === "work" ? workMinutes : breakMinutes) * 60);
      toast({
        title: newMode === 'work' ? "Time for a focus session!" : "Starting next session.",
        description: newMode === 'work' ? `Starting ${workMinutes} minutes of work.` : `Take a ${breakMinutes}-minute break.`,
      });
      // Automatically start next session
      setIsActive(true);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timeRemaining, mode, toast, workMinutes, breakMinutes]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMode("work");
    setTimeRemaining(workMinutes * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = timeRemaining === totalDuration ? 0 : circumference - (timeRemaining / totalDuration) * circumference;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Focus Timer</CardTitle>
        <CardDescription>
          Use the Pomodoro Technique to break down work into intervals.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-6 pt-6">
        <div className="flex items-center gap-2 mb-4">
            <Button variant={mode === 'work' ? 'default' : 'outline'} onClick={() => { setMode('work'); setIsActive(false); setTimeRemaining(workMinutes*60)}}>Focus ({workMinutes} min)</Button>
            <Button variant={mode === 'break' ? 'default' : 'outline'} onClick={() => { setMode('break'); setIsActive(false); setTimeRemaining(breakMinutes*60)}}>Break ({breakMinutes} min)</Button>
        </div>
        <div className="relative h-52 w-52">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="hsl(var(--muted))"
              strokeWidth="12"
              fill="transparent"
            />
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="hsl(var(--primary))"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-1000 ease-linear neon-glow"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-5xl font-bold text-foreground">
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={toggleTimer} size="lg" className="w-32">
            {isActive ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button onClick={resetTimer} variant="outline" size="icon">
            <RotateCcw className="h-5 w-5" />
            <span className="sr-only">Reset Timer</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
