import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Address from "./address.entity";
import Categories from "./categories.entity";
import SchedulesUsersProperties from "./schedules_users_properties.entity";


@Entity("properties")
class Properties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  sold: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  value: number;

  @Column({ type: "integer" })
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Address, (address) => address.properties)
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Categories)
  category: Categories;

  @OneToMany(
    () => SchedulesUsersProperties,
    (schedules_users_properties) => schedules_users_properties.property
  )
  schedules: SchedulesUsersProperties[];
}

export default Properties;
