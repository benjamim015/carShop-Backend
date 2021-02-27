import { Router } from 'express';

export default (router: Router): void => {
  router.post('/carShop', (req, res) => {
    res.json({ ok: true });
  });
};
