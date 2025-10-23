import type {
  ConsolePluginBuildMetadata,
  EncodedExtension,
} from '@openshift-console/dynamic-plugin-sdk-webpack';

import {
  ActionGroup,
  ActionProvider,
  ResourceActionProvider,
} from '@openshift-console/dynamic-plugin-sdk';

export const exposedModules: ConsolePluginBuildMetadata['exposedModules'] = {
  useVmActions: './useVmActions',
  useVmiActions: './useVmiActions',
  useVmActionsForResourceProvider: './useVmActionsForResourceProvider',
};

const extensions: EncodedExtension[] = [
  {
    type: 'console.action/group',
    properties: {
      id: 'migration-menu',
      label: 'Migration(from ext)',
    },
  } as EncodedExtension<ActionGroup>,
  {
    type: 'console.action/group',
    properties: {
      id: 'nested-migration',
      label: 'Nested Migration',
      submenu: true,
    },
  } as EncodedExtension<ActionGroup>,
  {
    type: 'console.action/provider',
    properties: {
      contextId: 'kubevirt.io~v1~VirtualMachineInstance',
      provider: {
        $codeRef: 'useVmiActions',
      },
    },
  } as EncodedExtension<ActionProvider>,
  {
    type: 'console.action/resource-provider',
    properties: {
      model: {
        group: 'kubevirt.io',
        kind: 'VirtualMachine',
        version: 'v1',
      },
      provider: {
        $codeRef: 'useVmActionsForResourceProvider',
      },
    },
  } as EncodedExtension<ResourceActionProvider>,
  {
    type: 'console.action/provider',
    properties: {
      contextId: 'kubevirt.io~v1~VirtualMachine',
      provider: {
        $codeRef: 'useVmActions',
      },
    },
  } as EncodedExtension<ActionProvider>,
];

export default extensions;
