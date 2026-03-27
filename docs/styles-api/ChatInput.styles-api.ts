import type { ChatInputFactory } from 'mantine-chat-components';
import type { StylesApiData } from '../components/styles-api.types';

export const ChatInputStylesApi: StylesApiData<ChatInputFactory> = {
  selectors: {
    root: 'Form element wrapping reply preview, attachments, toolbar, textarea, and send control',
    replyPreview: 'Banner when `replyingTo` is set',
    replyPreviewBody: 'Label + preview text block',
    replyPreviewLabel: '“Replying to …” line',
    replyPreviewText: 'Quoted message preview',
    attachments: 'Row of selected file names and remove buttons',
    attachment: 'Single file name + remove control',
    row: 'Horizontal row: toolbar, textarea, send',
    toolbar: 'Emoji + file upload ActionIcons',
    emoji: 'Opens the emoji popover',
    file: 'Opens the file picker',
    input: 'Message Textarea',
    control: 'Send ActionIcon',
  },

  vars: {
    root: {},
  },
};
