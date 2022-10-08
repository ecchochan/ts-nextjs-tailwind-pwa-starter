import { intercept, makeAutoObservable } from 'mobx';
import { useEffect } from 'react';

class AppStore {
  showHeader = false;
  darkMode = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

  setDarkMode(darkMode: boolean) {
    this.darkMode = darkMode;
  }

  setShowHeader(showHeader: boolean) {
    this.showHeader = showHeader;
  }
}

export const appStore = new AppStore();

if (typeof window !== 'undefined') {
  if (
    localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
    appStore.setDarkMode(true);
  } else {
    document.documentElement.classList.remove('dark');
    appStore.setDarkMode(false);
  }

  intercept(appStore, 'darkMode', (change) => {
    const isDarkMode = change.newValue;
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }
    return change;
  });
}

export const useHeader = (showHeader = true) => {
  useEffect(() => {
    appStore.setShowHeader(showHeader);
    return () => {
      appStore.setShowHeader(false);
    };
  }, [showHeader]);
};
