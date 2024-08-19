const { RuleTester } = require('eslint');
const rule = require('./rules/restrict-direct-strings-vue');
const vueEslintParser = require('vue-eslint-parser');

const ruleTester = new RuleTester({
    languageOptions: {
        parser: vueEslintParser,
        ecmaVersion: 2020,
        sourceType: 'module',
    },
});

ruleTester.run('restrict-direct-strings-vue', rule, {
    valid: [
        {
            code: '<template><div>{{ variable }}</div></template>',
        },
    ],
    invalid: [
        {
            code: '<template><div>Direct String</div></template>',
            errors: [{ messageId: 'noDirectStrings' }],
        },
    ],
});
