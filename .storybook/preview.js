/* eslint-disable no-import-assign */
import * as NextImage from 'next/image';

import '../src/styles/globals.scss';

import { WithDarkMode } from './decorators/WithDarkMode';

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  },
};

export const globalTypes = {
  darkMode: {
    name: 'Dark Mode',
    description: 'Global dark mode for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
      showName: true,
      dynamicTitle: true,
    },
  },
};

export const decorators = [WithDarkMode];
