import { makeAddCarShopValidation } from '@/main/factories/addCarShopValidation';
import {
  CnpjValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/presentation/helpers/validators';
import { Validation, CnpjValidator } from '@/presentation/protocols/';

jest.mock('@/presentation/helpers/validators/validationComposite');

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
