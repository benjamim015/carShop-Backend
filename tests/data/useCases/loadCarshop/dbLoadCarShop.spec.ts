import { LoadCarShopRepository } from '@/data/protocols/loadCarShopRepository';
import { DbLoadCarShop } from '@/data/useCases/loadCarShop/dbLoadCarShop';
import { CarShopModel } from '@/domain/models/carShop';

const makeFakeCarShop = (): CarShopModel => ({
  id: 'any_id',
  name: 'any_name',
  cnpj: 'any_cnpj',
  image: 'any_image',
});

const makeLoadCarShopRepository = (): LoadCarShopRepository => {
  class LoadCarShopRepositoryStub implements LoadCarShopRepository {
    async load(): Promise<CarShopModel> {
      return new Promise(resolve => resolve(makeFakeCarShop()));
    }
  }
  return new LoadCarShopRepositoryStub();
};

type SutTypes = {
  sut: DbLoadCarShop;
  LoadCarShopRepositoryStub: LoadCarShopRepository;
};

const makeSut = (): SutTypes => {
  const LoadCarShopRepositoryStub = makeLoadCarShopRepository();
  const sut = new DbLoadCarShop(LoadCarShopRepositoryStub);
  return {
    sut,
    LoadCarShopRepositoryStub,
  };
};

describe('DbLoadCarShop', () => {
  it('Should call LoadCarShopRepository', async () => {
    const { sut, LoadCarShopRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(LoadCarShopRepositoryStub, 'load');
    await sut.load();
    expect(loadSpy).toHaveBeenCalled();
  });

  it('Should return a car shop on success', async () => {
    const { sut } = makeSut();
    const carShop = await sut.load();
    expect(carShop).toEqual(makeFakeCarShop());
  });

  it('Should throws if LoadCarShopRepository throws', async () => {
    const { sut, LoadCarShopRepositoryStub } = makeSut();
    jest
      .spyOn(LoadCarShopRepositoryStub, 'load')
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));
    const promise = sut.load();
    await expect(promise).rejects.toThrow();
  });
});
