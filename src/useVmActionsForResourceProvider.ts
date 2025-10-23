import { type ExtensionHook, Action } from '@openshift-console/dynamic-plugin-sdk';
import { V1VirtualMachine } from '@kubevirt-ui/kubevirt-api/kubevirt';
import { useMemo } from 'react';

const useVmActionsForResourceProvider: ExtensionHook<Action[], V1VirtualMachine> = (
  vm: V1VirtualMachine,
) => {
  const validVm = vm?.metadata?.namespace && vm?.metadata?.name;
  const goToVmAction: Action = useMemo(
    () => ({
      insertBefore: 'vm-action-migrate',
      id: 'go-to-vmi-from-resource-provider',
      path: 'migration-menu',
      cta: {
        href: `/k8s/ns/${vm?.metadata?.namespace}/kubevirt.io~v1~VirtualMachineInstance/${vm?.metadata?.name}`,
      },
      label: 'Go to VMI',
      description: 'From Resource Provider',
      disabled: !validVm,
      disabledTooltip: validVm ? '' : 'Invalid VM',
    }),
    [validVm, vm?.metadata?.namespace, vm?.metadata?.name],
  );

  const nestedGoToVmAction: Action = useMemo(
    () => ({
      id: 'nested-go-to-vmi-from-resource-provider',
      path: 'migration-menu/nested-migration',
      cta: {
        href: `/k8s/ns/${vm?.metadata?.namespace}/kubevirt.io~v1~VirtualMachineInstance/${vm?.metadata?.name}`,
      },
      label: 'Go to VMI',
      description: 'Nested. From Resource Provider',
      disabled: !validVm,
      disabledTooltip: validVm ? '' : 'Invalid VM',
    }),
    [validVm, vm?.metadata?.namespace, vm?.metadata?.name],
  );

  const actions = useMemo(
    () => [goToVmAction, nestedGoToVmAction],
    [goToVmAction, nestedGoToVmAction],
  );
  return [actions, true, null];
};

export default useVmActionsForResourceProvider;
