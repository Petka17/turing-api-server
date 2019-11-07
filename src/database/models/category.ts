import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectType,
  PrimaryGeneratedColumn
} from "typeorm";

import Department from "./department";

// CREATE TABLE `category` (
//   `category_id`   INT            NOT NULL  AUTO_INCREMENT,
//   `department_id` INT            NOT NULL,
//   `name`          VARCHAR(100)   NOT NULL,
//   `description`   VARCHAR(1000),
//   PRIMARY KEY (`category_id`),
//   KEY `idx_category_department_id` (`department_id`)
// )
@Entity({ name: "category" })
export default class Category {
  @PrimaryGeneratedColumn()
  public category_id?: number;

  @Column("timestamp", { default: (): string => "CURRENT_TIMESTAMP" })
  public created_at?: string;

  @Column("varchar", { length: 100, nullable: false, unique: true })
  public name?: string;

  @Column("varchar", { length: 1000, nullable: true })
  public description?: string;

  @ManyToOne(
    (): ObjectType<Department> => Department,
    (dep: Department): Category[] | undefined => dep.category
  )
  @JoinColumn({ name: "department_id" })
  public department?: Department;

  @Column("int", { nullable: false })
  public department_id?: number;
}
