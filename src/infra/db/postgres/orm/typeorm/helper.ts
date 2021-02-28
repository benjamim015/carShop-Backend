/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-underscore-dangle */
import { createConnection, Connection } from 'typeorm';

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
    this.client = await createConnection();
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
