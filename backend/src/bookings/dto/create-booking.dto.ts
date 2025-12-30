import { IsString, IsNotEmpty, IsUUID, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateBookingDto {
    @IsUUID()
    @IsNotEmpty()
    slotId: string;

    @IsUUID()
    @IsNotEmpty()
    facilityId: string;

    @IsDateString()
    @IsNotEmpty()
    booking_date: string;

    @IsString()
    @IsNotEmpty()
    team_name: string;

    @IsNumber()
    @IsNotEmpty()
    player_count: number;

    @IsOptional()
    payment_status?: any; // Simplify for now
}
