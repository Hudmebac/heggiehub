
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { enhanceBio, type EnhanceBioOutput } from '@/ai/flows/enhance-bio';
// Removed: import { enhanceAppDescription, type EnhanceAppDescriptionOutput } from '@/ai/flows/enhance-app-description';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getStoredApps, getStoredTools } from '@/lib/storage'; // Import storage functions
import { type AppTool } from '@/data/apps-and-tools'; // Import only the type
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from 'lucide-react';

// Helper function to render icons
const renderIcon = (iconIdentifier: string | React.ReactNode | undefined, className?: string): React.ReactNode => {
  const defaultIconClass = "h-12 w-12 text-primary";
  const combinedClassName = cn(defaultIconClass, className);

  if (!iconIdentifier) {
    return <LucideIcons.AppWindow className={combinedClassName} aria-label="Default App Icon" />;
  }
  if (typeof iconIdentifier === 'string') {
    const IconComponent = (LucideIcons as any)[iconIdentifier];
    // Ensure the icon name exists in LucideIcons before rendering
    return IconComponent ? <IconComponent className={combinedClassName} aria-label={`${iconIdentifier} icon`} /> : <LucideIcons.AppWindow className={combinedClassName} aria-label="Default App Icon (Invalid Name)" />;
  }
  // If it's already a ReactNode (like an inline SVG), render it directly
  return React.isValidElement(iconIdentifier) ? React.cloneElement(iconIdentifier as React.ReactElement, { className: combinedClassName }) : <LucideIcons.AppWindow className={combinedClassName} aria-label="Default App Icon" />;
};

// Use AppTool directly, no need for EnhancedAppTool anymore
// interface EnhancedAppTool extends AppTool {
//   enhancedDescription?: string;
//   isLoadingDescription: boolean; // Always include loading state initially
//   errorDescription?: string | null;
// }

