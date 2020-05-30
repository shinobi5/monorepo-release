const { execSync } = require('child_process');
const defaultConfig = require('./defaultConfig');

module.exports = (config = {}) => {
  const opts = {
    ...defaultConfig,
    ...config,
  };

  const isDryRun = `${
    opts.dryRun
      ? '--dry-run'
      : opts.public
      ? '--access public'
      : '--access restricted'
  }`;
  const versionPackage = `npm version ${opts.semverBump}`;
  const publishPackage = `npm publish ${isDryRun}`;
  const commitUpdates = `git add -A && git commit -m "${opts.pkgTag}"`;
  const createTag = `git tag ${opts.pkgTag} -am "${opts.pkgTag}"`;
  const deleteTag = `git tag -d ${opts.pkgTag}`;
  const generateChangelog = `${opts.changelogCmd}`;

  execSync(`${versionPackage} && ${publishPackage}`, {
    cwd: opts.pkgDir,
  });

  !opts.changelog && execSync(`${commitUpdates}`, { cwd: opts.pkgDir });
  execSync(`${createTag}`, { cwd: opts.pkgDir });

  if (opts.changelog) {
    execSync(`${generateChangelog}`, { cwd: opts.pkgDir });
    execSync(`${deleteTag}`, { cwd: opts.pkgDir });
    execSync(`${commitUpdates}`, { cwd: opts.pkgDir });
    execSync(`${createTag}`, { cwd: opts.pkgDir });
  }
};
