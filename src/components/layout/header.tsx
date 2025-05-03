
'use client'; // Add 'use client' directive

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { getStoredApps, getStoredTools } from '@/lib/storage'; // Import storage functions
import { type AppTool } from '@/data/apps-and-tools'; // Import type
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Shield, AppWindow, PenTool } from "lucide-react"; // Changed Tool to PenTool
import { AdminAuthDialog } from '@/components/admin/admin-auth-dialog';

export function Header() {
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [apps, setApps] = useState<AppTool[]>([]);
  const [tools, setTools] = useState<AppTool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

   // Fetch apps and tools data on component mount (client-side)
   useEffect(() => {
    // Check if running on the client
    if (typeof window !== 'undefined') {
      setApps(getStoredApps()); // Already sorted by getStoredApps
      setTools(getStoredTools()); // Already sorted by getStoredTools
      setIsLoading(false);
    }
  }, []);


  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-auto flex items-center"> {/* Use mr-auto */}
            <Link href="/" className="mr-6 flex items-center space-x-2">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
              </svg>
              <span className="font-bold uppercase tracking-wider sm:inline-block">
                HeggieHub
              </span>
            </Link>
             {/* Hide nav while loading or on mobile */}
            <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
               {/* Apps Dropdown */}
               <DropdownMenu>
                <DropdownMenuTrigger asChild disabled={isLoading}>
                  <Button variant="ghost" className="flex items-center gap-1 px-3 py-2">
                     <AppWindow className="h-4 w-4 mr-1" />
                    Apps <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {isLoading ? (
                    <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
                  ) : apps.length > 0 ? (
                    apps.map((app) => (
                      <DropdownMenuItem key={app.name} asChild>
                        <Link href={app.url} target="_blank" rel="noopener noreferrer">
                          {app.name}
                        </Link>
                      </DropdownMenuItem>
                    ))
                  ) : (
                     <DropdownMenuItem disabled>No apps available</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Tools Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild disabled={isLoading}>
                  <Button variant="ghost" className="flex items-center gap-1 px-3 py-2">
                     <PenTool className="h-4 w-4 mr-1" /> {/* Changed Tool to PenTool */}
                    Tools <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                   {isLoading ? (
                    <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
                  ) : tools.length > 0 ? (
                    tools.map((tool) => (
                      <DropdownMenuItem key={tool.name} asChild>
                        <Link href={tool.url} target="_blank" rel="noopener noreferrer">
                          {tool.name}
                        </Link>
                      </DropdownMenuItem>
                    ))
                  ) : (
                      <DropdownMenuItem disabled>No tools available</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
          <div className="flex items-center space-x-2"> {/* Container for right-side icons */}
            <ThemeToggle />
             {/* Admin Icon Button */}
            <Button variant="ghost" size="icon" onClick={() => setIsAdminAuthOpen(true)} aria-label="Admin Access">
                <Shield className="h-5 w-5" />
            </Button>
          </div>
           {/* Mobile Menu (Simplified for now) */}
           <div className="md:hidden ml-4">
             {/* You might add a Sheet or similar component here later for full mobile nav */}
              <Button variant="ghost" size="icon" disabled aria-label="Mobile Menu (placeholder)">
                 {/* Placeholder icon like Menu */}
                 {/* <Menu className="h-5 w-5" /> */}
              </Button>
            </div>
        </div>
      </header>
      <AdminAuthDialog open={isAdminAuthOpen} onOpenChange={setIsAdminAuthOpen} />
    </>
  );
}
