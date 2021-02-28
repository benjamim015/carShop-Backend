import { AddCarShopController } from '@/presentation/controllers/addCarShop/addCarShopController';
import { DbAddCarShop } from '@/data/useCases/addCarShop/dbAddCarShop';
import { CarShopPgTypeORMRepository } from '@/infra/db/postgres/orm/typeorm/repositories/carShopRepository';
import { makeAddCarShopValidation } from './addCarShopValidation';

export const makeAddCarShopController = (): AddCarShopController => {
  const carShopPgTypeORMRepository = new CarShopPgTypeORMRepository();
  const dbAddCarShop = new DbAddCarShop(carShopPgTypeORMRepository);
  return new AddCarShopController(dbAddCarShop, makeAddCarShopValidation());
};
