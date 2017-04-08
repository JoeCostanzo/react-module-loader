var path = require('path');
module.exports = {
  context: path.join(__dirname, 'dist', 'index'),
  resolve: { fallback: path.join(__dirname, "node_modules") },
  resolveLoader: { fallback: path.join(__dirname, "node_modules") }
};
