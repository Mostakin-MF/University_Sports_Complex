import { IsString, IsNotEmpty, IsUUID, IsArray } from 'class-validator';

export class CreateTeamDto {
    @IsUUID()
    @IsNotEmpty()
    tournamentId: string;

    @IsString()
    @IsNotEmpty()
    team_name: string;

    @IsArray()
    @IsNotEmpty()
    memberIds: string[]; // List of User IDs
}
