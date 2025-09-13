
"use client";

import { useState, useEffect } from "react";
import type { Task } from "@/lib/types";
import { ProgressTracker } from "@/components/ProgressTracker";

export default function StatsPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    
    useEffect(() => {
        try {
          const storedTasks = localStorage.getItem("focusflow-tasks");
          if (storedTasks) {
            const parsedTasks = JSON.parse(storedTasks).map((task: Task) => ({
              ...task,
              createdAt: new Date(task.createdAt),
              date: task.date ? new Date(task.date) : undefined,
            }));
            setTasks(parsedTasks);
          }
        } catch (error) {
            console.error("Failed to load tasks from local storage:", error);
        }
    }, []);


    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex-1 p-4 md:p-8">
                <header className="flex items-center justify-between border-b pb-4 mb-4 md:hidden">
                    <h1 className="font-headline text-2xl font-bold text-primary neon-glow">To do list</h1>
                    <div className="flex items-center gap-2">
                    </div>
                </header>
                <div className="mx-auto max-w-2xl">
                        <div className="flex items-center justify-between mb-6">
                        <h2 className="font-headline text-3xl font-semibold">Your Stats</h2>
                        </div>
                        <ProgressTracker tasks={tasks} />
                </div>
            </main>
        </div>
    )
}
