import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../lib/api';
import { Availability } from '../types/availability';

export function useAvailability() {
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailability = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiClient.get('/availability');
      setAvailability(data as unknown as Availability[]);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch availability');
    } finally {
      setLoading(false);
    }
  }, []);

  const saveAvailability = async (payload: Availability[]) => {
    const data = await apiClient.put('/availability', payload);
    await fetchAvailability();
    return data;
  };

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  return { availability, loading, error, fetchAvailability, saveAvailability };
}
