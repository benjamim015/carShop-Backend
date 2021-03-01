import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validation/validators';
import { Validation } from '@/presentation/protocols';

export const makeAddCarToCarShopValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of [
    'brand',
    'model',
    'year',
    'color',
    'price',
    'carShopCnpj',
  ]) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
