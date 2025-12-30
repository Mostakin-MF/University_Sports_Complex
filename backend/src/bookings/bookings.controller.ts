import { Controller, Get, Post, Body, UseGuards, Request, Param, Put } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) { }

    @Post()
    create(@Request() req, @Body() createBookingDto: CreateBookingDto) {
        return this.bookingsService.create(req.user, createBookingDto);
    }

    @Get()
    findAll(@Request() req) {
        // Admin could see all, plain user see theirs? For now let's just return all for admin or mine
        if (req.user.role === 'ADMIN') {
            return this.bookingsService.findAll();
        }
        return this.bookingsService.findByUser(req.user.userId);
    }

    @Get('my-bookings')
    findMyBookings(@Request() req) {
        return this.bookingsService.findByUser(req.user.userId);
    }

    @Put(':id/cancel')
    cancel(@Request() req, @Param('id') id: string) {
        return this.bookingsService.cancel(id, req.user.userId);
    }
}
