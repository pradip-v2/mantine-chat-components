import React, { useState } from 'react';
import {
  ActionIcon,
  Box,
  BoxProps,
  Button,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getThemeColor,
  Group,
  MantineColor,
  Popover,
  ScrollArea,
  SimpleGrid,
  StylesApiProps,
  Text,
  UnstyledButton,
  useProps,
  useStyles,
} from '@mantine/core';
import { CHAT_EMOJIS } from './chatEmojis';
import classes from './ChatMessage.module.css';

export type ChatMessageStylesNames =
  | 'root'
  | 'replyQuote'
  | 'replyQuoteLabel'
  | 'replyQuotePreview'
  | 'bubbleWrap'
  | 'bubble'
  | 'footer'
  | 'reaction'
  | 'reactionCount'
  | 'reactionAdd'
  | 'replyAction';

export type ChatMessageCssVariables = {
  root:
    | '--chat-message-user-bg'
    | '--chat-message-user-color'
    | '--chat-message-assistant-bg'
    | '--chat-message-assistant-color';
};

/** One reaction row on a message (emoji + count + whether the current user reacted). */
export interface ChatMessageReaction {
  emoji: string;
  count: number;
  /** When true, the chip is highlighted as “you reacted”. */
  reacted?: boolean;
}

/** Quoted message shown above the bubble when this message is a reply. */
export interface ChatMessageReplyTo {
  /** Short line, e.g. sender name or “Assistant”. */
  label?: React.ReactNode;

  /** One-line or short preview of the original message. */
  preview: React.ReactNode;
}

export interface ChatMessageProps
  extends BoxProps,
    StylesApiProps<ChatMessageFactory>,
    ElementProps<'div'> {
  /** Who sent the message; controls alignment and bubble colors */
  sender?: 'user' | 'assistant';

  /** Key of `theme.colors` or any valid CSS color for the user bubble background */
  userColor?: MantineColor;

  /** Key of `theme.colors` or any valid CSS color for the assistant bubble background */
  assistantColor?: MantineColor;

  /** When set, shows a quote above the bubble (this message replies to another). */
  replyTo?: ChatMessageReplyTo;

  /** Optional id for `data-message-id` (e.g. for reply targeting). */
  messageId?: string;

  /** Reactions to show below the bubble */
  reactions?: ChatMessageReaction[];

  /**
   * Fires when the user picks an emoji (new reaction or from the + picker) or taps an existing chip.
   * Implement toggle/add logic in the parent.
   */
  onReaction?: (emoji: string) => void;

  /** Emojis listed in the “add reaction” popover (defaults to the library list). */
  reactionEmojiList?: string[];

  /** When set, shows a Reply control that calls this handler */
  onReply?: () => void;
}

export type ChatMessageFactory = Factory<{
  props: ChatMessageProps;
  ref: HTMLDivElement;
  stylesNames: ChatMessageStylesNames;
  vars: ChatMessageCssVariables;
}>;

const defaultProps: Partial<ChatMessageProps> = {
  sender: 'assistant',
};

const varsResolver = createVarsResolver<ChatMessageFactory>(
  (theme, { userColor, assistantColor }) => ({
    root: {
      '--chat-message-user-bg': userColor
        ? getThemeColor(userColor, theme)
        : 'var(--mantine-color-blue-filled)',
      '--chat-message-user-color': 'var(--mantine-color-white)',
      '--chat-message-assistant-bg': assistantColor
        ? getThemeColor(assistantColor, theme)
        : 'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-6))',
      '--chat-message-assistant-color': 'var(--mantine-color-text)',
    },
  })
);

export const ChatMessage = factory<ChatMessageFactory>((_props, ref) => {
  const props = useProps('ChatMessage', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    sender,
    children,
    replyTo,
    messageId,
    reactions,
    onReaction,
    reactionEmojiList = CHAT_EMOJIS,
    onReply,
    ...others
  } = props;

  const [reactionPickerOpened, setReactionPickerOpened] = useState(false);

  const getStyles = useStyles<ChatMessageFactory>({
    name: 'ChatMessage',
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

  const showFooter =
    (reactions && reactions.length > 0) || onReaction !== undefined || onReply !== undefined;

  return (
    <Box
      ref={ref}
      component="div"
      data-sender={sender}
      data-message-id={messageId}
      data-footer-open={reactionPickerOpened ? 'true' : undefined}
      {...getStyles('root')}
      {...others}
    >
      {replyTo && (
        <Box component="div" {...getStyles('replyQuote')}>
          {replyTo.label != null && replyTo.label !== '' && (
            <Text component="div" {...getStyles('replyQuoteLabel')}>
              {replyTo.label}
            </Text>
          )}
          <Text component="div" lineClamp={3} {...getStyles('replyQuotePreview')}>
            {replyTo.preview}
          </Text>
        </Box>
      )}

      <Box component="div" {...getStyles('bubbleWrap')}>
        <Box component="div" {...getStyles('bubble')}>
          {children}
        </Box>

        {showFooter && (
          <Group component="div" gap={2} wrap="nowrap" {...getStyles('footer')}>
            {reactions?.map((r) => (
              <UnstyledButton
                key={r.emoji}
                type="button"
                data-reacted={r.reacted ? 'true' : 'false'}
                aria-label={`React with ${r.emoji}, ${r.count}`}
                onClick={() => onReaction?.(r.emoji)}
                {...getStyles('reaction')}
              >
                <span aria-hidden>{r.emoji}</span>
                <span {...getStyles('reactionCount')}>{r.count}</span>
              </UnstyledButton>
            ))}

            {onReaction && (
              <Popover
                opened={reactionPickerOpened}
                onChange={setReactionPickerOpened}
                position="top-start"
                offset={4}
                withinPortal
              >
                <Popover.Target>
                  <ActionIcon
                    type="button"
                    variant="subtle"
                    size="xs"
                    aria-label="Add reaction"
                    {...getStyles('reactionAdd')}
                    onClick={() => {
                      setReactionPickerOpened((open) => !open);
                    }}
                  >
                    <span aria-hidden>➕</span>
                  </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown p="xs">
                  <ScrollArea h={220} type="auto">
                    <SimpleGrid cols={8} spacing={4}>
                      {reactionEmojiList.map((emoji) => (
                        <UnstyledButton
                          key={emoji}
                          type="button"
                          onClick={() => {
                            onReaction?.(emoji);
                            setReactionPickerOpened(false);
                          }}
                          style={{ fontSize: '1.25rem', lineHeight: 1 }}
                        >
                          {emoji}
                        </UnstyledButton>
                      ))}
                    </SimpleGrid>
                  </ScrollArea>
                </Popover.Dropdown>
              </Popover>
            )}

            {onReply && (
              <Button
                type="button"
                variant="subtle"
                size="xs"
                onClick={onReply}
                {...getStyles('replyAction')}
              >
                Reply
              </Button>
            )}
          </Group>
        )}
      </Box>
    </Box>
  );
});

ChatMessage.displayName = 'ChatMessage';
ChatMessage.classes = classes;
