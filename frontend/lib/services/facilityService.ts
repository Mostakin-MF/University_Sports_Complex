import { api } from '../api';

export const facilityService = {
    getAllFacilities: async () => {
        const response = await api.get('/facilities');
        return response.data;
    },
    getFacilityById: async (id: string) => {
        const response = await api.get(`/facilities/${id}`);
        return response.data;
    },
    getFacilitySlots: async (id: string, date: string) => {
        const response = await api.get(`/facilities/${id}/slots`, { params: { date } });
        return response.data;
    }
};
