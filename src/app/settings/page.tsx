

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRight, Folder, AlarmClock, Palette } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";


export default function SettingsPage() {
    const [workDuration, setWorkDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);
    const [notificationPermission, setNotificationPermission] = useState("default");
    const { toast } = useToast();

    useEffect(() => {
        try {
            const storedWork = localStorage.getItem("focusflow-work-duration");
            const storedBreak = localStorage.getItem("focusflow-break-duration");
            if (storedWork) {
                setWorkDuration(parseInt(storedWork, 10));
            }
            if (storedBreak) {
                setBreakDuration(parseInt(storedBreak, 10));
            }
            if ("Notification" in window) {
                setNotificationPermission(Notification.permission);
            }
        } catch (error) {
            console.error("Failed to load settings:", error);
        }
    }, []);

    const handleSaveChanges = () => {
        try {
            localStorage.setItem("focusflow-work-duration", workDuration.toString());
            localStorage.setItem("focusflow-break-duration", breakDuration.toString());
            toast({
                title: "Settings Saved!",
                description: "Your new timer durations have been saved.",
            })
        } catch (error) {
            console.error("Failed to save timer settings:", error);
            toast({
                title: "Error",
                description: "Could not save settings. Please try again.",
                variant: "destructive"
            })
        }
    }

    const handleNotificationRequest = async () => {
        if (!("Notification" in window)) {
            toast({ title: "Error", description: "This browser does not support desktop notifications.", variant: "destructive" });
            return;
        }

        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
        if (permission === "granted") {
            toast({ title: "Success!", description: "Notifications have been enabled." });
            new Notification("FocusFlow Notifications", {
                body: "You're all set up to receive task reminders!",
                icon: "/logo.png"
            });
        } else if (permission === "denied") {
            toast({ title: "Notifications Blocked", description: "You have denied notification permissions. You can enable them in your browser settings.", variant: "destructive" });
        } else {
             toast({ title: "Notifications Disabled", description: "You have not granted permission for notifications." });
        }
    }

    return (
        <div className="flex min-h-screen w-full flex-col">
             <main className="flex-1 p-4 md:p-8">
                <header className="flex items-center justify-between border-b pb-4 mb-4">
                    <h1 className="font-headline text-2xl font-bold text-primary">Settings</h1>
                    <div className="flex items-center gap-2">
                    </div>
                </header>
                <div className="mx-auto max-w-2xl space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance</CardTitle>
                            <CardDescription>Switch between light and dark mode, or customize your theme.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span>Toggle Light/Dark Mode</span>
                                <ThemeToggle />
                            </div>
                           <Button asChild variant="outline" className="w-full">
                                <Link href="/settings/theme" className="flex justify-between items-center w-full">
                                    <div className="flex items-center gap-2">
                                        <Palette className="h-4 w-4" />
                                        <span>Customize Theme</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                           </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Notifications & Alarms</CardTitle>
                            <CardDescription>Enable browser notifications to get reminders and alarms for your tasks.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {notificationPermission === 'granted' ? (
                                <p className="text-sm text-green-500">Notifications are enabled.</p>
                            ) : (
                                <Button onClick={handleNotificationRequest} disabled={notificationPermission === 'denied'}>
                                    <AlarmClock className="mr-2 h-4 w-4" />
                                    {notificationPermission === 'denied' ? 'Permissions Denied' : 'Enable Notifications'}
                                </Button>
                            )}
                             {notificationPermission === 'denied' && (
                                <p className="text-xs text-muted-foreground mt-2">
                                    You have blocked notifications. To enable them, please go to your browser's site settings for this page.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Pomodoro Timer</CardTitle>
                            <CardDescription>Customize your focus and break intervals.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="work-duration">Focus Duration (minutes)</Label>
                                <Input 
                                    id="work-duration" 
                                    type="number" 
                                    value={workDuration}
                                    onChange={(e) => setWorkDuration(parseInt(e.target.value, 10) || 0)}
                                    className="text-lg h-12"
                                />
                            </div>
                                <div className="space-y-2">
                                <Label htmlFor="break-duration">Break Duration (minutes)</Label>
                                <Input 
                                    id="break-duration" 
                                    type="number" 
                                    value={breakDuration}
                                    onChange={(e) => setBreakDuration(parseInt(e.target.value, 10) || 0)}
                                    className="text-lg h-12"
                                />
                            </div>
                            <Button onClick={handleSaveChanges}>Save Changes</Button>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Manage Categories</CardTitle>
                            <CardDescription>Add or remove your custom task categories.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <Button asChild variant="outline">
                                <Link href="/settings/categories" className="flex justify-between items-center w-full">
                                    <div className="flex items-center gap-2">
                                        <Folder className="h-4 w-4" />
                                        <span>Go to Categories</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                           </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}

    
