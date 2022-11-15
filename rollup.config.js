const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');
const json = require('@rollup/plugin-json');

module.exports = {
    input: `src/index.ts`,
    output: {
        banner: '#!/usr/bin/env node',
        file: 'index.js',
        format: 'cjs'
    },
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [],
    plugins: [
        // Allow json resolution
        json(),
        // Compile TypeScript files
        typescript({ useTsconfigDeclarationDir: true }),
        // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
        commonjs(),
        // Allow node_modules resolution, so you can use 'external' to control
        // which external modules to include in the bundle
        // https://github.com/rollup/rollup-plugin-node-resolve#usage
        nodeResolve({ preferBuiltins: false })
    ]
}
