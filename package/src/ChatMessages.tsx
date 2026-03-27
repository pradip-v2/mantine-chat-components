import React from 'react';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  MantineSpacing,
  StylesApiProps,
  useProps,
  useStyles,
} from '@mantine/core';
import classes from './ChatMessages.module.css';

export type ChatMessagesStylesNames = 'root' | 'inner';

export type ChatMessagesCssVariables = {
  root: '--chat-messages-gap';
};

export interface ChatMessagesProps
  extends BoxProps,
    StylesApiProps<ChatMessagesFactory>,
    ElementProps<'div'> {
  /** Gap between messages; forwarded to the inner stack as a CSS variable */
  gap?: MantineSpacing | number;
}

export type ChatMessagesFactory = Factory<{
  props: ChatMessagesProps;
  ref: HTMLDivElement;
  stylesNames: ChatMessagesStylesNames;
  vars: ChatMessagesCssVariables;
}>;

const defaultProps: Partial<ChatMessagesProps> = {};

const varsResolver = createVarsResolver<ChatMessagesFactory>((theme, { gap }) => ({
  root: {
    '--chat-messages-gap':
      gap !== undefined
        ? typeof gap === 'number'
          ? `${gap}px`
          : (theme.spacing[gap as keyof typeof theme.spacing] ?? gap)
        : undefined,
  },
}));

export const ChatMessages = factory<ChatMessagesFactory>((_props, ref) => {
  const props = useProps('ChatMessages', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    gap: _gap,
    children,
    ...others
  } = props;

  const getStyles = useStyles<ChatMessagesFactory>({
    name: 'ChatMessages',
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

  return (
    <Box ref={ref} {...getStyles('root')} {...others}>
      <Box component="div" {...getStyles('inner')}>
        {children}
      </Box>
    </Box>
  );
});

ChatMessages.displayName = 'ChatMessages';
ChatMessages.classes = classes;
