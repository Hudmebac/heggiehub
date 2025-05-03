
import type React from 'react';

export interface AppTool {
  name: string;
  description: string;
  url: string;
  icon?: string | React.ReactNode; // Can be a lucide icon name (string) or an SVG ReactNode
  info?: string; // Optional detailed info for apps
}


// Initial Apps Data (Will be used if localStorage is empty/invalid)
// Added 'info' field to some apps
export const initialApps: AppTool[] = [
  { name: "Air Fry", description: "App for air frying recipes.", url: "https://airfry.netlify.app/", icon: "ChefHat", info: `AirFry (airfry.netlify.app) is a simple, web-based reference guide for air fryer cooking times and temperatures.
Key features and observations:
- Core Function: It provides a searchable list of various food items.
- Information Provided: For each food item, it lists:
    - Temperature: Recommended cooking temperature, shown in both Celsius (°C) and Fahrenheit (°F). There's usually a toggle at the top to switch the primary display between C and F.
    - Time: Recommended cooking time in minutes.
    - Notes: Often includes brief, helpful notes like "Shake halfway," "Frozen," "Fresh," "Single layer," etc.
- Search Functionality: A search bar allows users to quickly filter the list and find specific foods.
- Simplicity: The site has a very clean, straightforward interface focused purely on presenting the cooking information.
- User Contribution: There's typically a "Suggest a Food" link or button, implying the list can potentially be expanded based on user suggestions.
In essence, it's a quick lookup tool for anyone using an air fryer who needs a starting point for cooking times and temperatures for common foods.` },
  { name: "Debbie Heggie Spring", description: "A portfolio or showcase.", url: "https://debbieheggiespring.netlify.app/", icon: "Flower", info: `This was an attempt to use a Work PowerPoint Document and using AI to enhance. This was a very early project. The Subject was even more boring, "Spring Health and Energy Resource Hub" but it was a learning.` },
  { name: "Ember Glow", description: "A calming visual experience.", url: "https://emberglow.netlify.app/", icon: "Flame", info: `Emberglow (https://emberglow.netlify.app/)
This was a page I built for my Son, based on a simple idea, allowing me to utilise AI tooling and some funky function - I do love the song "Ralph the Camel (Kids)". Feel free to explore and enjoy the story.
Includes Origins - Every Story needs an Origins.
The actual story, Photo Gallery, Knowledge sharing about the Elements, Library of Cool Music.
"Hi there! I'm Zac, an 8-year-old adventurer! I came up with the idea for Emberglow when I had to create a mythical creature for school. My dad and I teamed up to bring this project to life using cool tools like Co-Pilot and other AI. Together, we made stories, songs, and lots of fun pictures and videos. It's been an amazing journey, and I can't wait for you to explore it with us!"` },
  { name: "Happy Birthday", description: "A birthday greeting.", url: "https://emberglow.netlify.app/happybirthday.html", icon: "Cake", info: `Happy Birthday April :)
Early experimentations with No Code and Javascript - For the time it took my wife to shower. I built this before going to the party. Some quirky things in this :)` },
  { name: "Skyzer", description: "Weather related application.", url: "https://skyzer.netlify.app/", icon: "CloudSun", info: `Story Skyzer: (Story Sizer) (https://skyzer.netlify.app/)
Further experimentation I wanted to build something similar to planning poker, introduce Sky Branding and make useful to myself, I did establish some cool function but just could get it to work as intended for multiple people in same session, still has a purpose and I may come back to this later when I better understand issue and tooling manages better.` },
  { name: "Zenzac", description: "A relaxing utility.", url: "https://zenzac.netlify.app/", icon: "Wind", info: `ZeNZaC Tools (https://zenzac.netlify.app/)
This was a tool that just kept on getting bigger, started with simple feature and every hour was adding more and more, so much cool functions in this. Additionally, it was a great tool to make with so many options, and for any child with attention issues, this hit the spot. Care workers loved it, and Parents too. Big hit, well maybe not the "make your Own Fart" or download an App. But they work to help calm Zac (my son) aka ZenZac.
Here's a description of the website and the product it presents:
Zenzac: AI-Powered Second Brain / Personal Knowledge Management Tool
The website https://zenzac.netlify.app/ serves as the landing page and informational hub for Zenzac, positioning it as an AI-powered "Second Brain" or Personal Knowledge Management (PKM) application.
Key Aspects Presented on the Website:
Purpose: Zenzac aims to help users capture, connect, organize, and retrieve their thoughts, notes, research, and ideas more intelligently and effortlessly. It leverages Artificial Intelligence to enhance the traditional note-taking and knowledge management process.
Core Features Highlighted:
AI Integration: This is a central theme. The site likely mentions AI features such as automated summarization, question-answering based on your notes, idea generation, or intelligent search.
Note-Taking & Capture: It functions as a digital notebook for capturing fleeting thoughts, detailed notes, web clippings, etc. (likely supporting markdown).
Connecting Ideas: Emphasis is placed on linking notes together (potentially using bi-directional links or backlinks) to create a network of knowledge, similar to tools like Roam Research or Obsidian.
Knowledge Discovery: Features like graph views (visualizing note connections) and powerful search are probably highlighted to help users rediscover and synthesize information.
Organization: While perhaps less rigid than traditional folders, it likely offers methods like tagging or contextual linking for organization.
Target Audience: The tool appears designed for knowledge workers, students, researchers, writers, creators, and anyone looking to build a personal knowledge base and improve their thinking and learning process. It appeals to users interested in PKM methodologies and potentially looking for AI enhancements to existing workflows.
Design and User Experience (of the Website): The landing page itself likely features a clean, modern design, possibly with dark mode elements, common in productivity and tech tool websites. It uses clear headings, concise text, and potentially screenshots or animations to explain the product's value proposition quickly.
Call to Action: The primary goal of the website is likely to encourage users to sign up (perhaps for a beta, waitlist, or free trial) or learn more about the application's features.
Platform: Zenzac is presented as a web application, accessible through a browser. Information about potential desktop or mobile apps might also be present.
In Summary:
The website describes Zenzac as a sophisticated, AI-enhanced application for personal knowledge management. It promises a smarter way to handle information overload by integrating AI capabilities directly into the note-taking and idea-connecting workflow, aiming to function as an intelligent extension of the user's own memory and thinking process (a "Second Brain"). The site serves to introduce the concept, highlight key features, and onboard interested users.` },
];

