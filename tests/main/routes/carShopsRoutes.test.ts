import app from '@/main/config/app';
import { TypeORMHelper } from '@/infra/db/postgres/orm/typeorm/helper';
import request from 'supertest';
import { CarShop } from '@/infra/db/postgres/orm/typeorm/entities/carShop';

const makeFakeCarShop = async () => {
  const carShopsRepository = TypeORMHelper.instance.getRepository(CarShop);
  const carShop1 = carShopsRepository.create({
    name: 'any_name',
    cnpj: 'any_cnpj',
  });
  await carShopsRepository.save(carShop1);
};

describe('CarShops Routes', () => {
  beforeAll(async () => {
    await TypeORMHelper.instance.connect();
  });

  beforeEach(async () => {
    await TypeORMHelper.instance.deleteFrom('car_shops');
  });

  afterAll(async () => {
    await TypeORMHelper.instance.disconnect();
  });

  it('should return 200 on load car shops', async () => {
    await makeFakeCarShop();
    await request(app).get('/api/carShops').expect(200);
  });
});
