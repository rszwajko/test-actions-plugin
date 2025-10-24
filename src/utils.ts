import {
  AccessReviewResourceAttributes,
  K8sModel,
  K8sVerb,
} from '@openshift-console/dynamic-plugin-sdk';

/**
 * function to build AccessReviewResourceAttributes from a resource
 *
 * Kubevirt-plugin utility method from https://github.com/kubevirt-ui/kubevirt-plugin/blob/a22a98b8ef58aa77fefb26ad1d5150c02949f9c4/src/utils/resources/shared.ts#L199
 *
 * Non standard cluster prop is used to extend the functionality (multicluster use case)
 *
 * @param model - k8s model
 * @param obj - resource
 * @param verb - verb
 * @param subresource - subresource
 * @returns AccessReviewResourceAttributes
 */
export const asAccessReview = (
  model: K8sModel,
  obj: { name: string; namespace: string; cluster?: string },
  verb: K8sVerb,
  subresource?: string,
): AccessReviewResourceAttributes & { cluster?: string } => {
  if (!obj) {
    return null;
  }
  return {
    cluster: obj?.cluster,
    group: model.apiGroup,
    name: obj?.name,
    namespace: obj?.namespace,
    resource: model.plural,
    subresource,
    verb,
  };
};
