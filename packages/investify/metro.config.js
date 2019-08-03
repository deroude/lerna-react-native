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
  path.resolve(__dirname, 'lib'),
  path.resolve(__dirname, '../whitelabel/lib'), 
];

module.exports = {
  projectRoot: path.resolve(__dirname),
  watchFolders: [...searchPaths, path.resolve(__dirname, '../../node_modules')],
  resolver: {
    resolveRequest: (context, realModuleName, platform) => {
      if (realModuleName.startsWith('@app')) {
        const moduleName = realModuleName.replace('@app/', '');
        for (let candidate of searchPaths) {
          const realPath = path.resolve(candidate, moduleName);
          if (fs.existsSync(realPath)) {
            console.log(`\n\nResolved ${realModuleName} to ${realPath}`);
            return metroResolver({ ...context, resolveRequest: null }, realPath, platform);
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
