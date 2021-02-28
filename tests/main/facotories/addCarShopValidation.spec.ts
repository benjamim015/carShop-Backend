import { makeAddCarShopValidation } from '@/main/factories/addCarShopValidation';
import { CnpjValidation } from '@/presentation/helpers/validation/cnpjValidation';
import { RequiredFieldValidation } from '@/presentation/helpers/validation/requiredFieldValidation';
import { Validation } from '@/presentation/helpers/validation/validation';
import { ValidationComposite } from '@/presentation/helpers/validation/validationComposite';
import { CnpjValidator } from '@/presentation/protocols/cnpjValidator';

jest.mock('@/presentation/helpers/validation/validationComposite');

const makeCnpjValidator = (): CnpjValidator => {
  class CnpjValidatorStub implements CnpjValidator {
    isValid(_cnpj: string): boolean {
      return true;
    }
  }
  return new CnpjValidatorStub();
};

describe('AddCarShopValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddCarShopValidation();
    const validations: Validation[] = [];
    for (const field of ['name', 'cnpj']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new CnpjValidation('cnpj', makeCnpjValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
