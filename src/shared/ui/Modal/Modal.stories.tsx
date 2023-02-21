import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Modal } from "./Modal";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import { Theme } from "app/providers/ThemeProviders";

export default {
  title: "shared/Modal",
  component: Modal,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  children:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat recusandae velit ex unde. Animi architecto, similique debitis eius libero maxime veniam recusandae voluptatem minus quasi quam! Aut sapiente nulla dolorem?",
};

export const Dark = Template.bind({});
Dark.args = {
  isOpen: true,
  children:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat recusandae velit ex unde. Animi architecto, similique debitis eius libero maxime veniam recusandae voluptatem minus quasi quam! Aut sapiente nulla dolorem?",
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
