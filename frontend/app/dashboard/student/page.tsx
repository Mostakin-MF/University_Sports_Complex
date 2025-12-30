'use client';

import { useEffect, useState } from 'react';
import { BookingCard } from '@/components/ui/BookingCard';
import { bookingService } from '@/lib/services/bookingService';
import { useAuth } from '@/context/AuthContext';

export default function StudentDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await bookingService.getMyBookings();
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}! Here are your upcoming sports activities.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2 space-y-6">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">My Bookings</h2>
              <button className="text-sm text-primary hover:underline">View All</button>
            </div>
            
            {loading ? (
              <p>Loading bookings...</p>
            ) : bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking: any) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <div className="bg-muted/50 rounded-lg p-8 text-center">
                <p className="text-muted-foreground">You have no upcoming bookings.</p>
                <button className="mt-4 text-primary font-medium hover:underline">Browse Facilities</button>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-muted/50 rounded-xl p-6">
             <h2 className="font-semibold mb-4">Quick Stats</h2>
             <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-muted-foreground">Total Bookings</div>
                  <div className="text-2xl font-bold">{bookings.length}</div>
                </div>
                 <div className="bg-card p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-muted-foreground">Active Tournaments</div>
                  <div className="text-2xl font-bold">2</div>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}
