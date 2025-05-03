
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

// TODO: Replace with actual data persistence logic (e.g., API call)
async function saveNewItem(itemData: { name: string; url: string; description: string; type: 'app' | 'tool'; icon?: string }) {
  console.log("Saving new item (simulated):", itemData);
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  // In a real app, you'd check the response from your backend here
  return { success: true };
}


export default function AddItemPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'app' | 'tool'>('app'); // Default to 'app'
  const [icon, setIcon] = useState(''); // Optional icon name (Lucide)
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    }
  }, [router]);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await saveNewItem({ name, url, description, type, icon });

      if (result.success) {
        toast({
          title: "Success!",
          description: `${type.charAt(0).toUpperCase() + type.slice(1)} "${name}" added successfully.`,
        });
        // Clear form or redirect
        // setName(''); setUrl(''); setDescription(''); setIcon(''); setType('app');
        router.push('/admin'); // Redirect back to main admin page after success
      } else {
        // Handle failure from the backend
         toast({
          title: "Error",
          description: `Failed to add ${type}. Please try again.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding item:", error);
       toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthenticated === null) {
    return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
       <Button variant="outline" onClick={() => router.back()} className="mb-4">
         &larr; Back to Admin
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Add New Item</CardTitle>
          <CardDescription>Add a new App or Tool to the showcase.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
             {/* Type Selection */}
             <div className="space-y-2">
                <Label>Type</Label>
                 <RadioGroup
                    defaultValue="app"
                    onValueChange={(value: 'app' | 'tool') => setType(value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="app" id="r-app" />
                      <Label htmlFor="r-app">App</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tool" id="r-tool" />
                      <Label htmlFor="r-tool">Tool</Label>
                    </div>
                  </RadioGroup>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder={`Enter ${type} name`}
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
                placeholder={`Short description for the ${type}`}
              />
                 <p className="text-xs text-muted-foreground">
                    This description will be used initially. You can optionally enhance it later using AI.
                 </p>
            </div>

            {/* Icon (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="icon">Icon (Optional)</Label>
              <Input
                id="icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="Lucide icon name (e.g., Code, Wand2)"
              />
              <p className="text-xs text-muted-foreground">
                Enter a valid icon name from <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="underline text-primary">lucide.dev/icons</a>. Leave blank for default.
              </p>
            </div>


            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? `Adding ${type}...` : `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

