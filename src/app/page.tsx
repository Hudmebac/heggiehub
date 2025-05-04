
'use client';

import React, { useEffect, useState, useCallback } from 'react';
// Removed AI import as it's no longer used for bio enhancement
// import { enhanceBio, type EnhanceBioOutput } from '@/ai/flows/enhance-bio';
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
  DialogClose // Import DialogClose
} from "@/components/ui/dialog";
import { Info, X, AlertTriangle } from 'lucide-react'; // Import X icon for close and AlertTriangle for disclaimer


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
  // Use React.cloneElement to apply the className
  return React.isValidElement(iconIdentifier) ? React.cloneElement(iconIdentifier as React.ReactElement, { className: combinedClassName }) : <LucideIcons.AppWindow className={combinedClassName} aria-label="Default App Icon" />;
};


export default function Home() {
  // Removed state related to AI bio enhancement
  // const [enhancedBio, setEnhancedBio] = useState<string | null>(null);
  // const [isLoadingBio, setIsLoadingBio] = useState(true);
  // const [errorBio, setErrorBio] = useState<string | null>(null);
  const staticBio = "As a Technical Product Manager, I bridge the gap between complex technical challenges and user-centric product solutions. While I'm passionate about technology and enjoy exploring development with AI tools, my core focus is defining product strategy, prioritizing features, and collaborating with engineering teams to deliver value. This space showcases some of my explorations and experiments in that journey."; // Static bio text
  const [apps, setApps] = useState<AppTool[]>([]); // Use AppTool[] directly
  const [tools, setTools] = useState<AppTool[]>([]); // Use AppTool[] directly
  const [isLoadingData, setIsLoadingData] = useState(true); // Loading state for initial data fetch

   // Fetch initial apps and tools from storage (client-side)
   const fetchData = useCallback(() => {
    setIsLoadingData(true);
    try {
      const storedApps = getStoredApps();
      const storedTools = getStoredTools();

      setApps(storedApps); // Set directly
      setTools(storedTools); // Set directly
    } catch (error) {
      console.error("Error fetching data from storage:", error);
       // Handle error, maybe show a toast
    } finally {
       setIsLoadingData(false); // Mark loading as complete
    }
   }, []); // Empty dependency array, runs once on mount or when called

  useEffect(() => {
    fetchData(); // Fetch data on initial mount
  }, [fetchData]);


  // Removed useEffect for fetching enhanced bio


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
            <CardHeader className="p-2 w-full">
                <CardTitle className="text-lg sm:text-xl uppercase tracking-wide">{item.name}</CardTitle>
            </CardHeader>
        <CardContent className="w-full p-2">
          <div className="min-h-[60px] mb-4"> {/* Consistent min height for description */}
            {/* More Info Button */}
            {type === 'app' && item.info && (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">More Info</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{item.name} - More Info</DialogTitle>
                            {/* Manual Close Button */}
                            <DialogClose asChild>
                                <Button variant="ghost" size="icon" className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Close</span>
                                </Button>
                            </DialogClose>
                        </DialogHeader>
                        <DialogDescription className="text-left whitespace-pre-wrap pt-4 text-sm text-foreground/80">
                            {item.info}
                        </DialogDescription>
                        {/* Removed footer close button */}
                    </DialogContent>
                </Dialog>
            )}
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

  const renderSection = (title: string, items: AppTool[], type: 'app' | 'tool') => (
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
      {/* Hero Section - Static Bio */}
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
           <p className="text-base sm:text-lg md:text-xl text-foreground/80 mb-6"> {/* Adjusted text size and added margin-bottom */}
              {staticBio}
            </p>  
        </motion.div>
         {/* Disclaimer Section */}
         <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto mt-6 pt-4 border-t border-border/30" // Added margin-top, padding-top, and border
          >
            <p className="text-sm text-muted-foreground italic flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 inline-block mr-2 flex-shrink-0" aria-label="Disclaimer icon"/>
              <span>I might have 'Technical' in my job title, but that doesn't mean I'm a Software Engineer! I'm a Technical Product Manager dabbling in app creation using AI tooling and learning along the way ;)</span>
            </p>
          </motion.div>
      </motion.section>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" >
       {/* Apps Section */}
       {renderSection("Apps", apps, 'app')}
        </motion.div>

       {/* Tools Section */}
       {renderSection("Tools", tools, 'tool')}

    </div>
  );
}

