import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './entities/tournament.entity';
import { Team } from './entities/team.entity';
import { Player } from './entities/player.entity';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { CreateTeamDto } from './dto/create-team.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TournamentsService {
    constructor(
        @InjectRepository(Tournament)
        private tournamentRepository: Repository<Tournament>,
        @InjectRepository(Team)
        private teamRepository: Repository<Team>,
        @InjectRepository(Player)
        private playerRepository: Repository<Player>,
    ) { }

    async create(createTournamentDto: CreateTournamentDto) {
        const tournament = this.tournamentRepository.create(createTournamentDto);
        return this.tournamentRepository.save(tournament);
    }

    async findAll() {
        return this.tournamentRepository.find();
    }

    async findOne(id: string) {
        return this.tournamentRepository.findOne({ where: { id }, relations: ['teams'] });
    }

    async registerTeam(user: User, createTeamDto: CreateTeamDto) {
        const tournament = await this.findOne(createTeamDto.tournamentId);
        if (!tournament) {
            throw new NotFoundException('Tournament not found');
        }

        if (tournament.current_teams >= tournament.max_teams) {
            throw new BadRequestException('Tournament is full');
        }

        // Check if team name exists in this tournament
        const existingTeam = await this.teamRepository.findOne({
            where: {
                tournamentId: createTeamDto.tournamentId,
                team_name: createTeamDto.team_name
            }
        });

        if (existingTeam) {
            throw new BadRequestException('Team name already taken in this tournament');
        }

        // Create Team
        const team = this.teamRepository.create({
            tournamentId: createTeamDto.tournamentId,
            team_name: createTeamDto.team_name,
            captainId: user.id,
            member_count: createTeamDto.memberIds.length,
        });

        const savedTeam = await this.teamRepository.save(team);

        // Add Players
        // Note: Assuming all memberIds are valid Users. In a real app we would verify this against UsersService
        const players = createTeamDto.memberIds.map(userId =>
            this.playerRepository.create({
                teamId: savedTeam.id,
                userId: userId,
            })
        );
        await this.playerRepository.save(players);

        // Update tournament team count
        await this.tournamentRepository.increment({ id: tournament.id }, 'current_teams', 1);

        return savedTeam;
    }
}
