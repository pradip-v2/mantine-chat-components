import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { ChatInput } from './ChatInput';

export default { title: 'mantine-chat-components/ChatInput' };

export function Default() {
  const [value, setValue] = useState('');
  return (
    <div style={{ padding: 40, maxWidth: 560 }}>
      <ChatInput value={value} onValueChange={setValue} onSubmit={action('onSubmit')} />
    </div>
  );
}

export function Loading() {
  const [value, setValue] = useState('Sending…');
  return (
    <div style={{ padding: 40, maxWidth: 560 }}>
      <ChatInput value={value} onValueChange={setValue} onSubmit={() => {}} loading disabled />
    </div>
  );
}

export function WithFiles() {
  const [value, setValue] = useState('');
  return (
    <div style={{ padding: 40, maxWidth: 560 }}>
      <ChatInput
        value={value}
        onValueChange={setValue}
        onSubmit={action('onSubmit')}
        onFilesChange={action('onFilesChange')}
        accept="image/*"
      />
    </div>
  );
}
