import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { User } from '../users/entities/user.entity';
import { FacilitiesService } from '../facilities/facilities.service';

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(Booking)
        private bookingsRepository: Repository<Booking>,
        private facilitiesService: FacilitiesService,
    ) { }

    async create(user: User, createBookingDto: CreateBookingDto) {
        // 1. Check if slot and facility exist (simplified check via service or mostly assuming valid IDs for now)
        // 2. Check availability
        const existingBooking = await this.bookingsRepository.findOne({
            where: {
                slotId: createBookingDto.slotId,
                booking_date: createBookingDto.booking_date,
                status: BookingStatus.CONFIRMED,
            },
        });

        if (existingBooking) {
            throw new BadRequestException('Slot is already booked for this date');
        }

        const booking = this.bookingsRepository.create({
            ...createBookingDto,
            userId: user.id,
            status: BookingStatus.CONFIRMED,
        });

        return this.bookingsRepository.save(booking);
    }

    async findAll() {
        return this.bookingsRepository.find({ relations: ['user', 'facility', 'slot'] });
    }

    async findByUser(userId: string) {
        return this.bookingsRepository.find({
            where: { userId },
            relations: ['facility', 'slot'],
            order: { booking_date: 'DESC' },
        });
    }

    async cancel(id: string, userId: string) {
        const booking = await this.bookingsRepository.findOne({ where: { id, userId } });
        if (!booking) {
            throw new NotFoundException('Booking not found');
        }
        booking.status = BookingStatus.CANCELLED;
        return this.bookingsRepository.save(booking);
    }
}
