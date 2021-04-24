import { ref, watch } from 'vue-demi';
import {
  OV,
  OVObject,
  OVValidation,
  OVValidationConfig,
  OVConfiguration,
} from 'ottervalidation';

type OVVErrors = {
  errors?: string[];
};
type OVVModel = OVVErrors & {
  model: unknown;
};
type OVVObject<T> = {
  [K in keyof T]: OVVModel;
};
type OVV<T> = OVVErrors & {
  object: OVVObject<T>;
};
type OVVConfiguration = OVConfiguration;

const createOVV = <T>(
  object: OVObject<T>,
  validation: OVValidation<T>,
  configuration?: OVVConfiguration,
): OVV<T> => {
  const ov = new OV(object, validation, configuration);
  const ovResult = ov.validate();
  const ovResultObject = ovResult.object;
  const ovResultObjectKeys = Object.keys(ovResultObject) as Array<keyof typeof ovResultObject>;

  const ovv: OVV<T> = {
    object: {} as OVVObject<T>,
    errors: ovResult.errors,
  };

  ovResultObjectKeys.forEach((resultObjectKey) => {
    const model = ref(object[resultObjectKey]);

    ovv.object[resultObjectKey] = {
      model,
      errors: ovResultObject[resultObjectKey].errors,
    };

    watch(model, (value) => {
      // eslint-disable-next-line no-param-reassign
      object[resultObjectKey] = value;

      const ovSubResult = ov.validate();
      ovv.errors = ovSubResult.errors;
      ovv.object[resultObjectKey].errors = ovSubResult.object[resultObjectKey].errors;
    });
  });

  return ovv;
};

export {
  createOVV,
  OVObject,
  OVValidation,
  OVValidationConfig,
  OVVConfiguration,
};
