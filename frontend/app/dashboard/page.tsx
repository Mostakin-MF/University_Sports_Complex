'use client';

import { BookingCard } from '@/components/ui/BookingCard';
import { Booking } from '@/lib/mockData';

const mockBookings: Booking[] = [
  {
    id: 'b1',
    facilityId: '1', // Basketball
    slotId: '1-slot-10',
    userId: 'user1',
    date: '2025-01-10',
    status: 'CONFIRMED'
  },
  {
    id: 'b2',
    facilityId: '2', // Tennis
    slotId: '2-slot-16',
    userId: 'user1',
    date: '2025-01-12',
    status: 'CONFIRMED'
  },
  {
    id: 'b3',
    facilityId: '3', // Pool
    slotId: '3-slot-9',
    userId: 'user1',
    date: '2024-12-28',
    status: 'CANCELLED'
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here are your upcoming sports activities.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2 space-y-6">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">My Bookings</h2>
              <button className="text-sm text-primary hover:underline">View All</button>
            </div>
            
            <div className="space-y-4">
              {mockBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-muted/50 rounded-xl p-6">
             <h2 className="font-semibold mb-4">Quick Stats</h2>
             <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-muted-foreground">Total Bookings</div>
                  <div className="text-2xl font-bold">12</div>
                </div>
                 <div className="bg-card p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-muted-foreground">Hours Played</div>
                  <div className="text-2xl font-bold">24h</div>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}
