const semverInc = require('semver/functions/inc');
const defaultConfig = require('./defaultConfig');
const getSemverBump = require('./getSemverBump');
const publishPkg = require('./publishPkg');
const rootDir = process.cwd();

module.exports = (config = {}) => async pkg => {
  try {
    const opts = {
      ...defaultConfig,
      ...config,
    };

    const pkgName = pkg.name;
    const pkgNameNoScope = opts.scope
      ? pkg.name.replace(opts.scope, '')
      : pkgName;
    const pkgVersion = pkg.version;
    const pkgDir = `${rootDir}/${opts.pkgDir}/${pkgNameNoScope}`;
    const pkgTagPrefix = `${pkgName}${opts.semverPrefix}`;
    const publicAccess = opts.publicAccess;
    const dryRun = opts.dryRun;
    const changelog = opts.changelog;
    const changelogCmd = opts.changelogCmd;
    const conventions = opts.conventions;

    const semverBump = await getSemverBump({
      conventions,
      pkgName: pkgNameNoScope,
      pkgTagPrefix,
    });

    if (semverBump === 'N/A') {
      console.log(`No updates made to ${pkgName}`);
      return;
    }

    const newPkgVersion = semverInc(pkgVersion, semverBump);
    const newPkgTag = `${pkgName}${opts.semverPrefix}${newPkgVersion}`;

    publishPkg({
      changelog,
      changelogCmd,
      dryRun,
      pkgDir,
      pkgTag: newPkgTag,
      publicAccess,
      semverBump,
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
