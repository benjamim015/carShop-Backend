import request from 'supertest';
import app from '@/main/config/app';

describe('CarShop Routes', () => {
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
