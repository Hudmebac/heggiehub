'use client';

import React, { useState, useEffect } from 'react';

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    // Get current year on client-side to avoid hydration mismatch
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="py-6 mt-auto border-t bg-background">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        {currentYear !== null ? (
          `© ${currentYear} Creations by Craig Heggie`
        ) : (
          // Placeholder or loading state for year
          `© ... Creations by Craig Heggie`
        )}
      </div>
    </footer>
  );
}
