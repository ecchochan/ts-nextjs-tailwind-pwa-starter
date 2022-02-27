import { useEffect } from 'react';
import create from 'zustand';

interface AppState {
  showHeader: boolean;
}

const useAppState = create<AppState>(() => ({
  showHeader: false,
}));

export const useHeader = (showHeader = true) => {
  useEffect(() => {
    useAppState.setState({
      showHeader,
    });
  }, [showHeader]);
};

export default useAppState;
