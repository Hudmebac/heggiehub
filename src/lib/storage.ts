
'use client';

import { type AppTool, initialApps, initialTools } from '@/data/apps-and-tools';

const APPS_STORAGE_KEY = 'heggiehub_apps';
const TOOLS_STORAGE_KEY = 'heggiehub_tools';

// Type guard to check if an object is an AppTool
function isAppTool(item: any): item is AppTool {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof item.name === 'string' &&
    typeof item.description === 'string' &&
    typeof item.url === 'string' // Icon is optional
  );
}

// Type guard to check if an array contains only AppTool objects
function isAppToolArray(items: any): items is AppTool[] {
    return Array.isArray(items) && items.every(isAppTool);
}


// --- Getters ---

/**
 * Retrieves items from localStorage or returns initial data.
 * MUST be called client-side.
 * @param key - The localStorage key (APPS_STORAGE_KEY or TOOLS_STORAGE_KEY)
 * @param initialData - The default data to return if localStorage is empty or invalid
 * @returns Array of AppTool items, sorted alphabetically by name.
 */
function getItems(key: string, initialData: AppTool[]): AppTool[] {
  if (typeof window === 'undefined') {
    // Return sorted initial data on server or if window is not available
     return [...initialData].sort((a, b) => a.name.localeCompare(b.name));
  }

  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      const parsedItems = JSON.parse(storedValue);
       // Validate the parsed data structure
      if (isAppToolArray(parsedItems)) {
         return [...parsedItems].sort((a, b) => a.name.localeCompare(b.name));
      } else {
        console.warn(`Invalid data format found in localStorage for key "${key}". Falling back to initial data.`);
        // Optionally clear the invalid data: localStorage.removeItem(key);
         return [...initialData].sort((a, b) => a.name.localeCompare(b.name));
      }
    }
  } catch (error) {
    console.error(`Error reading localStorage key “${key}”:`, error);
  }

  // Return sorted initial data if nothing in storage or error occurred
  return [...initialData].sort((a, b) => a.name.localeCompare(b.name));
}

export function getStoredApps(): AppTool[] {
  return getItems(APPS_STORAGE_KEY, initialApps);
}

export function getStoredTools(): AppTool[] {
   return getItems(TOOLS_STORAGE_KEY, initialTools);
}


// --- Setters ---

/**
 * Adds a new item (App or Tool) to localStorage.
 * MUST be called client-side.
 * @param type - 'app' or 'tool'
 * @param newItemData - The data for the new item to add.
 * @returns boolean indicating success or failure.
 */
export function addItem(type: 'app' | 'tool', newItemData: Omit<AppTool, 'description'> & { description: string }): boolean {
   if (typeof window === 'undefined') {
    console.error("Cannot add item: localStorage is not available.");
    return false;
  }

  const key = type === 'app' ? APPS_STORAGE_KEY : TOOLS_STORAGE_KEY;
  const initialData = type === 'app' ? initialApps : initialTools;

  try {
    // Get current items, defaulting to initial data if storage is empty/invalid
    const currentItems = getItems(key, initialData);

    // Check if item with the same name already exists (case-insensitive)
    const nameExists = currentItems.some(item => item.name.toLowerCase() === newItemData.name.toLowerCase());
    if (nameExists) {
        console.warn(`Item with name "${newItemData.name}" already exists. Not adding duplicate.`);
        // Optionally, you could throw an error or return a specific status
        return false; // Indicate failure due to duplicate name
    }


    // Add the new item
    const updatedItems = [...currentItems, newItemData];

    // Sort before saving (optional, but good for consistency if reading unsorted)
    updatedItems.sort((a, b) => a.name.localeCompare(b.name));

    // Save back to localStorage
    localStorage.setItem(key, JSON.stringify(updatedItems));
    console.log(`${type} added successfully and stored.`);
    return true; // Indicate success
  } catch (error) {
    console.error(`Error adding ${type} to localStorage:`, error);
    return false; // Indicate failure
  }
}
