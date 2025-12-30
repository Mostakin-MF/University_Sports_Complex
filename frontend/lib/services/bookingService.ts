import { api } from '../api';

export const bookingService = {
    getAllBookings: async () => {
        const response = await api.get('/bookings');
        return response.data;
    },
    getMyBookings: async () => {
        const response = await api.get('/bookings/my-bookings');
        return response.data;
    },
    createBooking: async (bookingData: any) => {
        const response = await api.post('/bookings', bookingData);
        return response.data;
    },
    cancelBooking: async (id: string) => {
        const response = await api.put(`/bookings/${id}/cancel`);
        return response.data;
    }
};
