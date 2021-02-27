/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import { createConnection, getConnectionOptions, Connection } from 'typeorm';

export class TypeORMHelper {
  private client: Connection = null;

  private static _instance: TypeORMHelper;

  private constructor() {}

  static get instance(): TypeORMHelper {
    if (!TypeORMHelper._instance) {
      TypeORMHelper._instance = new TypeORMHelper();
    }
    return TypeORMHelper._instance;
  }

  async connect(): Promise<void> {
    const defaultConnectionOptions = await getConnectionOptions();
    this.client = await createConnection(
      Object.assign(defaultConnectionOptions, {
        database:
          process.env.NODE_ENV === 'test'
            ? 'car_shops_tests'
            : process.env.NODE_ENV === 'dev'
            ? 'car_shops_dev'
            : defaultConnectionOptions.database,
      }),
    );
    await this.client.runMigrations();
  }

  async disconnect(): Promise<void> {
    await this.client.close();
    this.client = null;
  }

  async deleteFrom(table: string): Promise<void> {
    await this.client.query(`DELETE FROM ${table}`);
  }
}
