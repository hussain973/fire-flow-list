
"use client";

import { PomodoroTimer } from "@/components/PomodoroTimer";

export default function FocusPage() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex-1 p-4 md:p-8">
                <header className="flex items-center justify-between border-b pb-4 mb-4 md:hidden">
                    <h1 className="font-headline text-2xl font-bold text-primary neon-glow">To do list</h1>
                    <div className="flex items-center gap-2">
                    </div>
                </header>
                <div className="mx-auto max-w-2xl">
                    <PomodoroTimer />
                </div>
            </main>
        </div>
    )
}
