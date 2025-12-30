'use client';

import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';
import { bookingService } from '@/lib/services/bookingService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  slot: any; // Using any for now to match backend entities
  facility: any;
  bookingDate: string;
}

export function BookingModal({ isOpen, onClose, slot, facility, bookingDate }: BookingModalProps) {
  const [teamName, setTeamName] = useState('');
  const [playerCount, setPlayerCount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await bookingService.createBooking({
        slotId: slot.id,
        facilityId: facility.id,
        booking_date: bookingDate,
        team_name: teamName || 'Individual',
        player_count: parseInt(playerCount),
      });
      
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setTeamName('');
        setPlayerCount('');
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Booking failed. This slot might already be taken.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!slot || !facility) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Book ${facility.name}`}>
      {isSuccess ? (
        <div className="text-center py-12 space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Booking Confirmed!</h3>
            <p className="text-muted-foreground">Redirecting you back...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {error && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md border border-destructive/20">
              {error}
            </div>
          )}

          <div className="bg-muted/50 p-4 rounded-xl border space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Time Slot:</span>
              <span className="font-semibold">{slot.start_time} - {slot.end_time}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-semibold">{bookingDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price:</span>
              <span className="font-bold text-primary">${slot.price || 0}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Team Name (Optional)</label>
              <Input 
                value={teamName} 
                onChange={(e) => setTeamName(e.target.value)} 
                placeholder="e.g. Red Warriors"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Number of Players</label>
              <Input 
                type="number" 
                value={playerCount} 
                onChange={(e) => setPlayerCount(e.target.value)} 
                min={1}
                max={slot.max_capacity}
                required
                placeholder={`Max capacity: ${slot.max_capacity}`}
              />
            </div>

            <div className="flex justify-end gap-3 pt-6">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Confirming...' : 'Book Now'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
}
