import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Team } from './team.entity';
import { User } from '../../users/entities/user.entity';

@Entity('players')
export class Player {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Team, (team) => team.players)
    team: Team;

    @Column()
    teamId: string;

    @ManyToOne(() => User) // Ideally we link to a user, but maybe allow non-users? Requirements say 'Student/Team Captain', presumably players are students.
    user: User;

    @Column()
    userId: string; // Linking strictly to User ID for now as per requirement 3.2 Main Flow

    @Column({ nullable: true })
    jersey_number: number;

    @Column({ nullable: true })
    position: string;
}
