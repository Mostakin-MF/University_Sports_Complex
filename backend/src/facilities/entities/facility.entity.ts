import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Slot } from './slot.entity';

export enum FacilityType {
    INDOOR = 'INDOOR',
    OUTDOOR = 'OUTDOOR',
}

export enum FacilityStatus {
    AVAILABLE = 'AVAILABLE',
    MAINTENANCE = 'MAINTENANCE',
    CLOSED = 'CLOSED',
}

@Entity('facilities')
export class Facility {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'text' })
    location_address: string;

    @Column()
    capacity: number;

    @Column({
        type: 'enum',
        enum: FacilityType,
    })
    facility_type: FacilityType;

    @Column({ type: 'json', nullable: true })
    amenities: any;

    @Column({ type: 'text', nullable: true })
    image_url: string;

    @Column({
        type: 'enum',
        enum: FacilityStatus,
        default: FacilityStatus.AVAILABLE,
    })
    status: FacilityStatus;

    @OneToMany(() => Slot, (slot) => slot.facility)
    slots: Slot[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
