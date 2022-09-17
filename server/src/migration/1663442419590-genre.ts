import { MigrationInterface, QueryRunner } from "typeorm";

export class genre1663442419590 implements MigrationInterface {
    name = 'genre1663442419590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`genre\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`movie\` ADD \`genreId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`movie\` ADD CONSTRAINT \`FK_3aaeb14b8d10d027190f3b159e5\` FOREIGN KEY (\`genreId\`) REFERENCES \`genre\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie\` DROP FOREIGN KEY \`FK_3aaeb14b8d10d027190f3b159e5\``);
        await queryRunner.query(`ALTER TABLE \`movie\` DROP COLUMN \`genreId\``);
        await queryRunner.query(`DROP TABLE \`genre\``);
    }

}
