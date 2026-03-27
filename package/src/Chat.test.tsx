import { tests } from '@mantine-tests/core';
import { Chat, ChatProps, ChatStylesNames } from './Chat';

const defaultProps: ChatProps = {};

describe('Chat', () => {
  tests.itSupportsSystemProps<ChatProps, ChatStylesNames>({
    component: Chat,
    props: defaultProps,
    polymorphic: true,
    styleProps: true,
    extend: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: 'Chat',
    stylesApiSelectors: ['root'],
  });
});
