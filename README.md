# mantine-chat-components

Chat UI primitives for React, built on [Mantine](https://mantine.dev/): **Chat** (layout), **ChatMessages** (scrollable list), **ChatMessage** (user/assistant bubbles), and **ChatInput** (composer with send).

## Install

```bash
yarn add mantine-chat-components @mantine/core @mantine/hooks
```

Import styles once (e.g. in your app root):

```tsx
import 'mantine-chat-components/styles.css';
```

Peer dependencies: `@mantine/core` ≥ 7, `@mantine/hooks` ≥ 7, React 18 or 19.

## Development (this repo)

This repository uses the Mantine extension template layout: the publishable package lives under `package/`, and the Next.js docs site lives under `docs/`.

- `yarn` — install dependencies
- `yarn build` — build the library (`package/dist`)
- `yarn dev` — documentation site
- `yarn storybook` — Storybook for components
- `yarn test` — format, typecheck, lint, and tests

## License

MIT
