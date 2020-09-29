<h1 align="center">:sailboat: Monorepo Release</h1>

<p align="center">Automate independent versioning and publishing of packages in a monorepo</a>.</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-rebeccapurple.svg?style=flat-square" alt="License MIT">
  </a>
</p>

<hr />

## Commit message format

**Commit messages in the following format are required**

```
<type>(<scope>): <subject>
```

`<scope>` should be the name of the package intended to be released. The commit message format follows the [angular commit message guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines).

**Note:** for `<scope>` don't include the `@scope/` prefix of the package (only the package name).

**Commit message examples**

```
feat(package-a): add stuff to package-a
```

```
fix(package-b): fix something in package-b

BREAKING CHANGE:
Description of the breaking changes caused by the fix to package-b
```

**Commit message CLI**

A commit message CLI builder like [cz-customisable](https://github.com/leonardoanalista/cz-customizable) can be included in your project to ensure commit messages are always formatted correctly.

This project uses [cz-customisable](https://github.com/leonardoanalista/cz-customizable) (see [project configuration file](https://github.com/shinobi5/monorepo-release/blob/master/.cz-config.js)).

## Setup

**Requires initial package git tags to exist before the `release()` function can be used to automate versioning and publishing**

```
@scope/package-a@0.1.0
@scope/package-b@0.1.0
```

**Generate tags manually or run a function available in this package to generate initial tags across current packages**

**Create initial tags: `scripts/createTags.js`**

```js
const { createTag, getPackages } = require('monorepo-release');
const packages = getPackages();

packages.forEach(createTag());
```

**Run script**

```bash
node scripts/createTags.js
```

**Release: `scripts/release.js`**

```js
const { getPackages, release } = require('monorepo-release');
const packages = getPackages();

const config = {
  dryRun: true,
};

packages.forEach(release(config));
```

[Config options and defaults](https://github.com/shinobi5/monorepo-release/blob/master/src/defaultConfig.js)

**Run script locally or in CI**

```bash
node scripts/release.js
```

## Changelogs

Package changelogs can be generated with something like [auto-changelog](https://github.com/CookPete/auto-changelog) by setting the changelog command (`changelogCmd`) that is run (for each package)

**Install `auto-changelog` in project**

```
yarn add --dev auto-changelog
```

**packages/package-a/package.json**

```json
"scripts": {
  "changelog": "auto-changelog"
},
"auto-changelog": {
  "output": "CHANGELOG.md",
  "tagPattern": "@scope/package-a@"
}
```

**scripts/release.js**

```js
const { getPackages, release } = require('monorepo-release');
const packages = getPackages();

const config = {
  changelog: true,
  changelogCmd: 'yarn changelog',
};

packages.forEach(release(config));
```

**Run script locally or in CI**

```bash
node scripts/release.js
```
