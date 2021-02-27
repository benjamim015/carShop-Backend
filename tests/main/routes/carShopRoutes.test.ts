import app from '@/main/config/app';
import { typeORMHelper } from '@/infra/db/postgres/orm/typeorm/connection';
import request from 'supertest';

describe('CarShop Routes', () => {
  beforeAll(async () => {
    await typeORMHelper.connect();
  });

  beforeEach(async () => {
    await typeORMHelper.deleteFrom('car_shops');
  });

  afterAll(async () => {
    await typeORMHelper.disconnect();
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
