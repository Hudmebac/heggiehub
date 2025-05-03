
import type React from 'react';

export interface AppTool {
  name: string;
  description: string;
  url: string;
  icon?: string | React.ReactNode; // Can be a lucide icon name (string) or an SVG ReactNode
}

// Function to extract a plausible name from a URL
const extractNameFromUrl = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    let hostname = parsedUrl.hostname.replace(/^www\./, ''); // Remove www.
    hostname = hostname.split('.')[0]; // Get the main part

    // Specific overrides based on hostname or path
    if (hostname === 'netlify' && parsedUrl.pathname.includes('app')) return "Netlify"; // Simplified Netlify name
    if (parsedUrl.hostname === 'airfry.netlify.app') return 'Air Fry';
    if (parsedUrl.hostname === 'emberglow.netlify.app' && parsedUrl.pathname === '/happybirthday.html') return 'Happy Birthday';
    if (parsedUrl.hostname === 'emberglow.netlify.app') return 'Ember Glow';
    if (parsedUrl.hostname === 'zenzac.netlify.app') return 'Zenzac';
    if (parsedUrl.hostname === 'skyzer.netlify.app') return 'Skyzer';
    if (parsedUrl.hostname === 'debbieheggiespring.netlify.app') return 'Debbie Heggie Spring';
    if (hostname === 'github') return 'GitHub';
    if (hostname === 'mureka') return 'Mureka AI';
    if (hostname === 'suno') return 'Suno AI';
    if (hostname === 'appsgeyser' && parsedUrl.pathname.includes('next')) return 'AppsGeyser Next';
    if (hostname === 'copycoder') return 'CopyCoder AI';
    if (hostname === 'dribbble') return 'Dribbble';
    if (hostname === 'elevenlabs') return 'ElevenLabs';
    if (hostname === 'hedra') return 'Hedra';
    if (hostname === 'unsplash') return 'Unsplash';
    if (hostname === 'gencraft') return 'GenCraft';


    // General case: Capitalize first letter and handle hyphens/camelCase
    return hostname
      .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
      .replace(/[-_]/g, ' ') // Replace hyphens/underscores with space
      .trim() // Remove leading/trailing spaces
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  } catch (e) {
    // Handle invalid URLs or parsing errors gracefully
    console.error(`Error parsing URL ${url}:`, e);
    // Extract name from path if possible as a fallback
    const pathParts = url.replace(/^https?:\/\//, '').split('/');
    const potentialName = pathParts[pathParts.length - 1] || pathParts[0] || 'Unknown App/Tool';
     return potentialName
      .replace(/([A-Z])/g, ' $1')
      .replace(/[-_.]/g, ' ')
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
};

// Define apps URLs and icons
const appsData: { url: string, icon?: string | React.ReactNode }[] = [
  { url: "https://airfry.netlify.app/", icon: "ChefHat" },
  { url: "https://emberglow.netlify.app/", icon: "Flame" },
  { url: "https://zenzac.netlify.app/", icon: "Wind" },
  { url: "https://skyzer.netlify.app/", icon: "CloudSun" },
  { url: "https://debbieheggiespring.netlify.app/", icon: "Flower" },
  { url: "https://emberglow.netlify.app/happybirthday.html", icon: "Cake" }
];

// Define tools URLs and icons
const toolsData: { url: string, icon?: string | React.ReactNode }[] = [
    { url: "https://gencraft.com", icon: "Wand2" },
    { url: "https://unsplash.com", icon: "Image" },
    { url: "https://unsplash.com", icon: "Image" }, // Second Unsplash
    { url: "https://www.mureka.ai", icon: "BrainCircuit" },
    { url: "https://suno.com", icon: "Music" },
    { url: "https://github.com", icon: "Github" },
    { url: "https://app.netlify.com", icon: "Cloud" },
    { url: "https://next.appsgeyser.com", icon: "AppWindow" },
    { url: "https://copycoder.ai", icon: "Copy" },
    { url: "https://dribbble.com", icon: "Dribbble" },
    { url: "https://elevenlabs.io", icon: "Voicemail" },
    { url: "https://www.hedra.com", icon: "Video" }
];

// Helper function to create AppTool objects, handling duplicate names
const createAppToolList = (data: { url: string, icon?: string | React.ReactNode }[]): AppTool[] => {
    const nameCounts: { [key: string]: number } = {};
    return data.map((item): AppTool => {
        let name = extractNameFromUrl(item.url);
        const baseName = name; // Keep original extracted name for counting

        // Increment count for this base name
        nameCounts[baseName] = (nameCounts[baseName] || 0) + 1;

        // If this is a duplicate (count > 1), append the count
        if (nameCounts[baseName] > 1) {
            name = `${baseName} (${nameCounts[baseName]})`;
        }

        return {
            name: name,
            description: `Explore ${name}`, // Default description
            url: item.url,
            icon: item.icon,
        };
    });
};

export const apps: AppTool[] = createAppToolList(appsData);
export const tools: AppTool[] = createAppToolList(toolsData);
