import 'dotenv/config';
import 'reflect-metadata';
import './config/moduleAlias';

import { typeORMHelper } from '@/infra/db/postgres/orm/typeorm/connection';

typeORMHelper
  .connect()
  .then(async () => {
    const app = (await import('./config/app')).default;

    app.listen(process.env.PORT, () =>
      console.log(`Server running at http://localhost:${process.env.PORT}`),
    );
  })
  .catch(console.error);
