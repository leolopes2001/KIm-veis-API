import { MigrationInterface, QueryRunner } from "typeorm";

export class fixLengthColumnDIstrict1672688378115 implements MigrationInterface {
    name = 'fixLengthColumnDIstrict1672688378115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "district"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "district" character varying(80) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "district"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "district" character varying(20) NOT NULL`);
    }

}
