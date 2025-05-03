export interface AppTool {
  name: string;
  description: string; // Consider enhancing this later if needed
  url: string;
}

export const appsAndTools: AppTool[] = [
  { name: "AirFry", description: "Air fryer recipes and tips.", url: "https://airfry.netlify.app/" },
  { name: "EmberGlow", description: "Ambiance and mood lighting.", url: "https://emberglow.netlify.app/" },
  { name: "Zenzac", description: "Mindfulness and relaxation.", url: "https://zenzac.netlify.app/" },
  { name: "Skyzer", description: "Weather forecasting application.", url: "https://skyzer.netlify.app/" },
  { name: "Debbie Heggie Spring", description: "Artist portfolio showcase.", url: "https://debbieheggiespring.netlify.app/" },
  { name: "Happy Birthday", description: "A birthday celebration page.", url: "https://emberglow.netlify.app/happybirthday.html" },
  { name: "Gencraft", description: "AI-powered content generation.", url: "https://gencraft.com" },
  { name: "Unsplash (1)", description: "Source for high-quality photos.", url: "https://unsplash.com" },
  { name: "Unsplash (2)", description: "Another source for high-quality photos.", url: "https://unsplash.com" }, // Duplicate URLs are fine if they represent distinct uses/projects
  { name: "Mureka AI", description: "AI research and development.", url: "https://www.mureka.ai" },
  { name: "Suno AI", description: "AI music generation.", url: "https://suno.com" },
  { name: "GitHub", description: "Code hosting and collaboration.", url: "https://github.com" },
  { name: "Netlify", description: "Web hosting and automation.", url: "https://app.netlify.com" },
  { name: "AppsGeyser Next", description: "Android app creation platform.", url: "https://next.appsgeyser.com" },
  { name: "CopyCoder AI", description: "AI tool for code generation.", url: "https://copycoder.ai" },
  { name: "Dribbble", description: "Design inspiration and portfolio.", url: "https://dribbble.com" },
  { name: "ElevenLabs", description: "AI voice synthesis.", url: "https://elevenlabs.io" },
  { name: "Hedra", description: "AI video generation.", url: "https://www.hedra.com" },
];
