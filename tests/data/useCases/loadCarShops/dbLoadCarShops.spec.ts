import { LoadCarShopsRepository } from '@/data/protocols/loadCarShopsRepository';
import { DbLoadCarShops } from '@/data/useCases/loadCarShops/dbLoadCarShops';
import { CarShopModel } from '@/domain/models/carShop';

const makeFakeCarShops = (): CarShopModel[] => [
  {
    id: 'any_id',
    name: 'any_name',
    cnpj: 'any_cnpj',
  },
  {
    id: 'other_id',
    name: 'other_name',
    cnpj: 'other_cnpj',
  },
];

const makeLoadCarShopsRepository = (): LoadCarShopsRepository => {
  class LoadCarShopsRepositoryStub implements LoadCarShopsRepository {
    async loadAll(): Promise<CarShopModel[]> {
      return new Promise(resolve => resolve(makeFakeCarShops()));
    }
  }
  return new LoadCarShopsRepositoryStub();
};

type SutTypes = {
  sut: DbLoadCarShops;
  loadCarShopsRepositoryStub: LoadCarShopsRepository;
};

const makeSut = (): SutTypes => {
  const loadCarShopsRepositoryStub = makeLoadCarShopsRepository();
  const sut = new DbLoadCarShops(loadCarShopsRepositoryStub);
  return {
    sut,
    loadCarShopsRepositoryStub,
  };
};

describe('DbLoadCarShops', () => {
  it('Should call LoadCarShopsRepository', async () => {
    const { sut, loadCarShopsRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadCarShopsRepositoryStub, 'loadAll');
    await sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });

  it('Should return a list of car shops on success', async () => {
    const { sut } = makeSut();
    const carShops = await sut.load();
    expect(carShops).toEqual(makeFakeCarShops());
  });

  it('Should throws if LoadCarShopsRepository throws', async () => {
    const { sut, loadCarShopsRepositoryStub } = makeSut();
    jest
      .spyOn(loadCarShopsRepositoryStub, 'loadAll')
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));
    const promise = sut.load();
    await expect(promise).rejects.toThrow();
  });
});
