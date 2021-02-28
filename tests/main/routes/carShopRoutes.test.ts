import app from '@/main/config/app';
import { TypeORMHelper } from '@/infra/db/postgres/orm/typeorm/helper';
import request from 'supertest';
import { AddCarShopModel } from '@/domain/useCases/addCarShop';

const makeFakeRequest = (): AddCarShopModel => ({
  name: 'ShopCar',
  cnpj: '44117161000135',
});

describe('CarShop Routes', () => {
  beforeAll(async () => {
    await TypeORMHelper.instance.connect();
  });

  beforeEach(async () => {
    await TypeORMHelper.instance.deleteFrom('car_shops');
  });

  afterAll(async () => {
    await TypeORMHelper.instance.disconnect();
  });

  it('should return an car shop on success', async () => {
    await request(app).post('/api/carShop').send(makeFakeRequest()).expect(200);
  });

  it('should return an error if a already in use CNPJ is provided', async () => {
    await request(app).post('/api/carShop').send(makeFakeRequest()).expect(200);
    await request(app).post('/api/carShop').send(makeFakeRequest()).expect(403);
  });
});
