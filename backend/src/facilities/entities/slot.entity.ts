import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Facility } from './facility.entity';

export enum SlotStatus {
    AVAILABLE = 'AVAILABLE',
    FULL = 'FULL',
    MAINTENANCE = 'MAINTENANCE',
}

@Entity('slots')
export class Slot {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Facility, (facility) => facility.slots)
    facility: Facility;

    @Column()
    facilityId: string;

    @Column()
    sport_type: string;

    @Column({ type: 'time' })
    start_time: string;

    @Column({ type: 'time' })
    end_time: string;

    @Column({ type: 'int', nullable: true })
    day_of_week: number; // 0-6

    @Column()
    max_capacity: number;

    @Column({ default: 0 })
    current_bookings: number;

    @Column({
        type: 'enum',
        enum: SlotStatus,
        default: SlotStatus.AVAILABLE,
    })
    status: SlotStatus;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    price: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
