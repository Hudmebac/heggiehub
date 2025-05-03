
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, PlusCircle, Edit, Trash2, ExternalLink } from 'lucide-react';
import { getStoredApps, getStoredTools, removeItem } from '@/lib/storage';
import { type AppTool } from '@/data/apps-and-tools';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from '@/components/ui/separator';


export default function AdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [apps, setApps] = useState<AppTool[]>([]);
  const [tools, setTools] = useState<AppTool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data callback
  const fetchData = useCallback(() => {
    setIsLoading(true);
    try {
        setApps(getStoredApps());
        setTools(getStoredTools());
    } catch (error) {
        console.error("Error fetching data:", error);
        toast({
            title: "Error",
            description: "Could not load app and tool data.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  }, [toast]); // Added toast dependency


  useEffect(() => {
    let authenticated = false;
     try {
        authenticated = sessionStorage.getItem('isAdminAuthenticated') === 'true';
     } catch (e) {
        console.error("Session storage access error:", e);
     }

    if (!authenticated) {
      router.replace('/');
    } else {
      setIsAuthenticated(true);
      fetchData(); // Fetch data only if authenticated
    }
  }, [router, fetchData]); // Added fetchData dependency

  const handleAddItem = () => {
    router.push('/admin/add');
  };

  const handleRemoveItem = (type: 'app' | 'tool', name: string) => {
    const success = removeItem(type, name);
    if (success) {
        toast({
            title: "Success!",
            description: `${type.charAt(0).toUpperCase() + type.slice(1)} "${name}" removed successfully.`,
        });
        fetchData(); // Refresh the list after removal
    } else {
        toast({
            title: "Error",
            description: `Failed to remove ${type} "${name}".`,
            variant: "destructive",
        });
    }
  };


  // Render loading state or nothing until authentication check is complete
  if (isAuthenticated === null || isLoading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <p>Loading admin area...</p> {/* You can add a spinner here */}
        </div>
    );
  }

   const renderItemList = (items: AppTool[], type: 'app' | 'tool') => (
    <ul className="space-y-3">
      {items.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">No {type}s found.</p>
      ) : (
        items.map((item) => (
          <li key={`${type}-${item.name}`} className="flex items-center justify-between p-3 bg-card border rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-grow min-w-0 mr-2">
              <span className="font-medium truncate" title={item.name}>{item.name}</span>
              <p className="text-sm text-muted-foreground truncate hidden sm:block" title={item.description}>
                {item.description}
              </p>
               <Link href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline block sm:hidden">
                 Visit <ExternalLink className="inline h-3 w-3 ml-1" />
               </Link>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
               <Link href={item.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline hidden sm:block">
                 <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                    <ExternalLink className="h-4 w-4" />
                 </Button>
               </Link>
              <Button
                 variant="outline"
                 size="sm"
                 onClick={() => router.push(`/admin/edit/${type}/${encodeURIComponent(item.name)}`)} // Navigate to edit page
                 aria-label={`Edit ${item.name}`}
              >
                <Edit className="h-4 w-4" />
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" aria-label={`Remove ${item.name}`}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the
                      <span className="font-semibold"> {item.name}</span> {type}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleRemoveItem(type, item.name)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </li>
        ))
      )}
    </ul>
  );

  // Only render content if authenticated
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-bold uppercase tracking-wider flex items-center gap-2">
         <ShieldCheck className="h-8 w-8 text-primary" /> Admin Area
        </h1>
         <Button onClick={handleAddItem}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
          </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Apps</CardTitle>
          <CardDescription>Edit or remove existing applications.</CardDescription>
        </CardHeader>
        <CardContent>
           {isLoading ? <p>Loading apps...</p> : renderItemList(apps, 'app')}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Tools</CardTitle>
          <CardDescription>Edit or remove existing tools.</CardDescription>
        </CardHeader>
        <CardContent>
           {isLoading ? <p>Loading tools...</p> : renderItemList(tools, 'tool')}
        </CardContent>
      </Card>

    </div>
  );
}
