
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DEFAULT_CATEGORIES = ["Work", "Personal", "Study"];

export default function CategoriesPage() {
    const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
    const [newCategory, setNewCategory] = useState("");

    useEffect(() => {
        try {
            const storedCategories = localStorage.getItem("focusflow-categories");
            if (storedCategories) {
                const parsed = JSON.parse(storedCategories);
                setCategories(prev => [...new Set([...DEFAULT_CATEGORIES, ...parsed])]);
            }
        } catch (error) {
            console.error("Failed to load categories:", error);
        }
    }, []);

    const saveCategories = (newCategories: string[]) => {
        try {
            const customCategories = newCategories.filter(c => !DEFAULT_CATEGORIES.includes(c));
            localStorage.setItem("focusflow-categories", JSON.stringify(customCategories));
            setCategories(newCategories);
        } catch (error) {
            console.error("Failed to save categories:", error);
        }
    };
    
    const handleAddCategory = () => {
        if (newCategory.trim() && !categories.find(c => c.toLowerCase() === newCategory.trim().toLowerCase())) {
            const updatedCategories = [...categories, newCategory.trim()];
            saveCategories(updatedCategories);
            setNewCategory("");
        }
    };

    const handleRemoveCategory = (categoryToRemove: string) => {
        if (!DEFAULT_CATEGORIES.includes(categoryToRemove)) {
            const updatedCategories = categories.filter(c => c !== categoryToRemove);
            saveCategories(updatedCategories);
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-col">
             <main className="flex-1 p-4 md:p-8">
                <header className="flex items-center justify-between border-b pb-4 mb-4 md:hidden">
                    <h1 className="font-headline text-2xl font-bold text-primary neon-glow">To do list</h1>
                    <div className="flex items-center gap-2">
                    </div>
                </header>
                <div className="mx-auto max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Categories</CardTitle>
                            <CardDescription>Add or remove your custom task categories.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           <div className="flex items-center gap-2">
                             <Input 
                                id="new-category" 
                                type="text" 
                                placeholder="Enter category name"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                             />
                             <Button onClick={handleAddCategory}>
                                <Plus className="mr-2 h-4 w-4" /> Add
                             </Button>
                           </div>
                           <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <Badge key={category} variant="outline" className="flex items-center gap-2 pr-1">
                                    <span>{category}</span>
                                    {!DEFAULT_CATEGORIES.includes(category) && (
                                        <button 
                                            onClick={() => handleRemoveCategory(category)} 
                                            className="rounded-full hover:bg-muted p-0.5"
                                            aria-label={`Remove ${category} category`}
                                        >
                                            <X className="h-3 w-3"/>
                                        </button>
                                    )}
                                </Badge>
                            ))}
                           </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
