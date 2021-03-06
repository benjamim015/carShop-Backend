import { Router } from 'express';
import { adaptRoute } from '@/main/adapters/express/expressRouteAdapter';
import { makeAddCarShopController } from '@/main/factories/addCarShop';
import { upload } from '../config/multer';
import { makeLoadCarShopController } from '../factories/loadCarShop';

export default (router: Router): void => {
  router.post(
    '/carShop',
    upload.single('image'),
    adaptRoute(makeAddCarShopController()),
  );
  router.get('/carShop/:id', adaptRoute(makeLoadCarShopController()));
};
