import { MigrationInterface, QueryRunner } from "typeorm";

export class movieprice1663707029332 implements MigrationInterface {
    name = 'movieprice1663707029332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie\` ADD \`price\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD \`price\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`movie\` DROP COLUMN \`price\``);
    }

}
