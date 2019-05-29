import {
  AllowNull,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique
} from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "department"
})
export default class Department extends Model<Department> {
  @PrimaryKey
  @Column
  public department_id?: number;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(100))
  public name?: string;

  @Column(DataType.STRING(1000))
  public description?: string;
}

// CREATE TABLE `department` (
//   `department_id` INT            NOT NULL  AUTO_INCREMENT,
//   `name`          VARCHAR(100)   NOT NULL,
//   `description`   VARCHAR(1000),
//   PRIMARY KEY  (`department_id`)
// ) ENGINE=MyISAM;
