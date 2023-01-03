import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Properties from "./properties.entity";

import User from "./user.entitty";

@Entity("schedules_users_properties")
class SchedulesUsersProperties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => User, (user) => user.schedules_users_properties)
  user: User;

  @ManyToOne(() => Properties)
  property: Properties;


}

export default SchedulesUsersProperties;
