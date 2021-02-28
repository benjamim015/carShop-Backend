import { InvalidParamError } from '@/presentation/errors';
import { CnpjValidation } from '@/presentation/helpers/validators/cnpjValidation';
import { CnpjValidator } from '@/presentation/protocols/cnpjValidator';

const makeCnpjValidator = (): CnpjValidator => {
  class CnpjValidatorStub implements CnpjValidator {
    isValid(_cnpj: string): boolean {
      return true;
    }
  }
  return new CnpjValidatorStub();
};

type SutTypes = {
  sut: CnpjValidation;
  cnpjValidatorStub: CnpjValidator;
};

const makeSut = (): SutTypes => {
  const cnpjValidatorStub = makeCnpjValidator();
  const sut = new CnpjValidation('cnpj', cnpjValidatorStub);
  return {
    sut,
    cnpjValidatorStub,
  };
};

describe('CNPJ Validation', () => {
  it('Should return an error if CnpjValidation return false', () => {
    const { sut, cnpjValidatorStub } = makeSut();
    jest.spyOn(cnpjValidatorStub, 'isValid').mockReturnValueOnce(false);
    const error = sut.validate({ cnpj: 'any_cnpj' });
    expect(error).toEqual(new InvalidParamError('cnpj'));
  });

  it('Should call CnpjValidator with correct cnpj', () => {
    const { sut, cnpjValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(cnpjValidatorStub, 'isValid');
    sut.validate({ cnpj: 'any_cnpj' });
    expect(isValidSpy).toHaveBeenCalledWith('any_cnpj');
  });

  it('Should throw if CnpjValidator throws', () => {
    const { sut, cnpjValidatorStub } = makeSut();
    jest.spyOn(cnpjValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    expect(sut.validate).toThrow();
  });
});
