import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Properties from "./properties.entity";


@Entity("address")
class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 80 })
  district: string;

  @Column({ length: 30 })
  zipCode: string;

  @Column({ nullable: true })
  number: string;

  @Column({ length: 30 })
  city: string;

  @Column({ length: 30 })
  state: string;

  @OneToOne(() => Properties, (properties) => properties.address)
  properties: Properties;
}

export default Address;
