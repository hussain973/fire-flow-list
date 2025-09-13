
"use client";

import { useState, useEffect, useContext } from "react";
import { SlidersHorizontal, Plus, Zap, Smartphone, Monitor, Tablet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/TaskCard";
import type { Task, TaskCategory } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TaskForm } from "@/components/TaskForm";
import { QuickTaskForm } from "@/components/QuickTaskForm";
import { ProgressTracker } from "@/components/ProgressTracker";
import { useTasks } from "@/hooks/use-tasks";
import { AppContext } from "@/lib/context";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const DEFAULT_CATEGORIES = ["Work", "Personal", "Study"];

export default function HomePage() {
  const { tasks, addTask, updateTask, deleteTask, toggleTask } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isQuickFormOpen, setIsQuickFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [allCategories, setAllCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const { viewMode, setViewMode } = useContext(AppContext);
  
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
    }, [isFormOpen, isQuickFormOpen]);


    const handleQuickAddTask = (data: { text: string; description?: string; category: TaskCategory }) => {
        const newTaskData: Omit<Task, 'id' | 'createdAt' | 'completed'> = {
            text: data.text.trim(),
            description: data.description,
            category: data.category,
            priority: 'Medium',
        };
        addTask(newTaskData);
    };

    const handleAddTask = (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
        addTask(task);
    };

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

  const openAddForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };
  
  const activeTasks = tasks.filter(task => !task.completed && filter[task.category]);

  return (
    <div className="flex min-h-screen w-full flex-col">
        <main className="flex-1 p-4 md:p-8">
            <header className={cn(
              "flex items-center justify-between border-b pb-4 mb-4",
              viewMode === 'desktop' && 'md:hidden'
            )}>
                 <h1 className="font-headline text-2xl font-bold text-primary neon-glow">To do list</h1>
                 <div className="flex items-center gap-2">
                 </div>
            </header>
            <div className="mx-auto max-w-4xl space-y-8">
              <div>
                  <div className="flex justify-end mb-4">
                    <ThemeToggle />
                  </div>
                  <ProgressTracker tasks={tasks} />
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <h2 className="font-headline text-3xl font-semibold">Today's Tasks</h2>
                   <div className="flex items-center gap-2">
                      <Button variant={viewMode === 'mobile' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('mobile')}>
                        <Smartphone />
                         <span className="sr-only">Mobile view</span>
                      </Button>
                      <Button variant={viewMode === 'tablet' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('tablet')}>
                        <Tablet />
                         <span className="sr-only">Tablet view</span>
                      </Button>
                       <Button variant={viewMode === 'desktop' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('desktop')}>
                        <Monitor />
                         <span className="sr-only">Desktop view</span>
                      </Button>
                      <Button variant="outline" onClick={() => setIsQuickFormOpen(true)}>
                          <Zap />
                          <span className={cn(viewMode === 'mobile' ? 'sr-only' : 'ml-2')}>Quick Add</span>
                      </Button>
                      <Button onClick={openAddForm}>
                          <Plus />
                          <span className={cn(viewMode === 'mobile' ? 'sr-only' : 'ml-2')}>New Task</span>
                      </Button>
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

                <div className="space-y-4">
                  {activeTasks.length > 0 ? (
                    activeTasks.map(task => (
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
                      <p className="text-muted-foreground">No active tasks. Add one to get started!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
        </main>

        <QuickTaskForm 
            isOpen={isQuickFormOpen}
            setIsOpen={setIsQuickFormOpen}
            onSubmit={handleQuickAddTask}
        />

        <TaskForm
            isOpen={isFormOpen}
            setIsOpen={setIsFormOpen}
            onSubmit={editingTask ? handleEditTask : handleAddTask}
            task={editingTask}
        />
    </div>
  );
}
