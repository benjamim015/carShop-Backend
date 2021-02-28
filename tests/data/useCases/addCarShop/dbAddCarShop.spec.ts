import { DbAddCarShop } from '@/data/useCases/addCarShop/dbAddCarShop';
import {
  AddCarShopModel,
  CarShopModel,
  AddCarShopRepository,
} from '@/data/useCases/addCarShop/dbAddCarShopProtocols';

const makeFakeCarShop = (): CarShopModel => ({
  id: 'valid_id',
  name: 'valid_name',
  cnpj: 'valid_cnpj',
});

const makeFakeCarShopData = (): AddCarShopModel => ({
  cnpj: 'valid_cnpj',
  name: 'valid_name',
});

const makeAddCarShopRepository = (): AddCarShopRepository => {
  class AddCarShopRepositoryStub implements AddCarShopRepository {
    async add(_carShop: AddCarShopModel): Promise<CarShopModel> {
      return new Promise(resolve => resolve(makeFakeCarShop()));
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
    await sut.add(makeFakeCarShopData());
    expect(addSpy).toHaveBeenCalledWith(makeFakeCarShopData());
  });

  it('should throw if DbAddCarShop throws', async () => {
    const { sut, addCarShopRepositoryStub } = makeSut();
    jest
      .spyOn(addCarShopRepositoryStub, 'add')
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));
    const promise = sut.add(makeFakeCarShopData());
    await expect(promise).rejects.toThrow();
  });

  it('should return an car shop on success', async () => {
    const { sut } = makeSut();
    const carShop = await sut.add(makeFakeCarShopData());
    expect(carShop).toEqual(makeFakeCarShop());
  });
});
