const { execSync } = require('child_process');
const { semverPrefix } = require('./defaultConfig');

const createTag = (prefix = semverPrefix, commitHash = null) => pkg => {
  const pkgTag = `${pkg.name}${prefix}${pkg.version}`;
  const inclCommitHash = commitHash ? commitHash : '';
  execSync(`git tag ${pkgTag} ${inclCommitHash} -am "${pkgTag}"`);
};

const deleteTag = (prefix = semverPrefix) => pkg => {
  const pkgTag = `${pkg.name}${prefix}${pkg.version}`;
  execSync(`git push origin :refs/tags/${pkgTag} && git tag -d ${pkgTag}`);
};

module.exports = {
  createTag,
  deleteTag,
};
