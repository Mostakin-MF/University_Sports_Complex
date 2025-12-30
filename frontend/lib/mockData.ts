
export interface Facility {
    id: string;
    name: string;
    description: string;
    location: string;
    type: 'INDOOR' | 'OUTDOOR';
    capacity: number;
    image: string;
    pricePerHour: number;
}

export interface Slot {
    id: string;
    facilityId: string;
    startTime: string; // HH:mm format
    endTime: string;
    isAvailable: boolean;
}

export interface Booking {
    id: string;
    facilityId: string;
    slotId: string;
    userId: string;
    date: string;
    status: 'CONFIRMED' | 'CANCELLED';
}

export const facilities: Facility[] = [
    {
        id: '1',
        name: 'Main Indoor Basketball Court',
        description: 'Professional grade hardwood court with electronic scoreboard and spectator seating.',
        location: 'Indoor Complex, Level 1',
        type: 'INDOOR',
        capacity: 20,
        image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069&auto=format&fit=crop',
        pricePerHour: 50
    },
    {
        id: '2',
        name: 'Outdoor Tennis Courts',
        description: 'Standard synthetic surface tennis courts with floodlights for evening play.',
        location: 'North Wing, Outdoor Area',
        type: 'OUTDOOR',
        capacity: 4,
        image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2070&auto=format&fit=crop',
        pricePerHour: 30
    },
    {
        id: '3',
        name: 'Swimming Pool',
        description: 'Olympic sized swimming pool with temperature control and lanes.',
        location: 'Aquatic Center',
        type: 'INDOOR',
        capacity: 30,
        image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop',
        pricePerHour: 40
    },
    {
        id: '4',
        name: 'Badminton Court',
        description: 'Professional synthetic flooring badminton court.',
        location: 'Indoor Complex, Level 2',
        type: 'INDOOR',
        capacity: 4,
        image: 'https://images.unsplash.com/photo-1626224583764-847890e0539b?q=80&w=2070&auto=format&fit=crop',
        pricePerHour: 25
    },
    {
        id: '5',
        name: 'Football Field',
        description: 'Full-size FIFA standard artificial turf football field.',
        location: 'South Wing, Outdoor Area',
        type: 'OUTDOOR',
        capacity: 22,
        image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2070&auto=format&fit=crop',
        pricePerHour: 100
    }
];

export const generateSlots = (facilityId: string): Slot[] => {
    const slots: Slot[] = [];
    const startHour = 8; // 8 AM
    const endHour = 22; // 10 PM

    for (let i = startHour; i < endHour; i++) {
        slots.push({
            id: `${facilityId}-slot-${i}`,
            facilityId,
            startTime: `${i}:00`,
            endTime: `${i + 1}:00`,
            isAvailable: Math.random() > 0.3 // 70% chance of being available
        });
    }
    return slots;
};
