import { MigrationInterface, QueryRunner } from "typeorm";

export class movieTable1663535390928 implements MigrationInterface {
    name = 'movieTable1663535390928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`movie\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`plot\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`genreId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`movie\` ADD CONSTRAINT \`FK_3aaeb14b8d10d027190f3b159e5\` FOREIGN KEY (\`genreId\`) REFERENCES \`genre\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie\` DROP FOREIGN KEY \`FK_3aaeb14b8d10d027190f3b159e5\``);
        await queryRunner.query(`DROP TABLE \`movie\``);
    }

}
