import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Facility } from '../../facilities/entities/facility.entity';
import { Slot } from '../../facilities/entities/slot.entity';

export enum BookingStatus {
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
    NO_SHOW = 'NO_SHOW',
}

export enum PaymentStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    REFUNDED = 'REFUNDED',
}

@Entity('bookings')
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    user: User;

    @Column()
    userId: string;

    @ManyToOne(() => Slot)
    slot: Slot;

    @Column()
    slotId: string;

    @ManyToOne(() => Facility)
    facility: Facility;

    @Column()
    facilityId: string;

    @Column({ type: 'date' })
    booking_date: string;

    @Column()
    team_name: string;

    @Column()
    player_count: number;

    @Column({
        type: 'enum',
        enum: BookingStatus,
        default: BookingStatus.CONFIRMED,
    })
    status: BookingStatus;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    total_amount: number;

    @Column({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.PENDING,
    })
    payment_status: PaymentStatus;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
