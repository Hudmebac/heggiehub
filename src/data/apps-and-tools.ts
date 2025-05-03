
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
    if (hostname === 'netlify' && parsedUrl.pathname.includes('app')) return "Netlify App";
    if (parsedUrl.hostname === 'airfry.netlify.app') return 'Air Fry';
    if (parsedUrl.hostname === 'emberglow.netlify.app' && parsedUrl.pathname === '/happybirthday.html') return 'Happy Birthday';
    if (parsedUrl.hostname === 'emberglow.netlify.app') return 'Ember Glow';
    if (parsedUrl.hostname === 'zenzac.netlify.app') return 'Zenzac';
    if (parsedUrl.hostname === 'skyzer.netlify.app') return 'Skyzer';
    if (parsedUrl.hostname === 'debbieheggiespring.netlify.app') return 'Debbie Heggie Spring';
    if (hostname === 'github') return 'GitHub';
    if (hostname === 'mureka') return 'Mureka AI';
    if (hostname === 'suno') return 'Suno AI';
    if (hostname === 'appsgeyser') return 'AppsGeyser Next';
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
    console.error(`Error parsing URL ${url}:`, e);
    return 'Unknown App/Tool'; // Fallback name
  }
};

// Helper function to create AppTool objects for Apps
const createApp = (url: string, icon?: string | React.ReactNode): AppTool => {
    const name = extractNameFromUrl(url);
    return {
        name: name,
        description: `Visit ${name}`, // AI will enhance this later
        url: url,
        icon: icon,
    };
};

// Define apps with icons
export const apps: AppTool[] = [
  createApp("https://airfry.netlify.app/", "ChefHat"),
  createApp("https://emberglow.netlify.app/", "Flame"),
  createApp("https://zenzac.netlify.app/", "Wind"),
  createApp("https://skyzer.netlify.app/", "CloudSun"),
  createApp("https://debbieheggiespring.netlify.app/", "Flower"),
  createApp("https://emberglow.netlify.app/happybirthday.html", "Cake")
];


// Define tools URLs
const toolsDataUrls = [
    "https://gencraft.com",
    "https://unsplash.com",
    "https://unsplash.com", // Second Unsplash
    "https://www.mureka.ai",
    "https://suno.com",
    "https://github.com",
    "https://app.netlify.com",
    "https://next.appsgeyser.com",
    "https://copycoder.ai",
    "https://dribbble.com",
    "https://elevenlabs.io",
    "https://www.hedra.com"
];

// Process tools data to handle duplicates
const nameCounts: { [key: string]: number } = {};
export const tools: AppTool[] = toolsDataUrls.map((url): AppTool => {
    let name = extractNameFromUrl(url);
    const baseName = name; // Keep original extracted name for counting

    // Increment count for this base name
    nameCounts[baseName] = (nameCounts[baseName] || 0) + 1;

    // If this is a duplicate (count > 1), append the count
    if (nameCounts[baseName] > 1) {
        name = `${baseName} (${nameCounts[baseName]})`;
    }

    return {
        name: name,
        description: `Explore ${name}`, // Keep initial description simple
        url: url,
        // Tools use thumbnails, no icon needed here initially
    };
});
