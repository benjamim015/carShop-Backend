module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "car_shop_tests",
  entities: ["./src/infra/db/postgres/orm/typeorm/entities/*.ts"],
  migrations: ["./src/infra/db/postgres/orm/typeorm/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/infra/db/postgres/orm/typeorm/migrations"
  }
}
