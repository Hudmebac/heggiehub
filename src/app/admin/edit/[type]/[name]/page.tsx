
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getStoredApps, getStoredTools, updateItem } from '@/lib/storage';
import { type AppTool } from '@/data/apps-and-tools';
import { ArrowLeft } from 'lucide-react'; // Import ArrowLeft icon

type ItemType = 'app' | 'tool';

export default function EditItemPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  const itemType = params.type as ItemType;
  const originalName = decodeURIComponent(params.name as string);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [itemData, setItemData] = useState<AppTool | null>(null);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [info, setInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state for item data

  const getItemData = useCallback(() => {
    setIsLoading(true);
    const items = itemType === 'app' ? getStoredApps() : getStoredTools();
    const foundItem = items.find(item => item.name.toLowerCase() === originalName.toLowerCase());

    if (foundItem) {
      setItemData(foundItem);
      setName(foundItem.name);
      setUrl(foundItem.url);
      setDescription(foundItem.description);
      setIcon(typeof foundItem.icon === 'string' ? foundItem.icon : ''); // Handle non-string icons
      setInfo(foundItem.info || ''); // Handle missing info
    } else {
      toast({
        title: "Error",
        description: `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} not found. Redirecting...`,
        variant: "destructive",
      });
      router.replace('/admin'); // Redirect if item not found
    }
    setIsLoading(false);
  }, [itemType, originalName, router, toast]);


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
       getItemData(); // Fetch item data after auth check
    }
  }, [router, getItemData]); // Add getItemData dependency


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    if (!name.trim() || !url.trim() || !description.trim()) {
      setFormError("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
       const updatedData: Partial<AppTool> = {
            name: name.trim(),
            url,
            description,
            icon: icon.trim() || undefined, // Set to undefined if empty
       };

       // Conditionally add info only for apps
       if (itemType === 'app') {
         updatedData.info = info.trim() || undefined;
       }

      const success = updateItem(itemType, originalName, updatedData);

      if (success) {
        toast({
          title: "Success!",
          description: `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} "${name}" updated successfully.`,
        });
        router.push('/admin'); // Redirect back to admin list
      } else {
        setFormError(`Failed to update ${itemType}. The new name might already exist or another error occurred.`);
         toast({
          title: "Error",
          description: `Failed to update ${itemType}. The new name might already exist or another error occurred.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating item:", error);
       setFormError("An unexpected error occurred. Please try again.");
       toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isAuthenticated === null || isLoading || !itemData) {
    return <div className="flex justify-center items-center h-screen"><p>Loading item details...</p></div>;
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
       <Button variant="outline" onClick={() => router.back()} className="mb-4">
         <ArrowLeft className="mr-2 h-4 w-4" /> Back to Admin
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Edit {itemType.charAt(0).toUpperCase() + itemType.slice(1)}</CardTitle>
          <CardDescription>Update the details for "{originalName}".</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder={`Enter ${itemType} name`}
                aria-invalid={!!formError}
                aria-describedby="form-error-message"
              />
            </div>

            {/* URL */}
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                placeholder="https://example.com"
                 aria-invalid={!!formError}
                aria-describedby="form-error-message"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder={`Short description for the ${itemType}`}
                 aria-invalid={!!formError}
                 aria-describedby="form-error-message"
              />
            </div>

             {/* Info (Optional, only for Apps) */}
            {itemType === 'app' && (
                <div className="space-y-2">
                <Label htmlFor="info">More Info (Optional)</Label>
                <Textarea
                    id="info"
                    value={info}
                    onChange={(e) => setInfo(e.target.value)}
                    placeholder="Enter detailed information or backstory for the app (will appear in a popup)."
                    rows={5}
                />
                 <p className="text-xs text-muted-foreground">
                   Displayed when the user clicks the 'Info' icon on the app card. Supports basic formatting like newlines. Leave blank to remove info text.
                 </p>
                </div>
            )}

            {/* Icon (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="icon">Icon Name (Optional)</Label>
              <Input
                id="icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="Lucide icon name (e.g., Code, Wand2)"
              />
              <p className="text-xs text-muted-foreground">
                Enter a valid icon name from <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="underline text-primary">lucide.dev/icons</a>. Leave blank for default icon. Case-sensitive.
              </p>
            </div>

             {/* Form Error Message */}
            {formError && (
              <p id="form-error-message" className="text-sm text-destructive text-center">
                {formError}
              </p>
            )}


            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? `Updating ${itemType}...` : `Update ${itemType.charAt(0).toUpperCase() + itemType.slice(1)}`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
