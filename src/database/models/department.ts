import {
  ObjectType,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";

import Category from "./category";

// CREATE TABLE `department` (
//   `department_id` INT            NOT NULL  AUTO_INCREMENT,
//   `name`          VARCHAR(100)   NOT NULL,
//   `description`   VARCHAR(1000),
//   PRIMARY KEY  (`department_id`)
// )
@Entity({ name: "department" })
export default class Department {
  @PrimaryGeneratedColumn()
  public department_id?: number;

  @Column("timestamp", { default: (): string => "CURRENT_TIMESTAMP" })
  public created_at?: string;

  @Column("varchar", { length: 100, nullable: false, unique: true })
  public name?: string;

  @Column("varchar", { length: 1000, nullable: true })
  public description?: number;

  @OneToMany(
    (): ObjectType<Category> => Category,
    (cat: Category): Department | undefined => cat.department,
    { cascade: ["remove"] }
  )
  public category?: Category;
}
