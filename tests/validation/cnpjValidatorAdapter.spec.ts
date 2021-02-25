import { CnpjValidatorAdapter } from '@/validation/cnpjValidator';

const makeSut = (): CnpjValidatorAdapter => new CnpjValidatorAdapter();

describe('CnpjValidator Adapter', () => {
  it('should return false if validator returns false', () => {
    const sut = makeSut();
    const isValid = sut.isValid('invalid_cnpj');
    expect(isValid).toBe(false);
  });
});
