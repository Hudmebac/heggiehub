# HeggieHub

HeggieHub is a personal showcase website built with Next.js and Firebase Studio. It displays a curated list of web applications and development tools created or used by Craig Heggie.

## Overview

This project serves as a central hub to:

*   **Showcase Projects:** Display various web applications (Apps) developed using different technologies and tools.
*   **List Useful Tools:** Provide a reference list of development and design tools (Tools) frequently used.
*   **Demonstrate Capabilities:** Explore and experiment with web development practices, including Next.js, React, TypeScript, Tailwind CSS, ShadCN UI components, and Genkit for potential AI features.
*   **Admin Management:** Includes a basic password-protected admin area to add, edit, and remove apps and tools listed on the site.

## Getting Started

### Prerequisites

*   Node.js (version 18 or later recommended)
*   npm or yarn

### Running Locally

1.  **Clone the repository (if applicable):**
    ```bash
    # If you have the code locally, navigate to the project directory
    cd your-project-directory
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root of the project. If using Genkit AI features, add your API key:
    ```
    GOOGLE_GENAI_API_KEY=YOUR_API_KEY
    ```
    *(Note: The current version primarily uses local storage for app/tool data, so the API key might not be strictly necessary unless AI features are actively used.)*

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    This will start the Next.js development server, typically on `http://localhost:9002`.

5.  **Access the Admin Area:**
    *   Navigate to the site in your browser.
    *   Click the shield icon in the footer.
    *   Enter the admin passcode (currently hardcoded for demonstration purposes - **do not use this method for production security**). The default passcode is `100672`.

### Building for Production

```bash
npm run build
npm run start
```

## Technology Stack

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** ShadCN UI, Lucide Icons
*   **State Management:** React Hooks (useState, useEffect, useCallback), Local Storage (for app/tool data persistence)
*   **Animation:** Framer Motion
*   **Deployment:** Configured for Netlify (can be adapted for other platforms)
*   **(Optional) AI:** Genkit (for potential future AI integrations)

## Project Structure

*   `src/app/`: Core application routes and pages (App Router).
    *   `page.tsx`: Main landing page displaying apps and tools.
    *   `layout.tsx`: Root layout component.
    *   `globals.css`: Global styles and Tailwind CSS setup.
    *   `admin/`: Routes for the admin section (add, edit items).
*   `src/components/`: Reusable React components.
    *   `ui/`: ShadCN UI components.
    *   `layout/`: Header and Footer components.
    *   `admin/`: Components specific to the admin area (e.g., auth dialog).
*   `src/lib/`: Utility functions and libraries.
    *   `storage.ts`: Functions for interacting with Local Storage to manage app/tool data.
    *   `utils.ts`: General utility functions (like `cn` for class names).
*   `src/data/`: Initial/default data structures.
    *   `apps-and-tools.ts`: Defines the `AppTool` interface and initial data arrays.
*   `src/hooks/`: Custom React hooks (e.g., `useToast`, `useIsMobile`).
*   `src/ai/`: (Optional) Genkit configuration and flows for AI features.
*   `public/`: Static assets.
*   `tailwind.config.ts`: Tailwind CSS configuration.
*   `next.config.ts`: Next.js configuration.

## Key Features

*   **Dynamic App/Tool Display:** Fetches and displays lists of apps and tools from Local Storage, falling back to initial data.
*   **Client-Side Data Management:** Uses Local Storage for CRUD operations on apps and tools via the admin panel.
*   **Responsive Design:** Adapts to different screen sizes.
*   **Theming:** Supports light and dark modes using `next-themes`.
*   **Admin Authentication:** Simple passcode-based authentication for the admin section (using Session Storage for temporary state).
*   **Info Dialogs:** Provides additional information about specific apps via popup dialogs.
*   **External Links:** Icons linking to LinkedIn and GitHub profiles in the header.
