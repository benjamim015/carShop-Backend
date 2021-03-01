import { AddCarToCarShopController } from '@/presentation/controllers/car/addCarToCarShop/addCarToCarShopController';
import {
  CarModel,
  AddCarToCarShop,
  AddCarToCarShopModel,
  HttpRequest,
  ok,
} from '@/presentation/controllers/car/addCarToCarShop/addCarToCarShopProtocols';

const makeFakeCarData = (): CarModel => ({
  id: 'valid_id',
  brand: 'valid_brand',
  model: 'valid_model',
  year: 0,
  color: 'valid_color',
  price: 0,
  carShopCnpj: 'valid_cnpj',
});

const makeFakeRequest = (): HttpRequest => ({
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

type SutTypes = {
  sut: AddCarToCarShopController;
  addCarToCarShopStub: AddCarToCarShop;
};

const makeSut = (): SutTypes => {
  const addCarToCarShopStub = makeAddCarToCarShop();
  const sut = new AddCarToCarShopController(addCarToCarShopStub);
  return {
    sut,
    addCarToCarShopStub,
  };
};

describe('AddCarToCarShopController', () => {
  it('Should call AddCarToCarShop with correct values', async () => {
    const { sut, addCarToCarShopStub } = makeSut();
    const addSpy = jest.spyOn(addCarToCarShopStub, 'add');
    await sut.handle(makeFakeRequest());
    expect(addSpy).toHaveBeenCalledWith(makeFakeRequest().body);
  });

  it('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeCarData()));
  });
});
