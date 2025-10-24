import { type ExtensionHook, Action } from '@openshift-console/dynamic-plugin-sdk';
import { V1VirtualMachine } from '@kubevirt-ui/kubevirt-api/kubevirt';
import VirtualMachineModel from '@kubevirt-ui/kubevirt-api/console/models/VirtualMachineModel';
import { useMemo } from 'react';
import { asAccessReview } from './utils';

const useVmActions: ExtensionHook<Action[], V1VirtualMachine & { cluster?: string }> = (vm) => {
  const { name, namespace } = vm?.metadata ?? {};
  const cluster = vm?.cluster;
  const validVm = name && namespace;
  const goToVmAction: Action = useMemo(
    () => ({
      insertBefore: 'migration-menu',
      id: 'go-to-vmi',
      cta: {
        href: `/k8s/ns/${namespace}/kubevirt.io~v1~VirtualMachineInstance/${name}`,
      },
      label: 'Go to VMI',
      description: 'From Provider',
      disabled: !validVm,
      disabledTooltip: validVm ? '' : 'Invalid VM',
      accessReview: asAccessReview(VirtualMachineModel, { name, namespace, cluster }, 'get'),
    }),
    [validVm, name, namespace, cluster],
  );

  const actions = useMemo(() => [goToVmAction], [goToVmAction]);
  return [actions, true, null];
};

export default useVmActions;
