export class LocalStorageService {
  static getItem = (key) => JSON.parse(localStorage.getItem(key));
  static setItem = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value));
  static removeItem = (key) => localStorage.removeItem(key);
}
