import { IsString, IsNotEmpty, IsUUID, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { SlotStatus } from '../entities/slot.entity';

export class CreateSlotDto {
    @IsUUID()
    @IsNotEmpty()
    facilityId: string;

    @IsString()
    @IsNotEmpty()
    sport_type: string;

    @IsString()
    @IsNotEmpty()
    start_time: string; // HH:MM:SS

    @IsString()
    @IsNotEmpty()
    end_time: string; // HH:MM:SS

    @IsNumber()
    @IsOptional()
    day_of_week?: number;

    @IsNumber()
    @IsNotEmpty()
    max_capacity: number;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsEnum(SlotStatus)
    @IsOptional()
    status?: SlotStatus;
}
