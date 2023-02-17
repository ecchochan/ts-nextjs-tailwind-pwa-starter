import React from 'react';
import { useEffect } from 'react';

import { appStore } from '../../src/store/app';

export const WithDarkMode = (Story, context) => {
  useEffect(() => {
    appStore.setDarkMode(context.globals.darkMode === 'dark');
  }, [context.globals.darkMode]);
  return <Story />;
};
