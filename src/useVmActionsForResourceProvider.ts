import { type ExtensionHook, Action } from '@openshift-console/dynamic-plugin-sdk';
import { V1VirtualMachine } from '@kubevirt-ui/kubevirt-api/kubevirt';
import { useMemo } from 'react';
import { asAccessReview } from './utils';
import VirtualMachineModel from '@kubevirt-ui/kubevirt-api/console/models/VirtualMachineModel';

const useVmActionsForResourceProvider: ExtensionHook<
  Action[],
  V1VirtualMachine & { cluster?: string }
> = (vm) => {
  const { name, namespace } = vm?.metadata ?? {};
  const cluster = vm?.cluster;
  const validVm = name && namespace;
  const goToVmAction: Action = useMemo(
    () => ({
      insertBefore: 'vm-action-migrate',
      id: 'go-to-vmi-from-resource-provider',
      path: 'migration-menu',
      cta: {
        href: `/k8s/ns/${namespace}/kubevirt.io~v1~VirtualMachineInstance/${name}`,
      },
      label: 'Go to VMI',
      description: 'From Resource Provider',
      disabled: !validVm,
      disabledTooltip: validVm ? '' : 'Invalid VM',
      accessReview: asAccessReview(VirtualMachineModel, { name, namespace, cluster }, 'delete'),
    }),
    [validVm, namespace, name, cluster],
  );

  const nestedGoToVmAction: Action = useMemo(
    () => ({
      id: 'nested-go-to-vmi-from-resource-provider',
      path: 'migration-menu/nested-migration',
      cta: {
        href: `/k8s/ns/${namespace}/kubevirt.io~v1~VirtualMachineInstance/${name}`,
      },
      label: 'Go to VMI',
      description: 'Nested. From Resource Provider',
      disabled: !validVm,
      disabledTooltip: validVm ? '' : 'Invalid VM',
      accessReview: asAccessReview(VirtualMachineModel, { name, namespace, cluster }, 'delete'),
    }),
    [validVm, namespace, name, cluster],
  );

  const actions = useMemo(
    () => [goToVmAction, nestedGoToVmAction],
    [goToVmAction, nestedGoToVmAction],
  );
  return [actions, true, null];
};

export default useVmActionsForResourceProvider;
