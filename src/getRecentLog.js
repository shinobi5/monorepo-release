const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { conventions, pkgTagPrefix } = require('./defaultConfig');

module.exports = async (config = {}) => {
  const opts = {
    pkgTagPrefix,
    breaking: false,
    breakingConvention: conventions.major,
    ...config,
  };

  try {
    if (opts.pkgTagPrefix) {
      const getRecentLog = `git log $(git describe --match ${
        opts.pkgTagPrefix
      }* --abbrev=0)..HEAD ${
        opts.breaking ? `--grep '${opts.breakingConvention}'` : ''
      } --pretty=format:'%s'`;
      const { stdout: recentLog } = await exec(getRecentLog);
      return recentLog;
    }
  } catch (error) {
    console.log(error);
  }
};
