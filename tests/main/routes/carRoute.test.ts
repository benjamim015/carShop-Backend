import app from '@/main/config/app';
import { TypeORMHelper } from '@/infra/db/postgres/orm/typeorm/helper';
import request from 'supertest';
import { AddCarToCarShopModel } from '@/domain/useCases/addCarToCarShop';
import { CarShop } from '@/infra/db/postgres/orm/typeorm/entities/carShop';

const makeFakeCarShop = async () => {
  const carShopsRepository = TypeORMHelper.instance.getRepository(CarShop);
  const carShop = carShopsRepository.create({
    name: 'any_name',
    cnpj: 'any_cnpj',
  });
  await carShopsRepository.save(carShop);
};

const makeFakeRequest = (): AddCarToCarShopModel => ({
  brand: 'any_brand',
  model: 'any_model',
  year: 2020,
  color: 'any_color',
  price: 200,
  carShopCnpj: 'any_cnpj',
});

describe('Car Routes', () => {
  beforeAll(async () => {
    await TypeORMHelper.instance.connect();
  });

  beforeEach(async () => {
    await TypeORMHelper.instance.deleteAllData();
  });

  afterAll(async () => {
    await TypeORMHelper.instance.deleteAllData();
    await TypeORMHelper.instance.disconnect();
  });

  it('Should return an car on success', async () => {
    makeFakeCarShop();
    await request(app).post('/api/car').send(makeFakeRequest()).expect(200);
  });
});
