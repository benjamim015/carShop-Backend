import { CnpjValidation } from '@/presentation/helpers/validation/cnpjValidation';
import { RequiredFieldValidation } from '@/presentation/helpers/validation/requiredFieldValidation';
import { Validation } from '@/presentation/protocols/validation';
import { ValidationComposite } from '@/presentation/helpers/validation/validationComposite';
import { CnpjValidatorAdapter } from '@/validation/cnpjValidatorAdapter';

export const makeAddCarShopValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['name', 'cnpj']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new CnpjValidation('cnpj', new CnpjValidatorAdapter()));
  return new ValidationComposite(validations);
};
