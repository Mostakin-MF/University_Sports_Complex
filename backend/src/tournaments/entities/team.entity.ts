import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Tournament } from './tournament.entity';
import { Player } from './player.entity';
import { User } from '../../users/entities/user.entity';

export enum TeamStatus {
    REGISTERED = 'REGISTERED',
    ACTIVE = 'ACTIVE',
    BANNED = 'BANNED',
    WITHDRAWN = 'WITHDRAWN',
}

@Entity('teams')
export class Team {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Tournament, (tournament) => tournament.teams)
    tournament: Tournament;

    @Column()
    tournamentId: string;

    @Column()
    team_name: string;

    @ManyToOne(() => User)
    captain: User;

    @Column()
    captainId: string;

    @Column()
    member_count: number;

    @Column({
        type: 'enum',
        enum: TeamStatus,
        default: TeamStatus.REGISTERED,
    })
    status: TeamStatus;

    @OneToMany(() => Player, (player) => player.team, { cascade: true })
    players: Player[];

    @CreateDateColumn()
    registration_date: Date;
}
