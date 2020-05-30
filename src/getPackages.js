const fs = require('fs');
const { pkgDir: pkgDirDefault } = require('./defaultConfig');
const rootDir = process.cwd();

module.exports = (pkgDir = pkgDirDefault) => {
  const packagesDir = `${rootDir}/${pkgDir}`;
  const pkgDirs = fs.readdirSync(packagesDir);
  let packages = [];

  pkgDirs.forEach(pkg => {
    let pkgObj = require(`${packagesDir}/${pkg}/package.json`);
    !pkgObj.private && packages.push(pkgObj);
  });
  return packages;
};
