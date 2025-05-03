
import type React from 'react';

export interface AppTool {
  name: string;
  description: string;
  url: string;
  icon?: string | React.ReactNode; // Can be a lucide icon name (string) or an SVG ReactNode
}


// Initial Apps Data (Will be used if localStorage is empty/invalid)
export const initialApps: AppTool[] = [
  { name: "Air Fry", description: "App for air frying recipes.", url: "https://airfry.netlify.app/", icon: "ChefHat" },
  { name: "Ember Glow", description: "A calming visual experience.", url: "https://emberglow.netlify.app/", icon: "Flame" },
  { name: "Happy Birthday", description: "A birthday greeting.", url: "https://emberglow.netlify.app/happybirthday.html", icon: "Cake" },
  { name: "Skyzer", description: "Weather related application.", url: "https://skyzer.netlify.app/", icon: "CloudSun" },
  { name: "Debbie Heggie Spring", description: "A portfolio or showcase.", url: "https://debbieheggiespring.netlify.app/", icon: "Flower" },
  { name: "Zenzac", description: "A relaxing utility.", url: "https://zenzac.netlify.app/", icon: "Wind" },
];

// Initial Tools Data (Will be used if localStorage is empty/invalid)
export const initialTools: AppTool[] = [
    { name: "AI Studio", description: "Google's AI development environment.", url: "https://aistudio.google.com/", icon: "Sparkles" },
    { name: "AppsGeyser Next", description: "Platform for creating Android apps.", url: "https://appsgeyser.com/", icon: "AppWindow" }, // Updated URL
    { name: "CopyCoder AI", description: "AI tool for code generation or assistance.", url: "https://copycoder.ai", icon: "Copy" },
    { name: "Dribbble", description: "Showcase platform for designers.", url: "https://dribbble.com", icon: "Dribbble" },
    { name: "ElevenLabs", description: "AI voice generation tool.", url: "https://elevenlabs.io", icon: "Voicemail" },
    { name: "Firebase Studio", description: "Develop and manage Firebase projects.", url: "https://studio.firebase.google.com/", icon: "LayoutGrid" },
    { name: "GenCraft", description: "AI image generation tool.", url: "https://gencraft.com", icon: "Wand2" },
    { name: "GitHub", description: "Platform for code hosting and collaboration.", url: "https://github.com", icon: "Github" },
    { name: "Hedra", description: "Platform for creative AI tools.", url: "https://www.hedra.com", icon: "Video" },
    { name: "Mureka AI", description: "An AI-focused platform or tool.", url: "https://www.mureka.ai", icon: "BrainCircuit" },
    { name: "Netlify", description: "Platform for web hosting and automation.", url: "https://www.netlify.com/", icon: "Cloud" }, // Updated URL
    { name: "Suno AI", description: "AI music generation tool.", url: "https://suno.com", icon: "Music" },
    { name: "Unsplash", description: "Source for royalty-free images.", url: "https://unsplash.com", icon: "Image" },
];
