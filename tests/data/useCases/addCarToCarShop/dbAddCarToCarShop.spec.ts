import { AddCarToCarShopRepository } from '@/data/protocols/addCarToCarShopRepository';
import { DbAddCarToCarShop } from '@/data/useCases/addCarToCarShop/dbAddCarToCarShop';
import { CarModel } from '@/domain/models/car';
import { AddCarToCarShopModel } from '@/domain/useCases/addCarToCarShop';

const makeFakeCarData = (): CarModel => ({
  id: 'any_id',
  brand: 'any_brand',
  model: 'any_model',
  year: 0,
  color: 'any_color',
  price: 0,
  carShopCnpj: 'any_cnpj',
});

const makeAddCarToCarShopRepository = (): AddCarToCarShopRepository => {
  class AddCarToCarShopRepositoryStub implements AddCarToCarShopRepository {
    async add(_carShop: AddCarToCarShopModel): Promise<CarModel> {
      return new Promise(resolve => resolve(makeFakeCarData()));
    }
  }
  return new AddCarToCarShopRepositoryStub();
};

type SutTypes = {
  sut: DbAddCarToCarShop;
  addCarToCarShopRepositoryStub: AddCarToCarShopRepository;
};

const makeSut = (): SutTypes => {
  const addCarToCarShopRepositoryStub = makeAddCarToCarShopRepository();
  const sut = new DbAddCarToCarShop(addCarToCarShopRepositoryStub);
  return {
    sut,
    addCarToCarShopRepositoryStub,
  };
};

describe('DbAddCarToCarShop', () => {
  it('should call AddCarToCarShopRepository with correct values', async () => {
    const { sut, addCarToCarShopRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addCarToCarShopRepositoryStub, 'add');
    await sut.add(makeFakeCarData());
    expect(addSpy).toHaveBeenCalledWith(makeFakeCarData());
  });
});
