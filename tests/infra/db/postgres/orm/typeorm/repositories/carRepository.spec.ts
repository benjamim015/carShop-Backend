import { CarPgTypeORMRepository } from '@/infra/db/postgres/orm/typeorm/repositories/carRepository';
import { TypeORMHelper } from '@/infra/db/postgres/orm/typeorm/helper';
import { CarShop } from '@/infra/db/postgres/orm/typeorm/entities/carShop';
import { cnpjValidator } from 'some-validations';

const cnpj = cnpjValidator.generate();

const createCarShop = () => {
  const carShopRepository = TypeORMHelper.instance.getRepository(CarShop);
  const carShop = carShopRepository.create({
    name: 'any_name',
    cnpj,
  });
  carShopRepository.save(carShop);
};

type SutTypes = {
  sut: CarPgTypeORMRepository;
};

const makeSut = (): SutTypes => {
  const sut = new CarPgTypeORMRepository();
  return {
    sut,
  };
};

describe('Car TypeORM Postgres Repository', () => {
  beforeAll(async () => {
    await TypeORMHelper.instance.connect();
  });

  beforeEach(async () => {
    await TypeORMHelper.instance.deleteFrom('cars');
    await TypeORMHelper.instance.deleteFrom('car_shops');
  });

  afterAll(async () => {
    await TypeORMHelper.instance.disconnect();
  });

  describe('add()', () => {
    it('should return an car on success', async () => {
      const { sut } = makeSut();
      createCarShop();
      const car = await sut.add({
        brand: 'any_brand',
        model: 'any_model',
        year: 0,
        color: 'any_color',
        price: 0,
        carShopCnpj: cnpj,
      });
      expect(car).toBeTruthy();
      expect(car).toHaveProperty('id');
      expect(car).toHaveProperty('brand');
      expect(car).toHaveProperty('model');
      expect(car).toHaveProperty('year');
      expect(car).toHaveProperty('color');
      expect(car).toHaveProperty('price');
      expect(car).toHaveProperty('carShopCnpj');
      expect(car).toHaveProperty('created_at');
      expect(car).toHaveProperty('updated_at');
    });
  });
});
