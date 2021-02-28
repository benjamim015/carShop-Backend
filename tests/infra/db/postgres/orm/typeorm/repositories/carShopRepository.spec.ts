import { CarShopPgTypeORMRepository } from '@/infra/db/postgres/orm/typeorm/repositories/carShopRepository';
import { TypeORMHelper } from '@/infra/db/postgres/orm/typeorm/helper';

interface SutTypes {
  sut: CarShopPgTypeORMRepository;
}

const makeSut = (): SutTypes => {
  const sut = new CarShopPgTypeORMRepository();
  return {
    sut,
  };
};

describe('CarShop TypeORM Repository', () => {
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
});
