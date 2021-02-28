import { MissingParamError } from '@/presentation/errors';
import { Validation } from '@/presentation/helpers/validation/validation';
import { ValidationComposite } from '@/presentation/helpers/validation/validationComposite';

class ValidationStub implements Validation {
  validate(input: any): Error {
    return new MissingParamError('field');
  }
}

type SutType = {
  sut: ValidationComposite;
  validationStub: ValidationStub;
};

const makeSut = (): SutType => {
  const validationStub = new ValidationStub();
  const sut = new ValidationComposite([validationStub]);
  return {
    sut,
    validationStub,
  };
};

describe('Validation Composite', () => {
  it('Should return an error if any validation fails', () => {
    const { sut } = makeSut();
    const error = sut.validate({ field: 'any_value' });
    expect(error).toEqual(new MissingParamError('field'));
  });
});
