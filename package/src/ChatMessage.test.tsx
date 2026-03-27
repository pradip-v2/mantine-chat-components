import React from 'react';
import { render, screen, tests } from '@mantine-tests/core';
import { ChatMessage, ChatMessageProps, ChatMessageStylesNames } from './ChatMessage';

const defaultProps: ChatMessageProps = {};

describe('ChatMessage', () => {
  tests.itSupportsSystemProps<ChatMessageProps, ChatMessageStylesNames>({
    component: ChatMessage,
    props: defaultProps,
    polymorphic: true,
    styleProps: true,
    extend: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: 'ChatMessage',
    stylesApiSelectors: ['root', 'bubble'],
  });

  it('renders message content', () => {
    render(<ChatMessage sender="user">Hello</ChatMessage>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
