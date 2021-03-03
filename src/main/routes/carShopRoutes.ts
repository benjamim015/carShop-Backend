import { Router } from 'express';
import { adaptRoute } from '@/main/adapters/express/expressRouteAdapter';
import { makeAddCarShopController } from '@/main/factories/addCarShop';
import { upload } from '../config/multer';

export default (router: Router): void => {
  router.post(
    '/carShop',
    upload.single('image'),
    adaptRoute(makeAddCarShopController()),
  );
};
