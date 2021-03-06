import { CarShopPgTypeORMRepository } from '@/infra/db/postgres/orm/typeorm/repositories/carShopRepository';
import { LoadCarShopController } from '@/presentation/controllers/carShop/loadCarShop/loadCarShopController';
import { DbLoadCarShop } from '@/data/useCases/loadCarShop/dbLoadCarShop';

export const makeLoadCarShopController = (): LoadCarShopController => {
  const carShopPgTypeORMRepository = new CarShopPgTypeORMRepository();
  const dbLoadCarShop = new DbLoadCarShop(carShopPgTypeORMRepository);
  return new LoadCarShopController(dbLoadCarShop);
};
