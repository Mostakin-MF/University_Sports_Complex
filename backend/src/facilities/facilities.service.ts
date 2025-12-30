import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facility } from './entities/facility.entity';
import { Slot } from './entities/slot.entity';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { CreateSlotDto } from './dto/create-slot.dto';

@Injectable()
export class FacilitiesService {
    constructor(
        @InjectRepository(Facility)
        private facilitiesRepository: Repository<Facility>,
        @InjectRepository(Slot)
        private slotsRepository: Repository<Slot>,
    ) { }

    async create(createFacilityDto: CreateFacilityDto) {
        const facility = this.facilitiesRepository.create(createFacilityDto);
        return this.facilitiesRepository.save(facility);
    }

    async findAll() {
        return this.facilitiesRepository.find();
    }

    async findOne(id: string) {
        return this.facilitiesRepository.findOne({ where: { id }, relations: ['slots'] });
    }

    async createSlot(createSlotDto: CreateSlotDto) {
        const slot = this.slotsRepository.create(createSlotDto);
        return this.slotsRepository.save(slot);
    }

    async findSlotsByFacility(facilityId: string) {
        return this.slotsRepository.find({ where: { facilityId } });
    }
}
