import {
  CnpjValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validation/validators';
import { Validation } from '@/presentation/protocols';
import { CnpjValidatorAdapter } from '@/infra/validators/cnpjValidatorAdapter';

export const makeAddCarShopValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['name', 'cnpj']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new CnpjValidation('cnpj', new CnpjValidatorAdapter()));
  return new ValidationComposite(validations);
};
