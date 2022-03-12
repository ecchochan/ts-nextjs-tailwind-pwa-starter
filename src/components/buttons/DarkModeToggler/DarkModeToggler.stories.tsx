import basicTemplate from '@/stories/common/Template';

import DarkModeToggler from '.';

const title = 'Button/DarkModeToggler';
const Component = DarkModeToggler;
// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
const argTypes = {};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const { Template, config } = basicTemplate(Component, {
  title,
  component: Component,
  argTypes,
});

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default config;

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {};
