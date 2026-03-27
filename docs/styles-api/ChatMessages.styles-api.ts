import type { ChatMessagesFactory } from 'mantine-chat-components';
import type { StylesApiData } from '../components/styles-api.types';

export const ChatMessagesStylesApi: StylesApiData<ChatMessagesFactory> = {
  selectors: {
    root: 'Scrollable messages region',
    inner: 'Column stack that wraps message children',
  },

  vars: {
    root: {
      '--chat-messages-gap': 'Vertical gap between messages (from `gap` prop)',
    },
  },
};
