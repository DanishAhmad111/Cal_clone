import { useState, useCallback } from 'react';
import { apiClient } from '../lib/api';

export function useSlots() {
  const [slots, setSlots] = useState<{startTime: string, endTime: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSlots = useCallback(async (slug: string, date: string) => {
    try {
      setLoading(true);
      const data = await apiClient.get(`/slots?slug=${slug}&date=${date}`);
      setSlots(data as unknown as {startTime: string, endTime: string}[]);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch available slots');
    } finally {
      setLoading(false);
    }
  }, []);

  const bookSlot = async (payload: { eventTypeId: string, bookerName: string, bookerEmail: string, startTime: string, endTime: string, notes?: string }) => {
    return await apiClient.post(`/bookings`, payload);
  };

  return { slots, loading, error, fetchSlots, bookSlot };
}
