const STORAGE_KEY = 'voiceover-saved-prompts';

export const promptStorage = {
  load: (): string[] => {
    try {
      if (typeof window === 'undefined') return [];
      
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
      return [];
    } catch (error) {
      // console.error('Failed to load saved prompts from localStorage:', error);
      return [];
    }
  },

  save: (prompts: string[]): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
      return true;
    } catch (error) {
      // console.error('Failed to save prompts to localStorage:', error);
      return false;
    }
  },

  add: (prompt: string): boolean => {
    try {
      const prompts = promptStorage.load();
      
      if (!prompt.trim() || prompts.includes(prompt)) {
        return false;
      }
      
      prompts.push(prompt);
      return promptStorage.save(prompts);
    } catch (error) {
      // console.error('Failed to add prompt:', error);
      return false;
    }
  },

  remove: (index: number): boolean => {
    try {
      const prompts = promptStorage.load();
      
      if (index < 0 || index >= prompts.length) {
        return false;
      }
      
      prompts.splice(index, 1);
      return promptStorage.save(prompts);
    } catch (error) {
      // console.error('Failed to remove prompt:', error);
      return false;
    }
  },

  clear: (): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      // console.error('Failed to clear prompts:', error);
      return false;
    }
  },

  exists: (prompt: string): boolean => {
    try {
      const prompts = promptStorage.load();
      return prompts.includes(prompt);
    } catch (error) {
      // console.error('Failed to check if prompt exists:', error);
      return false;
    }
  },

  count: (): number => {
    try {
      const prompts = promptStorage.load();
      return prompts.length;
    } catch (error) {
      // console.error('Failed to count prompts:', error);
      return 0;
    }
  },
};
