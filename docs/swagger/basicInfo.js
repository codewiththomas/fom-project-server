const pack = require('../../package.json');

module.exports = {
  openapi: "3.0.0",
  info: {
    title: pack.name,
    version: pack.version,
    description: pack.description,
    license: {
      name: pack.license
    },
    contact: {
      name: pack.author
    },
  }
};