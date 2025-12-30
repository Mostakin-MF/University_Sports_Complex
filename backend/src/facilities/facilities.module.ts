import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facility } from './entities/facility.entity';
import { Slot } from './entities/slot.entity';
import { FacilitiesService } from './facilities.service';
import { FacilitiesController } from './facilities.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Facility, Slot])],
    controllers: [FacilitiesController],
    providers: [FacilitiesService],
    exports: [FacilitiesService],
})
export class FacilitiesModule { }
