import type { ChatMessageFactory } from 'mantine-chat-components';
import type { StylesApiData } from '../components/styles-api.types';

export const ChatMessageStylesApi: StylesApiData<ChatMessageFactory> = {
  selectors: {
    root: 'Column: quote and bubble wrap (hover reveals actions)',
    bubbleWrap: 'Wraps bubble + action bar; bar is absolutely positioned under the bubble',
    replyQuote: 'Quoted parent message when `replyTo` is set',
    replyQuoteLabel: 'Label line in the quote (e.g. sender)',
    replyQuotePreview: 'Preview text in the quote',
    bubble: 'Message bubble',
    footer:
      'Reactions, + picker, Reply — shown on hover/focus or when the reaction popover is open',
    reaction: 'Single reaction chip (emoji + count)',
    reactionCount: 'Numeric count next to the emoji',
    reactionAdd: 'Opens the “add reaction” emoji grid',
    replyAction: 'Reply button',
  },

  vars: {
    root: {
      '--chat-message-user-bg': 'Background color for user messages',
      '--chat-message-user-color': 'Text color for user messages',
      '--chat-message-assistant-bg': 'Background color for assistant messages',
      '--chat-message-assistant-color': 'Text color for assistant messages',
    },
  },

  modifiers: [
    {
      modifier: 'data-sender="user"',
      selector: 'root',
      condition: '`sender` prop is `"user"`',
    },
    {
      modifier: 'data-sender="assistant"',
      selector: 'root',
      condition: '`sender` prop is `"assistant"`',
    },
    {
      modifier: 'data-reacted="true"',
      selector: 'reaction',
      condition: '`reacted` is true on that reaction',
    },
  ],
};
