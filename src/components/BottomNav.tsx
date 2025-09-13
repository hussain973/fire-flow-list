
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, BarChart3, CheckCircle2, Folder, AlarmClock, BookOpen, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { AppContext } from "@/lib/context";

export function BottomNav() {
  const pathname = usePathname();
  const { viewMode } = useContext(AppContext);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/tasks", label: "Tasks", icon: CheckCircle2 },
    { href: "/focus", label: "Focus", icon: AlarmClock },
    { href: "/stats", label: "Stats", icon: BarChart3 },
    { href: "/settings/theme", label: "Customize", icon: Palette },
    { href: "/read", label: "Read Me", icon: BookOpen },
    { href: "/settings", label: "Settings", icon: Settings },
  ];
  
  const NavLinks = () => (
     <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "inline-flex flex-col items-center justify-center rounded-full h-12 w-12 text-muted-foreground/80 hover:bg-muted/50 hover:text-primary group",
            (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))) && "text-primary bg-muted/90"
          )}
        >
          <item.icon className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium">{item.label}</span>
        </Link>
      ))}
     </>
  );

  if (viewMode === 'mobile') {
     return (
       <div className="absolute bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm">
          <div className="flex items-center justify-around gap-1 p-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex flex-col items-center justify-center text-muted-foreground/80 hover:text-primary group flex-1 p-1 rounded-md",
                   (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))) && "text-primary"
                )}
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-medium text-center">{item.label}</span>
              </Link>
            ))}
          </div>
       </div>
    );
  }

  return (
     <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-full border border-border bg-background/95 p-2 backdrop-blur-sm shadow-lg">
          <NavLinks />
        </div>
     </div>
  );
}
