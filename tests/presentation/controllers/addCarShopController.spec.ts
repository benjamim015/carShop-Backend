import { CarShopModel } from '@/domain/models/carShop';
import { AddCarShop, AddCarShopModel } from '@/domain/useCases/addCarShop';
import { AddCarShopController } from '@/presentation/controllers/addCarShopController';
import {
  MissingParamError,
  InvalidParamError,
  ServerError,
} from '@/presentation/errors';
import { CnpjValidator } from '@/presentation/protocols';

const makeCnpjValidator = (): CnpjValidator => {
  class CnpjValidatorStub implements CnpjValidator {
    isValid(_cnpj: string): boolean {
      return true;
    }
  }
  return new CnpjValidatorStub();
};

const makeAddCarShop = (): AddCarShop => {
  class AddCarShopStub implements AddCarShop {
    add(_carShop: AddCarShopModel): CarShopModel {
      const fakeCarShop = {
        id: 'valid_id',
        name: 'valid_name',
        cnpj: 'valid_cnpj',
      };
      return fakeCarShop;
    }
  }
  return new AddCarShopStub();
};

type SutTypes = {
  sut: AddCarShopController;
  cnpjValidatorStub: CnpjValidator;
  addCarShopStub: AddCarShop;
};

const makeSut = (): SutTypes => {
  const cnpjValidatorStub = makeCnpjValidator();
  const addCarShopStub = makeAddCarShop();
  const sut = new AddCarShopController(cnpjValidatorStub, addCarShopStub);
  return {
    sut,
    addCarShopStub,
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

  it('Should call CnpjValidator with correct cnpj', () => {
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

  it('Should return 500 if CnpjValidator throws', () => {
    const { sut, cnpjValidatorStub } = makeSut();
    jest.spyOn(cnpjValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        name: 'any_name',
        cnpj: 'any_cnpj',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it('Should call AddCarShop with correct values', () => {
    const { sut, addCarShopStub } = makeSut();
    const addSpy = jest.spyOn(addCarShopStub, 'add');
    const httpRequest = {
      body: {
        name: 'any_name',
        cnpj: 'any_cnpj',
      },
    };
    sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
