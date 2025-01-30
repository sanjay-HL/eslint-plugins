module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Ensure event listeners are removed in the unmounted hook',
            category: 'Best Practices',
            recommended: false,
        },
        schema: [],
        messages: {
            missingRemoveListener: 'Event listener for "{{event}}" added in the mounted hook should be removed in the unmounted hook.',
        },
    },
    create(context) {
        const addedListeners = new Map();
        const removedListeners = new Set();

        return {
            "CallExpression[callee.property.name='addEventListener'], CallExpression[callee.property.name='on'], CallExpression[callee.property.name='$on']"(node) {
                const parent = node.parent;
                if(parent.type === 'ExpressionStatement') {
                    const eventName = node.arguments[0].value;
                    addedListeners.set(eventName, { event: eventName, node });
                }
            },

            "CallExpression[callee.property.name='removeEventListener'], CallExpression[callee.property.name='off'], CallExpression[callee.property.name='$off']"(node) {
                const parent = node.parent;
                if(parent.type === 'ExpressionStatement') {
                   removedListeners.add(node.arguments[0].value);
                }
            },
            
            "Program:exit"() {
                for (const [handler, { event, node }] of addedListeners.entries()) {
                    if (!removedListeners.has(handler)) {
                        context.report({
                            messageId: 'missingRemoveListener',
                            data: { event }, 
                            node
                        });
                    }
                }
            }

            
        };
    },
};