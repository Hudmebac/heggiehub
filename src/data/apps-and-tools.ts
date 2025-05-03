
export interface AppTool {
  name: string;
  description: string; // Consider enhancing this later if needed
  url: string;
}

// Function to extract a plausible name from a URL
const extractNameFromUrl = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    let hostname = parsedUrl.hostname.replace(/^www\./, ''); // Remove www.
    hostname = hostname.split('.')[0]; // Get the main part (e.g., 'airfry' from 'airfry.netlify.app')

    // Handle specific known cases or patterns
    if (hostname === 'netlify' && parsedUrl.pathname.includes('app')) {
        hostname = "Netlify App"; // More specific for app.netlify.com
    } else if (hostname === 'netlify') {
        const subdomain = parsedUrl.hostname.split('.')[0];
        if (subdomain && subdomain !== 'www') {
            hostname = subdomain; // Use subdomain for netlify sites like airfry.netlify.app
        }
    } else if (parsedUrl.pathname === '/happybirthday.html') {
      return 'Happy Birthday'; // Special case
    } else if (hostname === 'github') {
       return 'GitHub';
    } else if (hostname === 'mureka') {
        return 'Mureka AI';
    } else if (hostname === 'suno') {
        return 'Suno AI';
    } else if (hostname === 'appsgeyser') {
        return 'AppsGeyser Next';
    } else if (hostname === 'copycoder') {
        return 'CopyCoder AI';
    } else if (hostname === 'dribbble') {
        return 'Dribbble';
    } else if (hostname === 'elevenlabs') {
        return 'ElevenLabs';
    } else if (hostname === 'hedra') {
        return 'Hedra';
    } else if (hostname === 'unsplash') {
        return 'Unsplash'; // Keep it simple
    }


    // Capitalize first letter and handle potential hyphens/camelCase
    return hostname
      .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
      .replace(/[-_]/g, ' ') // Replace hyphens/underscores with space
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  } catch (e) {
    console.error(`Error parsing URL ${url}:`, e);
    return 'Unknown App/Tool'; // Fallback name
  }
};

// Helper function to create AppTool objects
const createAppTool = (url: string, index?: number): AppTool => {
    let name = extractNameFromUrl(url);
    // Handle duplicate names like Unsplash
    if (name === 'Unsplash' && index !== undefined && index > 0) {
        name = `Unsplash (${index + 1})`;
    }
     if (name === 'Debbieheggiespring') {
        name = "Debbie Heggie Spring"; // Correct specific name
    }
    return {
        name: name,
        description: `Explore ${name}`,
        url: url,
    };
};


export const apps: AppTool[] = [
  "https://airfry.netlify.app/",
  "https://emberglow.netlify.app/",
  "https://zenzac.netlify.app/",
  "https://skyzer.netlify.app/",
  "https://debbieheggiespring.netlify.app/",
  "https://emberglow.netlify.app/happybirthday.html"
].map(url => createAppTool(url));


export const tools: AppTool[] = [
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
].map((url, index) => createAppTool(url, index)); // Pass index for duplicate handling
