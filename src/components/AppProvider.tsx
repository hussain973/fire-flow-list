
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { BottomNav } from '@/components/BottomNav';
import { AppContext, ViewMode } from '@/lib/context';
import { useIsMobile } from '@/hooks/use-mobile';
import { ThemeProvider } from './ThemeProvider';
import { ScrollArea } from './ui/scroll-area';

export function AppProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (isMobile) {
        setViewMode('mobile');
      } else {
        setViewMode('desktop');
      }
    }
  }, [isMobile, isMounted]);

  if (!isMounted) {
      return null;
  }
  
  const viewClasses = {
    mobile: 'max-w-sm bg-background/80 backdrop-blur-sm',
    tablet: 'max-w-2xl bg-background/80 backdrop-blur-sm',
    desktop: ''
  };

  if (viewMode === 'desktop') {
    return (
       <ThemeProvider>
        <AppContext.Provider value={{ viewMode, setViewMode }}>
          <div className="flex min-h-screen w-full flex-col animated-gradient">
            <div className="flex-1">
              {children}
            </div>
          </div>
          <BottomNav />
        </AppContext.Provider>
       </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <AppContext.Provider value={{ viewMode, setViewMode }}>
        <div className="flex min-h-screen w-full">
          <div className={cn(
            "flex flex-1 justify-center transition-all duration-300 ease-in-out animated-gradient p-4"
          )}>
            <div className={cn(
                "w-full flex-1 md:pb-0 pb-16 transition-all duration-300 ease-in-out rounded-lg relative overflow-hidden",
                viewClasses[viewMode]
              )}>
                <ScrollArea className="h-full w-full">
                  <div className="md:pb-0 pb-16">
                    {children}
                  </div>
                </ScrollArea>
                 <BottomNav />
            </div>
          </div>
        </div>
      </AppContext.Provider>
    </ThemeProvider>
  );
}
