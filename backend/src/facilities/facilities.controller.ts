import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { CreateSlotDto } from './dto/create-slot.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('facilities')
export class FacilitiesController {
    constructor(private readonly facilitiesService: FacilitiesService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    create(@Body() createFacilityDto: CreateFacilityDto) {
        return this.facilitiesService.create(createFacilityDto);
    }

    @Get()
    findAll() {
        return this.facilitiesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.facilitiesService.findOne(id);
    }

    @Post('slots')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    createSlot(@Body() createSlotDto: CreateSlotDto) {
        return this.facilitiesService.createSlot(createSlotDto);
    }
}
