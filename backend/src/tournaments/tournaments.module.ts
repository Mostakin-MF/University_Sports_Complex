import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Team } from './entities/team.entity';
import { Player } from './entities/player.entity';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Tournament, Team, Player]),
        UsersModule,
    ],
    controllers: [TournamentsController],
    providers: [TournamentsService],
})
export class TournamentsModule { }
