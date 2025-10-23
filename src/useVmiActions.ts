import { type ExtensionHook, Action } from '@openshift-console/dynamic-plugin-sdk';
import { V1VirtualMachineInstance } from '@kubevirt-ui/kubevirt-api/kubevirt';
import { useMemo } from 'react';

const useVmiActions: ExtensionHook<Action[], V1VirtualMachineInstance> = (
  vmi: V1VirtualMachineInstance,
) => {
  const validVm = vmi?.metadata?.namespace && vmi?.metadata?.name;
  const goToVmAction: Action = useMemo(
    () => ({
      id: 'go-to-vm',
      path: '$top',
      cta: {
        href: `/k8s/ns/${vmi?.metadata?.namespace}/kubevirt.io~v1~VirtualMachine/${vmi?.metadata?.name}`,
      },
      label: 'Go to VM',
      description: 'From Provider',
      disabled: !validVm,
      disabledTooltip: validVm ? '' : 'Invalid VM',
    }),
    [validVm, vmi?.metadata?.namespace, vmi?.metadata?.name],
  );

  const actions = useMemo(() => [goToVmAction], [goToVmAction]);
  return [actions, true, null];
};

export default useVmiActions;
