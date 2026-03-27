import React, { useMemo, useState } from 'react';
import { Chat } from './Chat';
import { ChatInput } from './ChatInput';
import { ChatMessage, type ChatMessageReaction } from './ChatMessage';
import { ChatMessages } from './ChatMessages';

export default { title: 'mantine-chat-components/Chat' };

type ReactionState = Record<string, { count: number; byMe: boolean }>;

type Msg = {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  replyToId?: string;
  reactions: ReactionState;
};

function toReactions(rec: ReactionState): ChatMessageReaction[] {
  return Object.entries(rec).map(([emoji, v]) => ({
    emoji,
    count: v.count,
    reacted: v.byMe,
  }));
}

function toggleReaction(rec: ReactionState, emoji: string): ReactionState {
  const next: ReactionState = { ...rec };
  const cur = next[emoji];
  if (cur?.byMe) {
    const count = cur.count - 1;
    if (count <= 0) {
      delete next[emoji];
    } else {
      next[emoji] = { count, byMe: false };
    }
  } else if (cur) {
    next[emoji] = { count: cur.count + 1, byMe: true };
  } else {
    next[emoji] = { count: 1, byMe: true };
  }
  return next;
}

/** Full chat: messages, reactions, reply target, composer */
export function Conversation() {
  const [value, setValue] = useState('');
  const [replyTargetId, setReplyTargetId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: 'Hi! How can I help you today?',
      reactions: { '👍': { count: 1, byMe: false } },
    },
  ]);

  const replyTarget = useMemo(
    () => (replyTargetId ? messages.find((m) => m.id === replyTargetId) : undefined),
    [messages, replyTargetId]
  );

  const send = () => {
    const text = value.trim();
    if (!text) {
      return;
    }
    const id = `m-${Date.now()}`;
    const replyToId = replyTargetId ?? undefined;
    setMessages((m) => [...m, { id, sender: 'user', text, replyToId, reactions: {} }]);
    setValue('');
    setReplyTargetId(null);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: `m-${Date.now()}-a`,
          sender: 'assistant',
          text: 'Thanks for your message.',
          reactions: {},
        },
      ]);
    }, 400);
  };

  return (
    <div style={{ padding: 40, maxWidth: 480 }}>
      <Chat h={420} color="gray.0">
        <ChatMessages>
          {messages.map((msg) => {
            const replySource = msg.replyToId
              ? messages.find((m) => m.id === msg.replyToId)
              : undefined;
            return (
              <ChatMessage
                key={msg.id}
                messageId={msg.id}
                sender={msg.sender}
                reactions={toReactions(msg.reactions)}
                onReaction={(emoji) => {
                  setMessages((list) =>
                    list.map((m) =>
                      m.id === msg.id ? { ...m, reactions: toggleReaction(m.reactions, emoji) } : m
                    )
                  );
                }}
                onReply={() => setReplyTargetId(msg.id)}
                replyTo={
                  replySource
                    ? {
                        label: replySource.sender === 'user' ? 'You' : 'Assistant',
                        preview: replySource.text,
                      }
                    : undefined
                }
              >
                {msg.text}
              </ChatMessage>
            );
          })}
        </ChatMessages>
        <ChatInput
          value={value}
          onValueChange={setValue}
          onSubmit={send}
          replyingTo={
            replyTarget
              ? {
                  id: replyTarget.id,
                  label: replyTarget.sender === 'user' ? 'You' : 'Assistant',
                  preview: replyTarget.text,
                }
              : null
          }
          onCancelReply={() => setReplyTargetId(null)}
        />
      </Chat>
    </div>
  );
}

/** Chat shell only (no messages / input) */
export function ShellOnly() {
  return (
    <div style={{ padding: 40, maxWidth: 480 }}>
      <Chat h={280} color="gray.0" p="md">
        Place content with <code>ChatMessages</code> and <code>ChatInput</code>
      </Chat>
    </div>
  );
}
