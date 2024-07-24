import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedMovieGenre1721564189969 implements MigrationInterface {
    name = 'AddedMovieGenre1721564189969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "genre" ("id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "name" character varying(300) NOT NULL, CONSTRAINT "UQ_0285d4f1655d080cfcf7d1ab141" UNIQUE ("id"), CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie_genre" ("id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "movieId" integer, "genreId" integer, CONSTRAINT "PK_2d145b3164d0e5a4bf03eddf15d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movie_genre" ADD CONSTRAINT "FK_89ab58f5defce509fa9acffa723" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_genre" ADD CONSTRAINT "FK_f641f620b3fe496553aa442b026" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_genre" DROP CONSTRAINT "FK_f641f620b3fe496553aa442b026"`);
        await queryRunner.query(`ALTER TABLE "movie_genre" DROP CONSTRAINT "FK_89ab58f5defce509fa9acffa723"`);
        await queryRunner.query(`DROP TABLE "movie_genre"`);
        await queryRunner.query(`DROP TABLE "genre"`);
    }

}
