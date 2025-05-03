
'use client'; // Add 'use client' directive

import React, { useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { apps, tools } from '@/data/apps-and-tools'; // Import apps and tools data
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Shield } from "lucide-react";
import { AdminAuthDialog } from '@/components/admin/admin-auth-dialog'; // Import AdminAuthDialog

export function Header() {
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-auto flex items-center"> {/* Use mr-auto to push admin icon right */}
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
            <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
               {/* Apps Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 px-3 py-2">
                    Apps <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {apps.map((app) => (
                    <DropdownMenuItem key={app.name} asChild>
                      <Link href={app.url} target="_blank" rel="noopener noreferrer">
                        {app.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Tools Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 px-3 py-2">
                    Tools <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {tools.map((tool) => (
                    <DropdownMenuItem key={tool.name} asChild>
                      <Link href={tool.url} target="_blank" rel="noopener noreferrer">
                        {tool.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
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
           {/* Mobile Menu (Optional - can add later if needed) */}
           {/* Add a Sheet component here for mobile nav if required */}
        </div>
      </header>
      <AdminAuthDialog open={isAdminAuthOpen} onOpenChange={setIsAdminAuthOpen} />
    </>
  );
}
