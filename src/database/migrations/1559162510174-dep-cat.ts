import { MigrationInterface, QueryRunner } from "typeorm";

export class depCat1559162510174 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "CREATE TABLE `department` (`department_id` int NOT NULL AUTO_INCREMENT, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `name` varchar(100) NOT NULL, `description` varchar(1000) NULL, UNIQUE INDEX `IDX_471da4b90e96c1ebe0af221e07` (`name`), PRIMARY KEY (`department_id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `category` (`category_id` int NOT NULL AUTO_INCREMENT, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `name` varchar(100) NOT NULL, `description` varchar(1000) NULL, `department_id` int NULL, UNIQUE INDEX `IDX_23c05c292c439d77b0de816b50` (`name`), PRIMARY KEY (`category_id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "ALTER TABLE `category` ADD CONSTRAINT `FK_7dddc542b235481cfb92d661637` FOREIGN KEY (`department_id`) REFERENCES `department`(`department_id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE `category` DROP FOREIGN KEY `FK_7dddc542b235481cfb92d661637`"
    );
    await queryRunner.query(
      "DROP INDEX `IDX_23c05c292c439d77b0de816b50` ON `category`"
    );
    await queryRunner.query("DROP TABLE `category`");
    await queryRunner.query(
      "DROP INDEX `IDX_471da4b90e96c1ebe0af221e07` ON `department`"
    );
    await queryRunner.query("DROP TABLE `department`");
  }
}
