import { MigrationInterface, QueryRunner } from "typeorm";

export class genreTable1663535339221 implements MigrationInterface {
    name = 'genreTable1663535339221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`genre\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`genre\``);
    }

}
