import { MigrationInterface, QueryRunner } from "typeorm";

export class usersubscription1663442931706 implements MigrationInterface {
    name = 'usersubscription1663442931706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_subscription\` (\`id\` int NOT NULL AUTO_INCREMENT, \`price\` int NOT NULL, \`startDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL, \`dueDate\` datetime NULL, \`userId\` int NULL, \`subscriptionId\` int NULL, \`subscriptionMovieId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_subscription\` ADD CONSTRAINT \`FK_403d98d1638533c09f9b185929b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_subscription\` ADD CONSTRAINT \`FK_f857d6064bd1b5ab0b364ebb6cf\` FOREIGN KEY (\`subscriptionId\`, \`subscriptionMovieId\`) REFERENCES \`subscription\`(\`id\`,\`movieId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_subscription\` DROP FOREIGN KEY \`FK_f857d6064bd1b5ab0b364ebb6cf\``);
        await queryRunner.query(`ALTER TABLE \`user_subscription\` DROP FOREIGN KEY \`FK_403d98d1638533c09f9b185929b\``);
        await queryRunner.query(`DROP TABLE \`user_subscription\``);
    }

}
