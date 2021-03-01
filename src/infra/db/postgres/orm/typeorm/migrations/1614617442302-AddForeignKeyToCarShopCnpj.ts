import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddForeignKeyToCarShopCnpj1614617442302
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'cars',
      new TableForeignKey({
        name: 'carShop',
        columnNames: ['carShopCnpj'],
        referencedTableName: 'car_shops',
        referencedColumnNames: ['cnpj'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cars', 'carShop');
  }
}
