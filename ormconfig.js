const dir = process.env.NODE_ENV === 'prod' ? 'dist' : 'src';
const extension = process.env.NODE_ENV === 'prod' ? 'js' : 'ts';

module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "car_shops",
  entities: [`./${dir}/infra/db/postgres/orm/typeorm/entities/*.${extension}`],
  migrations: [`./${dir}/infra/db/postgres/orm/typeorm/migrations/*.${extension}`],
  cli: {
    migrationsDir: `./${dir}/infra/db/postgres/orm/typeorm/migrations`
  }
}
