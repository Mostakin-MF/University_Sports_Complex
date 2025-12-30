import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { Booking, Facility, facilities } from '@/lib/mockData';
import { Button } from './Button';
import { clsx } from 'clsx';

interface BookingCardProps {
  booking: Booking;
}

export function BookingCard({ booking }: BookingCardProps) {
  const facility = facilities.find(f => f.id === booking.facilityId);
  if (!facility) return null;

  return (
    <Card className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{facility.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{booking.date}</p>
          </div>
          <span className={clsx(
            "px-2 py-1 rounded-full text-xs font-semibold",
            booking.status === 'CONFIRMED' ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          )}>
            {booking.status}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Time Slot ID: {booking.slotId}</span> 
            </div>
            <div className="flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{facility.location}</span>
            </div>
          </div>
          
          {booking.status === 'CONFIRMED' && (
             <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20">
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
