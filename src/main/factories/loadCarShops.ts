import { CarShopPgTypeORMRepository } from '@/infra/db/postgres/orm/typeorm/repositories/carShopRepository';
import { LoadCarShopsController } from '@/presentation/controllers/carShop/loadCarShops/loadCarShopsController';
import { DbLoadCarShops } from '@/data/useCases/loadCarShops/dbLoadCarShops';

export const makeLoadCarShopsController = (): LoadCarShopsController => {
  const carShopPgTypeORMRepository = new CarShopPgTypeORMRepository();
  const dbLoadCarShops = new DbLoadCarShops(carShopPgTypeORMRepository);
  return new LoadCarShopsController(dbLoadCarShops);
};
