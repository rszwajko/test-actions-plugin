import type {
  ConsolePluginBuildMetadata,
  EncodedExtension,
} from '@openshift-console/dynamic-plugin-sdk-webpack';

import {
  ActionGroup,
  ActionProvider,
  HorizontalNavTab,
  ResourceActionProvider,
} from '@openshift-console/dynamic-plugin-sdk';

export const exposedModules: ConsolePluginBuildMetadata['exposedModules'] = {
  useVmActions: './useVmActions',
  useVmiActions: './useVmiActions',
  useVmActionsForResourceProvider: './useVmActionsForResourceProvider',
  TestTab: './TestTab.tsx',
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
  {
    type: 'console.tab/horizontalNav',
    properties: {
      model: {
        version: 'v1',
        group: 'kubevirt.io',
        kind: 'VirtualMachine',
      },
      page: {
        name: 'Test',
        href: 'test',
      },
      component: { $codeRef: 'TestTab' },
    },
    flags: {
      disallowed: ['KUBEVIRT_UI_OBJECTS_UNDER_CONSTRUCTION'],
    },
  } as EncodedExtension<HorizontalNavTab>,
];

export default extensions;
