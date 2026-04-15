import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../lib/api';
import { Booking } from '../types/booking';

export function useBookings(type: 'upcoming' | 'past' = 'upcoming') {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiClient.get(`/bookings?type=${type}`);
      setBookings(data as unknown as Booking[]);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  }, [type]);

  const cancelBooking = async (id: string) => {
    const data = await apiClient.put(`/bookings/${id}/cancel`);
    await fetchBookings();
    return data;
  };

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return { bookings, loading, error, fetchBookings, cancelBooking };
}
