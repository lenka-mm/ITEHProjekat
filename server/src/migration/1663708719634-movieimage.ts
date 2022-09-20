import { MigrationInterface, QueryRunner } from "typeorm";

export class movieimage1663708719634 implements MigrationInterface {
    name = 'movieimage1663708719634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie\` ADD \`image\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`movie\` CHANGE \`url\` \`url\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie\` CHANGE \`url\` \`url\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`movie\` DROP COLUMN \`image\``);
    }

}