// Initial Tools Data (Will be used if localStorage is empty/invalid)
export const initialTools: AppTool[] = [
    { name: "AI Studio", description: "Google's AI development environment.", url: "https://aistudio.google.com/", icon: "Sparkles" },
    { name: "AppsGeyser Next", description: "Platform for creating Android apps.", url: "https://appsgeyser.com/", icon: "AppWindow" },
    { name: "CopyCoder AI", description: "AI tool for code generation or assistance.", url: "https://copycoder.ai", icon: "Copy" },
    { name: "Dribbble", description: "Showcase platform for designers.", url: "https://dribbble.com", icon: "Dribbble" },
    { name: "ElevenLabs", description: "AI voice generation tool.", url: "https://elevenlabs.io", icon: "Voicemail" },
    { name: "Firebase Studio", description: "Develop and manage Firebase projects.", url: "https://studio.firebase.google.com/", icon: "LayoutGrid" },
    { name: "GenCraft", description: "AI image generation tool.", url: "https://gencraft.com", icon: "Wand2" },
    { name: "GitHub", description: "Platform for code hosting and collaboration.", url: "https://github.com", icon: "Github" },
    { name: "Hedra", description: "Platform for creative AI tools.", url: "https://www.hedra.com", icon: "Video" },
    { name: "Mureka AI", description: "An AI-focused platform or tool.", url: "https://www.mureka.ai", icon: "BrainCircuit" },
    { name: "Netlify", description: "Platform for web hosting and automation.", url: "https://www.netlify.com/", icon: "Cloud" },
    { name: "Suno AI", description: "AI music generation tool.", url: "https://suno.com", icon: "Music" },
    { name: "Unsplash", description: "Source for royalty-free images.", url: "https://unsplash.com", icon: "Image" },
];
