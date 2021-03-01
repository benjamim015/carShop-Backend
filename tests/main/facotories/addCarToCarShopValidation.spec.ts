import { makeAddCarToCarShopValidation } from '@/main/factories/addCarToCarShopValidation';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validation/validators';
import { Validation } from '@/presentation/protocols';

jest.mock('@/validation/validators/validationComposite');

describe('AddCarToCarShopValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddCarToCarShopValidation();
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
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
