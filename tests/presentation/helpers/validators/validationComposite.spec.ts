import { MissingParamError } from '@/presentation/errors';
import { Validation } from '@/presentation/helpers/validation/validation';
import { ValidationComposite } from '@/presentation/helpers/validation/validationComposite';

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(_input: any): Error {
      return null;
    }
  }
  return new ValidationStub();
};
type SutType = {
  sut: ValidationComposite;
  validationStubs: Validation[];
};

const makeSut = (): SutType => {
  const validationStubs = [makeValidation(), makeValidation()];
  const sut = new ValidationComposite(validationStubs);
  return {
    sut,
    validationStubs,
  };
};

describe('Validation Composite', () => {
  it('Should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut();
    jest
      .spyOn(validationStubs[1], 'validate')
      .mockReturnValueOnce(new MissingParamError('field'));
    const error = sut.validate({ field: 'any_value' });
    expect(error).toEqual(new MissingParamError('field'));
  });

  it('Should return the first error if more then one validation fails', () => {
    const { sut, validationStubs } = makeSut();
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error());
    jest
      .spyOn(validationStubs[1], 'validate')
      .mockReturnValueOnce(new MissingParamError('field'));
    const error = sut.validate({ field: 'any_value' });
    expect(error).toEqual(new Error());
  });
});
