import { useEffect } from 'react';
import create from 'zustand';

interface AppState {
  showHeader: boolean;
  darkMode: boolean;
  setDarkMode: (isDark?: boolean | undefined) => unknown;
}

const useAppState = create<AppState>((set) => ({
  showHeader: false,
  darkMode: false,
  setDarkMode: (isDark?: boolean) =>
    set((state) => ({
      darkMode: isDark === undefined ? !state.darkMode : isDark,
    })),
}));

if (typeof window !== 'undefined') {
  if (
    localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
    useAppState.setState({
      darkMode: true,
    });
  } else {
    document.documentElement.classList.remove('dark');
    useAppState.setState({
      darkMode: false,
    });
  }

  useAppState.subscribe((state, prevState) => {
    if (prevState.darkMode !== state.darkMode) {
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      }
    }
  });
}

export const useHeader = (showHeader = true) => {
  useEffect(() => {
    useAppState.setState({
      showHeader,
    });
  }, [showHeader]);
};

export const useDarkMode = (): [
  boolean,
  (isDark?: boolean | undefined) => unknown
] => {
  const darkMode = useAppState((state) => state.darkMode);
  const setDarkMode = useAppState((state) => state.setDarkMode);
  return [darkMode, setDarkMode];
};

export default useAppState;
