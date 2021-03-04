import { AddCarToCarShopController } from '@/presentation/controllers/car/addCarToCarShop/addCarToCarShopController';
import {
  CarModel,
  AddCarToCarShop,
  AddCarToCarShopModel,
  HttpRequest,
  ok,
  serverError,
  Validation,
  badRequest,
} from '@/presentation/controllers/car/addCarToCarShop/addCarToCarShopProtocols';
import { MissingParamError } from '@/presentation/errors';

const makeFakeCarData = (): CarModel => ({
  id: 'valid_id',
  brand: 'valid_brand',
  model: 'valid_model',
  year: 0,
  color: 'valid_color',
  price: 0,
  carShopCnpj: 'valid_cnpj',
  image: 'valid_image',
});

const makeFakeRequest = (): HttpRequest => ({
  file: {
    filename: 'any_image',
  },
  body: {
    brand: 'any_brand',
    model: 'any_model',
    year: 0,
    color: 'any_color',
    price: 0,
    carShopCnpj: 'any_cnpj',
  },
});

const makeAddCarToCarShop = (): AddCarToCarShop => {
  class AddCarToCarShopStub implements AddCarToCarShop {
    async add(_carShop: AddCarToCarShopModel): Promise<CarModel> {
      return new Promise(resolve => resolve(makeFakeCarData()));
    }
  }
  return new AddCarToCarShopStub();
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
  sut: AddCarToCarShopController;
  addCarToCarShopStub: AddCarToCarShop;
  validationStub: Validation;
};

const makeSut = (): SutTypes => {
  const addCarToCarShopStub = makeAddCarToCarShop();
  const validationStub = makeValidation();
  const sut = new AddCarToCarShopController(
    validationStub,
    addCarToCarShopStub,
  );
  return {
    sut,
    addCarToCarShopStub,
    validationStub,
  };
};

describe('AddCarToCarShopController', () => {
  it('Should call AddCarToCarShop with correct values', async () => {
    const { sut, addCarToCarShopStub } = makeSut();
    const addSpy = jest.spyOn(addCarToCarShopStub, 'add');
    await sut.handle(makeFakeRequest());
    expect(addSpy).toHaveBeenCalledWith({
      ...makeFakeRequest().body,
      image: makeFakeRequest().file.filename,
    });
  });

  it('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeCarData()));
  });

  it('Should return 500 if AddCarToCarShop throws', async () => {
    const { sut, addCarToCarShopStub } = makeSut();
    jest
      .spyOn(addCarToCarShopStub, 'add')
      .mockImplementationOnce(
        async () => new Promise((resolve, reject) => reject(new Error())),
      );
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError());
  });

  it('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    await sut.handle(makeFakeRequest());
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest().body);
  });

  it('Should return 400 if Validation returns an error', async () => {
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
