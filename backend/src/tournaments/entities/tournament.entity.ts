import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Team } from './team.entity';

export enum TournamentStatus {
    PLANNING = 'PLANNING',
    REGISTRATION_OPEN = 'REGISTRATION_OPEN',
    REGISTRATION_CLOSED = 'REGISTRATION_CLOSED',
    ONGOING = 'ONGOING',
    COMPLETED = 'COMPLETED',
}

@Entity('tournaments')
export class Tournament {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column()
    sport_type: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'date' })
    start_date: string;

    @Column({ type: 'date' })
    end_date: string;

    @Column({ type: 'date' })
    registration_deadline: string;

    @Column()
    max_teams: number;

    @Column({ default: 0 })
    current_teams: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    registration_fee: number;

    @Column({
        type: 'enum',
        enum: TournamentStatus,
        default: TournamentStatus.PLANNING,
    })
    status: TournamentStatus;

    @Column({ nullable: true })
    tournament_format: string;

    @OneToMany(() => Team, (team) => team.tournament)
    teams: Team[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
