import { AddCarShopController } from '@/presentation/controllers/addCarShop/addCarShopController';
import {
  MissingParamError,
  InvalidParamError,
  CnpjInUseError,
} from '@/presentation/errors';
import {
  AddCarShop,
  AddCarShopModel,
  CarShopModel,
  CnpjValidator,
  HttpRequest,
  Validation,
} from '@/presentation/controllers/addCarShop/addCarShopProtocols';
import {
  badRequest,
  forbidden,
  ok,
  serverError,
} from '@/presentation/helpers/http';

const makeFakeCarShop = (): CarShopModel => ({
  id: 'valid_id',
  name: 'valid_name',
  cnpj: 'valid_cnpj',
});

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    cnpj: 'any_cnpj',
  },
});

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
    async add(_carShop: AddCarShopModel): Promise<CarShopModel> {
      return new Promise(resolve => resolve(makeFakeCarShop()));
    }
  }
  return new AddCarShopStub();
};

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(_input: any): Error {
      return null;
    }
  }
  return new ValidationStub();
};

type SutTypes = {
  sut: AddCarShopController;
  cnpjValidatorStub: CnpjValidator;
  addCarShopStub: AddCarShop;
  validationStub: Validation;
};

const makeSut = (): SutTypes => {
  const cnpjValidatorStub = makeCnpjValidator();
  const addCarShopStub = makeAddCarShop();
  const validationStub = makeValidation();
  const sut = new AddCarShopController(
    cnpjValidatorStub,
    addCarShopStub,
    validationStub,
  );
  return {
    sut,
    addCarShopStub,
    cnpjValidatorStub,
    validationStub,
  };
};

describe('AddCarShopController', () => {
  it('Should return 400 if an invalid cnpj is provided', async () => {
    const { sut, cnpjValidatorStub } = makeSut();
    jest.spyOn(cnpjValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('cnpj')));
  });

  it('Should return 403 if an already in use cnpj is provided', async () => {
    const { sut, addCarShopStub } = makeSut();
    jest.spyOn(addCarShopStub, 'add').mockReturnValueOnce(null);
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(forbidden(new CnpjInUseError()));
  });

  it('Should call CnpjValidator with correct cnpj', async () => {
    const { sut, cnpjValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(cnpjValidatorStub, 'isValid');
    await sut.handle(makeFakeRequest());
    expect(isValidSpy).toHaveBeenCalledWith('any_cnpj');
  });

  it('Should return 500 if CnpjValidator throws', async () => {
    const { sut, cnpjValidatorStub } = makeSut();
    jest.spyOn(cnpjValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError());
  });

  it('Should call AddCarShop with correct values', async () => {
    const { sut, addCarShopStub } = makeSut();
    const addSpy = jest.spyOn(addCarShopStub, 'add');
    await sut.handle(makeFakeRequest());
    expect(addSpy).toHaveBeenCalledWith(makeFakeRequest().body);
  });

  it('Should return 500 if AddCarShop throws', async () => {
    const { sut, addCarShopStub } = makeSut();
    jest
      .spyOn(addCarShopStub, 'add')
      .mockImplementationOnce(
        async () => new Promise((resolve, reject) => reject(new Error())),
      );
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError());
  });

  it('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeCarShop()));
  });

  it('Should call AddCarShop with correct value', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    await sut.handle(makeFakeRequest());
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest().body);
  });

  it('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_filed'));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('any_filed')),
    );
  });
});
