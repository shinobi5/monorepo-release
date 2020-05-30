const fs = require('fs');
const config = require('./src/defaultConfig');
const breakingPrefix = config.conventions.major;
const conventions = [...config.conventions.minor, ...config.conventions.patch];
const scopes = fs.readdirSync('./src/').map(file => ({ name: file }));
const types = conventions.map(c => ({
  value: c.name,
  name: c.description,
}));

module.exports = {
  allowBreakingChanges: ['feat', 'fix'],
  allowCustomScopes: true,
  breakingPrefix,
  messages: {
    type: "Select the type of change that you're committing:",
    customScope: 'Enter custom scope',
    scope: 'Denote the SCOPE of this change',
    subject: 'Write a SHORT description of thre change:\n',
    body:
      'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'Describe any BREAKING CHANGES (only if applicable):\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?',
  },
  scopes,
  types,
};
