module.exports = {
    create(context) {
      return {
        Program(node) {
          for (const statement of node.body) {
            if (statement.type === 'ImportDeclaration') {
              if (statement.source.value === 'lodash') {
                const lodashPath = require.resolve('lodash');
                try {
                  const { VERSION } = require(lodashPath);
                  const semver = require('semver'); 
                  if(semver.satisfies(VERSION, "<4.x.x")){
                    context.report({
                      node: statement,
                      loc: statement.loc,
                      message: 'Do not use Lodash versions below 4.0.0.',
                    })
                  }
                }
                catch (error) {
                  context.report({
                    node: statement,
                    loc: statement.loc,
                    message: 'Error checking Lodash version: ' + error.message,
                  })
                }
               
                break
              }
            }
          }
        },
      }
    },
  }
  