import { MigrationInterface, QueryRunner } from "typeorm";

export class subscription1663442779077 implements MigrationInterface {
    name = 'subscription1663442779077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`subscription\` (\`id\` int NOT NULL AUTO_INCREMENT, \`movieId\` int NOT NULL, \`duration\` int NULL, \`price\` int NOT NULL, \`type\` enum ('PPV', 'ALL', 'DATE') NOT NULL, PRIMARY KEY (\`id\`, \`movieId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD CONSTRAINT \`FK_22a3cc672dd1f75db9c29564200\` FOREIGN KEY (\`movieId\`) REFERENCES \`movie\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP FOREIGN KEY \`FK_22a3cc672dd1f75db9c29564200\``);
        await queryRunner.query(`DROP TABLE \`subscription\``);
    }

}
