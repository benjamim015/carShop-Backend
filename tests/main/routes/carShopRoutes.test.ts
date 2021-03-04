/* eslint-disable @typescript-eslint/no-empty-function */
import app from '@/main/config/app';
import { TypeORMHelper } from '@/infra/db/postgres/orm/typeorm/helper';
import { CarShop } from '@/infra/db/postgres/orm/typeorm/entities/carShop';
import { cnpjValidator } from 'some-validations';
import request from 'supertest';
import path from 'path';

const makeFakeCarShop = async () => {
  const carShopRepository = TypeORMHelper.instance.getRepository(CarShop);
  const carShop = carShopRepository.create({
    name: 'any_name',
    cnpj: '00520550000131',
    image: 'any_image',
  });
  await carShopRepository.save(carShop);
};

describe('CarShop Routes', () => {
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

  it('should return an car shop on success', done => {
    request(app)
      .post('/api/carShop')
      .field('name', 'any_name')
      .field('cnpj', cnpjValidator.generate())
      .attach(
        'image',
        path.resolve(`${__dirname}../../../mocks/test_image.png`),
      )
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('should return an error if a already in use CNPJ is provided', async done => {
    await makeFakeCarShop();

    request(app)
      .post('/api/carShop')
      .field('name', 'any_name')
      .field('cnpj', '00520550000131')
      .attach(
        'image',
        path.resolve(`${__dirname}../../../mocks/test_image.png`),
      )
      .end((err, res) => {
        expect(res.status).toBe(403);
        done();
      });
  });

  it('should return an error if file for image is not provided', async done => {
    request(app)
      .post('/api/carShop')
      .field('name', 'any_name')
      .field('cnpj', cnpjValidator.generate())
      .end((err, res) => {
        expect(res.status).toBe(400);
        done();
      });
  });

  it('should return an error if a required field is not provided', async done => {
    request(app)
      .post('/api/carShop')
      .field('name', 'any_name')
      .attach(
        'image',
        path.resolve(`${__dirname}../../../mocks/test_image.png`),
      )
      .end((err, res) => {
        expect(res.status).toBe(400);
        done();
      });
  });
});
