import { AddCarShopController } from '@/presentation/controllers/addCarShopController';
import { MissingParamError } from '@/presentation/errors/missingParamError';
import { InvalidParamError } from '@/presentation/errors/invalidParamError';
import { CnpjValidator } from '@/presentation/protocols/cnpjValidator';

type SutTypes = {
  sut: AddCarShopController;
  cnpjValidatorStub: CnpjValidator;
};

const makeSut = (): SutTypes => {
  class CnpjValidatorStub implements CnpjValidator {
    isValid(cnpj: string): boolean {
      return true;
    }
  }
  const cnpjValidatorStub = new CnpjValidatorStub();
  const sut = new AddCarShopController(cnpjValidatorStub);
  return {
    sut,
    cnpjValidatorStub,
  };
};

describe('AddCarShopController', () => {
  it('Should return 400 if no name is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        cnpj: 'any_cnpj',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('Should return 400 if no cnpj is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('cnpj'));
  });

  it('Should return 400 if an invalid cnpj is provided', () => {
    const { sut, cnpjValidatorStub } = makeSut();
    jest.spyOn(cnpjValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        name: 'any_name',
        cnpj: 'invalid_cnpj',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('cnpj'));
  });

  it('Should calls CnpjValidator with correct cnpj', () => {
    const { sut, cnpjValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(cnpjValidatorStub, 'isValid');
    const httpRequest = {
      body: {
        name: 'any_name',
        cnpj: 'any_cnpj',
      },
    };
    sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith('any_cnpj');
  });
});
