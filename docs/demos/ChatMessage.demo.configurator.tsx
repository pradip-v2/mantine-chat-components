import React from 'react';
import { ChatMessage } from 'mantine-chat-components';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { ChatMessage } from 'mantine-chat-components';

function Demo() {
  return (
    <ChatMessage{{props}}>
      This is a chat bubble. Resize the window to see max-width behavior.
    </ChatMessage>
  );
}
`;

function Wrapper(props: any) {
  return (
    <ChatMessage {...props}>
      This is a chat bubble. Resize the window to see max-width behavior.
    </ChatMessage>
  );
}

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    {
      type: 'select',
      prop: 'sender',
      initialValue: 'assistant',
      data: [
        { label: 'assistant', value: 'assistant' },
        { label: 'user', value: 'user' },
      ],
      libraryValue: '__',
    },
    { type: 'color', prop: 'userColor', initialValue: 'blue', libraryValue: null },
    { type: 'color', prop: 'assistantColor', initialValue: 'gray', libraryValue: null },
  ],
};
