import { AddCarShopController } from '@/presentation/controllers/addCarShop/addCarShopController';
import {
  MissingParamError,
  InvalidParamError,
  ServerError,
  CnpjInUseError,
} from '@/presentation/errors';
import {
  AddCarShop,
  AddCarShopModel,
  CarShopModel,
  CnpjValidator,
} from '@/presentation/controllers/addCarShop/addCarShopProtocols';

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
      const fakeCarShop = {
        id: 'valid_id',
        name: 'valid_name',
        cnpj: 'valid_cnpj',
      };
      return new Promise(resolve => resolve(fakeCarShop));
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
  it('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        cnpj: 'any_cnpj',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('Should return 400 if no cnpj is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('cnpj'));
  });

  it('Should return 400 if an invalid cnpj is provided', async () => {
    const { sut, cnpjValidatorStub } = makeSut();
    jest.spyOn(cnpjValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        name: 'any_name',
        cnpj: 'invalid_cnpj',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('cnpj'));
  });

  it('Should return 403 if an already in use cnpj is provided', async () => {
    const { sut, addCarShopStub } = makeSut();
    jest.spyOn(addCarShopStub, 'add').mockReturnValueOnce(null);
    const httpRequest = {
      body: {
        name: 'any_name',
        cnpj: 'invalid_cnpj',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(403);
    expect(httpResponse.body).toEqual(new CnpjInUseError());
  });

  it('Should call CnpjValidator with correct cnpj', async () => {
    const { sut, cnpjValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(cnpjValidatorStub, 'isValid');
    const httpRequest = {
      body: {
        name: 'any_name',
        cnpj: 'any_cnpj',
      },
    };
    await sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith('any_cnpj');
  });

  it('Should return 500 if CnpjValidator throws', async () => {
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
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it('Should call AddCarShop with correct values', async () => {
    const { sut, addCarShopStub } = makeSut();
    const addSpy = jest.spyOn(addCarShopStub, 'add');
    const httpRequest = {
      body: {
        name: 'any_name',
        cnpj: 'any_cnpj',
      },
    };
    await sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  it('Should return 500 if AddCarShop throws', async () => {
    const { sut, addCarShopStub } = makeSut();
    jest
      .spyOn(addCarShopStub, 'add')
      .mockImplementationOnce(
        async () => new Promise((resolve, reject) => reject(new Error())),
      );
    const httpRequest = {
      body: {
        name: 'any_name',
        cnpj: 'any_cnpj',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'valid_name',
        cnpj: 'valid_cnpj',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({ id: 'valid_id', ...httpRequest.body });
  });
});
