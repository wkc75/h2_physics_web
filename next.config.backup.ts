import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig = withMDX({
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
});

export default nextConfig;
