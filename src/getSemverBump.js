const getRecentLog = require('./getRecentLog');
const defaultConfig = require('./defaultConfig');

module.exports = async (config = {}) => {
  try {
    const opts = {
      ...defaultConfig,
      ...config,
    };

    let semverBump = 'N/A';

    const recentLog = await getRecentLog({
      pkgTagPrefix: opts.pkgTagPrefix,
    });
    const recentLogBreaking = await getRecentLog({
      pkgTagPrefix: opts.pkgTagPrefix,
      breaking: true,
    });

    const logListBreaking = recentLogBreaking.split('\n');

    const patch = opts.conventions.patch.map(convention =>
      new RegExp(`${convention.name}\\(${opts.pkgName}\\)`).test(recentLog)
    );
    const minor = opts.conventions.minor.map(convention =>
      new RegExp(`${convention.name}\\(${opts.pkgName}\\)`).test(recentLog)
    );
    const major = logListBreaking.map(log =>
      new RegExp(`\\(${opts.pkgName}\\)`).test(log)
    );

    if (patch.includes(true)) semverBump = 'patch';
    if (minor.includes(true)) semverBump = 'minor';
    if (major.includes(true)) semverBump = 'major';

    return semverBump;
  } catch (error) {
    console.log(error);
  }
};
