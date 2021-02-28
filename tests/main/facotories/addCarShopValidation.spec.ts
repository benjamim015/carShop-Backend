import { makeAddCarShopValidation } from '@/main/factories/addCarShopValidation';
import { RequiredFieldValidation } from '@/presentation/helpers/validation/requiredFieldValidation';
import { Validation } from '@/presentation/helpers/validation/validation';
import { ValidationComposite } from '@/presentation/helpers/validation/validationComposite';

jest.mock('@/presentation/helpers/validation/validationComposite');

describe('AddCarShopValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddCarShopValidation();
    const validations: Validation[] = [];
    for (const field of ['name', 'cnpj']) {
      validations.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
