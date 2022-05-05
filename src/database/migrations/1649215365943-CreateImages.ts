import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateImages1649215365943 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'images',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment'
          },
          {
            name: 'filename',
            type: 'varchar'
          },
          {
            name: 'path',
            type: 'varchar'
          },
          {
            name: 'car_id',
            type: 'varchar'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'fk_images_cars',
            columnNames: ['car_id'],
            referencedTableName: 'cars',
            referencedColumnNames: ['id']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }
}
