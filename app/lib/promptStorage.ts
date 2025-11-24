/**
 * LocalStorage utility for managing saved voiceover prompts
 * Provides type-safe localStorage operations with error handling
 */

const STORAGE_KEY = 'voiceover-saved-prompts';

export const promptStorage = {
  /**
   * Load saved prompts from localStorage
   * @returns Array of saved prompt strings
   */
  load: (): string[] => {
    try {
      if (typeof window === 'undefined') return [];
      
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
      return [];
    } catch (error) {
      console.error('Failed to load saved prompts from localStorage:', error);
      return [];
    }
  },

  /**
   * Save prompts to localStorage
   * @param prompts - Array of prompt strings to save
   * @returns boolean indicating success
   */
  save: (prompts: string[]): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
      return true;
    } catch (error) {
      console.error('Failed to save prompts to localStorage:', error);
      return false;
    }
  },

  /**
   * Add a new prompt to saved prompts
   * @param prompt - The prompt text to add
   * @returns boolean indicating success
   */
  add: (prompt: string): boolean => {
    try {
      const prompts = promptStorage.load();
      
      // Don't add if empty or already exists
      if (!prompt.trim() || prompts.includes(prompt)) {
        return false;
      }
      
      prompts.push(prompt);
      return promptStorage.save(prompts);
    } catch (error) {
      console.error('Failed to add prompt:', error);
      return false;
    }
  },

  /**
   * Remove a prompt by index
   * @param index - The index of the prompt to remove
   * @returns boolean indicating success
   */
  remove: (index: number): boolean => {
    try {
      const prompts = promptStorage.load();
      
      if (index < 0 || index >= prompts.length) {
        return false;
      }
      
      prompts.splice(index, 1);
      return promptStorage.save(prompts);
    } catch (error) {
      console.error('Failed to remove prompt:', error);
      return false;
    }
  },

  /**
   * Clear all saved prompts
   * @returns boolean indicating success
   */
  clear: (): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Failed to clear prompts:', error);
      return false;
    }
  },

  /**
   * Check if a prompt already exists
   * @param prompt - The prompt text to check
   * @returns boolean indicating if prompt exists
   */
  exists: (prompt: string): boolean => {
    const prompts = promptStorage.load();
    return prompts.includes(prompt);
  },

  /**
   * Get the total number of saved prompts
   * @returns number of saved prompts
   */
  count: (): number => {
    const prompts = promptStorage.load();
    return prompts.length;
  },
};
