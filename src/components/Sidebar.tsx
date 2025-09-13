
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Timer, Settings, BarChart3, CheckCircle2, Folder, AlarmClock, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { AppContext } from "@/lib/context";

export function Sidebar() {
  const pathname = usePathname();
  const { viewMode } = useContext(AppContext);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/tasks", label: "All Tasks", icon: CheckCircle2 },
    { href: "/focus", label: "Focus", icon: AlarmClock },
    { href: "/stats", label: "Stats", icon: BarChart3 },
    { href: "/settings/categories", label: "Categories", icon: Folder },
    { href: "/read", label: "Read Me", icon: BookOpen },
  ];

  return (
    <div className={cn(
        "flex-col w-64 bg-sidebar border-r border-sidebar-border relative",
        viewMode === 'mobile' ? 'hidden' : 'hidden md:flex'
    )}>
        <div className="absolute inset-0 animated-gradient opacity-10 -z-10"></div>
        <div className="flex items-center justify-between h-20 px-6 border-b border-sidebar-border">
            <Link href="/" className="flex items-center gap-2">
                <h1 className="text-2xl font-headline font-bold text-primary neon-glow">To do list</h1>
            </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
            <Link
                key={item.href}
                href={item.href}
                className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-2.5 text-base font-medium transition-all",
                (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)))
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
            >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
            </Link>
            ))}
        </nav>
         <div className="mt-auto p-4 space-y-4">
            <div className="flex justify-between items-center border-t border-sidebar-border pt-4">
                <Link
                    href="/settings"
                    className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-2.5 text-base font-medium transition-all w-full",
                     pathname.startsWith('/settings')
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                    )}
                >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                </Link>
            </div>
        </div>
    </div>
  );
}
