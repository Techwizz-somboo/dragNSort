const pkg = require('../package.json');

process.stdout.write(`${pkg.name} version ${pkg.version}. Made by ${pkg.author}. ${pkg.license} license.\nVisit ${pkg.homepage} for more information.\nSource code: ${pkg.repository}`);
