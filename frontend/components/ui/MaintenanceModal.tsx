'use client';

import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface MaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  facility: any;
}

export function MaintenanceModal({ isOpen, onClose, facility }: MaintenanceModalProps) {
  const [status, setStatus] = useState(facility?.status || 'AVAILABLE');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdate = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 800);
  };

  if (!facility) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Maintenance: ${facility.name}`}>
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium">Set Facility Status</label>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setStatus('AVAILABLE')}
              className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                status === 'AVAILABLE' ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500' : 'hover:bg-muted'
              }`}
            >
              Available
            </button>
            <button 
              onClick={() => setStatus('MAINTENANCE')}
              className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                status === 'MAINTENANCE' ? 'border-yellow-500 bg-yellow-50 text-yellow-700 ring-1 ring-yellow-500' : 'hover:bg-muted'
              }`}
            >
              Under Maintenance
            </button>
          </div>
        </div>

        <div className="p-4 bg-muted/50 rounded-lg border space-y-2">
            <h4 className="text-xs font-bold uppercase text-muted-foreground">Maintenance Checklist</h4>
            <div className="space-y-1.5">
                {['Inspect equipment', 'Clean facility area', 'Update lighting', 'Verify safety nets'].map(item => (
                    <label key={item} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                        {item}
                    </label>
                ))}
            </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>Discard</Button>
          <Button onClick={handleUpdate} disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
