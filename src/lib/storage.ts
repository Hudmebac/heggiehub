
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
    typeof item.url === 'string' && // Icon is optional, info is optional
    (typeof item.icon === 'string' || typeof item.icon === 'undefined' || React.isValidElement(item.icon)) && // Allow string, undefined, or ReactNode for icon
    (typeof item.info === 'string' || typeof item.info === 'undefined') // Allow string or undefined for info
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
         // Ensure all expected fields exist, potentially adding missing optional ones
         const validatedItems = parsedItems.map(item => ({
            ...item,
            icon: item.icon || undefined, // Ensure icon exists or is undefined
            info: item.info || undefined // Ensure info exists or is undefined
         }));
         return [...validatedItems].sort((a, b) => a.name.localeCompare(b.name));
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
 * Saves items to localStorage.
 * MUST be called client-side.
 * @param key - The localStorage key.
 * @param items - The array of items to save.
 * @returns boolean indicating success or failure.
 */
function saveItems(key: string, items: AppTool[]): boolean {
   if (typeof window === 'undefined') {
    console.error("Cannot save items: localStorage is not available.");
    return false;
  }
  try {
     // Sort before saving
    const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));
    localStorage.setItem(key, JSON.stringify(sortedItems));
    return true;
  } catch (error) {
    console.error(`Error writing localStorage key “${key}”:`, error);
    return false;
  }
}


/**
 * Adds a new item (App or Tool) to localStorage.
 * MUST be called client-side.
 * @param type - 'app' or 'tool'
 * @param newItemData - The data for the new item to add.
 * @returns boolean indicating success or failure.
 */
export function addItem(type: 'app' | 'tool', newItemData: AppTool): boolean { // Use AppTool directly
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
        return false; // Indicate failure due to duplicate name
    }

    // Add the new item
    const updatedItems = [...currentItems, newItemData];

    // Save back to localStorage (saveItems handles sorting)
    const success = saveItems(key, updatedItems);
    if(success) {
       console.log(`${type} added successfully and stored.`);
    }
    return success;
  } catch (error) {
    console.error(`Error adding ${type} to localStorage:`, error);
    return false; // Indicate failure
  }
}

/**
 * Removes an item (App or Tool) from localStorage by its name.
 * MUST be called client-side.
 * @param type - 'app' or 'tool'
 * @param nameToRemove - The name of the item to remove (case-insensitive).
 * @returns boolean indicating success or failure.
 */
export function removeItem(type: 'app' | 'tool', nameToRemove: string): boolean {
  if (typeof window === 'undefined') {
    console.error("Cannot remove item: localStorage is not available.");
    return false;
  }

  const key = type === 'app' ? APPS_STORAGE_KEY : TOOLS_STORAGE_KEY;
  const initialData = type === 'app' ? initialApps : initialTools; // Needed for getItems default

  try {
    const currentItems = getItems(key, initialData);
    const itemExists = currentItems.some(item => item.name.toLowerCase() === nameToRemove.toLowerCase());

    if (!itemExists) {
      console.warn(`Item with name "${nameToRemove}" not found. Cannot remove.`);
      return false; // Indicate failure because item doesn't exist
    }

    const updatedItems = currentItems.filter(item => item.name.toLowerCase() !== nameToRemove.toLowerCase());

    // Save the filtered list back to localStorage
    const success = saveItems(key, updatedItems);
     if(success) {
       console.log(`${type} "${nameToRemove}" removed successfully.`);
    }
    return success;
  } catch (error) {
    console.error(`Error removing ${type} from localStorage:`, error);
    return false;
  }
}

/**
 * Updates an existing item (App or Tool) in localStorage.
 * MUST be called client-side.
 * @param type - 'app' or 'tool'
 * @param originalName - The original name of the item to update (case-insensitive).
 * @param updatedData - An object containing the fields to update.
 * @returns boolean indicating success or failure.
 */
export function updateItem(type: 'app' | 'tool', originalName: string, updatedData: Partial<AppTool>): boolean {
  if (typeof window === 'undefined') {
    console.error("Cannot update item: localStorage is not available.");
    return false;
  }

  const key = type === 'app' ? APPS_STORAGE_KEY : TOOLS_STORAGE_KEY;
  const initialData = type === 'app' ? initialApps : initialTools;

  try {
    const currentItems = getItems(key, initialData);
    const itemIndex = currentItems.findIndex(item => item.name.toLowerCase() === originalName.toLowerCase());

    if (itemIndex === -1) {
      console.warn(`Item with original name "${originalName}" not found. Cannot update.`);
      return false; // Indicate failure because item doesn't exist
    }

    // If the name is being changed, check if the new name already exists (excluding the item being updated)
    if (updatedData.name && updatedData.name.toLowerCase() !== originalName.toLowerCase()) {
      const newNameExists = currentItems.some((item, index) =>
        index !== itemIndex && item.name.toLowerCase() === updatedData.name!.toLowerCase()
      );
      if (newNameExists) {
        console.warn(`Cannot update: Another item with the name "${updatedData.name}" already exists.`);
        return false; // Indicate failure due to new name conflict
      }
    }

    // Create the updated item by merging old and new data
    const updatedItem = {
      ...currentItems[itemIndex],
      ...updatedData,
      // Ensure optional fields are handled correctly (allow removing them)
      icon: updatedData.icon !== undefined ? updatedData.icon : currentItems[itemIndex].icon,
      info: updatedData.info !== undefined ? updatedData.info : currentItems[itemIndex].info,
    };

    // Create the new array with the updated item
    const updatedItems = [
      ...currentItems.slice(0, itemIndex),
      updatedItem,
      ...currentItems.slice(itemIndex + 1),
    ];

    // Save the updated list back to localStorage
    const success = saveItems(key, updatedItems);
    if (success) {
       console.log(`${type} "${originalName}" updated successfully.`);
    }
    return success;
  } catch (error) {
    console.error(`Error updating ${type} in localStorage:`, error);
    return false;
  }
}
