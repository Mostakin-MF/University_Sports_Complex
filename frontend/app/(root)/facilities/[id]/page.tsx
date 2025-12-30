'use client';

import { use, useEffect, useState } from 'react';
import { facilities, generateSlots, Facility, Slot } from '@/lib/mockData';
import { SlotGrid } from '@/components/ui/SlotGrid';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function FacilityDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const { id } = use(params);
  
  const [facility, setFacility] = useState<Facility | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const fetchData = async () => {
      setLoading(true);
      // Find facility
      const foundation = facilities.find(f => f.id === id);
      
      if (foundation) {
        setFacility(foundation);
        // Generate slots
        const newSlots = generateSlots(id);
        setSlots(newSlots);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center min-h-[50vh] flex items-center justify-center">
        <div className="animate-pulse text-lg text-muted-foreground">Loading facility details...</div>
      </div>
    );
  }

  if (!facility) {
    // Ideally this would trigger notFound() but we are client-side only here for now
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Facility Not Found</h1>
        <Link href="/facilities">
          <Button>Back to Facilities</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link href="/facilities" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Facilities
      </Link>

      <div className="relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden mb-8 shadow-xl">
        <img
          src={facility.image}
          alt={facility.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/90 text-xs font-bold uppercase tracking-wider mb-2">
                {facility.type}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold mb-2 text-shadow-sm">{facility.name}</h1>
              <div className="flex items-center gap-4 text-sm md:text-base text-gray-200">
                <span className="flex items-center gap-1">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {facility.location}
                </span>
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Capacity: {facility.capacity}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">${facility.pricePerHour}</div>
              <div className="text-sm opacity-80">per hour</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">About this Facility</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {facility.description}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Select a Time Slot</h2>
            <p className="text-muted-foreground mb-6">
              Choose an available time slot below to start your booking.
            </p>
            <SlotGrid slots={slots} facility={facility} />
          </section>
        </div>

        <div className="md:col-span-1">
          <div className="bg-card border border-border rounded-xl p-6 sticky top-24 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Facility Rules</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Booking must be made at least 4 hours in advance.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Cancellations allowed up to 4 hours before slot time.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Clean sports shoes required for indoor facilities.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Bring your own equipment unless stated otherwise.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
