import {
  CarShopModel,
  LoadCarShop,
} from '@/presentation/controllers/carShop/loadCarShop/loadCarShopProtocols';
import { LoadCarShopController } from '@/presentation/controllers/carShop/loadCarShop/loadCarShopController';
import { ok, serverError } from '@/presentation/helpers/http/http';

const makeFakeCarShop = (): CarShopModel => ({
  id: 'any_id',
  name: 'any_name',
  cnpj: 'any_cnpj',
  image: 'any_image',
});

const makeLoadCarShop = (): LoadCarShop => {
  class LoadCarShopStub implements LoadCarShop {
    async load(_carShopId: string): Promise<CarShopModel> {
      return new Promise(resolve => resolve(makeFakeCarShop()));
    }
  }
  return new LoadCarShopStub();
};

type SutTypes = {
  sut: LoadCarShopController;
  LoadCarShopStub: LoadCarShop;
};

const makeSut = (): SutTypes => {
  const LoadCarShopStub = makeLoadCarShop();
  const sut = new LoadCarShopController(LoadCarShopStub);
  return {
    sut,
    LoadCarShopStub,
  };
};

describe('LoadCarShop Controller', () => {
  it('Should call LoadCarShop', async () => {
    const { sut, LoadCarShopStub } = makeSut();
    const loadSpy = jest.spyOn(LoadCarShopStub, 'load');
    await sut.handle({ params: { id: 'any_id' } });
    expect(loadSpy).toHaveBeenCalled();
  });

  it('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({ params: { id: 'any_id' } });
    expect(httpResponse).toEqual(ok(makeFakeCarShop()));
  });

  it('Should return 500 if AddCarShop throws', async () => {
    const { sut, LoadCarShopStub } = makeSut();
    jest
      .spyOn(LoadCarShopStub, 'load')
      .mockImplementationOnce(
        async () => new Promise((resolve, reject) => reject(new Error())),
      );
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError());
  });
});
