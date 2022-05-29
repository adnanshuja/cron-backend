import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('crons')
export class Cron extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    status: boolean;

    @Column({
        name: 'cron_query'
    })
    cronQuery: string;

    @Column({
        name: 'cron_parameters_string'
    })
    cronString: string;

    @CreateDateColumn({
        type: 'timestamp',
        precision: 3,
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        precision: 3,
        name: 'updated_at'
    })
    updatedAt: Date;
}
