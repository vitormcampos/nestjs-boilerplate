import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCoursesTags1719228245557 implements MigrationInterface {
    name = 'CreateTableCoursesTags1719228245557';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "courses_tags" ("course_id" uuid NOT NULL, "tag_id" uuid NOT NULL, CONSTRAINT "PK_06d0637c63da195fea7ef3b89d4" PRIMARY KEY ("course_id", "tag_id"))`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_1faadd4ff6216f9581793d978d" ON "courses_tags" ("course_id") `
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_c47d51d6b0fbb57c628af744e3" ON "courses_tags" ("tag_id") `
        );
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "tags"`);
        await queryRunner.query(
            `ALTER TABLE "courses_tags" ADD CONSTRAINT "FK_1faadd4ff6216f9581793d978d1" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`
        );
        await queryRunner.query(
            `ALTER TABLE "courses_tags" ADD CONSTRAINT "FK_c47d51d6b0fbb57c628af744e32" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "courses_tags" DROP CONSTRAINT "FK_c47d51d6b0fbb57c628af744e32"`
        );
        await queryRunner.query(
            `ALTER TABLE "courses_tags" DROP CONSTRAINT "FK_1faadd4ff6216f9581793d978d1"`
        );
        await queryRunner.query(`ALTER TABLE "courses" ADD "tags" json`);
        await queryRunner.query(
            `DROP INDEX "public"."IDX_c47d51d6b0fbb57c628af744e3"`
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_1faadd4ff6216f9581793d978d"`
        );
        await queryRunner.query(`DROP TABLE "courses_tags"`);
    }
}
