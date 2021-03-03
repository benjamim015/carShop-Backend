import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddImageFieldToCarShop1614735063885 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'car_shops',
      new TableColumn({
        name: 'image',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('car_shops', 'image');
  }
}
