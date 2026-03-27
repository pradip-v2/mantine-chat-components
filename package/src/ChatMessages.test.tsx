import React from 'react';
import { render, tests } from '@mantine-tests/core';
import { ChatMessages, ChatMessagesProps, ChatMessagesStylesNames } from './ChatMessages';

const defaultProps: ChatMessagesProps = {};

describe('ChatMessages', () => {
  tests.itSupportsSystemProps<ChatMessagesProps, ChatMessagesStylesNames>({
    component: ChatMessages,
    props: defaultProps,
    polymorphic: true,
    styleProps: true,
    extend: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: 'ChatMessages',
    stylesApiSelectors: ['root', 'inner'],
  });

  it('renders children', () => {
    const { getByText } = render(
      <ChatMessages>
        <span>child</span>
      </ChatMessages>
    );
    expect(getByText('child')).toBeInTheDocument();
  });
});
