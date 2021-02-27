/* eslint-disable no-nested-ternary */
import { createConnection, getConnectionOptions, Connection } from 'typeorm';

export const typeORMHelper = {
  client: null as Connection,

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
  },

  async disconnect(): Promise<void> {
    await this.client.close();
    this.client = null;
  },

  async deleteFrom(table: string): Promise<void> {
    await this.client.query(`DELETE FROM ${table}`);
  },
};
