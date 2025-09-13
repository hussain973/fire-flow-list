
"use client";

import { CheckCircle2, Flame, ListChecks, Target } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Task } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProgressTrackerProps {
  tasks: Task[];
}

export function ProgressTracker({ tasks }: ProgressTrackerProps) {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Streak would be calculated based on DB data in a real app
  const streak = 5;

  const stats = [
    {
        title: "Tasks Today",
        value: totalTasks,
        icon: ListChecks,
        color: "neon-glow-blue"
    },
    {
        title: "Tasks Completed",
        value: completedTasks,
        icon: CheckCircle2,
        color: "neon-glow-green"
    },
    {
        title: "Completion Rate",
        value: `${completionPercentage}%`,
        icon: Target,
        color: "neon-glow-purple"
    },
    {
        title: "Current Streak",
        value: `${streak} days`,
        icon: Flame,
        color: "neon-glow-orange"
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat) => (
            <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className={cn("h-4 w-4", stat.color)} />
                </CardHeader>
                <CardContent>
                    <div className={cn("text-2xl font-bold", stat.color)}>{stat.value}</div>
                </CardContent>
            </Card>
        ))}
    </div>
  );
}
