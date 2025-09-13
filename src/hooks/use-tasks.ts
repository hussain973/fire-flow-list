
"use client";

import { useState, useEffect, useCallback } from "react";
import type { Task } from "@/lib/types";
import { useNotifications } from "./use-notifications";

const TASKS_STORAGE_KEY = "focusflow-tasks";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { scheduleNotification, cancelNotification } = useNotifications();

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
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
    } finally {
        setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
        try {
            localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
            // When tasks are loaded, schedule notifications for upcoming tasks
            tasks.forEach(task => {
              if (!task.completed) {
                scheduleNotification(task);
              }
            });
        } catch (error) {
            console.error("Failed to save tasks to local storage:", error);
        }
    }
  }, [tasks, isLoaded, scheduleNotification]);

  const addTask = useCallback((taskData: Omit<Task, "id" | "createdAt" | "completed">) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date(),
    };
    setTasks(prev => [newTask, ...prev]);
    scheduleNotification(newTask);
  }, [scheduleNotification]);

  const updateTask = useCallback((updatedTask: Task) => {
    setTasks(prev => prev.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    // Reschedule notification in case date/time changed
    scheduleNotification(updatedTask);
  }, [scheduleNotification]);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(task => {
        if (task.id === taskId) {
            cancelNotification(taskId);
            return false;
        }
        return true;
    }));
  }, [cancelNotification]);

  const toggleTask = useCallback((taskId: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          const updatedTask = { ...task, completed: !task.completed };
          if (updatedTask.completed) {
            cancelNotification(taskId);
          } else {
            scheduleNotification(updatedTask);
          }
          return updatedTask;
        }
        return task;
      })
    );
  }, [scheduleNotification, cancelNotification]);

  return { tasks, addTask, updateTask, deleteTask, toggleTask };
}
