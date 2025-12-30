'use client';

import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';
import { Slot, Facility } from '@/lib/mockData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  slot: Slot;
  facility: Facility;
}

export function BookingModal({ isOpen, onClose, slot, facility }: BookingModalProps) {
  const [teamName, setTeamName] = useState('');
  const [playerCount, setPlayerCount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset after showing success
      setTimeout(() => {
        setIsSuccess(false);
        setTeamName('');
        setPlayerCount('');
        onClose();
        alert('Booking Confirmed! (Mock)');
      }, 1500);
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Book ${facility.name}`}>
      {isSuccess ? (
        <div className="text-center py-8 text-green-600">
          <h3 className="text-xl font-bold mb-2">Booking Confirmed!</h3>
          <p>You have successfully booked this slot.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-muted p-3 rounded-md text-sm">
            <p className="font-semibold">Time Slot:</p>
            <p>{slot.startTime} - {slot.endTime}</p>
            <p className="mt-1 font-semibold">Price:</p>
            <p>${facility.pricePerHour}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Team Name (Optional)</label>
              <Input 
                value={teamName} 
                onChange={(e) => setTeamName(e.target.value)} 
                placeholder="Enter your team name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Number of Players</label>
              <Input 
                type="number" 
                value={playerCount} 
                onChange={(e) => setPlayerCount(e.target.value)} 
                min={1}
                max={facility.capacity}
                required
                placeholder={`Max ${facility.capacity}`}
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" variant="default" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Confirm Booking'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
}
