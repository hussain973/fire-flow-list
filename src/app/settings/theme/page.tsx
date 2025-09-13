
"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { THEME_COLORS } from "@/lib/colors";

export default function ThemePage() {
    const [selectedColor, setSelectedColor] = useState("262.1 83.3% 57.8%");
    const { toast } = useToast();

    useEffect(() => {
        try {
            const storedColor = localStorage.getItem("focusflow-theme-color");
            if (storedColor) {
                setSelectedColor(storedColor);
                document.documentElement.style.setProperty('--primary', storedColor);
                document.documentElement.style.setProperty('--ring', storedColor);
            }
        } catch (error) {
            console.error("Failed to load theme color:", error);
        }
    }, []);
    
    const handleColorSelect = (hsl: string) => {
        setSelectedColor(hsl);
        document.documentElement.style.setProperty('--primary', hsl);
        document.documentElement.style.setProperty('--ring', hsl);
    };

    const handleSaveChanges = () => {
        try {
            localStorage.setItem("focusflow-theme-color", selectedColor);
            toast({
                title: "Theme Saved!",
                description: "Your new color theme has been applied.",
            });
        } catch (error) {
             toast({
                title: "Error",
                description: "Could not save theme. Please try again.",
                variant: "destructive"
            });
            console.error("Failed to save theme color:", error);
        }
    };
    
    return (
        <div className="flex min-h-screen w-full flex-col">
             <main className="flex-1 p-4 md:p-8">
                <header className="flex items-center justify-between border-b pb-4 mb-4">
                    <h1 className="font-headline text-2xl font-bold text-primary">Customize Theme</h1>
                </header>
                <div className="mx-auto max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Choose Your Accent Color</CardTitle>
                            <CardDescription>Select a color to personalize your app experience. The changes will be applied instantly.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                           <div className="grid grid-cols-7 sm:grid-cols-10 gap-4">
                            {THEME_COLORS.map(({ name, hsl }) => (
                                <button
                                    key={name}
                                    onClick={() => handleColorSelect(hsl)}
                                    className={cn(
                                        "h-10 w-10 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 flex items-center justify-center",
                                        selectedColor === hsl ? "border-primary" : "border-transparent"
                                    )}
                                    style={{ backgroundColor: `hsl(${hsl})`}}
                                    aria-label={`Select ${name} color`}
                                >
                                    {selectedColor === hsl && <Check className="h-6 w-6 text-primary-foreground" />}
                                </button>
                            ))}
                           </div>
                           <Button onClick={handleSaveChanges}>Save Changes</Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
