import { type ExtensionHook, Action } from '@openshift-console/dynamic-plugin-sdk';
import { V1VirtualMachineInstance } from '@kubevirt-ui/kubevirt-api/kubevirt';
import VirtualMachineInstanceModel from '@kubevirt-ui/kubevirt-api/console/models/VirtualMachineInstanceModel';
import { useMemo } from 'react';
import { asAccessReview } from './utils';

const useVmiActions: ExtensionHook<Action[], V1VirtualMachineInstance> = (
  vmi: V1VirtualMachineInstance,
) => {
  const { name, namespace } = vmi?.metadata ?? {};
  const validVm = name && namespace;
  const goToVmAction: Action = useMemo(
    () => ({
      id: 'go-to-vm',
      path: '$top',
      cta: {
        href: `/k8s/ns/${namespace}/kubevirt.io~v1~VirtualMachine/${name}`,
      },
      label: 'Go to VM',
      description: 'From Provider',
      disabled: !validVm,
      disabledTooltip: validVm ? '' : 'Invalid VM',
      accessReview: asAccessReview(VirtualMachineInstanceModel, { name, namespace }, 'delete'),
    }),
    [validVm, name, namespace],
  );

  const actions = useMemo(() => [goToVmAction], [goToVmAction]);
  return [actions, true, null];
};

export default useVmiActions;
