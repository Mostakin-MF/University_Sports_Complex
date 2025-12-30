import { IsString, IsNotEmpty, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { FacilityType, FacilityStatus } from '../entities/facility.entity';

export class CreateFacilityDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    location_address: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsNotEmpty()
    capacity: number;

    @IsEnum(FacilityType)
    @IsNotEmpty()
    facility_type: FacilityType;

    @IsEnum(FacilityStatus)
    @IsOptional()
    status?: FacilityStatus;

    @IsOptional()
    amenities?: any;

    @IsString()
    @IsOptional()
    image_url?: string;
}
