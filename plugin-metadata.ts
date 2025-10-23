import { exposedModules } from './plugin-extensions';

import { ConsolePluginBuildMetadata } from '@openshift-console/dynamic-plugin-sdk-webpack';
import pkg from './package.json';

const pluginMetadata: ConsolePluginBuildMetadata = {
  name: pkg.name,
  version: pkg.version,
  displayName: pkg.displayName,
  description: pkg.description,
  exposedModules: exposedModules,
  dependencies: {
    '@console/pluginAPI': '>=4.17.0-0',
  },
};

export default pluginMetadata;
