import React, { useRef, useState } from 'react';
import {
  ActionIcon,
  Box,
  BoxProps,
  CloseButton,
  ElementProps,
  factory,
  Factory,
  FileButton,
  Group,
  Loader,
  Popover,
  ScrollArea,
  SimpleGrid,
  StylesApiProps,
  Text,
  Textarea,
  TextareaProps,
  UnstyledButton,
  useProps,
  useStyles,
} from '@mantine/core';
import { CHAT_EMOJIS } from './chatEmojis';
import classes from './ChatInput.module.css';

export type ChatInputStylesNames =
  | 'root'
  | 'replyPreview'
  | 'replyPreviewBody'
  | 'replyPreviewLabel'
  | 'replyPreviewText'
  | 'attachments'
  | 'attachment'
  | 'row'
  | 'toolbar'
  | 'emoji'
  | 'file'
  | 'input'
  | 'control';

export type ChatInputCssVariables = {
  root: never;
};

export interface ChatInputProps
  extends BoxProps,
    StylesApiProps<ChatInputFactory>,
    ElementProps<'form'> {
  /** Current input value */
  value?: string;

  /** Called when the value changes */
  onValueChange?: (value: string) => void;

  /** Called when the user submits (send button or Enter without Shift) */
  onSubmit?: () => void;

  /** Props passed to the underlying Textarea */
  inputProps?: Omit<TextareaProps, 'value' | 'defaultValue' | 'onChange'>;

  /** Disables the textarea and send control */
  disabled?: boolean;

  /** Shows a loading indicator on the send control */
  loading?: boolean;

  /** Show emoji picker button */
  withEmojiPicker?: boolean;

  /** Show file upload button */
  withFileUpload?: boolean;

  /** Selected files (controlled). When omitted, selection is kept in component state. */
  files?: File[];

  /** Called when the selected files change (add or remove) */
  onFilesChange?: (files: File[]) => void;

  /** `accept` attribute for the file input. */
  accept?: string;

  /** Allow selecting multiple files */
  multipleFiles?: boolean;

  /** Emojis shown in the picker (defaults to the built-in curated list) */
  emojiList?: string[];

  /** When set, shows who you are replying to above the field (use with `onCancelReply`). */
  replyingTo?: ChatInputReplyingTo | null;

  /** Clears the reply target (e.g. when the user dismisses the preview). */
  onCancelReply?: () => void;
}

/** Reply context shown on top of the composer. */
export interface ChatInputReplyingTo {
  /** Stable id of the message being replied to */
  id: string;

  /** Short label, e.g. sender name */
  label?: React.ReactNode;

  /** Preview of the original message */
  preview: React.ReactNode;
}

export type ChatInputFactory = Factory<{
  props: ChatInputProps;
  ref: HTMLFormElement;
  stylesNames: ChatInputStylesNames;
  vars: ChatInputCssVariables;
}>;

const defaultProps: Partial<ChatInputProps> = {
  withEmojiPicker: true,
  withFileUpload: true,
  multipleFiles: true,
};

