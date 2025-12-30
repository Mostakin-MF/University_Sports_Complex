import { api } from '../api';

export const tournamentService = {
    getAllTournaments: async () => {
        const response = await api.get('/tournaments');
        return response.data;
    },
    getTournamentById: async (id: string) => {
        const response = await api.get(`/tournaments/${id}`);
        return response.data;
    },
    registerTeam: async (tournamentId: string, teamData: any) => {
        const response = await api.post(`/tournaments/${tournamentId}/register`, teamData);
        return response.data;
    }
};
