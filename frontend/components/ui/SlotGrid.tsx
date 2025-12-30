'use client';

import { Slot, Facility } from '@/lib/mockData';
import { BookingModal } from './BookingModal';
import { useState } from 'react';
import { clsx } from 'clsx';

interface SlotGridProps {
  slots: Slot[];
  facility: Facility;
}

export function SlotGrid({ slots, facility }: SlotGridProps) {
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {slots.map((slot) => (
          <button
            key={slot.id}
            disabled={!slot.isAvailable}
            onClick={() => setSelectedSlot(slot)}
            className={clsx(
              "p-4 rounded-lg border text-center transition-all duration-200",
              slot.isAvailable 
                ? "bg-card hover:border-primary hover:shadow-md cursor-pointer border-border" 
                : "bg-muted text-muted-foreground cursor-not-allowed opacity-60 border-transparent"
            )}
          >
            <div className="text-lg font-bold">
              {slot.startTime} - {slot.endTime}
            </div>
            <div className="text-xs uppercase mt-1 font-semibold tracking-wide">
              {slot.isAvailable ? 'Available' : 'Booked'}
            </div>
          </button>
        ))}
      </div>

      {selectedSlot && (
        <BookingModal 
          isOpen={!!selectedSlot}
          onClose={() => setSelectedSlot(null)}
          slot={selectedSlot}
          facility={facility}
        />
      )}
    </>
  );
}
