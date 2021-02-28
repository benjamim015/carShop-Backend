import { CarShopPgTypeORMRepository } from '@/infra/db/postgres/orm/typeorm/repositories/carShopRepository';
import { TypeORMHelper } from '@/infra/db/postgres/orm/typeorm/helper';
import { CarShop } from '@/infra/db/postgres/orm/typeorm/entities/carShop';

const makeFakeCarShops = async () => {
  const carShopsRepository = TypeORMHelper.instance.getRepository(CarShop);
  const carShop1 = carShopsRepository.create({
    name: 'any_name',
    cnpj: 'any_cnpj',
  });
  await carShopsRepository.save(carShop1);
  const carShop2 = carShopsRepository.create({
    name: 'other_name',
    cnpj: 'other_cnpj',
  });
  await carShopsRepository.save(carShop2);
};

interface SutTypes {
  sut: CarShopPgTypeORMRepository;
}

const makeSut = (): SutTypes => {
  const sut = new CarShopPgTypeORMRepository();
  return {
    sut,
  };
};

describe('CarShop TypeORM Postgres Repository', () => {
  beforeAll(async () => {
    await TypeORMHelper.instance.connect();
  });

  beforeEach(async () => {
    await TypeORMHelper.instance.deleteFrom('car_shops');
  });

  afterAll(async () => {
    await TypeORMHelper.instance.disconnect();
  });

  describe('add()', () => {
    it('should return an car shop on success', async () => {
      const { sut } = makeSut();
      const carShop = await sut.add({
        name: 'any_name',
        cnpj: 'any_cnpj',
      });
      expect(carShop).toBeTruthy();
      expect(carShop).toHaveProperty('id');
      expect(carShop).toHaveProperty('name', 'any_name');
      expect(carShop).toHaveProperty('cnpj', 'any_cnpj');
      expect(carShop).toHaveProperty('created_at');
      expect(carShop).toHaveProperty('updated_at');
    });
  });

  describe('loadAll()', () => {
    it('should load all car shops on success', async () => {
      const { sut } = makeSut();
      await makeFakeCarShops();
      const carShops = await sut.loadAll();
      expect(carShops.length).toBe(2);
      expect(carShops[0].name).toBe('any_name');
      expect(carShops[1].name).toBe('other_name');
    });
  });
});
