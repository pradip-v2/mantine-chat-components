import React from 'react';
import { render, screen, tests } from '@mantine-tests/core';
import { ChatInput, ChatInputProps, ChatInputStylesNames } from './ChatInput';

const defaultProps: ChatInputProps = {};

describe('ChatInput', () => {
  tests.itSupportsSystemProps<ChatInputProps, ChatInputStylesNames>({
    component: ChatInput,
    props: defaultProps,
    polymorphic: true,
    styleProps: true,
    extend: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLFormElement,
    displayName: 'ChatInput',
    stylesApiSelectors: ['root', 'row', 'toolbar', 'emoji', 'file', 'input', 'control'],
  });

  it('renders textarea, send, emoji, and attach controls', () => {
    render(<ChatInput value="" onValueChange={() => {}} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /insert emoji/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /attach files/i })).toBeInTheDocument();
  });

  it('hides emoji and file controls when disabled via props', () => {
    render(
      <ChatInput value="" onValueChange={() => {}} withEmojiPicker={false} withFileUpload={false} />
    );
    expect(screen.queryByRole('button', { name: /insert emoji/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /attach files/i })).not.toBeInTheDocument();
  });
});
