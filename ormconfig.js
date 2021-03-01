const dir = process.env.NODE_ENV === 'prod' ? 'dist' : 'src';
const extension = process.env.NODE_ENV === 'prod' ? 'js' : 'ts';

let databaseName;

if (process.env.NODE_ENV === 'test') {
  databaseName = 'car_shops_tests';
} else if (process.env.NODE_ENV === 'dev') {
  databaseName = 'car_shops_dev';
} else {
  databaseName = 'car_shops'
}

module.exports = {
  type: "postgres",
  host: process.env.NODE_ENV === 'prod' ? "postgres" : "localhost",
  port: process.env.PG_PORT,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: databaseName,
  entities: [`./${dir}/infra/db/postgres/orm/typeorm/entities/*.${extension}`],
  migrations: [`./${dir}/infra/db/postgres/orm/typeorm/migrations/*.${extension}`],
  cli: {
    migrationsDir: `./${dir}/infra/db/postgres/orm/typeorm/migrations`
  }
}
