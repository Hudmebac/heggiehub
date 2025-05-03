
'use client';

import React, { useEffect, useState } from 'react';
import { enhanceBio, type EnhanceBioOutput } from '@/ai/flows/enhance-bio';
import { enhanceAppDescription, type EnhanceAppDescriptionOutput } from '@/ai/flows/enhance-app-description';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { apps as initialApps, tools as initialTools, type AppTool } from '@/data/apps-and-tools';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper function to render icons
const renderIcon = (iconIdentifier: string | React.ReactNode | undefined, className?: string): React.ReactNode => {
  const defaultIconClass = "h-12 w-12 text-primary";
  const combinedClassName = cn(defaultIconClass, className);

  if (!iconIdentifier) {
    return <LucideIcons.AppWindow className={combinedClassName} aria-label="Default App Icon" />;
  }
  if (typeof iconIdentifier === 'string') {
    const IconComponent = (LucideIcons as any)[iconIdentifier];
    return IconComponent ? <IconComponent className={combinedClassName} aria-label={`${iconIdentifier} icon`} /> : <LucideIcons.AppWindow className={combinedClassName} aria-label="Default App Icon" />;
  }
  // If it's already a ReactNode (like an inline SVG), render it directly
  return React.isValidElement(iconIdentifier) ? React.cloneElement(iconIdentifier as React.ReactElement, { className: combinedClassName }) : <LucideIcons.AppWindow className={combinedClassName} aria-label="Default App Icon" />;
};


interface EnhancedAppTool extends AppTool {
  enhancedDescription?: string;
  isLoadingDescription?: boolean;
  errorDescription?: string | null;
}

export default function Home() {
  const [enhancedBio, setEnhancedBio] = useState<string | null>(null);
  const [isLoadingBio, setIsLoadingBio] = useState(true);
  const [errorBio, setErrorBio] = useState<string | null>(null);
  const [enhancedApps, setEnhancedApps] = useState<EnhancedAppTool[]>(initialApps.map(app => ({ ...app, isLoadingDescription: true })));
  const [enhancedTools, setEnhancedTools] = useState<EnhancedAppTool[]>(initialTools.map(tool => ({ ...tool, isLoadingDescription: true }))); // Tools descriptions need loading state too

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

  // Fetch enhanced descriptions for apps and tools
  useEffect(() => {
    async function fetchAllDescriptions<T extends EnhancedAppTool>(
      items: T[],
      setItems: React.Dispatch<React.SetStateAction<T[]>>
    ) {
      const promises = items.map(async (item) => {
        if (!item.isLoadingDescription) return item; // Skip if already fetched or not needed

        try {
          const result: EnhanceAppDescriptionOutput = await enhanceAppDescription({
            appName: item.name,
            appUrl: item.url,
          });
          return { ...item, enhancedDescription: result.enhancedDescription, isLoadingDescription: false, errorDescription: null };
        } catch (error) {
          console.error(`Error enhancing description for ${item.name}:`, error);
          return { ...item, enhancedDescription: item.description, isLoadingDescription: false, errorDescription: 'AI enhancement failed.' }; // Use original desc on error
        }
      });

      const results = await Promise.all(promises);
      setItems(results);
    }

    fetchAllDescriptions(enhancedApps, setEnhancedApps);
    fetchAllDescriptions(enhancedTools, setEnhancedTools);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount


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
  const renderCard = (item: EnhancedAppTool, index: number, type: 'app' | 'tool') => (
    <motion.div key={`${type}-${index}-${item.name}`} variants={itemVariants}>
      <Card className="h-full flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out bg-card border border-border rounded-lg p-4 text-center items-center">
        <div className="mb-4">
          {renderIcon(item.icon)} {/* Render icon for both apps and tools */}
        </div>
        <CardHeader className="p-2 w-full">
          <CardTitle className="text-lg sm:text-xl uppercase tracking-wide">{item.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between w-full p-2">
          <div className="min-h-[60px] mb-4"> {/* Consistent min height for description */}
            {item.isLoadingDescription ? (
              <>
                <Skeleton className="h-5 w-3/4 mb-1 mx-auto bg-muted/50" />
                <Skeleton className="h-5 w-1/2 mx-auto bg-muted/50" />
              </>
            ) : item.errorDescription ? (
              <p className="text-destructive text-sm italic">{item.errorDescription}</p>
            ) : (
              <p className="text-sm text-foreground/80">{item.enhancedDescription || item.description}</p>
            )}
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
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center uppercase tracking-wider">Apps</h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" // Adjusted grid for apps
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {enhancedApps.map((app, index) => renderCard(app, index, 'app'))}
        </motion.div>
      </section>

      {/* Tools Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center uppercase tracking-wider">Tools</h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" // Use same grid layout as apps
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {enhancedTools.map((tool, index) => renderCard(tool, index, 'tool'))}
        </motion.div>
      </section>

    </div>
  );
}
