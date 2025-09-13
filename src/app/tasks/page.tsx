
"use client";

import { useState, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/TaskCard";
import type { Task } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TaskForm } from "@/components/TaskForm";
import { useTasks } from "@/hooks/use-tasks";

const DEFAULT_CATEGORIES = ["Work", "Personal", "Study"];

export default function AllTasksPage() {
  const { tasks, updateTask, deleteTask, toggleTask } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [allCategories, setAllCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  
  const [filter, setFilter] = useState<Record<string, boolean>>({
    Work: true,
    Personal: true,
    Study: true,
  });

   useEffect(() => {
        try {
            const storedCategories = localStorage.getItem("focusflow-categories");
            if (storedCategories) {
                const customCategories = JSON.parse(storedCategories);
                const newCategories = [...new Set([...DEFAULT_CATEGORIES, ...customCategories])];
                setAllCategories(newCategories);

                setFilter(prevFilter => {
                    const newFilter = {...prevFilter};
                    newCategories.forEach(cat => {
                        if (!(cat in newFilter)) {
                            newFilter[cat] = true;
                        }
                    });
                    return newFilter;
                });
            }
        } catch (error) {
            console.error("Failed to load categories:", error);
        }
    }, [isFormOpen]); 


  const handleEditTask = (updatedTask: Task) => {
    updateTask(updatedTask);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  const handleToggleComplete = (taskId: string) => {
    toggleTask(taskId);
  };
  
  const openEditForm = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };
  
  const filteredTasks = tasks.filter(task => filter[task.category]);

  return (
    <div className="flex min-h-screen w-full flex-col">
        <main className="flex-1 p-4 md:p-8">
            <header className="flex items-center justify-between border-b pb-4 mb-4 md:hidden">
                 <h1 className="font-headline text-2xl font-bold text-primary neon-glow">To do list</h1>
                 <div className="flex items-center gap-2">
                 </div>
            </header>
            <div className="mx-auto max-w-4xl">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-headline text-3xl font-semibold">All Tasks</h2>
                 <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <SlidersHorizontal className="h-4 w-4" />
                        <span className="sr-only">Filter tasks</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                      <DropdownMenuLabel>Filter by category</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                        {allCategories.map(category => (
                            <DropdownMenuCheckboxItem
                                key={category}
                                checked={filter[category]}
                                onCheckedChange={(checked) => setFilter(f => ({...f, [category]: !!checked}))}
                            >
                                {category}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                 </div>
              </div>

              <div className="mt-6 space-y-4">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onToggleComplete={handleToggleComplete} 
                      onDelete={handleDeleteTask}
                      onEdit={() => openEditForm(task)}
                    />
                  ))
                ) : (
                  <div className="flex h-48 flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted">
                    <p className="text-muted-foreground">No tasks found. Add one on the Home page!</p>
                  </div>
                )}
              </div>
            </div>
        </main>

      <TaskForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        onSubmit={handleEditTask}
        task={editingTask}
      />
    </div>
  );
}
