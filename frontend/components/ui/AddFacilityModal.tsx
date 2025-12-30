'use client';

import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';

interface AddFacilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddFacilityModal({ isOpen, onClose, onSuccess }: AddFacilityModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location_address: '',
    capacity: '',
    facility_type: 'OUTDOOR',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call for now (can be expanded to facilityService.createFacility)
    setTimeout(() => {
      onSuccess();
      onClose();
      setIsSubmitting(false);
      setFormData({ name: '', description: '', location_address: '', capacity: '', facility_type: 'OUTDOOR' });
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Facility">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Facility Name</label>
          <Input 
            required 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            placeholder="e.g. New Tennis Court"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea 
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            placeholder="Describe the facility..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={formData.facility_type}
              onChange={e => setFormData({...formData, facility_type: e.target.value})}
            >
              <option value="OUTDOOR">Outdoor</option>
              <option value="INDOOR">Indoor</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Capacity</label>
            <Input 
              type="number"
              value={formData.capacity} 
              onChange={e => setFormData({...formData, capacity: e.target.value})} 
              placeholder="e.g. 20"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Facility'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
