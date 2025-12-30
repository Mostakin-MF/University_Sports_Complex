import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { CreateTeamDto } from './dto/create-team.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('tournaments')
export class TournamentsController {
    constructor(private readonly tournamentsService: TournamentsService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    create(@Body() createTournamentDto: CreateTournamentDto) {
        return this.tournamentsService.create(createTournamentDto);
    }

    @Get()
    findAll() {
        return this.tournamentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tournamentsService.findOne(id);
    }

    @Post('register-team')
    @UseGuards(JwtAuthGuard)
    registerTeam(@Request() req, @Body() createTeamDto: CreateTeamDto) {
        return this.tournamentsService.registerTeam(req.user, createTeamDto);
    }
}
