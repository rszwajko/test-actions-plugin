import { type ExtensionHook, Action } from '@openshift-console/dynamic-plugin-sdk';
import { V1VirtualMachine } from '@kubevirt-ui/kubevirt-api/kubevirt';
import { useMemo } from 'react';

const useVmActions: ExtensionHook<Action[], V1VirtualMachine> = (vm: V1VirtualMachine) => {
  const validVm = vm?.metadata?.namespace && vm?.metadata?.name;
  const goToVmAction: Action = useMemo(
    () => ({
      insertBefore: 'migration-menu',
      id: 'go-to-vmi',
      cta: {
        href: `/k8s/ns/${vm?.metadata?.namespace}/kubevirt.io~v1~VirtualMachineInstance/${vm?.metadata?.name}`,
      },
      label: 'Go to VMI',
      description: 'From Provider',
      disabled: !validVm,
      disabledTooltip: validVm ? '' : 'Invalid VM',
    }),
    [validVm, vm?.metadata?.namespace, vm?.metadata?.name],
  );

  const actions = useMemo(() => [goToVmAction], [goToVmAction]);
  return [actions, true, null];
};

export default useVmActions;
