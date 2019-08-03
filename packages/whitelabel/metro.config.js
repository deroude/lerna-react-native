/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require("path");
const fs = require("fs");
const metroResolver = require('metro-resolver').resolve;

const searchPaths = [
  { path: path.resolve(__dirname, 'lib'), prefix: './lib/' }
];

module.exports = {
  projectRoot: path.resolve(__dirname),
  watchFolders: [...searchPaths.map(p => p.path), path.resolve(__dirname, '../../node_modules')],
  resolver: {
    resolveRequest: (context, realModuleName, platform) => {
      if (realModuleName.startsWith('@app')) {
        const moduleName = realModuleName.replace('@app/', '');
        for (let candidate of searchPaths) {
          const realPath = path.resolve(candidate.path, moduleName);
          if (fs.existsSync(realPath)) {
            const localPath = candidate.prefix + moduleName;
            console.log(`\n\nResolved ${realModuleName} to ${localPath}`);
            return metroResolver({ ...context, resolveRequest: null }, localPath, platform);
          }
        }
      }
      return metroResolver({ ...context, resolveRequest: null }, realModuleName, platform);
    },
    extraNodeModules: new Proxy({}, {
      get: (target, name) => {
        if (fs.existsSync(path.resolve(__dirname, 'node_modules', name))) {
          return path.resolve(__dirname, 'node_modules', name);
        }
        return path.resolve(__dirname, '../../node_modules', name);
      }
    }),
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
