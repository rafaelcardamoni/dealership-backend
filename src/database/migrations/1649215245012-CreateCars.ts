import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCars1649215245012 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'make',
            type: 'varchar'
          },
          {
            name: 'model',
            type: 'varchar'
          },
          {
            name: 'trim',
            type: 'varchar'
          },
          {
            name: 'year',
            type: 'varchar'
          },
          {
            name: 'mileage',
            type: 'int'
          },
          {
            name: 'price',
            type: 'int'
          },
          {
            name: 'engine',
            type: 'varchar'
          },
          {
            name: 'transmission',
            type: 'varchar'
          },
          {
            name: 'power',
            type: 'int'
          },
          {
            name: 'fuel',
            type: 'varchar'
          },
          {
            name: 'city_consumption',
            type: 'int',
            isNullable: true
          },
          {
            name: 'road_consumption',
            type: 'int',
            isNullable: true
          },
          {
            name: 'range',
            type: 'int',
            isNullable: true
          },
          {
            name: 'type',
            type: 'varchar'
          },
          {
            name: 'color',
            type: 'varchar'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars');
  }
}
