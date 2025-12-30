import { IsString, IsNotEmpty, IsDateString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { TournamentStatus } from '../entities/tournament.entity';

export class CreateTournamentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    sport_type: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDateString()
    @IsNotEmpty()
    start_date: string;

    @IsDateString()
    @IsNotEmpty()
    end_date: string;

    @IsDateString()
    @IsNotEmpty()
    registration_deadline: string;

    @IsNumber()
    @IsNotEmpty()
    max_teams: number;

    @IsNumber()
    @IsOptional()
    registration_fee?: number;

    @IsEnum(TournamentStatus)
    @IsOptional()
    status?: TournamentStatus;

    @IsString()
    @IsOptional()
    tournament_format?: string;
}
