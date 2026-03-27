import React, { useState } from 'react';
import { Chat, ChatInput, ChatMessage, ChatMessages } from 'mantine-chat-components';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { useState } from 'react';
import { Chat, ChatMessages, ChatMessage, ChatInput } from 'mantine-chat-components';

function Demo() {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'assistant' as const, text: 'Hello! Ask me anything.' },
  ]);

  const send = () => {
    const text = value.trim();
    if (!text) return;
    setMessages((m) => [...m, { sender: 'user' as const, text }]);
    setValue('');
    setTimeout(() => {
      setMessages((m) => [...m, { sender: 'assistant' as const, text: 'Got it.' }]);
    }, 300);
  };

  return (
    <Chat h={360}>
      <ChatMessages>
        {messages.map((msg, i) => (
          <ChatMessage key={i} sender={msg.sender}>
            {msg.text}
          </ChatMessage>
        ))}
      </ChatMessages>
      <ChatInput value={value} onValueChange={setValue} onSubmit={send} />
    </Chat>
  );
}
`;

function Demo() {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'assistant'; text: string }[]>([
    { sender: 'assistant', text: 'Hello! Ask me anything.' },
  ]);

  const send = () => {
    const text = value.trim();
    if (!text) {
      return;
    }
    setMessages((m) => [...m, { sender: 'user', text }]);
    setValue('');
    setTimeout(() => {
      setMessages((m) => [...m, { sender: 'assistant', text: 'Got it.' }]);
    }, 300);
  };

  return (
    <Chat h={360}>
      <ChatMessages>
        {messages.map((msg, i) => (
          <ChatMessage key={i} sender={msg.sender}>
            {msg.text}
          </ChatMessage>
        ))}
      </ChatMessages>
      <ChatInput value={value} onValueChange={setValue} onSubmit={send} />
    </Chat>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
