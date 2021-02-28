import { RequiredFieldValidation } from '@/presentation/helpers/validation/requiredFieldValidation';
import { Validation } from '@/presentation/helpers/validation/validation';
import { ValidationComposite } from '@/presentation/helpers/validation/validationComposite';

export const makeAddCarShopValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['name', 'cnpj']) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
