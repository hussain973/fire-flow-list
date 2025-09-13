
"use client";

import { Briefcase, User, BookOpen, MoreVertical, Pencil, Trash2, ChevronDown, ChevronUp, Calendar, Clock, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Task, TaskPriority } from "@/lib/types";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";
import { format } from "date-fns";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const categoryStyles: Record<string, { icon: React.ElementType, className: string }> = {
  Work: { icon: Briefcase, className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-300 dark:border-blue-700" },
  Personal: { icon: User, className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-300 dark:border-green-700" },
  Study: { icon: BookOpen, className: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700" },
  default: { icon: Tag, className: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"}
};

const priorityStyles: Record<TaskPriority, string> = {
    Low: "border-gray-400",
    Medium: "border-yellow-500",
    High: "border-red-500",
}

export function TaskCard({ task, onToggleComplete, onDelete, onEdit }: TaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const categoryStyle = categoryStyles[task.category] || categoryStyles.default;
  const CategoryIcon = categoryStyle.icon;
  const categoryClassName = categoryStyle.className;
  const hasDetails = task.description || task.date || task.time;
  
  return (
    <Collapsible.Root asChild>
        <Card className={cn("transition-all hover:shadow-md", task.completed && "bg-muted/50")}>
            <div className="flex items-center gap-4 p-4">
                <div className={cn("w-1.5 h-10 rounded-full", priorityStyles[task.priority])}></div>
                <Checkbox 
                id={`task-${task.id}`}
                checked={task.completed} 
                onCheckedChange={() => onToggleComplete(task.id)}
                aria-label={`Mark task "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
                />
                <div className="flex-1">
                <label 
                    htmlFor={`task-${task.id}`}
                    className={cn("font-medium cursor-pointer", task.completed && "line-through text-muted-foreground")}
                >
                    {task.text}
                </label>
                </div>
                <Badge variant="outline" className={cn("hidden sm:inline-flex", categoryClassName)}>
                <CategoryIcon className="mr-1 h-3 w-3" />
                {task.category}
                </Badge>
                {hasDetails && (
                    <Collapsible.Trigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsExpanded(p => !p)}>
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            <span className="sr-only">{isExpanded ? 'Collapse' : 'Expand'} task details</span>
                        </Button>
                    </Collapsible.Trigger>
                )}
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Task options</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(task)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-destructive focus:text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </div>
             <Collapsible.Content asChild>
                <CardContent className="pt-0 pb-4 px-4 pl-16">
                    {task.description && <p className="text-sm text-muted-foreground mb-2">{task.description}</p>}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {task.date && (
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4"/>
                                <span>{format(new Date(task.date), "MMM d, yyyy")}</span>
                            </div>
                        )}
                        {task.time && (
                             <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4"/>
                                <span>{task.time}</span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Collapsible.Content>
        </Card>
    </Collapsible.Root>
  );
}
