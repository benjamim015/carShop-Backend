import { Router } from 'express';
import { adaptRoute } from '@/main/adapters/express/expressRouteAdapter';
import { makeAddCarToCarShopController } from '@/main/factories/addCarToCarShop';
import { upload } from '../config/multer';

export default (router: Router): void => {
  router.post(
    '/car',
    upload.single('image'),
    adaptRoute(makeAddCarToCarShopController()),
  );
};
