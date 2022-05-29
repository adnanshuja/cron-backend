import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('crons')
export class Cron extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    name: string;

    @Column()
    status: string;

    @Column({
        name: 'cron_query',
        unique: true
    })
    cronQuery: string;

    @Column({
        name: 'cron_parameters_string'
    })
    cronString: string;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at'
    })
    updatedAt: Date;
}
