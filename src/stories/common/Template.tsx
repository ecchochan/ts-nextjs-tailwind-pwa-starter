import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

const basicTemplate = (
  Component: () => JSX.Element,
  config: ComponentMeta<() => JSX.Element>
) => {
  const Template: ComponentStory<typeof Component> = (_args) => {
    const args = _args as (
      | Parameters<typeof Component>
      | [Record<string, never>]
    )[0];
    return <Component {...args} />;
  };
  return { Template, config };
};

export default basicTemplate;
