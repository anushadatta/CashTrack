import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  /**
   * check if local storage is available in window object
   */
  isStorageAvailable(): boolean {
    return "localStorage" in window;
  }

  /**
   * get value of key
   * @param key
   */
  getItem(key: string): string {
    try {
      if (this.isStorageAvailable()) {
        const lsValue = localStorage.getItem(key);

        // return null of value is stored as null or undefined
        if (lsValue == '' || lsValue + '' == 'undefined' || lsValue + '' == 'null') return null;
        return lsValue;
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * set key and value
   * @param key
   * @param value
   */
  setItem(key: string, value: string): boolean {
    try {
      if (this.isStorageAvailable() && value != undefined) { // insert if value is not undefined
        localStorage.setItem(key, value);
        return localStorage.getItem(key) != null;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * remove specific key from local storage
   */
  removeItem(key: string): boolean {
    try {
      if (this.isStorageAvailable()) {
        localStorage.removeItem(key);
        return localStorage.getItem(key) == null;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * clear all local storage
   */
  removeAll() {
    if (this.isStorageAvailable()) {
      localStorage.clear();
    }
  }
}
