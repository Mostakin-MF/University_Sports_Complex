'use client';

import { useEffect, useState } from 'react';
import { facilityService } from '@/lib/services/facilityService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { HiLocationMarker, HiUsers, HiLightningBolt, HiCalendar } from 'react-icons/hi';
import { BookingModal } from '@/components/ui/BookingModal';
import { Input } from '@/components/ui/Input';

export default function BookingsPage() {
  const [facilities, setFacilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [slots, setSlots] = useState<any[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [slotsLoading, setSlotsLoading] = useState(false);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const data = await facilityService.getAllFacilities();
        setFacilities(data);
      } catch (error) {
        console.error('Error fetching facilities:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFacilities();
  }, []);

  const handleViewSlots = async (facility: any) => {
    setSelectedFacility(facility);
    setSlotsLoading(true);
    try {
      const data = await facilityService.getFacilitySlots(facility.id, selectedDate);
      setSlots(data);
    } catch (error) {
      console.error('Error fetching slots:', error);
    } finally {
      setSlotsLoading(false);
    }
  };

  const handleBookingClick = (slot: any) => {
    setSelectedSlot(slot);
    setIsBookingOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Facilities & Booking</h1>
          <p className="text-muted-foreground">
            Browse and book sports facilities for your training and games.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-card p-2 rounded-lg border shadow-sm">
          <HiCalendar className="text-primary h-5 w-5 ml-2" />
          <Input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => {
              setSelectedDate(e.target.value);
              if (selectedFacility) handleViewSlots(selectedFacility);
            }}
            className="border-0 focus-visible:ring-0 w-40"
          />
        </div>
      </div>

      {!selectedFacility ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility) => (
            <Card key={facility.id} className="overflow-hidden hover:shadow-lg transition-all group border-muted-foreground/10">
              <div className="h-48 bg-muted relative overflow-hidden">
                {facility.image_url ? (
                  <img 
                    src={facility.image_url} 
                    alt={facility.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Image Available
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold shadow-sm ${
                    facility.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {facility.status}
                  </span>
                </div>
              </div>
              <CardHeader>
                <CardTitle>{facility.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <HiLocationMarker className="text-primary" />
                  {facility.location_address}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <HiUsers /> Capacity: {facility.capacity}
                    </span>
                    <span className="flex items-center gap-1 text-primary font-medium">
                      <HiLightningBolt /> {facility.facility_type}
                    </span>
                  </div>
                  <Button 
                    className="w-full" 
                    disabled={facility.status !== 'AVAILABLE'}
                    onClick={() => handleViewSlots(facility)}
                  >
                    {facility.status === 'AVAILABLE' ? 'View Available Slots' : 'Under Maintenance'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <Button variant="outline" onClick={() => setSelectedFacility(null)}>
            ← Back to Facilities
          </Button>
          
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">{selectedFacility.name} Slots</h2>
            <span className="text-muted-foreground">|</span>
            <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
              {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
          </div>

          {slotsLoading ? (
            <div className="text-center py-12">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
               <p className="mt-2 text-sm text-muted-foreground">Loading available slots...</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {slots.length > 0 ? (
                slots.map((slot) => (
                  <button
                    key={slot.id}
                    disabled={slot.status === 'FULL'}
                    onClick={() => handleBookingClick(slot)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      slot.status === 'AVAILABLE' 
                        ? 'hover:border-primary hover:ring-1 hover:ring-primary/20 bg-card' 
                        : 'opacity-60 bg-muted cursor-not-allowed'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-lg font-bold">{slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}</span>
                       <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                         slot.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                       }`}>
                         {slot.status}
                       </span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">{slot.sport_type}</div>
                    <div className="flex justify-between items-center text-xs">
                       <span className="font-medium text-primary">${slot.price}</span>
                       <span>{slot.current_bookings}/{slot.max_capacity} Players</span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="col-span-full py-12 text-center bg-muted/20 rounded-xl border-2 border-dashed">
                  <p className="text-muted-foreground">No slots available for this date.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {selectedSlot && (
        <BookingModal 
          isOpen={isBookingOpen} 
          onClose={() => setIsBookingOpen(false)} 
          slot={selectedSlot}
          facility={selectedFacility}
          bookingDate={selectedDate}
        />
      )}
    </div>
  );
}
