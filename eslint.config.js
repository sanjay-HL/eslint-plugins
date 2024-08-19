const { FlatCompat } = require('@eslint/eslintrc');
const path = require('path');
const vueEslintParser = require('vue-eslint-parser');

// Initialize FlatCompat
const compat = new FlatCompat();

module.exports = [
    {
        files: ['*.vue'],
        languageOptions: {
            parser: vueEslintParser,
            parserOptions: {
                parser: require('@babel/eslint-parser'),
                requireConfigFile: false,
                babelOptions: {
                    presets: ['@babel/preset-env'],
                },
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
        plugins: {
            'custom-rules': {
                rules: {
                    'lodash-imports': require('./rules/lodash-imports.js'),
                    'restrict-direct-strings-vue': require('./rules/restrict-direct-strings-vue.js'),
                },
            },
        },
        rules: {
            'custom-rules/lodash-imports': 'error',
            'custom-rules/restrict-direct-strings-vue': 'error',
        },
    },
];