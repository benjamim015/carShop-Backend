import { AddCarToCarShopController } from '@/presentation/controllers/car/addCarToCarShop/addCarToCarShopController';
import { DbAddCarToCarShop } from '@/data/useCases/addCarToCarShop/dbAddCarToCarShop';
import { CarPgTypeORMRepository } from '@/infra/db/postgres/orm/typeorm/repositories/carRepository';
import { makeAddCarToCarShopValidation } from './addCarToCarShopValidation';

export const makeAddCarToCarShopController = (): AddCarToCarShopController => {
  const carPgTypeORMRepository = new CarPgTypeORMRepository();
  const dbAddCarToCarShop = new DbAddCarToCarShop(carPgTypeORMRepository);
  return new AddCarToCarShopController(
    makeAddCarToCarShopValidation(),
    dbAddCarToCarShop,
  );
};
