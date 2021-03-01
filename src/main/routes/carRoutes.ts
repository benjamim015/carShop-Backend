import { Router } from 'express';
import { adaptRoute } from '@/main/adapters/express/expressRouteAdapter';
import { makeAddCarToCarShopController } from '@/main/factories/addCarToCarShop';

export default (router: Router): void => {
  router.post('/car', adaptRoute(makeAddCarToCarShopController()));
};
