module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow direct string usage in Vue templates',
            category: 'Best Practices',
            recommended: false,
        },
        schema: [],
        messages: {
            noDirectStrings: 'Avoid using direct strings in Vue templates. Use variables or translations instead.',
        },
    },
    create(context) {
        return {
            Program(node) {
                if (node.templateBody) {
                    traverseElementNodes(node.templateBody, context);
                }
            },
        };

        function traverseElementNodes(elementNode, context) {
            if (elementNode.type === 'VElement' && elementNode.children) {
                elementNode.children.forEach(child => {
                    if (child.type === 'VText' && child.value.trim().length > 0) {
                        context.report({
                            node: child,
                            messageId: 'noDirectStrings',
                        });
                    } else if (child.type === 'VElement') {
                        traverseElementNodes(child, context);
                    }
                    else if (child.type === 'VExpressionContainer') {
                        if (child.expression.type === 'Literal') {
                            context.report({
                                node: child,
                                messageId: 'noDirectStrings',
                            });
                        }
                    }
                });
            }
        }
    },
};
