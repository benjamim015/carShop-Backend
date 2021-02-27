import { Router } from 'express';
import { adaptRoute } from '@/main/adapters/expressRouteAdapter';
import { makeAddCarShopController } from '@/main/factories/addCarShop';

export default (router: Router): void => {
  router.post('/carShop', adaptRoute(makeAddCarShopController()));
};
