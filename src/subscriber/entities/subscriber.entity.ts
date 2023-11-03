import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Subscriber {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({ unique: true })
  public email: string;
}
