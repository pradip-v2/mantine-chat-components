import React, { useState } from 'react';
import { Stack } from '@mantine/core';
import { ChatMessage, type ChatMessageReaction } from './ChatMessage';

export default { title: 'mantine-chat-components/ChatMessage' };

export function Assistant() {
  return (
    <div style={{ padding: 40, maxWidth: 480 }}>
      <ChatMessage sender="assistant">Short assistant reply.</ChatMessage>
    </div>
  );
}

export function User() {
  return (
    <div style={{ padding: 40, maxWidth: 480 }}>
      <ChatMessage sender="user">User message on the right.</ChatMessage>
    </div>
  );
}

export function Both() {
  return (
    <div style={{ padding: 40, maxWidth: 560 }}>
      <Stack gap="md">
        <ChatMessage sender="assistant">Assistant bubble (left)</ChatMessage>
        <ChatMessage sender="user">User bubble (right)</ChatMessage>
        <ChatMessage sender="assistant" assistantColor="teal">
          Custom assistant color via <code>assistantColor</code>
        </ChatMessage>
        <ChatMessage sender="user" userColor="grape">
          Custom user color via <code>userColor</code>
        </ChatMessage>
      </Stack>
    </div>
  );
}

export function ReplyAndReactions() {
  const [reactions, setReactions] = useState<ChatMessageReaction[]>([
    { emoji: '👍', count: 2, reacted: false },
  ]);

  return (
    <div style={{ padding: 40, maxWidth: 480 }}>
      <ChatMessage
        sender="assistant"
        messageId="demo-1"
        replyTo={{ label: 'You', preview: 'Can we ship this today?' }}
        reactions={reactions}
        onReaction={(emoji) => {
          setReactions((prev) => {
            const idx = prev.findIndex((r) => r.emoji === emoji);
            if (idx === -1) {
              return [...prev, { emoji, count: 1, reacted: true }];
            }
            const next = [...prev];
            const r = next[idx];
            if (r.reacted) {
              const count = r.count - 1;
              if (count <= 0) {
                next.splice(idx, 1);
              } else {
                next[idx] = { ...r, count, reacted: false };
              }
            } else {
              next[idx] = { ...r, count: r.count + 1, reacted: true };
            }
            return next;
          });
        }}
        onReply={() => undefined}
      >
        Yes — we can ship it this afternoon.
      </ChatMessage>
    </div>
  );
}
