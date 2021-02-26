import { DbAddCarShop } from '@/data/useCases/addCarShop/dbAddCarShop';
import {
  AddCarShopModel,
  CarShopModel,
  AddCarShopRepository,
} from '@/data/useCases/addCarShop/dbAddCarShopProtocols';

const makeAddCarShopRepository = (): AddCarShopRepository => {
  class AddCarShopRepositoryStub implements AddCarShopRepository {
    async add(_carShop: AddCarShopModel): Promise<CarShopModel> {
      const fakeCarShop = {
        id: 'valid_id',
        name: 'valid_name',
        cnpj: 'valid_cnpj',
      };
      return new Promise(resolve => resolve(fakeCarShop));
    }
  }
  return new AddCarShopRepositoryStub();
};

type SutTypes = {
  sut: DbAddCarShop;
  addCarShopRepositoryStub: AddCarShopRepository;
};

const makeSut = (): SutTypes => {
  const addCarShopRepositoryStub = makeAddCarShopRepository();
  const sut = new DbAddCarShop(addCarShopRepositoryStub);
  return {
    sut,
    addCarShopRepositoryStub,
  };
};

describe('DbAddCarShop UseCase', () => {
  it('should call AddCarShopRepository with correct values', async () => {
    const { sut, addCarShopRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addCarShopRepositoryStub, 'add');
    const carShopData = {
      cnpj: 'valid_cnpj',
      name: 'valid_name',
    };
    await sut.add(carShopData);
    expect(addSpy).toHaveBeenCalledWith(carShopData);
  });
});
