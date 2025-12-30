'use client';

import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';
import { tournamentService } from '@/lib/services/tournamentService';

interface TournamentRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tournament: any;
  onSuccess: () => void;
}

export function TournamentRegistrationModal({ isOpen, onClose, tournament, onSuccess }: TournamentRegistrationModalProps) {
  const [formData, setFormData] = useState({
    team_name: '',
    member_count: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await tournamentService.registerTeam(tournament.id, {
        team_name: formData.team_name,
        member_count: parseInt(formData.member_count),
      });
      
      setIsSuccess(true);
      onSuccess();
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ team_name: '', member_count: '' });
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Team name might be taken.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!tournament) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Register for ${tournament.name}`}>
      {isSuccess ? (
        <div className="text-center py-12 space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Registered Successfully!</h3>
            <p className="text-muted-foreground">Good luck in the tournament.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md border border-destructive/20">
              {error}
            </div>
          )}

          <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
            <p className="text-xs font-bold uppercase text-primary mb-1">Tournament Rules</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {tournament.rules || "Standard inter-department tournament rules apply. Ensure all members are currently enrolled students."}
            </p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Team Name</label>
            <Input 
              required 
              value={formData.team_name} 
              onChange={e => setFormData({...formData, team_name: e.target.value})} 
              placeholder="e.g. University Tigers"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Expected Member Count</label>
            <Input 
              required 
              type="number"
              min={1}
              value={formData.member_count} 
              onChange={e => setFormData({...formData, member_count: e.target.value})} 
              placeholder="e.g. 12"
            />
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register Team'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
