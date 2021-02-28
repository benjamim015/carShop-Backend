import { Router } from 'express';
import { adaptRoute } from '@/main/adapters/express/expressRouteAdapter';
import { makeLoadCarShopsController } from '../factories/loadCarShops';

export default (router: Router): void => {
  router.get('/carShops', adaptRoute(makeLoadCarShopsController()));
};
