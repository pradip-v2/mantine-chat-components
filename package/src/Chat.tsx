import React from 'react';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getThemeColor,
  MantineColor,
  StylesApiProps,
  useProps,
  useStyles,
} from '@mantine/core';
import classes from './Chat.module.css';

export type ChatStylesNames = 'root';

export type ChatCssVariables = {
  root: '--chat-bg';
};

export interface ChatProps extends BoxProps, StylesApiProps<ChatFactory>, ElementProps<'div'> {
  /** Key of `theme.colors` or any valid CSS color for the chat surface background */
  color?: MantineColor;
}

export type ChatFactory = Factory<{
  props: ChatProps;
  ref: HTMLDivElement;
  stylesNames: ChatStylesNames;
  vars: ChatCssVariables;
}>;

const defaultProps: Partial<ChatProps> = {};

const varsResolver = createVarsResolver<ChatFactory>((theme, { color }) => ({
  root: {
    '--chat-bg': color ? getThemeColor(color, theme) : undefined,
  },
}));

export const Chat = factory<ChatFactory>((_props, ref) => {
  const props = useProps('Chat', defaultProps, _props);
  const { classNames, className, style, styles, unstyled, vars, ...others } = props;

  const getStyles = useStyles<ChatFactory>({
    name: 'Chat',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  return <Box ref={ref} {...getStyles('root')} {...others} />;
});

Chat.displayName = 'Chat';
Chat.classes = classes;
