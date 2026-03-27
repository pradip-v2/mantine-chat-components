import type { ChatFactory } from 'mantine-chat-components';
import type { StylesApiData } from '../components/styles-api.types';

export const ChatStylesApi: StylesApiData<ChatFactory> = {
  selectors: {
    root: 'Root element; column flex layout for messages and input',
  },

  vars: {
    root: {
      '--chat-bg': 'Background color of the chat surface (from `color` prop)',
    },
  },
};
