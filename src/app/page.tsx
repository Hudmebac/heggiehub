
'use client';

import { useEffect, useState } from 'react';
import { enhanceBio, type EnhanceBioOutput } from '@/ai/flows/enhance-bio';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { apps, tools, type AppTool } from '@/data/apps-and-tools'; // Import new arrays
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion'; // For animations

export default function Home() {
  const [enhancedBio, setEnhancedBio] = useState<string | null>(null);
  const [isLoadingBio, setIsLoadingBio] = useState(true);
  const [errorBio, setErrorBio] = useState<string | null>(null);

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
        setErrorBio('Failed to enhance bio. Please try again later.');
        // Fallback to a default message or original bio if needed
        setEnhancedBio('Experienced software engineer with a passion for building web applications.');
      } finally {
        setIsLoadingBio(false);
      }
    }
    fetchEnhancedBio();
  }, []);

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

  // Helper function to render a section
  const renderSection = (title: string, items: AppTool[]) => (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-center uppercase tracking-wider">{title}</h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {items.map((item, index) => (
          <motion.div key={`${title}-${index}-${item.name}`} variants={itemVariants}>
            <Card className="h-full flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out bg-card border border-border rounded-lg">
              <CardHeader>
                <CardTitle className="text-xl uppercase tracking-wide">{item.name}</CardTitle>
                <CardDescription className="text-sm min-h-[40px]">{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div className="mb-4 relative aspect-video rounded overflow-hidden">
                  <Image
                    src={`https://picsum.photos/seed/${item.name.replace(/\s+/g, '-')}-${index}/400/225`} // Ensure unique seeds
                    alt={`${item.name} screenshot`}
                    fill // Changed layout to fill
                    style={{ objectFit: "cover" }} // Added objectFit
                    data-ai-hint={item.name} // Hint for image generation
                    priority={index < 3} // Prioritize loading images for the first few cards
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Add sizes attribute
                  />
                </div>
                <Button asChild className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href={item.url} target="_blank" rel="noopener noreferrer">
                    Visit {title === 'Apps' ? 'App' : 'Tool'}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );

  return (
    <div className="space-y-12">
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
      {renderSection("Apps", apps)}

      {/* Tools Section */}
      {renderSection("Tools", tools)}

    </div>
  );
}
