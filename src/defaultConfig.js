module.exports = {
  changelog: true,
  changelogCmd: 'npm run changelog',
  // see https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type
  conventions: {
    major: 'BREAKING CHANGE:',
    minor: [
      {
        name: 'feat',
        description: 'feat: A new feature',
      },
    ],
    patch: [
      {
        name: 'build',
        description:
          'build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
      },
      {
        name: 'ci',
        description:
          'ci: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)',
      },
      {
        name: 'docs',
        description: 'docs: Documentation only changes',
      },
      {
        name: 'fix',
        description: 'fix: A bug fix',
      },
      {
        name: 'perf',
        description: 'perf: A code change that improves performance',
      },
      {
        name: 'refactor',
        description:
          'refactor: A code change that neither fixes a bug nor adds a feature',
      },
      {
        name: 'style',
        description:
          'style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
      },
      {
        name: 'test',
        description: 'test: Adding missing tests or correcting existing tests',
      },
    ],
  },
  dryRun: false,
  newPkgVersion: '',
  prevPkgVersion: '',
  pkgDir: 'packages',
  pkgName: '',
  pkgTag: '',
  pkgTagPrefix: null,
  publicAccess: true,
  scope: null,
  semverBump: 'patch',
  semverPrefix: '@',
};
