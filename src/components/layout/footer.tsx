
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"; // Import Button
import { Shield } from "lucide-react"; // Import Shield icon
import { AdminAuthDialog } from '@/components/admin/admin-auth-dialog'; // Import AdminAuthDialog

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false); // State for admin dialog

  useEffect(() => {
    // Get current year on client-side to avoid hydration mismatch
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <>
      <footer className="py-6 mt-auto border-t bg-background">
        <div className="container mx-auto flex justify-between items-center text-sm text-muted-foreground">
          {/* Copyright Text */}
          <span className="text-center flex-grow"> {/* Center text */}
            {currentYear !== null ? (
              `© ${currentYear} Creations by Craig Heggie`
            ) : (
              // Placeholder or loading state for year
              `© ... Creations by Craig Heggie`
            )}
          </span>

          {/* Admin Icon Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsAdminAuthOpen(true)}
            aria-label="Admin Access"
            className="ml-auto" // Push to the right
          >
            <Shield className="h-5 w-5" />
          </Button>
        </div>
      </footer>

      {/* Admin Authentication Dialog - Rendered by Footer */}
      <AdminAuthDialog open={isAdminAuthOpen} onOpenChange={setIsAdminAuthOpen} />
    </>
  );
}
