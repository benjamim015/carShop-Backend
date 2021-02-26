import { CnpjValidatorAdapter } from '@/validation/cnpjValidator';
import { cnpjValidator } from 'some-validations';

jest.mock('some-validations', () => ({
  cnpjValidator: {
    isValid(): boolean {
      return true;
    },
  },
}));

const makeSut = (): CnpjValidatorAdapter => new CnpjValidatorAdapter();

describe('CnpjValidator Adapter', () => {
  it('should return false if validator returns false', () => {
    const sut = makeSut();
    jest.spyOn(cnpjValidator, 'isValid').mockReturnValueOnce(false);
    const isValid = sut.isValid('invalid_cnpj');
    expect(isValid).toBe(false);
  });

  it('should return true if validator returns true', () => {
    const sut = makeSut();
    const isValid = sut.isValid('valid_cnpj');
    expect(isValid).toBe(true);
  });

  it('should call cnpjValidator with correct CNPJ', () => {
    const sut = makeSut();
    const isValidSpy = jest.spyOn(cnpjValidator, 'isValid');
    sut.isValid('any_cnpj');
    expect(isValidSpy).toHaveBeenCalledWith('any_cnpj');
  });
});
