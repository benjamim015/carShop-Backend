import { AddCarShopController } from '@/presentation/controllers/addCarShop/addCarShopController';
import { CnpjValidatorAdapter } from '@/validation/cnpjValidatorAdapter';
import { DbAddCarShop } from '@/data/useCases/addCarShop/dbAddCarShop';
import { CarShopPgTypeORMRepository } from '@/infra/db/postgres/orm/typeorm/repositories/carShopRepository';
import { makeAddCarShopValidation } from './addCarShopValidation';

export const makeAddCarShopController = (): AddCarShopController => {
  const cnpjValidatorAdapter = new CnpjValidatorAdapter();
  const carShopPgTypeORMRepository = new CarShopPgTypeORMRepository();
  const dbAddCarShop = new DbAddCarShop(carShopPgTypeORMRepository);
  return new AddCarShopController(
    cnpjValidatorAdapter,
    dbAddCarShop,
    makeAddCarShopValidation(),
  );
};