export const ChatInput = factory<ChatInputFactory>((_props, ref) => {
  const props = useProps('ChatInput', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    value,
    onValueChange,
    onSubmit,
    inputProps,
    disabled,
    loading,
    withEmojiPicker,
    withFileUpload,
    files: filesProp,
    onFilesChange,
    accept,
    multipleFiles,
    emojiList = CHAT_EMOJIS,
    replyingTo,
    onCancelReply,
    ...others
  } = props;

  const [internalFiles, setInternalFiles] = useState<File[]>([]);
  const [emojiOpened, setEmojiOpened] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const files = filesProp ?? internalFiles;
  const isFilesControlled = filesProp !== undefined;

  const setFiles = (next: File[]) => {
    if (!isFilesControlled) {
      setInternalFiles(next);
    }
    onFilesChange?.(next);
  };

  const addFiles = (picked: File[]) => {
    if (picked.length === 0) {
      return;
    }
    const next = multipleFiles ? [...files, ...picked] : picked;
    setFiles(next);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const insertText = (text: string) => {
    const el = textareaRef.current;
    const current = value ?? '';
    if (!el) {
      onValueChange?.(current + text);
      return;
    }
    const start = el.selectionStart ?? current.length;
    const end = el.selectionEnd ?? current.length;
    const next = `${current.slice(0, start)}${text}${current.slice(end)}`;
    onValueChange?.(next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + text.length;
      el.setSelectionRange(pos, pos);
    });
  };

  const getStyles = useStyles<ChatInputFactory>({
    name: 'ChatInput',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    inputProps?.onKeyDown?.(event);
    if (event.defaultPrevented) {
      return;
    }
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSubmit?.();
    }
  };

  const showToolbar = withEmojiPicker || withFileUpload;

  return (
    <Box ref={ref} component="form" onSubmit={handleSubmit} {...getStyles('root')} {...others}>
      {replyingTo && (
        <div {...getStyles('replyPreview')}>
          <Box {...getStyles('replyPreviewBody')}>
            <Text component="div" {...getStyles('replyPreviewLabel')}>
              {replyingTo.label ?? 'Replying to message'}
            </Text>
            <Text component="div" lineClamp={3} {...getStyles('replyPreviewText')}>
              {replyingTo.preview}
            </Text>
          </Box>
          <CloseButton
            size="sm"
            aria-label="Cancel reply"
            onClick={() => onCancelReply?.()}
            disabled={disabled || loading}
          />
        </div>
      )}

      {files.length > 0 && (
        <Group {...getStyles('attachments')} gap="xs">
          {files.map((file, index) => (
            <Group
              key={`${file.name}-${file.size}-${index}`}
              gap={4}
              wrap="nowrap"
              {...getStyles('attachment')}
            >
              <Text component="span" size="xs" truncate title={file.name}>
                {file.name}
              </Text>
              <CloseButton
                size="sm"
                iconSize={14}
                aria-label={`Remove ${file.name}`}
                onClick={() => removeFile(index)}
                disabled={disabled || loading}
              />
            </Group>
          ))}
        </Group>
      )}

      <div {...getStyles('row')}>
        {showToolbar && (
          <div {...getStyles('toolbar')}>
            {withEmojiPicker && (
              <Popover
                opened={emojiOpened}
                onChange={setEmojiOpened}
                position="top-start"
                offset={8}
                withinPortal
              >
                <Popover.Target>
                  <ActionIcon
                    type="button"
                    variant="default"
                    size="lg"
                    aria-label="Insert emoji"
                    disabled={disabled || loading}
                    {...getStyles('emoji')}
                    onClick={() => {
                      if (!disabled && !loading) {
                        setEmojiOpened((open) => !open);
                      }
                    }}
                  >
                    <span aria-hidden>🙂</span>
                  </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown p="xs">
                  <ScrollArea h={280} type="auto">
                    <SimpleGrid cols={8} spacing={4}>
                      {emojiList.map((emoji) => (
                        <UnstyledButton
                          key={emoji}
                          type="button"
                          onClick={() => {
                            insertText(emoji);
                            setEmojiOpened(false);
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

            {withFileUpload && (
              <FileButton
                onChange={(payload) => {
                  const picked = !payload ? [] : Array.isArray(payload) ? payload : [payload];
                  addFiles(picked);
                }}
                accept={accept}
                multiple={multipleFiles}
                disabled={disabled || loading}
              >
                {(props) => (
                  <ActionIcon
                    {...getStyles('file')}
                    {...props}
                    variant="default"
                    size="lg"
                    aria-label="Attach files"
                  >
                    <span aria-hidden>📎</span>
                  </ActionIcon>
                )}
              </FileButton>
            )}
          </div>
        )}

        <Textarea
          ref={textareaRef}
          {...getStyles('input')}
          {...inputProps}
          value={value}
          onChange={(event) => onValueChange?.(event.currentTarget.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message…"
          minRows={1}
          maxRows={6}
          autosize
          disabled={disabled || loading}
        />
        <ActionIcon
          type="submit"
          variant="filled"
          size="lg"
          aria-label="Send message"
          disabled={disabled || loading}
          {...getStyles('control')}
        >
          {loading ? (
            <Loader size="xs" color="var(--mantine-color-white)" />
          ) : (
            <span aria-hidden>➤</span>
          )}
        </ActionIcon>
      </div>
    </Box>
  );
});

ChatInput.displayName = 'ChatInput';
ChatInput.classes = classes;
