import app from '@/main/config/app';
import { TypeORMHelper } from '@/infra/db/postgres/orm/typeorm/helper';
import request from 'supertest';
import { CarShop } from '@/infra/db/postgres/orm/typeorm/entities/carShop';
import path from 'path';

const makeFakeCarShop = async () => {
  const carShopsRepository = TypeORMHelper.instance.getRepository(CarShop);
  const carShop = carShopsRepository.create({
    name: 'any_name',
    cnpj: 'any_cnpj',
    image: 'any_image',
  });
  await carShopsRepository.save(carShop);
};

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

  it('Should return an car on success', async done => {
    await makeFakeCarShop();
    request(app)
      .post('/api/car')
      .attach(
        'image',
        path.resolve(`${__dirname}../../../mocks/test_image.png`),
      )
      .field('brand', 'any_brand')
      .field('model', 'any_model')
      .field('year', 2020)
      .field('color', 'any_color')
      .field('price', 200)
      .field('carShopCnpj', 'any_cnpj')
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('Should delete the file if CarRoute returns an error', async done => {
    await makeFakeCarShop();
    request(app)
      .post('/api/car')
      .attach(
        'image',
        path.resolve(`${__dirname}../../../mocks/test_image.png`),
      )
      .field('model', 'any_model')
      .field('year', 2020)
      .field('color', 'any_color')
      .field('price', 200)
      .field('carShopCnpj', 'any_cnpj')
      .end((err, res) => {
        expect(res.status).toBe(400);
        done();
      });
  });

  it('Should return an error if file is not provided', async done => {
    await makeFakeCarShop();
    request(app)
      .post('/api/car')
      .field('brand', 'any_brand')
      .field('model', 'any_model')
      .field('year', 2020)
      .field('color', 'any_color')
      .field('price', 200)
      .field('carShopCnpj', 'any_cnpj')
      .end((err, res) => {
        expect(res.status).toBe(400);
        done();
      });
  });
});
