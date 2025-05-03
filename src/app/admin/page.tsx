
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Start as null for initial check

  useEffect(() => {
    let authenticated = false;
     try {
        authenticated = sessionStorage.getItem('isAdminAuthenticated') === 'true';
     } catch (e) {
        console.error("Session storage access error:", e);
     }

    if (!authenticated) {
      // Redirect to home if not authenticated after checking session storage
      router.replace('/'); // Use replace to avoid adding admin page to history
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleAddItem = () => {
    // Navigate to a new page or open a modal for adding items
    // For now, just log a message
    console.log("Navigate to add item form/page");
    router.push('/admin/add'); // Example route for adding items
  };


  // Render loading state or nothing until authentication check is complete
  if (isAuthenticated === null) {
    return (
        <div className="flex justify-center items-center h-screen">
            {/* Optional: Add a spinner or loading message */}
            <p>Loading admin area...</p>
        </div>
    );
  }


  // Only render content if authenticated
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold uppercase tracking-wider">Admin Area</h1>
        <ShieldCheck className="h-8 w-8 text-green-600" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Authenticated</CardTitle>
          <CardDescription>You have access to admin functionalities.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <p>Welcome to the secure admin dashboard.</p>
          <Button onClick={handleAddItem}>
            Add New Item
          </Button>
        </CardContent>
      </Card>

      {/* Add more admin components/sections here */}

    </div>
  );
}
