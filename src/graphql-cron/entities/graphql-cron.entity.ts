import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('graphql-cron')
@ObjectType()
export class GraphqlCron extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string

  @Field()
  @Column()
  time: Date

  @Field(() => Boolean)
  @Column({ default: false })
  enabled: Boolean

  @Field()
  @Column()
  startFrom: Date;


}
