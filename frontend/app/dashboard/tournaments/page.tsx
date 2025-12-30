'use client';

import { useEffect, useState } from 'react';
import { tournamentService } from '@/lib/services/tournamentService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { HiCalendar, HiTrophy, HiUserGroup } from 'react-icons/hi2';

import { TournamentRegistrationModal } from '@/components/ui/TournamentRegistrationModal';

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTournament, setSelectedTournament] = useState<any>(null);
  const [isRegOpen, setIsRegOpen] = useState(false);

  const fetchTournaments = async () => {
    try {
      const data = await tournamentService.getAllTournaments();
      setTournaments(data);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  const handleRegisterClick = (tournament: any) => {
    setSelectedTournament(tournament);
    setIsRegOpen(true);
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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tournaments</h1>
        <p className="text-muted-foreground">
          Join upcoming competitions and showcase your skills.
        </p>
      </div>

      <div className="grid gap-6">
        {tournaments.length > 0 ? (
          tournaments.map((tournament) => (
            <Card key={tournament.id} className="hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 bg-primary/5 p-8 flex items-center justify-center">
                  <HiTrophy className="w-16 h-16 text-primary opacity-20" />
                </div>
                <div className="flex-1">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">{tournament.name}</CardTitle>
                        <CardDescription className="text-lg font-medium text-primary">
                          {tournament.sport_type}
                        </CardDescription>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                        {tournament.status.replace('_', ' ')}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <HiCalendar className="text-muted-foreground" />
                        <span>Starts: {new Date(tournament.start_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <HiUserGroup className="text-muted-foreground" />
                        <span>Max Teams: {tournament.max_teams}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <HiTrophy className="text-muted-foreground" />
                        <span>Format: {tournament.tournament_format}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {tournament.description}
                    </p>
                    <div className="flex gap-4">
                      <Button 
                        onClick={() => handleRegisterClick(tournament)}
                        disabled={tournament.status !== 'REGISTRATION_OPEN'}
                      >
                        {tournament.status === 'REGISTRATION_OPEN' ? 'Register Team' : 'Registration Closed'}
                      </Button>
                      <Button variant="outline">View Brackets</Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-xl border-2 border-dashed">
            <HiTrophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold">No Active Tournaments</h3>
            <p className="text-muted-foreground">Check back later for new competitions.</p>
          </div>
        )}
      </div>

      <TournamentRegistrationModal 
        isOpen={isRegOpen} 
        onClose={() => setIsRegOpen(false)} 
        tournament={selectedTournament}
        onSuccess={fetchTournaments}
      />
    </div>
  );
}
