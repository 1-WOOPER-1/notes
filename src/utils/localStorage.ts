export class LocalStorageService {
  static getItem = (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}": ${error}`);
      return null;
    }
  };

  static setItem = (key: string, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}": ${error}`);
    }
  };

  static removeItem = (key: string) => localStorage.removeItem(key);
}
