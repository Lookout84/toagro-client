// Storage utility functions with type safety and error handling

interface StorageOptions {
    serializer?: (value: any) => string;
    deserializer?: (value: string) => any;
  }
  
  class Storage {
    private storage: globalThis.Storage;
    private prefix: string;
    private serializer: (value: any) => string;
    private deserializer: (value: string) => any;
  
    constructor(storage: globalThis.Storage, prefix = '', options: StorageOptions = {}) {
      this.storage = storage;
      this.prefix = prefix;
      this.serializer = options.serializer || JSON.stringify;
      this.deserializer = options.deserializer || JSON.parse;
    }
  
    private getKey(key: string): string {
      return this.prefix ? `${this.prefix}_${key}` : key;
    }
  
    // Get item from storage
    getItem<T = any>(key: string): T | null {
      try {
        const item = this.storage.getItem(this.getKey(key));
        return item ? this.deserializer(item) : null;
      } catch (error) {
        console.error(`Error getting item from storage: ${error}`);
        return null;
      }
    }
  
    // Set item in storage
    setItem<T = any>(key: string, value: T): boolean {
      try {
        this.storage.setItem(this.getKey(key), this.serializer(value));
        return true;
      } catch (error) {
        console.error(`Error setting item in storage: ${error}`);
        return false;
      }
    }
  
    // Remove item from storage
    removeItem(key: string): void {
      try {
        this.storage.removeItem(this.getKey(key));
      } catch (error) {
        console.error(`Error removing item from storage: ${error}`);
      }
    }
  
    // Clear all items from storage
    clear(): void {
      try {
        if (this.prefix) {
          // Only clear items with our prefix
          for (let i = this.storage.length - 1; i >= 0; i--) {
            const key = this.storage.key(i);
            if (key && key.startsWith(this.prefix)) {
              this.storage.removeItem(key);
            }
          }
        } else {
          this.storage.clear();
        }
      } catch (error) {
        console.error(`Error clearing storage: ${error}`);
      }
    }
  
    // Get multiple items at once
    getItems<T = any>(keys: string[]): Record<string, T | null> {
      return keys.reduce((acc, key) => {
        acc[key] = this.getItem<T>(key);
        return acc;
      }, {} as Record<string, T | null>);
    }
  
    // Set multiple items at once
    setItems<T = any>(items: Record<string, T>): boolean {
      try {
        Object.entries(items).forEach(([key, value]) => {
          this.setItem(key, value);
        });
        return true;
      } catch (error) {
        console.error(`Error setting multiple items: ${error}`);
        return false;
      }
    }
  
    // Check if key exists
    hasItem(key: string): boolean {
      return this.getItem(key) !== null;
    }
  
    // Get all keys with prefix
    getAllKeys(): string[] {
      const keys: string[] = [];
      try {
        for (let i = 0; i < this.storage.length; i++) {
          const key = this.storage.key(i);
          if (key && (!this.prefix || key.startsWith(this.prefix))) {
            keys.push(this.prefix ? key.replace(`${this.prefix}_`, '') : key);
          }
        }
      } catch (error) {
        console.error(`Error getting all keys: ${error}`);
      }
      return keys;
    }
  }
  
  // Create storage instances
  export const localStorage = new Storage(window.localStorage, 'toagro');
  export const sessionStorage = new Storage(window.sessionStorage, 'toagro');
  
  // Storage event listener
  export const onStorageChange = (callback: (event: StorageEvent) => void): (() => void) => {
    window.addEventListener('storage', callback);
    return () => window.removeEventListener('storage', callback);
  };
  
  // Token storage helpers
  export const tokenStorage = {
    getToken: (): string | null => localStorage.getItem('auth_token'),
    setToken: (token: string): boolean => localStorage.setItem('auth_token', token),
    removeToken: (): void => localStorage.removeItem('auth_token'),
    hasToken: (): boolean => localStorage.hasItem('auth_token'),
  };
  
  // User preferences storage helpers
  export const preferencesStorage = {
    getPreferences: (): Record<string, any> | null => localStorage.getItem('user_preferences'),
    setPreferences: (preferences: Record<string, any>): boolean => localStorage.setItem('user_preferences', preferences),
    updatePreferences: (updates: Record<string, any>): boolean => {
      const current = preferencesStorage.getPreferences() || {};
      return preferencesStorage.setPreferences({ ...current, ...updates });
    },
  };
  
  // Recent searches storage helpers
  export const recentSearchesStorage = {
    getRecentSearches: (): string[] => localStorage.getItem('recent_searches') || [],
    addRecentSearch: (search: string): boolean => {
      const searches = recentSearchesStorage.getRecentSearches();
      const newSearches = [search, ...searches.filter(s => s !== search)].slice(0, 10);
      return localStorage.setItem('recent_searches', newSearches);
    },
    clearRecentSearches: (): void => localStorage.removeItem('recent_searches'),
  };