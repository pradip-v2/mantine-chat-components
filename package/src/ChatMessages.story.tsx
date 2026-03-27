import React from 'react';
import { Chat } from './Chat';
import { ChatMessage } from './ChatMessage';
import { ChatMessages } from './ChatMessages';

export default { title: 'mantine-chat-components/ChatMessages' };

export function WithMessages() {
  return (
    <div style={{ padding: 40, maxWidth: 480 }}>
      <Chat h={320} color="gray.0">
        <ChatMessages>
          <ChatMessage sender="assistant">Hello — I am the assistant.</ChatMessage>
          <ChatMessage sender="user">Hi! This is the user side.</ChatMessage>
          <ChatMessage sender="assistant">You can scroll when there are many lines.</ChatMessage>
        </ChatMessages>
      </Chat>
    </div>
  );
}
