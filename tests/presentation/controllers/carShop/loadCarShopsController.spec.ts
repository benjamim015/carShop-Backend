import {
  CarShopModel,
  LoadCarShops,
} from '@/presentation/controllers/carShop/loadCarShops/loadCarShopProtocols';
import { LoadCarShopsController } from '@/presentation/controllers/carShop/loadCarShops/loadCarShopsController';
import { noContent, ok, serverError } from '@/presentation/helpers/http/http';

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

const makeLoadCarShops = (): LoadCarShops => {
  class LoadCarShopsStub implements LoadCarShops {
    async load(): Promise<CarShopModel[]> {
      return new Promise(resolve => resolve(makeFakeCarShops()));
    }
  }
  return new LoadCarShopsStub();
};

type SutTypes = {
  sut: LoadCarShopsController;
  loadCarShopsStub: LoadCarShops;
};

const makeSut = (): SutTypes => {
  const loadCarShopsStub = makeLoadCarShops();
  const sut = new LoadCarShopsController(loadCarShopsStub);
  return {
    sut,
    loadCarShopsStub,
  };
};

describe('LoadCarShops Controller', () => {
  it('Should call LoadCarShops', async () => {
    const { sut, loadCarShopsStub } = makeSut();
    const loadSpy = jest.spyOn(loadCarShopsStub, 'load');
    await sut.handle({});
    expect(loadSpy).toHaveBeenCalled();
  });

  it('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(ok(makeFakeCarShops()));
  });

  it('Should return 204 if LoadCarShops returns empty', async () => {
    const { sut, loadCarShopsStub } = makeSut();
    jest
      .spyOn(loadCarShopsStub, 'load')
      .mockImplementationOnce(async () => new Promise(resolve => resolve([])));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(noContent());
  });

  it('Should return 500 if AddCarShop throws', async () => {
    const { sut, loadCarShopsStub } = makeSut();
    jest
      .spyOn(loadCarShopsStub, 'load')
      .mockImplementationOnce(
        async () => new Promise((resolve, reject) => reject(new Error())),
      );
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError());
  });
});