export default function Home() {
  const [enhancedBio, setEnhancedBio] = useState<string | null>(null);
  const [isLoadingBio, setIsLoadingBio] = useState(true);
  const [errorBio, setErrorBio] = useState<string | null>(null);
  const [apps, setApps] = useState<AppTool[]>([]); // Use AppTool[] directly
  const [tools, setTools] = useState<AppTool[]>([]); // Use AppTool[] directly
  const [isLoadingData, setIsLoadingData] = useState(true); // Loading state for initial data fetch

  // Fetch initial apps and tools from storage (client-side)
  useEffect(() => {
    const storedApps = getStoredApps();
    const storedTools = getStoredTools();

    setApps(storedApps); // Set directly, no enhancement state needed
    setTools(storedTools); // Set directly, no enhancement state needed
    setIsLoadingData(false); // Mark initial data loading as complete
  }, []);


  // Fetch enhanced bio
  useEffect(() => {
    async function fetchEnhancedBio() {
      setIsLoadingBio(true);
      setErrorBio(null);
      try {
        const result: EnhanceBioOutput = await enhanceBio({
          linkedinUrl: 'https://www.linkedin.com/in/craig-heggie-a51b4340/',
        });
        setEnhancedBio(result.enhancedBio);
      } catch (error) {
        console.error('Error enhancing bio:', error);
        setErrorBio('Failed to enhance bio. Using default.');
        setEnhancedBio('Experienced software engineer with a passion for building web applications.'); // Default bio on error
      } finally {
        setIsLoadingBio(false);
      }
    }
    fetchEnhancedBio();
  }, []);

   // Removed AI Description Enhancement logic
   // const enhanceDescriptions = useCallback(...)
   // useEffect(() => { ... enhanceDescriptions ...}, [apps, ...])
   // useEffect(() => { ... enhanceDescriptions ...}, [tools, ...])


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  // --- Render Functions ---

  // Shared Card Renderer Logic
  const renderCard = (item: AppTool, index: number, type: 'app' | 'tool') => (
    <motion.div key={`${type}-${index}-${item.name}`} variants={itemVariants}>
      <Card className="h-full flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out bg-card border border-border rounded-lg p-4 text-center items-center">
        <div className="mb-4">
          {renderIcon(item.icon)} {/* Render icon */}
        </div>
        <CardHeader className="p-2 w-full relative"> {/* Added relative positioning */}
          <CardTitle className="text-lg sm:text-xl uppercase tracking-wide">{item.name}</CardTitle>
            {/* Info Dialog Trigger - Only for Apps */}
           {type === 'app' && item.info && (
            <Dialog>
              <DialogTrigger asChild>
                 <Button variant="ghost" size="icon" className="absolute top-0 right-0 mt-[-8px] mr-[-8px] text-muted-foreground hover:text-primary">
                  <Info className="h-5 w-5" />
                  <span className="sr-only">More info about {item.name}</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{item.name} - More Info</DialogTitle>
                  <DialogDescription className="text-left whitespace-pre-wrap pt-4">
                    {item.info}
                  </DialogDescription>
                </DialogHeader>
                 {/* Optional: Add a close button if needed */}
                 {/* <DialogFooter> <Button type="button" onClick={() => ...}>Close</Button> </DialogFooter> */}
              </DialogContent>
            </Dialog>
          )}
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between w-full p-2">
          <div className="min-h-[60px] mb-4"> {/* Consistent min height for description */}
            {/* Display original description directly */}
            <p className="text-sm text-foreground/80">{item.description}</p>
          </div>
          <Button asChild className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href={item.url} target="_blank" rel="noopener noreferrer">
              Visit {type === 'app' ? 'App' : 'Tool'}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

 const renderSection = (title: string, items: AppTool[], type: 'app' | 'tool') => ( // Use AppTool[]
    <section>
        <h2 className="text-3xl font-bold mb-8 text-center uppercase tracking-wider">{title}</h2>
        {isLoadingData ? (
             // Show skeleton grid while initial data is loading
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {[...Array(type === 'app' ? 6 : 8)].map((_, i) => ( // Placeholder count
                <motion.div key={`skeleton-${type}-${i}`} variants={itemVariants}>
                    <Card className="h-full flex flex-col overflow-hidden bg-card border border-border rounded-lg p-4 text-center items-center">
                         <Skeleton className="h-12 w-12 mb-4 rounded-full bg-muted/50" />
                         <CardHeader className="p-2 w-full">
                             <Skeleton className="h-6 w-3/4 mx-auto bg-muted/50" />
                         </CardHeader>
                         <CardContent className="flex-grow flex flex-col justify-between w-full p-2">
                            <div className="min-h-[60px] mb-4 space-y-1">
                                <Skeleton className="h-5 w-full bg-muted/50" />
                                <Skeleton className="h-5 w-2/3 mx-auto bg-muted/50" />
                            </div>
                            <Skeleton className="h-10 w-full mt-auto bg-muted/50" />
                        </CardContent>
                    </Card>
                </motion.div>
                ))}
            </motion.div>
        ) : items.length === 0 ? (
             <p className="text-center text-muted-foreground">No {type}s available yet.</p>
        ) :(
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {items.map((item, index) => renderCard(item, index, type))}
            </motion.div>
        )}
    </section>
 );


  return (
    <div className="space-y-16"> {/* Increased space between sections */}
      {/* Hero Section - AI Bio */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        className="text-center py-12 bg-gradient-to-r from-primary/10 via-background to-accent/10 dark:from-primary/20 dark:via-background dark:to-accent/20 rounded-lg shadow-lg"
      >
        <motion.h1
         variants={itemVariants}
         className="mb-4 text-4xl font-extrabold tracking-tight uppercase sm:text-5xl md:text-6xl"
        >
          Welcome to HeggieHub
        </motion.h1>
        <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
          {isLoadingBio ? (
             <div className="space-y-2">
                <Skeleton className="h-6 w-3/4 mx-auto bg-muted/50" />
                <Skeleton className="h-6 w-1/2 mx-auto bg-muted/50" />
             </div>
          ) : errorBio ? (
            <p className="text-destructive">{errorBio}</p>
          ) : (
            <p className="text-lg sm:text-xl md:text-2xl text-foreground/80">
              {enhancedBio}
            </p>
          )}
        </motion.div>
      </motion.section>

       {/* Apps Section */}
       {renderSection("Apps", apps, 'app')}


       {/* Tools Section */}
       {renderSection("Tools", tools, 'tool')}

    </div>
  );
}
