'use client';

import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';
import { authService } from '@/lib/services/authService';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddUserModal({ isOpen, onClose, onSuccess }: AddUserModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: 'password123', // Default password
    full_name: '',
    role: 'STUDENT' as 'STUDENT' | 'STAFF' | 'ADMIN',
    student_id: '',
    phone_number: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await authService.register(formData);
      onSuccess();
      onClose();
      // Reset form
      setFormData({
        email: '',
        password: 'password123',
        full_name: '',
        role: 'STUDENT',
        student_id: '',
        phone_number: '',
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create user');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New User">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md border border-destructive/20">
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <Input 
            required 
            value={formData.full_name} 
            onChange={e => setFormData({...formData, full_name: e.target.value})} 
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email Address</label>
          <Input 
            required 
            type="email" 
            value={formData.email} 
            onChange={e => setFormData({...formData, email: e.target.value})} 
            placeholder="user@example.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={formData.role}
              onChange={e => setFormData({...formData, role: e.target.value as any})}
            >
              <option value="STUDENT">Student</option>
              <option value="STAFF">Staff</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <Input 
              value={formData.phone_number} 
              onChange={e => setFormData({...formData, phone_number: e.target.value})} 
              placeholder="017XXXXXXXX"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            {formData.role === 'STUDENT' ? 'Student ID' : 'Employee ID'}
          </label>
          <Input 
            required={formData.role === 'STUDENT'}
            value={formData.student_id} 
            onChange={e => setFormData({...formData, student_id: e.target.value})} 
            placeholder={formData.role === 'STUDENT' ? 'XX-XXXXX-X' : 'EMP-XXXX'}
          />
        </div>

        <div className="p-3 bg-muted rounded-md text-xs text-muted-foreground">
          Note: Default password for new users is set to <code className="font-bold">password123</code>. They can change it in settings.
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create User'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
