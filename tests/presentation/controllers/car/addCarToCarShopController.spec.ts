import { AddCarToCarShopController } from '@/presentation/controllers/car/addCarToCarShop/addCarToCarShopController';
import {
  CarModel,
  AddCarToCarShop,
  AddCarToCarShopModel,
  HttpRequest,
} from '@/presentation/controllers/car/addCarToCarShop/addCarToCarShopProtocols';

const makeFakeCarData = (): CarModel => ({
  id: 'any_id',
  brand: 'any_brand',
  model: 'any_model',
  year: 0,
  color: 'any_color',
  price: 0,
  carShopCnpj: 'any_cnpj',
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
  it('Should call AddCarShop with correct values', async () => {
    const { sut, addCarToCarShopStub } = makeSut();
    const addSpy = jest.spyOn(addCarToCarShopStub, 'add');
    await sut.handle(makeFakeRequest());
    expect(addSpy).toHaveBeenCalledWith(makeFakeRequest().body);
  });
});
