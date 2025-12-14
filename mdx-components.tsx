import React from 'react';

import type {MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: (props) => <h1 className='text-3xl font-bold mt-8 mb-4' {...props} />,
        h2: (props) => <h2 className='text-2xl font-semibold mt-6 mb-3' {...props}/>,
        p: (props) => <p className='my-2 leading-relaxed' {...props}/>,
        code: (props) => <code className='bg-gray-100 rounded px-1 py-0.5 font-mono text-sm' {...props} />,
        ...components,
    };
}