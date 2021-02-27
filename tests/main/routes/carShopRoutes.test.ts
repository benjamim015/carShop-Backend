import app from '@/main/config/app';
import { TypeORMHelper } from '@/infra/db/postgres/orm/typeorm/helper';
import request from 'supertest';

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
    await request(app)
      .post('/api/carShop')
      .send({
        name: 'ShopCar',
        cnpj: '44117161000135',
      })
      .expect(200);
  });
});
