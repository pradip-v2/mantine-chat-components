import path from 'node:path';
import { fileURLToPath } from 'node:url';
import createMDX from '@next/mdx';
import fs from 'fs-extra';
import remarkSlug from 'remark-slug';
import signale from 'signale';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
/** Resolve library source so docs dev reflects edits without running `yarn build` in `package/`. */
const mantineChatComponentsSrc = path.resolve(__dirname, '../package/src/index.ts');

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkSlug],
  },
});

let repository;

try {
  const packageJson = fs.readJsonSync('../package/package.json');
  repository = packageJson.repository.split('/').at(-1).replace('.git', '');
} catch {
  signale.error('Failed to read repository field of package/package.json\n');
  process.exit(1);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? `/${repository}` : undefined,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['mantine-chat-components'],
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'mantine-chat-components': mantineChatComponentsSrc,
    };
    return config;
  },
  turbopack: {
    resolveAlias: {
      'mantine-chat-components': mantineChatComponentsSrc,
    },
  },
};

export default withMDX(nextConfig);
