import { CarShopPgTypeORMRepository } from '@/infra/db/postgres/orm/typeorm/repositories/carShopRepository';
import { Connection, createConnection } from 'typeorm';

interface SutTypes {
  sut: CarShopPgTypeORMRepository;
}

const makeSut = (): SutTypes => {
  const sut = new CarShopPgTypeORMRepository();
  return {
    sut,
  };
};

let connection: Connection;

describe('CarShop PostgreSQL Repository', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM car_shops');
  });

  afterAll(async () => {
    await connection.close();
  });

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
